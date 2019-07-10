;(function(){
    var sid=parseInt( location.search.substring(1).split('=')[1]);
    $.ajax({
        url:'http://localhost/zhongguotushuwang/php/detail.php',
        data:'sid='+sid,
        dataType:'json'
    })
    .done(
        function(data){
            let str='';
            str+=`
            <div class="ATC_book  fl">
            <div class="clearfix">
                <div class="book_cover fl">
                    <a href="javascript:;" target="_blank" title="${data.bookname}">
                        <img src="${data.url}" alt="">
                    </a>
                </div>
                <div class="book_detail fl">
                    <div class="book_name">
                        <a href="/7899906.html" target="_blank">${data.bookname}</a>
                    </div>
                    <div class="price">
                        <span class="price_sell">${data.price}</span>
                        <del class="price_ding">${data.yuanjia}</del>
                    </div>
                </div>
            </div>
            </div>
            <div class="ATC_btn fr clearfix">

                <a href="http://localhost/zhongguotushuwang/src/details.html?sid=${data.picid}" class="go_shop">查看商品详情</a>

                <a href="/shopcar/shoppingcart.aspx" class="go_cart">去购物车结算</a>
            </div>
            
            `
            $('.ATC_con').html(str);
            console.log(data);
        }
    )


})();