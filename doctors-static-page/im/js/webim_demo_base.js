//切换应用类型单选按钮事件
function changeAppType(item) {
    var appType = item.value;
    if (appType == 1) {//测试应用
        $('#myself_type_desc').hide();
        $('#demo_type_desc').show();
        $('#sdkAppIdDiv').hide();
        $('#accountTypeDiv').hide();
    } else if (appType == 0) {//自建应用
        $('#demo_type_desc').hide();
        $('#myself_type_desc').show();
        $('#sdkAppIdDiv').show();
        $('#accountTypeDiv').show();
    }
}
//选择应用类型
function selectApp() {
    var appType = $('input[name="app_type_radio"]:checked').val();
    if (appType == 1) {//测试应用
        loginInfo.sdkAppID = loginInfo.appIDAt3rd = sdkAppID;
        loginInfo.accountType = accountType;
    } else if (appType == 0) {//自建应用
        if ($("#sdk_app_id").val().length == 0) {
            alert('请输入sdkAppId');
            return;
        }
        if (!validNumber($("#sdk_app_id").val())) {
            alert('sdkAppId非法,只能输入数字');
            return;
        }
        if ($("#account_type").val().length == 0) {
            alert('请输入accountType');
            return;
        }
        if (!validNumber($("#account_type").val())) {
            alert('accountType非法,只能输入数字');
            return;
        }
        loginInfo.sdkAppID = loginInfo.appIDAt3rd = $('#sdk_app_id').val();
        loginInfo.accountType = $('#account_type').val();
    }
    //将account_type保存到cookie中,有效期是1天
    webim.Tool.setCookie('accountType', loginInfo.accountType, 3600 * 24);
    $('#select_app_dialog').modal('hide');

    //调用tls登录服务
    tlsLogin();
}
//tls登录
function tlsLogin() {
    if (!callBackUrl) {
        alert('callBackUrl非法，请在index.html中将其修改为您的网站首页地址!');
        return;
    }
    //跳转到TLS登录页面
    TLSHelper.goLogin({
        sdkappid: loginInfo.sdkAppID,
        acctype: loginInfo.accountType,
        url: callBackUrl
    });
}
//第三方应用需要实现这个函数，并在这里拿到UserSig
function tlsGetUserSig(res) {
    //成功拿到凭证
    if (res.ErrorCode == TlsErrorCode.OK) {
        //从当前URL中获取参数为identifier的值
        loginInfo.identifier = TLSHelper.getQuery("identifier");
        //拿到正式身份凭证
        loginInfo.userSig = res.UserSig;
        //从当前URL中获取参数为sdkappid的值
        loginInfo.sdkAppID = loginInfo.appIDAt3rd = Number(TLSHelper.getQuery("sdkappid"));
        //从cookie获取accountType
        var accountType = webim.Tool.getCookie('accountType');
        if (accountType) {
            loginInfo.accountType = accountType;
            initDemoApp();
        } else {
            alert('accountType非法');
        }
    } else {
        //签名过期，需要重新登录
        if (res.ErrorCode == TlsErrorCode.SIGNATURE_EXPIRATION) {
            tlsLogin();
        } else {
            alert("[" + res.ErrorCode + "]" + res.ErrorInfo);
        }
    }
}

//弹出登录框
function showLoginDialog() {
    $('#select_app_dialog').modal('hide');
    //显示登录窗体
    $('#login_dialog').modal('show');
    $("#login_account").focus();
}

//点击登录按钮
function c2cLogin() {
    if ($("#login_account").val().length == 0) {
        alert('请输入帐号');
        return;
    }
    loginInfo.identifier = $('#login_account').val();
    loginInfo.userSig = 'fdgfdgre3435fhghgjh';
    $('#login_dialog').modal('hide');
    initDemoApp();
}

//初始化demo
function initDemoApp() {
    $("body").css("background-color", '#2f2f2f');
    document.getElementById("webim_demo").style.display = "block";//展开聊天界面
    document.getElementById("p_my_face").src = loginInfo.headurl;
    document.getElementById("t_my_name").innerHTML = loginInfo.identifier;
    //菜单
    $("#t_my_menu").menu();

    //web sdk 初始化
    webim.init(loginInfo, listeners, null);
    //读取我的好友列表
    getAllFriend(getAllFriendsCallbackOK);
    //读取我的群组列表
    getJoinedGroupListHigh(getGroupsCallbackOK);
    $("#send_msg_text").focus();
    //初始化我的加群申请表格
    initGetApplyJoinGroupPendency([]);
    //初始化我的群组系统消息表格
    initGetMyGroupSystemMsgs([]);
}
//退出
function quitClick() {
    if (loginInfo.identifier) {
        document.getElementById("webim_demo").style.display = "none";
        //离线
        webim.offline(
                function (resp) {
                    loginInfo.identifier = null;
                    loginInfo.userSig = null;
                    window.location.href = callBackUrl;
                }
        );
    } else {
        alert('未登录');
    }
}

//判断str是否只包含数字
function validNumber(str) {
    if (!str) {
        str = str.toString();
        return str.match(/(^\d+$)/g);
    } else {
        return str;
    }
}

//解决IE8之下document不支持getElementsByClassName方法
if (!document.getElementsByClassName) {
    document.getElementsByClassName = function (className, element) {
        var children = (element || document).getElementsByTagName('*');
        var elements = new Array();
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var classNames = child.className.split(' ');
            for (var j = 0; j < classNames.length; j++) {
                if (classNames[j] == className) {
                    elements.push(child);
                    break;
                }
            }
        }
        return elements;
    };
}

/*
 //监听ie刷新页面或关闭页面触发事件
 window.onbeforeunload = function () {
 var n = window.event.screenX - window.screenLeft;
 var b = n > document.documentElement.scrollWidth - 20;
 if (b && window.event.clientY < 0 || window.event.altKey) {
 window.event.returnValue = "";
 } else {
 //alert('关闭或刷新页面');
 //返回登录
 quitClick();
 }
 };
 */