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
    ellipsisText(".ellipsis-vrl",32);

    //插件tab
    (function() {
        $('#tabNav > li > a').attr('class', '');
        $('#tabNav > li:first > a').attr('class', 'current');
        $('#tabContent > div').hide();
        $('#tabContent > div:first').fadeIn();

        $('#tabNav > li > a').on('click', function(e) {
            e.preventDefault();
            if ($(this).attr('class') == 'current') {
                return
            } else {
                $('#tabNav > li > a').attr('class', '');
                $('#tabContent > div').hide();
                $(this).attr('class', 'current');
                $($(this).attr('name')).fadeIn()
            }
        })
    })();
    //插件tab结束

    /*左侧列表下拉菜单*/
    $("#Doctorsinquirybtn,#Doctorsinquirybtn2").on("click",function(){
        var datastatus=$(this).attr("data-status");
        if(datastatus==0){
            $(this).addClass("select");
            $(this).next().show();
            $(this).attr("data-status",1);
        }else{
            $(this).removeClass("select");
            $(this).next().hide();
            $(this).attr("data-status",0);
        }

    });
    /*左侧列表下拉菜单end*/
});

//插件显示大图
function showSourceImg(event){
    var thisImgEle = $(event.target);
    var sourceUrl = $(thisImgEle).attr('src');
    //获取页面尺寸
    var wWidthShowImg = $(window).width();
    var wHeightShowImg = $(window).height();
    //创建一个新的img对象，并获取图像宽高
    var sourceImgObj = new Image();
    sourceImgObj.src = sourceUrl;
    var imgWidthNatural = sourceImgObj.width;
    var imgHeightNatural = sourceImgObj.height;
    console.log(imgWidthNatural);
    console.log(imgHeightNatural);
    //点击缩略图弹出大图，同时在body底部加入mask
    $('body').append('<div class="source-img-wrap">' +
        '<span class="close-source-img" onclick="closeSourceImg()">×</span>' +
        '<img src="' + sourceUrl +
        '">' +
        '</div>' +
        '<div class="mask" onclick="closeSourceImg()"></div>');
    if(imgWidthNatural > 800 || imgHeightNatural > 500){
        $('.source-img-wrap').css({"width":"800px","height":"500px","margin-left":"-400px","margin-top":"-250px"});
    }else{
        $('.source-img-wrap').css({"width":imgWidthNatural,"height":imgHeightNatural,"margin-left":-(imgWidthNatural/2),"margin-top":-(imgHeightNatural/2)});
    }
}
function closeSourceImg(){
    $('.source-img-wrap').remove();
    $('.mask').remove();
}
//插件显示大图结束

