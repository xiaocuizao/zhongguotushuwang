;(function($){
    $.fn.extend({
        tab:function(parent,class1,class2,class3){
            $(this).children().each(function(index,value){
                $(this).on('mouseover',function(index){
                    var num=$(this).index();
                    $(this).attr({class:class3}).siblings().attr({class:''});
                     parent.eq(num).attr({class:class1}).siblings().attr({class:class2});
                })
            })
            
        }
    })
})(jQuery);