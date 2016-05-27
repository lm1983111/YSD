
//测试应用
var sdkAppID = 1400007122;
var accountType = 3457;
//当前用户身份
//当前用户身份
var loginInfo = {
    sdkAppID: 1400007122, //用户所属应用id
    appIDAt3rd: 1400007122, //用户所属应用id
    accountType: 3457, //用户所属应用帐号类型
    identifier: '15021720050', //当前用户ID
    userSig: 'eJx1zkFvgjAYxvE7n6LpdWajpbV2N2hIRHHOuM15ahAK1AWsWLIR43cfISbjsvf6-yXPe3UAAPAt3j4maXpqayttZxQEzwB6hDI4*evG6EwmVnpNNnRE3P4Ywnik1I-RjZJJblUzKEw57tmI6EzVVuf6DhB1MWK9oWN0yb7ksPj-1EUXQ1yFexFtxHYt3h-IcooECivBUxt9BsTnH8fza7tTB3oq5vtgfsjjsohKf8FJ3qpzTcI2fiqsYH6well02OUqTkpemrWZpcsd7b6r0aTVlbo-NCUenjFGoXNzfgEjDFZf' //当前用户身份凭证
};
initDemoApp();
qavSdkLogin();
//当前用户所处的状态
var currentStatus = null;
//状态类型
var StatusType = {
    'login': 1, //已登录SDK
    'context': 2, //已启动SDK
    'enter_room': 3 //已进入房间
    };
//用户输入的房间ID
var inputRoomId = null;
//当前进入房间ID
var curentRoomId = null;
//是否点击【返回登录】按钮标记
var isQuitFlag = false;
//主视频用户信息
var isMainUsable = true; //是否可用
var mainUserId = null; //当前用户ID
var mainUserLastVideoStatus = 0; //上一次用户状态(是否打开摄像头，是否打开麦克风)
//第一个其他视频用户信息
var isOther1Usable = true; //是否可用
var otherUserId1 = null; //当前用户ID
var otherUserLastVideoStatus1 = 0; //上一次用户状态(是否打开摄像头，是否打开麦克风)
//第二个其他视频用户信息
var isOther2Usable = true; //是否可用
var otherUserId2 = null; //当前用户ID
var otherUserLastVideoStatus2 = 0; //上一次用户状态(是否打开摄像头，是否打开麦克风)
//第三个其他视频用户信息
var isOther3Usable = true; //是否可用
var otherUserId3 = null; //当前用户ID
var otherUserLastVideoStatus3 = 0; //上一次用户状态(是否打开摄像头，是否打开麦克风)
//房间成员音视频状态
var AVStatus = {
    'NONE': 0, //没有音视频
    'ONLY_VIDEO': 1, //只有视频
    'ONLY_AUDIO': 2, //只有音频
    'BOTH_AUDIO_AND_VIDEO': 3 //都有音视频
    };
//是否切换摄像头标记
var changeCameraFlag = false;
//当前使用的摄像头索引
var curCameraIndex = 0;
//是否切换摄像头标记
var changeMicFlag = false;
//当前使用的麦克风索引
var curMicIndex = 0;
//是否切换摄像头标记
var changePlayerFlag = false;
//当前使用的扬声器索引
var curPlayerIndex = 0;
//是否点击【观看成员视频画面】按钮
var checkViewFlag = false;
//要观看画面的成员ID
var checkViewMemberId = null;
//用于显示成员视频画面的div标签ID
var checkViewDiv = null;
//用于显示成员视频画面X坐标
var checkViewPosX = 0;
//用于显示成员视频画面Y坐标
var checkViewPosY = 0;
//用于显示成员视频画面宽度
var checkViewWidth = 0;
//用于显示成员视频画面高度
var checkViewHeight = 0;
//是否全屏显示标记
var isFullScreen = false;
//全屏显示时用户ID
var fullScreenMemberId = null;
//全屏显示时div标签ID
var fullScreenMemberViewDiv = null;
//截图保存路径
var snapShotFilePath = "d:\\qavsdkPic";
//当前录制视频类型
var curRecordVideoType = null;
//事件通知条数计数
var noticeCount = 0;
//sdk回调事件类型
var EventType = {
    'LOGIN': 3144, //登录SDK成功通知
    'START_CONTEXT': 3146, //启动sdk通知
    'STOP_CONTEXT': 3147, //停止sdk成功通知
    'ENTER_ROOM': 3148, //进入房间成功通知
    'EXIT_ROOM': 3149, //退出房间成功通知
    'ROOM_MEMBERS_CHANGE': 3150, //房间成员变化通知
    'REQUEST_VIEW_LIST': 3153, //请求其他成员列表视频画面成功通知
    'CANCEL_ALL_VIEW': 3154, //取消全部成员视频画面成功通知
    'MIC_STATUS_CHANGE': 3155, //麦克风状态变化通知
    'PLAYER_STATUS_CHANGE': 3156, //扬声器状态变化通知
    'CAMERA_STATUS_CHANGE': 3158, //摄像头状态变化通知
    'SCREEN_SHOT': 3160, //截图成功通知
    'START_RECORD_VIDEO': 3161, //开始录制视频成功通知
    'STOP_RECORD_VIDEO': 3162 //结束录制视频成功通知
    };
