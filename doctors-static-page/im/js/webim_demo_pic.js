//弹出发图对话框
function selectPicClick() {
    
    $('#upd_form')[0].reset();
    var preDiv = document.getElementById('previewPicDiv');
    preDiv.innerHTML = '';
    var progress = document.getElementById('upd_progress');//上传图片进度条
    progress.value = 0;
    $('#upload_pic_dialog').modal('show');
}
//选择图片触发事件
function fileOnChange(uploadFile) {

    if (!window.File || !window.FileList || !window.FileReader) {
        alert("您的浏览器不支持File Api");
        return;
    }

    var file = uploadFile.files[0];
    var fileSize = file.size;

    //先检查图片类型和大小
    if (!checkFile(uploadFile, fileSize)) {
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
}

//上传图片进度条回调函数
//loadedSize-已上传字节数
//totalSize-图片总字节数
function onProgressCallBack(loadedSize, totalSize) {
    var progress = document.getElementById('upd_progress');//上传图片进度条
    progress.value = (loadedSize / totalSize) * 100;
}

//上传图片
function uploadPic() {
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
        'onProgressCallBack': onProgressCallBack, //上传图片进度条回调函数
        //'abortButton': document.getElementById('upd_abort'), //停止上传图片按钮
        'From_Account': loginInfo.identifier, //发送者帐号
        'To_Account': selToID, //接收者
        'businessType': businessType//业务类型
    };
    //上传图片
    webim.uploadPic(opt,
            function (resp) {
                //上传成功发送图片
                sendPic(resp);
                $('#upload_pic_dialog').modal('hide');
            },
            function (err) {
                alert(err.ErrorInfo);
            }
    );
}
//发送图片消息
function sendPic(images) {
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
        addMsg(msg);
        curMsgCount++;
    }, function (err) {
        alert(err.ErrorInfo);
    });
}
//检查文件类型和大小
function checkFile(obj, fileSize) {
    var picExts = 'jpg|jpeg|png|bmp|gif|webp';
    var photoExt = obj.value.substr(obj.value.lastIndexOf(".") + 1).toLowerCase();//获得文件后缀名
    var pos = picExts.indexOf(photoExt);
    if (pos < 0) {
        alert("您选中的文件不是图片，请重新选择");
        return false;
    }
    fileSize = Math.round(fileSize / 1024 * 100) / 100; //单位为KB
    if (fileSize > 30 * 1024) {
        alert("您选择的图片大小超过限制(最大为30M)，请重新选择");
        return false;
    }
    return true;
}

//单击图片事件
function imageClick(imgObj) {
    var imgUrls = imgObj.src;
    var imgUrlArr = imgUrls.split("#"); //字符分割
    console.info("imgUrlArr=" + imgUrlArr);
    var smallImgUrl = imgUrlArr[0];//小图
    var bigImgUrl = imgUrlArr[1];//大图
    var oriImgUrl = imgUrlArr[2];//原图
    var bigPicDiv = document.getElementById('bigPicDiv');
    bigPicDiv.innerHTML = '';
    var span = document.createElement('span');
    span.innerHTML = '<img class="img-thumbnail" src="' + bigImgUrl + '" />';
    //span.innerHTML = '<img class="img-responsive" src="' + bigImgUrl  + '" />';
    bigPicDiv.insertBefore(span, null);

    /*$("#viewOriPicBt").click(
     function(){
     var a = $("<a href='"+oriImgUrl+"' target='_blank'></a>").get(0);
     var e = document.createEvent('MouseEvents');
     
     e.initEvent('click', true, true);  
     a.dispatchEvent(e);  
     console.log('event has been changed');  
     }
     );*/
    $('#click_pic_dialog').modal('show');

}


