/**
 * Created by Administrator on 2016/5/9.
 */

window.zhobj = {};


function initDemoApp(){
    var that=this;
    //IE9(含)以下浏览器用到的jsonp回调函数
    this.jsonpCallback=function(rspData) {
        webim.setJsonpLastRspData(rspData);
    }
    //监听新消息事件
    this.onMsgNotify=function(newMsg) {
        var that=this;
        //获取所有聊天会话
        var sessMap = webim.MsgStore.sessMap();
        for (var i in sessMap) {
            var sess = sessMap[i];
            if (selToID == sess.id()) {//处于当前聊天界面
                selSess = sess;
                //获取当前会话消息数
                var msgCount = sess.msgCount();
                // add new msgs
                if (msgCount > curMsgCount) {
                    for (var j = curMsgCount; j < msgCount; j++) {
                        var msg = sess.msg(j);
                        //在聊天窗体中新增一条消息
                        this.addMsg(msg);
                        curMsgCount++;
                    }
                    //消息已读上报，以及设置会话自动已读标记
                    webim.setAutoRead(selSess, true, true);
                }
            } else {
                //更新其他聊天对象的未读消息数
                this.updateSessDiv(sess.type(),sess.id(), sess.unread());
            }
        }
    }

    this.listeners={
        "onConnNotify": null,
        "jsonpCallback": that.jsonpCallback,//IE9(含)以下浏览器用到的jsonp回调函数
        "onMsgNotify": that.onMsgNotify,//监听新消息(私聊，群聊，群提示消息)事件
        "groupSystemNotifys": groupSystemNotifys//监听（多终端同步）群系统消息事件*/
    }

    this.Friends=new zhobj.Friends(this);
    this.Friends.clearAll();

    this.Charpanle=new zhobj.Charpanle(this);
    this.Charpanle.clearAll();

    this.MsgControl=new zhobj.MsgControl(this);
    this.MsgControl.clearAll();

    //web sdk 初始化
    webim.init(loginInfo, this.listeners, null);
    //读取我的好友列表
    this.Friends.getAllFriend(this.getAllFriendsCallbackOK);

    //快速回复
    $(".content-fast >div").on("click",function(){
        var msgtxt=$(this).html();
        msgtxt=msgtxt.replace(/\d\./, "")
        that.fastReutrnMsg(msgtxt);
    });

    this.getAllFriendsCallbackOK=function(){
        console.log("获取朋友，返回成功")
        selType == SessionType.C2C && webim.syncMsgs(this.syncMsgsCallbackOK);
    }



    //获取C2C最新消息或群漫游消息成功回调函数
    this.syncMsgsCallbackOK=function(){
        if (webim.MsgStore.sessCount() > 0) {
            var sessMap = webim.MsgStore.sessMap();

            console.log("0000000000000000000000000000000000000");
            console.log(sessMap)
            console.log(sessMap.length)
            console.log("0000000000000000000000000000000000000");
                for (var i in sessMap) {
                //console.info("sessMap[i]=%O",sessMap[i]);
                var sess = sessMap[i];
                if (selToID == sess.id()) {//处于当前聊天界面
                    selSess = sess;
                    var msgCount = sess.msgCount();
                    // add new msgs
                    if (msgCount > curMsgCount) {
                        for (var mj = curMsgCount; mj < msgCount; mj++) {
                            var msg = sess.msg(mj);
                            this.addMsg(msg);
                            curMsgCount++;
                        }
                        //消息已读上报，以及设置会话自动已读标记
                        webim.setAutoRead(selSess, true, true);
                    }
                } else {
                    //更新其他聊天对象的未读消息数
                    this.updateSessDiv(sess.type(),sess.id(), sess.unread());
                }
            }
        }
    };

    //单击好友或群组头像事件
    this.onSelSess=function(name,index, to_id, sessListName) {
        if (selToID != null && selToID != to_id) {
            var preSessDiv = document.getElementById("sessDiv_" + selToID);
            //将之前选中用户的样式置为未选中样式
            preSessDiv.className = "friendinfo";
            //设置之前会话的已读消息标记
            webim.setAutoRead(selSess, false, false);

            //设置当前选中用户的样式为选中样式
            var curSessDiv = document.getElementById("sessDiv_" + to_id);
            curSessDiv.className = "friendinfo-self";
            //curSessDiv.getElementsByClassName("badge")[0].style.display = "none";
            var badgeDiv=document.getElementById("badgeDiv_" + to_id);
            badgeDiv.style.display = "none";
            selToID = to_id;
            curMsgCount = 0;
            //清空聊天界面
            that.Charpanle.clearAll();
            $(".formname").html(name);
            if (sessListName == 'sesslist-group') {
            } else {
                if (selType == SessionType.GROUP) {
                    selType = SessionType.C2C;
                }
                selSess = webim.MsgStore.sessByTypeId(selType, selToID);
                webim.MsgStore.resetCookieAndSyncFlag();
                webim.syncMsgs(this.syncMsgsCallbackOK);
            }
        }
    }
    //聊天页面增加一条消息
    this.addMsg=function(msg){
        var tplfrom='<div class="themsg from clearfix"><div class="frommsghead">{msghed}</div> <img class="fromicon" src="{src}" width="45" height="45"><span class="fromarrow"></span> <span class="fromcontent">{contenttext}</span> <span class="fromspace"></span> </div>';
        var tplto='<div class="themsg to clearfix"> <div class="tomsghead">{msghed}</div><img class="toicon" src="{src}" width="45" height="45"> <span class="tocontent">{contenttext}</span><span class="toarrow"></span> <span class="tospace"></span> </div>';
        var currenttpl=tplto;
        var thetmp;
        var msghed;
        var currentdate=new Date().Format("yyyy-MM-dd");
        var msgtime=webim.Tool.formatTimeStamp(msg.time)

        //当天
        if(currentdate==msgtime.split(" ")[0]){
            msghed = (msg.isSend ? loginInfo.identifier :  msg.fromAccount ) + "&nbsp;&nbsp;" + msgtime.split(" ")[1];
        }else{
            //不同天

            //msghed = (msg.isSend ? loginInfo.identifier :  msg.fromAccount ) + "&nbsp;&nbsp;" + webim.Tool.formatTimeStamp(msg.time);
        }
        console.log(msg)
        //如果是发给自己的消息
        if (!msg.isSend){
           // msghead.style.color = "blue";
            //收到消息
            currenttpl=tplfrom;
            thetmp=zhutils.substitute(currenttpl,{src:friendHeadUrl,msghed:msghed,contenttext:msg.toHtml()});
        }else{
            thetmp=zhutils.substitute(currenttpl,{src:loginInfo.headurl,msghed:msghed,contenttext:msg.toHtml()});
        }

       $(".msgflow-content").append($(thetmp));
        //消息列表
        var msgflow = document.getElementsByClassName("msgflow-content")[0];
        //300ms后,等待图片加载完，滚动条自动滚动到底部
        setTimeout(function(){
            msgflow.scrollTop = msgflow.scrollHeight;
        },300);
    };

    //更新某一个好友div-未读消息数
     this.updateSessDiv= function(sess_type,to_id, unread_msg_count) {
        var badgeDiv = document.getElementById("badgeDiv_" + to_id);
        if (badgeDiv && unread_msg_count > 0) {
            if (unread_msg_count >= 100) {
                unread_msg_count = '99+';
            }
            badgeDiv.innerHTML = "<span>" + unread_msg_count + "</span>";
            badgeDiv.style.display = "block";
        }else if (badgeDiv==null){//没有找到对应的聊天id
            if(sess_type==SessionType.C2C){
                this.addSess(to_id,to_id,friendHeadUrl,unread_msg_count,'friendslist');
            }
            /*else{
             addSess(to_id,to_id,friendHeadUrl,unread_msg_count,'sesslist-group');
             }*/
        }
    }

    //好友列表添加一个新好友
     this.addSess= function(to_id, name, face, unread_msg_count, friendslist) {
         var that=this;
         var tmp=' <div class="friendinfo " id="{sessid}" data-toid="{toid}" data-name="{nickname}"><img src="{src}" width="45" height="45"><div class="title">{friendname}</div><div class="content">{content}</div><div class="badge" id="{badgeid}"></div> </div>';
         var theto_id="sessDiv_"+to_id;
         var thebadgeid="badgeDiv_"+to_id;
         var thetmp=zhutils.substitute(tmp,{toid:to_id,nickname:name,sessid:theto_id,src:face,friendname:name,content:"",badgeid:thebadgeid});
         thetmp=$(thetmp);


         $("#friendslist").append(thetmp);
         //添加单击用户头像事件
         var childrenLength=$("#friendslist").children().length;
         var name=name;
         var to_id=to_id;

         if(childrenLength==1){
             selToID=to_id;
             var preSessDiv = document.getElementById("sessDiv_" + selToID);
             //将之前选中用户的样式置为未选中样式
             preSessDiv.className = "friendinfo";
             //设置之前会话的已读消息标记
             //webim.setAutoRead(selSess, false, false);

             //设置当前选中用户的样式为选中样式
             var curSessDiv = document.getElementById("sessDiv_" + to_id);
             curSessDiv.className = "friendinfo-self";
             //curSessDiv.getElementsByClassName("badge")[0].style.display = "none";
             var badgeDiv=document.getElementById("badgeDiv_" + to_id);
             badgeDiv.style.display = "none";
             selToID = to_id;
             curMsgCount = 0;
             //清空聊天界面
             that.Charpanle.clearAll();
             $(".formname").html(name);

             if (selType == SessionType.GROUP) {
                 selType = SessionType.C2C;
             }
             selSess = webim.MsgStore.sessByTypeId(selType, selToID);
             webim.MsgStore.resetCookieAndSyncFlag();
             webim.syncMsgs(this.syncMsgsCallbackOK);
         }else{
             if (unread_msg_count > 0) {
                 if (unread_msg_count >= 100) {
                     unread_msg_count = '99+';
                 }
                 thetmp.find(".badge").html('<span>' + unread_msg_count + ' </span>').show();
             }
         }
         thetmp.on("click",function(){
             that.onSelSess(name,childrenLength,to_id,"friendslist");
         });


    }



    //发送消息
     this.onSendMsg =function() {
        //selToID='peaker4';
         var that=this;
        if (!selToID) {
            alert("您还没有好友，暂不能聊天");
            $("#send_msg_text").val('');
            return;
        }
        //获取消息内容
        var msgtosend = document.getElementsByClassName("msgedit")[0].value;
        var msgLen = webim.Tool.getStrBytes(msgtosend);

        if (msgtosend.length < 1) {
            alert("发送的消息不能为空!");
            $("#send_msg_text").val('');
            return;
        }
        var maxLen,errInfo;
        if(selType==SessionType.C2C){
            maxLen=MaxMsgLen.C2C;
            errInfo="消息长度超出限制(最多"+Math.round(maxLen/3)+"汉字)";
        }else{
            maxLen=MaxMsgLen.GROUP;
            errInfo="消息长度超出限制(最多"+Math.round(maxLen/3)+"汉字)";
        }
        if (msgLen > maxLen) {
            alert(errInfo);
            return;
        }
        if (!selSess) {
            selSess = new webim.Session(selType, selToID, selToID, friendHeadUrl, Math.round(new Date().getTime() / 1000));
        }
        var msg = new webim.Msg(selSess, true);
        //解析文本和表情
        var expr = /\[[^[\]]{1,3}\]/mg;
        var emotions = msgtosend.match(expr);
        if (!emotions || emotions.length < 1) {
            var text_obj = new webim.Msg.Elem.Text(msgtosend);
            msg.addText(text_obj);
        } else {

            for (var i = 0; i < emotions.length; i++) {
                var tmsg = msgtosend.substring(0, msgtosend.indexOf(emotions[i]));
                if (tmsg) {
                    var text_obj = new webim.Msg.Elem.Text(tmsg);
                    msg.addText(text_obj);
                }
                var emotion = webim.EmotionPicData[emotions[i]];
                if (emotion) {

                    var face_obj = new webim.Msg.Elem.Face(webim.EmotionPicDataIndex[emotions[i]], emotions[i]);
                    msg.addFace(face_obj);

                } else {
                    var text_obj = new webim.Msg.Elem.Text(emotions[i]);
                    msg.addText(text_obj);
                }
                var restMsgIndex = msgtosend.indexOf(emotions[i]) + emotions[i].length;
                msgtosend = msgtosend.substring(restMsgIndex);
            }
            if (msgtosend) {
                var text_obj = new webim.Msg.Elem.Text(msgtosend);
                msg.addText(text_obj);
            }
        }

        webim.sendMsg(msg, function (resp) {
            //if(selType==SessionType.C2C){
            that.addMsg(msg);
            curMsgCount++;
            //}
            $("#send_msg_text").val('');
            $("#wl_faces_box").fadeOut("slow");
        }, function (err) {
            alert(err.ErrorInfo);
            $("#send_msg_text").val('');
        });
    };

    this.fastReutrnMsg=function(msgtxt){
        if (!selToID) {
            alert("您还没有好友，暂不能聊天");
            return;
        }
        //获取消息内容
        var msgtosend = msgtxt;
        var msgLen = webim.Tool.getStrBytes(msgtosend);

        if (msgtosend.length < 1) {
            alert("发送的消息不能为空!");
            return;
        }
        var maxLen,errInfo;
        if(selType==SessionType.C2C){
            maxLen=MaxMsgLen.C2C;
            errInfo="消息长度超出限制(最多"+Math.round(maxLen/3)+"汉字)";
        }else{
            maxLen=MaxMsgLen.GROUP;
            errInfo="消息长度超出限制(最多"+Math.round(maxLen/3)+"汉字)";
        }
        if (msgLen > maxLen) {
            alert(errInfo);
            return;
        }
        if (!selSess) {
            selSess = new webim.Session(selType, selToID, selToID, friendHeadUrl, Math.round(new Date().getTime() / 1000));
        }
        var msg = new webim.Msg(selSess, true);
        //解析文本和表情
        var expr = /\[[^[\]]{1,3}\]/mg;
        var emotions = msgtosend.match(expr);
        if (!emotions || emotions.length < 1) {
            var text_obj = new webim.Msg.Elem.Text(msgtosend);
            msg.addText(text_obj);
        } else {

            for (var i = 0; i < emotions.length; i++) {
                var tmsg = msgtosend.substring(0, msgtosend.indexOf(emotions[i]));
                if (tmsg) {
                    var text_obj = new webim.Msg.Elem.Text(tmsg);
                    msg.addText(text_obj);
                }
                var emotion = webim.EmotionPicData[emotions[i]];
                if (emotion) {

                    var face_obj = new webim.Msg.Elem.Face(webim.EmotionPicDataIndex[emotions[i]], emotions[i]);
                    msg.addFace(face_obj);

                } else {
                    var text_obj = new webim.Msg.Elem.Text(emotions[i]);
                    msg.addText(text_obj);
                }
                var restMsgIndex = msgtosend.indexOf(emotions[i]) + emotions[i].length;
                msgtosend = msgtosend.substring(restMsgIndex);
            }
            if (msgtosend) {
                var text_obj = new webim.Msg.Elem.Text(msgtosend);
                msg.addText(text_obj);
            }
        }

        webim.sendMsg(msg, function (resp) {
            //if(selType==SessionType.C2C){
            that.addMsg(msg);
            curMsgCount++;
            //}
        }, function (err) {
            alert(err.ErrorInfo);

        });
    };
    //发送图片消息
     this.sendPic=function(images) {
        var that=this;
         if (!selToID) {
            alert("您还没有好友，暂不能聊天");
            return;
        }

        if (!selSess) {
            selSess = new webim.Session(selType, selToID, selToID, friendHeadUrl, Math.round(new Date().getTime() / 1000));
        }
        var msg = new webim.Msg(selSess, true);
        var images_obj = new webim.Msg.Elem.Images(images.File_UUID);
        for (var i in images.URL_INFO) {
            var img = images.URL_INFO[i];
            var newImg;
            var type;
            switch (img.PIC_TYPE) {
                case 1://原图
                    type = 1;//原图
                    break;
                case 2://小图（缩略图）
                    type = 3;//小图
                    break;
                case 4://大图
                    type = 2;//大图
                    break;
            }
            newImg = new webim.Msg.Elem.Images.Image(type, img.PIC_Size, img.PIC_Width, img.PIC_Height, img.DownUrl);
            images_obj.addImage(newImg);
        }
        msg.addImage(images_obj);
        //调用发送图片消息接口
        webim.sendMsg(msg, function (resp) {
            that.addMsg(msg);
            curMsgCount++;
        }, function (err) {
            alert(err.ErrorInfo);
        });
    }
}


