;(function($){
    let usernameflag=true;
    let passwordflag=true;
    //输入框获得焦点与失去焦点的效果
    $('input').each(function(index,value){
        $(this).on('focus',function(){
            $(this).closest(".inputItem").attr({class:"inputItem focus"});
         })
     
         $(this).on('blur',function(){
              $(this).closest(".inputItem").attr({class:"inputItem"}) ;
         })
    })
  //点击登录按钮进行验证  
  $('.loginBtn').on('click',function(){   
    if( $('#userName').val()==''){
        usernameflag=false;
        $('#userName').closest(".inputItem").attr({class:"inputItem error"});
        $('#userName').closest(".inputItem").find('.megTip span').html('请输入用户名');
    }else if( $('#userPas').val()==''){
        passwordflag=false;
        $('#userPas').closest(".inputItem").attr({class:"inputItem error"});
        $('#userPas').closest(".inputItem").find('.megTip span').html('请输入密码');
    }
    if($('#userName').val()!='' && $('#userPas').val()!='' ){
        $.ajax({
            url:'http://localhost/zhongguotushuwang/php/login.php',
            data:'username='+ $('#userName').val()+'&password='+$('#userPas').val()
        }).done(
            function(data){
                if (data){
                    alert('您已经成功登录');
                    location.href='http://localhost/zhongguotushuwang/src/in11dex.html';
                }else{
                    $('#userPas').val('');
                    alert('账号或密码错误')
                }
            }
        )
    }
  })
  
})(jQuery);