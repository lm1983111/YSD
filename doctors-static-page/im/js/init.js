/**
 * Created by Administrator on 2016/5/9.
 */
var sdkAppID = 1400007122;
var accountType = 3457;


var maxNameLen=5;//我的好友或群组列表中名称显示最大长度

var pageSize = 10;//表格的每页条数，分页时用到
var totalCount = 1000;//每次接口请求的条数，分页时用到
var MaxMsgLen={//消息最大长度（字节），
    'C2C':12000,//私聊消息
    'GROUP':8898//群聊
};
var SessionType={ //聊天类型，C2C : 私聊，GROUP：群聊
    'C2C':'C2C',
    'GROUP':'GROUP'
};
var selType = SessionType.C2C;//当前聊天类型

var selToID = null;//当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）
var selSess = null;//当前聊天会话
var curMsgCount = 0;//当前聊天会话中的消息数
var emotionFlag = false;//是否打开过表情选择框

var UploadPicBussinessType={//图片业务类型
    'GROUP_MSG':1,//私聊图片
    'C2C_MSG':2,//群聊图片
    'USER_HEAD':3,//用户头像
    'GROUP_HEAD':4//群头像
};

var curPlayAudio=null;//当前正在播放的audio对象


//腾讯登录服务错误码（用于托管模式）
var TlsErrorCode={
    'OK':0,//成功
    'SIGNATURE_EXPIRATION':11//用户身份凭证过期
};

//当前用户身份
var loginInfo = {
    sdkAppID: sdkAppID,//用户所属应用id
    appIDAt3rd: sdkAppID,//用户所属应用id
    accountType: accountType,//用户所属应用帐号类型
    identifier: null,//当前用户ID
    userSig: null,//当前用户身份凭证
    headurl: 'im/images/doctor.png'//当前用户默认头像
};

//默认好友头像
var friendHeadUrl = 'im/images/user.jpg';

//监听（多终端同步）群系统消息方法，方法都定义在webim_demo_group_notice.js文件中
//注意每个数字代表的含义，比如，
//1表示监听申请加群消息，2表示监听申请加群被同意消息，3表示监听申请加群被拒绝消息
var groupSystemNotifys={
 "1": onApplyJoinGroupRequestNotify,//申请加群请求（只有管理员会收到）
 "2": onApplyJoinGroupAcceptNotify,//申请加群被同意（只有申请人能够收到）
 "3": onApplyJoinGroupRefuseNotify,//申请加群被拒绝（只有申请人能够收到）
 "4": onKickedGroupNotify,//被管理员踢出群(只有被踢者接收到)
 "5": onDestoryGroupNotify,//群被解散(全员接收)
 "6": onCreateGroupNotify,//创建群(创建者接收)
 "7": onInvitedJoinGroupNotify,//邀请加群(被邀请者接收)
 "8": onQuitGroupNotify,//主动退群(主动退出者接收)
 "9": onSetedGroupAdminNotify,//设置管理员(被设置者接收)
 "10": onCanceledGroupAdminNotify,//取消管理员(被取消者接收)
 "11": onRevokeGroupNotify,//群已被回收(全员接收)
 "255": onCustomGroupNotify//用户自定义通知(默认全员接收)
 };


//独立模式 直接初始化
if(zhutils.getUrlParam('identifier') && zhutils.getUrlParam('userSig')){
    loginInfo.identifier=zhutils.getUrlParam('identifier');
    loginInfo.userSig=zhutils.getUrlParam('userSig');
    initDemoApp();
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

