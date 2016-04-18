/**
 * Created by Administrator on 2016/4/14.
 */
//点击缩略图显示大图函数
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
//关闭大图与mask函数
function closeSourceImg(){
    $('.source-img-wrap').remove();
    $('.mask').remove();
}