var friends=(function(){
    var tmp=' <div class="friendinfo " id="{sessid}" data-toid="{toid}" data-name="{nickname}"><img src="{src}" width="45" height="45"><div class="title">{friendname}</div><div class="content">{content}</div><div class="badge" id="{badgeid}"></div> </div>';
    function Friends(_main){
        this.dom=$("#friendslist");
        this.main=_main;
        this._init();
    };
    var p=Friends.prototype;
    p._init=function(){
        console.log("friends init...")
    };

    p.clearAll=function(){
        this.dom.html("");
    };

    p.addfriend=function(to_id, name, face, unread_msg_count, friendslist){
        var that=this;
        var theto_id="sessDiv_"+to_id;
        var thebadgeid="badgeDiv_"+to_id;
        var thetmp=zhutils.substitute(tmp,{toid:to_id,nickname:name,sessid:theto_id,src:face,friendname:name,content:"",badgeid:thebadgeid});
        thetmp=$(thetmp);
        this.dom.append(thetmp);
        //添加单击用户头像事件
        var childrenLength=this.dom.children().length;
        thetmp.on("click",function(){
            that.main.onSelSess(name,childrenLength,to_id,"friendslist")
        })

        if (unread_msg_count > 0) {
            if (unread_msg_count >= 100) {
                unread_msg_count = '99+';
            }
            thetmp.find(".badge").html('<span>" + unread_msg_count + " </span>').show();
        }
    };

    p.addEvent=function(){
        var that=this;
        $(document).on("click","#friendslist>div",function(e){
            var index=$(this).index()+1;
            var toid=$(this).attr("data-toid");
            var nickname=$(this).attr("data-name");
            that.main.onSelSess(nickname,index,toid,"friendslist")
        });
    }

    p.getAllFriend=function(cbOK, cbErr){
        var that=this;
        var options = {
            'From_Account': loginInfo.identifier,
            'TimeStamp': 0,
            'StartIndex': 0,
            'GetCount': totalCount,
            'LastStandardSequence': 0,
            "TagList":
                [
                    "Tag_Profile_IM_Nick",
                    "Tag_SNS_IM_Remark"
                ]
        };
        webim.getAllFriend(
            options,
            function (resp) {
                //清空聊天对象列表
                that.clearAll();
                if (resp.FriendNum > 0) {

                    var friends = resp.InfoItem;
                    if (!friends || friends.length == 0) {
                        return;
                    }
                    var count = friends.length;

                    for (var i = 0; i < count; i++) {
                        var friend_name = friends[i].Info_Account;
                        if (friends[i].SnsProfileItem && friends[i].SnsProfileItem[0] && friends[i].SnsProfileItem[0].Tag) {
                            friend_name = friends[i].SnsProfileItem[0].Value;

                        }
                        if (friend_name.length > maxNameLen) {//帐号或昵称过长，截取一部分
                            friend_name = friend_name.substr(0, maxNameLen) + "...";
                        }
                        friends[i]["name"]=webim.Tool.formatText2Html(friend_name);
                        //增加一个好友div
                        that.addfriend(friends[i].Info_Account, webim.Tool.formatText2Html(friend_name), friendHeadUrl, 0, 'friendslist');
                        console.log(friends[i].Info_Account, webim.Tool.formatText2Html(friend_name), friendHeadUrl, 0, 'friendslist');
                    }
                    //that.addEvent();
                    if (selType == SessionType.C2C) {

                        //清空聊天界面
                        that.main.Charpanle.clearAll();
                        //默认选中当前聊天对象
                        selToID = friends[0].Info_Account;

                        //默认第一个标题
                        $(".formname").html( friends[0].name)
                        //设置当前选中用户的样式为选中样式
                        //$("sessDiv_"+selToID).addClass("active")
                        var selSessDiv = document.getElementById("sessDiv_" + selToID);
                        if (selSessDiv) {
                            selSessDiv.className = "friendinfo-self";
                        } else {
                            console.warn("不存在selSessDiv(c2c): selSessDivId=" + "sessDiv_" + selToID);
                        }

                        var selBadgeDiv = document.getElementById("badgeDiv_" + selToID);
                        if (selBadgeDiv) {
                            selBadgeDiv.style.display = "none";
                        } else {
                            console.warn("不存在selBadgeDiv(c2c): selBadgeDivId=" + "badgeDiv_" + selToID);
                        }
                    }
                    if (cbOK)
                        cbOK();

                }

            },
            function (err) {
                alert(err.ErrorInfo);
            }
        );
    }

    zhobj.Friends=Friends;

}());



