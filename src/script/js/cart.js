;
(function () {
    if ($.cookie('picid') && $.cookie('num')) {
        picidarr = decodeURIComponent($.cookie('picid')).split(',');
        numarr = decodeURIComponent($.cookie('num')).split(',');
        picidarr = picidarr.map(Number);
        numarr = numarr.map(Number);
        var str = "";
        $.each(picidarr, function (index,value) {
            $.ajax({
                url: 'http://localhost/zhongguotushuwang/php/detail.php',
                data: 'sid=' + value,
                dataType: 'json',
                async:false
            }).done(
                function(data){
                    console.log(numarr[index])
                    str+= `
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
        $('.shoppingTitle span').attr({class:'J_selectALL selectAll'})
       
    }
})();