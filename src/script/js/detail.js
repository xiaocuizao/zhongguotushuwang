;(function(){
    var sid=parseInt( location.search.substring(1).split('=')[1]);
    $.ajax({
        url:'http://localhost/zhongguotushuwang/php/detail.php',
        data:'sid='+sid,
        dataType:'json'
    })
    .done(
        function(data){
           $('.bookCover .coverImg img').attr({src:data.url,art:data.bookname});
           $('.bookInfo h1').html(data.bookname);
           $('.bookInfo .recomand').html(data.title);
           $('.bookInfo .sellPrice').html(data.price);
           $('.bookInfo .discount').html(data.discount);
           $('.bookInfo .price').html(data.yuanjia);
           $('.bookInfo .oparateButton .buyButton').attr({onclick:`window.open('http://localhost/zhongguotushuwang/src/middle.html?sid=${sid}','_blank')`})

        }
    )


})();