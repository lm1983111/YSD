$(function(){
    //进页面给页面添加高宽
    function setBodyWithHeight(){
        var wHeight = $(window).height();
        $(".view-wrap").css({"min-height":wHeight});
    }
    setBodyWithHeight();
    $(window).resize(function(){
        setBodyWithHeight()
    });
});
