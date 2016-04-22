$(function(){
    //进页面给页面添加高宽
    function setBodyWithHeight(){
        var wHeight = $(window).height();
        $(".view-wrap").css({"min-height":wHeight});
        $(".tab-content").css({"min-height":wHeight-176});
        $(".ui2-tab-content").css({"min-height":wHeight-124});
    }
    setBodyWithHeight();
    $(window).resize(function(){
        setBodyWithHeight()
    });

    //文本截断函数
    function ellipsisText(e,x){
        $(e).each(function(){
            var maxTextLen = x;
            var realLen = $(this).text();
            if(realLen.length > maxTextLen){
                var cutText = realLen.substring(0,maxTextLen);
                $(this).html(cutText + "...")
            }
        });
    }
    ellipsisText(".ellipsis-ptl",48);
    ellipsisText(".ellipsis-vrl",32)
});