var charPanle=(function(){
    function  Charpanle(_main){
        this.dom=$("#chat");
        this.main=_main;
        this._init();

    };
    var p=Charpanle.prototype;
    p._init=function(){
        console.log("Charpanle init...")
    };
    p.clearAll=function(){
        this.dom.find(".msgflow-content").html("");
        this.dom.find(".formname").html("")
    };
    zhobj.Charpanle=Charpanle;
}());

var msgControl=(function(){
    function  MsgControl(_main){
        this.dom=$(".msgflow-control");
        this.main=_main;
        this._init();
        this._addEvent();
    };
    var p=MsgControl.prototype;
    p._init=function(){
        console.log("MsgControl init...")
        this.emotionbtn=this.dom.find(".emotionbtn");
        this.imgbtn=this.dom.find(".imgbtn");
        this.endbtn=this.dom.find(".endbtn");
        this.emotionclose=$(".wl_faces_close");
        this.sendBtn=$("#sendBtn");
    };
    p._addEvent=function(){
        var that=this;
        this.emotionbtn.on("click",function(){
            var __that=that;
            console.log("emotionbtnemotionbtn")
            if (emotionFlag) {
                $('#wl_faces_box').css({
                    "display": "block"
                });
                return;
            }
            emotionFlag = true;
            // webim.EmotionPicData设置表情的json数组
            var emotionPicData= webim.EmotionPicData;
            for (var key in emotionPicData) {
                var emotions = $('<img>').attr({
                    "id": key,
                    "src": emotionPicData[key],
                    "style": "cursor:pointer;"
                }).click(function () {
                    __that._selectEmotionImg(this);
                });
                $('<li>').append(emotions).appendTo($('#emotionUL'));
            }
            $('#wl_faces_box').css({
                "display": "block"
            });
        });
        this.imgbtn.on("click",function(){
            console.log("imgbtnimgbtnimgbtn")
            $('#upd_form')[0].reset();
            var preDiv = document.getElementById('previewPicDiv');
            preDiv.innerHTML = '';
            $('#upload_pic_dialog').modal('show');
        });
        this.endbtn.on("click",function(){
            console.log("endbtnendbtnendbtn")
        });
        this.emotionclose.on("click",function(){
            $("#wl_faces_box").fadeOut("slow");
        });

        this.sendBtn.on("click",function(e){
            e.preventDefault();
            that.main.onSendMsg();
        });
        $("#upd_pic").on("change",function(){
            if (!window.File || !window.FileList || !window.FileReader) {
                alert("您的浏览器不支持File Api");
                return;
            }
            var file = $(this)[0].files[0];
            var fileSize=file.size;
            //先检查图片类型和大小
            if (!zhutils.checkFile( $(this)[0], fileSize)) {
                return;
            }
            //预览图片
            var reader = new FileReader();
            var preDiv = document.getElementById('previewPicDiv');
            reader.onload = (function (file) {
                return function (e) {
                    preDiv.innerHTML = '';
                    var span = document.createElement('span');
                    span.innerHTML = '<img class="img-responsive" src="' + this.result + '" alt="' + file.name + '" />';
                    //span.innerHTML = '<img class="img-thumbnail" src="' + this.result + '" alt="' + file.name + '" />';
                    preDiv.insertBefore(span, null);
                };
            })(file);
            //预览图片
            reader.readAsDataURL(file);
        });
        $("#sendPic").on("click",function(){
            var uploadFiles = document.getElementById('upd_pic');
            var file = uploadFiles.files[0];

            var businessType;//业务类型，1-发群图片，2-向好友发图片
            if (selType == SessionType.C2C) {//向好友发图片
                businessType = UploadPicBussinessType.C2C_MSG;
            } else if (selType == SessionType.GROUP) {//发群图片
                businessType = UploadPicBussinessType.GROUP_MSG;
            }
            //封装上传图片请求
            var opt = {
                'file': file, //图片对象
                //'onProgressCallBack': onProgressCallBack, //上传图片进度条回调函数
                //'abortButton': document.getElementById('upd_abort'), //停止上传图片按钮
                'From_Account': loginInfo.identifier, //发送者帐号
                'To_Account': selToID, //接收者
                'businessType': businessType//业务类型
            };
            //上传图片
            webim.uploadPic(opt,
                function (resp) {
                    //上传成功发送图片
                    that.main.sendPic(resp);
                    $('#upload_pic_dialog').modal('hide');
                },
                function (err) {
                    alert(err.ErrorInfo);
                }
            );
        });
        $("#send_msg_text").on("keydown",function(event){
            if (event.keyCode == 13) {
                that.main.onSendMsg();
            }
        })

    };
    p.clearAll=function(){

    };
    p._selectEmotionImg=function(selImg){
        var txt = document.getElementsByClassName("msgedit")[0];
        txt.value = txt.value + selImg.id;
        txt.focus();
        $("#wl_faces_box").fadeOut("slow");
    };


    zhobj.MsgControl=MsgControl;
}());

