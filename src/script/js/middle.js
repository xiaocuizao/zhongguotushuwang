;
(function () {
    var sid = parseInt(location.search.substring(1).split('=')[1]);
    $.ajax({
            url: 'http://localhost/zhongguotushuwang/php/detail.php',
            data: 'sid=' + sid,
            dataType: 'json'
        })
        .done(
            function (data) {
                $('.ATC_book .book_cover a').attr({title:data.bookname});
                $('.ATC_book .book_cover img').attr({src:data.url});
                $('.ATC_book .book_detail a').html(data.bookname);
                $('.ATC_book .book_detail span').html(data.price);
                $('.ATC_book .book_detail del').html(data.yuanjia);
               
               
            }
        ).done(
            //点击加入购物车，做判断，向cookie添加数据----然后跳转都结算页面
            function (data) {
                var result = Number(data.picid);

                $('.ATC_btn .go_cart').on('click', function () {
                    var picidarr = [];
                    var numarr = [];
                    var picidstr='';
                    var unmstr='';

                    if ($.cookie('picid') && $.cookie('num')) {
                        picidarr =decodeURI($.cookie('picid')).split(',') ;
                        numarr = decodeURI($.cookie('num')).split(',');
                        picidarr = picidarr.map(Number);
                        numarr = numarr.map(Number);

                        if (picidarr.indexOf(result) != -1) {
                            var num = null;
                            num = numarr[picidarr.indexOf(result)]++;
                            numarr[picidarr.indexOf(result)] = num;
                            picidstr = picidarr.join(',');
                            numstr = numarr.join(',');

                            $.cookie('picid', picidstr, {
                                expires: 7
                            });
                            $.cookie('num', numstr, {
                                expires: 7
                            });

                        } else {
                            picidarr.push(result);
                            numarr.push(1);
                           
                            picidstr = encodeURI(picidarr.join(',')) ;
                            numstr = encodeURI(numarr.join(',')) ;

                            $.cookie('picid', picidstr, {
                                expires: 7
                            });
                            $.cookie('num', numstr, {
                                expires: 7
                            });
                        }
                    } else {
                        $.cookie('picid', result, {
                            expires: 7
                        });
                        $.cookie('num', 1, {
                            expires: 7
                        });
                    }
                    $('.AATC_btn .go_shop').attr({href:"http://localhost/zhongguotushuwang/src/details.html?sid="+data.picid});
                    $('.ATC_btn  .go_cart').attr({href:"http://localhost/zhongguotushuwang/src/cart.html"})
                })
            }
        )


})();