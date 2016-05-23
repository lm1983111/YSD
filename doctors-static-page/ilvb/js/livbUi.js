$(function () {
    //隐藏显示newWindowNav
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
});