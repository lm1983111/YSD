/**
 * Created by Administrator on 2016/5/9.
 */
;
(function(){
    function mTablegroup(_tablegroup,_tablecontent){
        this.group=_tablegroup
        this.contents=_tablecontent
        this._init();
    };
    var p=mTablegroup.prototype;
    p._init=function(){
        var that=this;
        this.group.each(function(index){
           var __that=that;
            $(this).on("click",function(){
                if($(this).hasClass("active"))
                return false;
                __that.tab(index)
            })
        })
    }
    p.tab=function(index){
        this.group.removeClass("active")
        this.group.eq(index).addClass("active")
        this.contents.hide();
        this.contents.eq(index).show()
    }
    window.mTablegroup=mTablegroup;
}());

;$(document).ready(function(){
    function  sizeinit(){
        //计算高度
        var breadcrumbHeight=$(".breadcrumb").outerHeight()+32;
        var bodyHeight=$("body").height()-60;
        console.log(breadcrumbHeight,bodyHeight)
        $("#friendslist").height(bodyHeight-breadcrumbHeight)
        $(".chat").height(bodyHeight-breadcrumbHeight-2)
        $(".doctor-info").height(bodyHeight-breadcrumbHeight-2)

        var themsgheight=bodyHeight-breadcrumbHeight-2-45;
        //msgedit
        $(".msgflow-content").height(themsgheight*0.6)
        $(".msgeditcontainer").height(themsgheight*0.2);
    }
    sizeinit();
    $(window).resize(function(){
        sizeinit();
    }).triggerHandler("resize");
    var tab=new mTablegroup($(".doctor-table span"),$(".doctor-content > div"));
    tab.tab(0);

    /*$("#Doctorsinquirybtn").on("click",function(){
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

    });*/
});