//事件名称
var EventName = {
    '3144': '登录', //登录SDK成功通知
    '3146': '初始化上下文', //启动sdk通知
    '3147': '销毁上下文', //停止sdk成功通知
    '3148': '进入房间', //进入房间成功通知
    '3149': '退出房间', //退出房间成功通知
    '3150': '房间成员变化', //房间成员变化通知
    '3153': '请求其他成员列表视频画面', //请求其他成员列表视频画面成功通知
    '3154': '取消全部成员视频画面', //取消全部成员视频画面成功通知
    '3155': '麦克风状态变化', //麦克风状态变化通知
    '3156': '扬声器状态变化', //扬声器状态变化通知
    '3158': '摄像头状态变化', //摄像头状态变化通知
    '3160': '截图', //截图成功通知
    '3161': '开始录制视频', //开始录制视频成功通知
    '3162': '停止录制视频' //结束录制视频成功通知
    };
//视频区域占比
var ViewRatio = {
    'WIDTH_RATIO': 0.125, ////其他视频画面宽度和屏幕宽度占比
    'HEIGHT_WIDTH_RATIO': 0.75 //视频画面高度和宽度占比
    };
//屏幕宽度
var docWidth = document.documentElement.clientWidth || document.body.clientWidth;
var docHeight = document.documentElement.clientHeight || document.body.clientHeight;
//主视频区域宽度
var mainViewWidth = Math.round(2 * docWidth * ViewRatio.WIDTH_RATIO);
//其他视频区域宽度
var otherViewWidth = Math.round(docWidth * ViewRatio.WIDTH_RATIO);
//主视频区域大小
/*var MainView = {
    'WIDTH': mainViewWidth,
    'HEIGHT': Math.round(mainViewWidth * ViewRatio.HEIGHT_WIDTH_RATIO)
    };*/
var MainView = {
    'WIDTH': 200,
    'HEIGHT': 150
};
//其他视频区域大小
/*var OtherView = {
    'WIDTH': otherViewWidth,
    'HEIGHT': Math.round(otherViewWidth * ViewRatio.HEIGHT_WIDTH_RATIO)
    };*/
var OtherView = {
    'WIDTH': 350,
    'HEIGHT': 480
};
//视频画面Y坐标修正值
var FIX_POSITION_Y = 0;
//初始化主视频画面宽高
$('#win_width').val(MainView.WIDTH);
$('#win_height').val(MainView.HEIGHT);
//重绘视频画面计数
var relocationCount = 1;
//当前操作系统版本
var osName = detectOS();
log.info('osName=' + osName);
//刷新页面或关闭页面触发事件
window.onbeforeunload = function() {

    //先取消所有成员视频
    cancelAllView();
    //再退出房间
    qavSdk.ExitRoom();

    return;

    var n = window.event.screenX - window.screenLeft;
    var b = n > document.documentElement.scrollWidth - 20;
    if (b && window.event.clientY < 0 || window.event.altKey) {
    window.event.returnValue = "";
    } else {
    //返回登录
    quitClick(1);
    }

    };
//滚动页面触发事件
window.onscroll = function() {
    var docTop = document.documentElement.scrollTop || document.body.scrollTop;
    var docLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    if (docTop == 0 || docTop >= 5 || docLeft == 0 || docLeft >= 5) {
    //重绘视频画面显示位置
    relocationView();
    relocationCount++;
    }
    };
//监听按ESC键事件
$(document).keyup(function(event) {
    switch (event.keyCode) {
    case 27:
    //重置全屏显示的视频画面
    resetFullScreenMemberView();
    break;
    }
    });
//调节麦克风音量触发事件
$("#mic_volume").ionRangeSlider({
    type: "single",
    min: 0,
    max: 100,
    grid: true,
    force_edges: true,
    keyboard: true,
    step: 1,
    keyboard_step: 1,
    onFinish: function(data) {
    //设置麦克风音量
    setMicVolumn(data.from);
    }
    });
//调节扬声器音量触发事件
$("#player_volume").ionRangeSlider({
    type: "single",
    min: 0,
    max: 100,
    grid: true,
    force_edges: true,
    keyboard: true,
    step: 1,
    keyboard_step: 1,
    onFinish: function(data) {
    //设置扬声器音量
    setPlayerVolumn(data.from);
    }
    });
//判断是否已经拿到临时身份凭证
if (TLSHelper.getQuery('tmpsig')) {
    if (loginInfo.identifier == null) {
    log.info('start fetchUserSig');
    //获取正式身份凭证，成功后会回调tlsGetUserSig(res)函数
    TLSHelper.fetchUserSig();
    }
    } else { //未登录
    if (loginInfo.identifier == null) {
    //弹出选择应用类型对话框
    $('#select_app_dialog').modal('show');
    $("body").css("background-color", 'white');
    }
    }
//获取房间号
(function getRoomId(){
    var thisRoomId = "123";
    $("#room_id").val(thisRoomId)
})();