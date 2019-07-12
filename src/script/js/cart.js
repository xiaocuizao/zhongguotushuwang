;
(function () {
    /***********************判断cookie的存在对数据进行渲染************************************/
    if ($.cookie('picid') && $.cookie('num')) {
        picidarr = $.cookie('picid').split(',');
        numarr = $.cookie('num').split(',');
        picidarr = picidarr.map(Number);
        numarr = numarr.map(Number);
        var str = "";
        $.each(picidarr, function (index, value) {
            $.ajax({
                url: 'http://localhost/zhongguotushuwang/php/detail.php',
                data: 'sid=' + value,
                dataType: 'json',
                async: false
            }).done(
                function (data) {
                    // console.log(index);
                    console.log(numarr[index]);
                    str += `
                            <div class="shoppingList clearfix select" style="z-index: 1;">
                            <div class="cartCheckbox fl">
                                <span sid="86613679" class="J_check selected">选中</span>
                            </div>
                            <div class="goodImg fl">
                                <a href="/7899906.htm" target="_blank">
                                    <img src="${data.url}"
                                        title="">
                                </a>
                            </div>
                            <div class="goodName fl">
                                <a href="/7899906.htm" target="_blank">${data.bookname}<br>
                                </a>
                            </div>
                            <div class="goodPrice fl">
                                <strong>${data.yuanjia}</strong>
                            </div>
                            <div class="goodSellPrice fl">
                                <strong>${data.price}</strong>
                            </div>
                            <div class="goodQuantity fl">
                                <div class="quantityForm">
                                    <a href="javascript:void(0);" class="decrement" sid="86613679" bid="7899906">-
                                    </a>
                                    <input autocomplete="off" type="text" sid="86613679" class="num J_input"
                                        id="input86613679" bid="7899906" max="3" shopcount="1" value="${numarr[index]}">
                                    <a href="javascript:void(0);" class="increment" sid="86613679" bid="7899906">
                                    +
                                    </a>
                                </div>
                                <div class="limitText" id="limitText86613679"></div>
                            </div>
                            <div class="goodSum fl">
                                <strong class="subtotal">${numarr[index]*data.price}</strong>
                            </div>
                            <div class="goodOperation fl">
                                <a class="goodRemove J_delate" href="javascript:void(0);" sid="86613679">
                                    删除
                                </a>
                                <a href="javascript:void(0);" class="goodCollection J_collect" sid="86613679"
                                    bid="7899906">
                                    移入收藏
                                </a></div>
                        </div>
                    `
                    
                }
                
            )
        });
        $('.shoppingListWrap .shoppingItem ').html(str);
        
        //根据cookie里面的值，对页面的数据进行改变
        //1 购物车中添加几种商品的计算
        $('.contentInner:last  .tabShoppCar li:first span').html(picidarr.length);
        $('.shoppingTitle span').attr({
            class: 'J_selectALL selectAll'
        })
        
    }

    //
    var onesum=null;//每种商品的总价
    //点击加减符号，对商品数量的加减及价格的计算，当num为0时确认是否删除商品，确认后，移除该商品对应的结构
   
       $('.increment').each(function(){
           $(this).on('click',function(){
            var addnum= Number($(this).siblings('.J_input').val()) ;//点击加号，数量加1；
                addnum++;
             $(this).siblings('.J_input').val(addnum) ;   //一种商品添加的数量   
              onesum= Number($(this).parents('.goodQuantity ').siblings('.goodSellPrice ').find('strong').html())* addnum;//多个同种商品的总价钱
            $(this).parents('.goodQuantity ').siblings('.goodSum  ').find('strong').html(onesum);//（多个）一种商品的总价钱插入解雇中

             count() ;
           })
       })
    // 单个商品框点击的情况
    $('.J_check').each(function () {
        $(this).on('click', function () {
            if ($(this).parent('.cartCheckbox ').find('.selected').length == 1) {
                $(this).attr({
                    class: 'J_check'
                });
                $('.J_selectALL').each(function () {
                    $(this).attr({
                        class: 'J_selectALL'
                    })
                });
                //部分选中的情况
                $('.submitBtn ').attr({class:'submitBtn fl cur'})
                count();
            } else {
                $(this).attr({
                    class: 'J_check selected'
                });
                if ($('.selected').length == $('.J_check').length) {
                    //此时是所有的商品都选上的状态
                    $('.J_selectALL').each(function () {
                        $(this).attr({
                            class: 'J_selectALL selectAll'
                        })
                    });
                    $('.submitBtn ').attr({class:'submitBtn fl cur'})
                    count() ;
                } else {
                    //此时是部分商品选中的状态
                    $('.J_selectALL').each(function () {
                        $(this).attr({
                            class: 'J_selectALL'
                        })
                    });
                    $('.submitBtn ').attr({class:'submitBtn fl cur'})
                    count() ;
                }
            }
        })
    })


    // 全选 点击的情况
    $('.J_selectALL').each(function () {

        $(this).on('click', function () {
            var checkflag = true;
            $('.J_check').each(function () {
                if ($(this).attr('class') == 'J_check') {
                    $('.J_check').each(function () {
                        $(this).attr({
                            class: 'J_check selected '
                        });
                    })
                    $('.J_selectALL').each(function () {
                        $(this).attr({
                            class: 'J_selectALL selectAll'
                        })
                    })
                    checkflag = false;
                    //此时是全选的状态，计算所有的商品的数量
                    $('.submitBtn ').attr({class:'submitBtn fl cur'})
                    count() ;
                    return false;
                }

            })

            if (checkflag) {
                //此时是所有的商品全都没有选择的情况
                $('.J_selectALL').each(function () {
                    $(this).attr({
                        class: 'J_selectALL'
                    })
                })
                $('.J_check').each(function () {
                    $(this).attr({
                        class: 'J_check'
                    });
                })
                $('.submitBtn ').attr({class:'submitBtn fl'})
                count() ;
            }

        })
    })
  
    //确定商品是全部选中还是部分选中，还是选没有选择 计算总数与总价
    function count() {
        var sumprice = null;
        var sumnum = null;
        if ($('.selected').length!=0) {
            $('.selected').each(function () {
                //onesum为每种商品的总价
                 onesum = Number($(this).parent('.cartCheckbox ').siblings('.goodSum ').find('.subtotal').html());
                sumnum+=onesum;
            })
 
            $('.result #J_SumZongJia').html(sumnum);
        }
        if($('.selected').length===0){
            $('.result #J_SumZongJia').html('0');  
        }
    }
    $('.submitBtn ').attr({class:'submitBtn fl cur'})
    count();
})();