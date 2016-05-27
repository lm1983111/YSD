$(function () {
    //隐藏显示newWindowNav(未启用)
    $("#winCtrlBtn").click(function () {
        var newWinCon = $(".new-win-con");
        if (newWinCon.hasClass("view-sidebar-none")) {
            newWinCon.removeClass("view-sidebar-none");
            newWinCon.addClass("view-sidebar-block");
            $(".view-main").css({"left": "180px"});
        } else {
            newWinCon.removeClass("view-sidebar-block");
            newWinCon.addClass("view-sidebar-none");
            $(".view-main").css({"left": "0"});
        }
    });

    //设置页面尺寸
    function setSize(){
        var winWidth = document.documentElement.clientWidth || document.body.clientWidth;
        var winHeight = document.documentElement.clientHeight || document.body.clientHeight;
        $(".new-window-wrap").css({"min-height":winHeight});
    }
    setSize();
    $(window).resize(function(){
        setSize();
        //重绘视频画面显示位置
        relocationView();
        relocationCount++;
    });

});



/*//禁止右键
 document.oncontextmenu=function(){
 return false;
 };
 //禁止F5刷新
 document.onkeydown=function(event){
 var e = event || window.event || arguments.callee.caller.arguments[0];
 if(e && e.keyCode==116){
 return false;
 }
 };*/