;
(function ($) {
    let usernameflag = true;
    let passwordflag = true;
    //得到焦点效果
    $('input').each(function (index, value) {
        $(this).on('focus', function () {
            $(this).parent('.inputWrap').css({
                display: "none"
            }).html('');
            $(this).parent().parent().css({
                border: "2px solid #ccc"
            })
        })
        $(this).on('blur', function () {
            $(this).parent().parent().css({
                border: "1px solid #dcdcdc"
            })
        })

    })

    //用户名---得到焦点
    $('#username').on('focus', function () {
        $('.megTip-username span').html('请输入你的用户名')
        $('.megTip-username').css({
            display: 'block'
        })
    })
    //1.用户名失去焦点，验证用户名是否存在/用户名不能为空
    $('#username').on('blur', function () {
        if ($('#username').val() != "") {
            let $username = $('#username').val();
            $.ajax({
                url: 'http://localhost/zhongguotushuwang/php/register.php',
                type: "POST",
                data: 'username=' + $username
            }).done(function (data) {
                if (!data) {
                    $('div.username').css({
                        display: "block"
                    });
                    usernameflag = true;
                    $('.megTip-username').css({
                        display: 'none'
                    })
                } else {
                    $('div.username').css({
                        display: "block",
                        color: 'red',
                        background: '#fff'
                    }).html('用户名已存在');
                    usernameflag = false;
                }
            });
        } else {
            $('.megTip-username span').html('请输入你的用户名').css({
                color: 'red'
            });
            $('.megTip-username').css({
                display: 'block'
            })
            usernameflag = false;
        }
    })


    //表单验证---密码验证
    $('#password').on('focus', function () {
        $('.megTip-password span').html('请输入你的密码')
        $('.megTip-password').css({
            display: 'block'
        })
    })

    $('#password').on('blur', function () {
        if ($('#password').val()!=''){
            if ($(this).val().length >= 6 && $(this).val().length <= 16) {//长度符合范围
                var num = 0;
                var regnum = /\d+/; 
                var reglowercase = /[a-z]+/;  
                var reguppercase = /[A-Z]+/;
                var othercase = /[\W\_]+/;

                if (regnum.test($(this).val())) {
                    num++;
                }
    
                if (reglowercase.test($(this).val())) {
                    num++;
                }
    
                if (reguppercase.test($(this).val())) {
                    num++;
                }
    
                if (othercase.test($(this).val())) {
                    num++;
                }
                switch (num) {
                    case 1:
                        $('.megTip-password span').html('密码过于单一，建议两种以上字符组合') ;
                        passwordflag=false;
                        break;
                    case 2:
                    case 3:
                    case 4:
                        $('.megTip-password').css({display:'none'}); 
                        passwordflag=true;
                }
            } else {
                $('.megTip-password span').html('长度只能在6-16位').css({color:'red'}) ;
                passwordflag=false;
            }
             if(passwordflag){
                $('.sucessWrap-password ').css({
                    display: "block"
                });
                $('.megTip-password').css({
                    display: 'none'
                })
            }
           
        }else{
            $('.megTip-password span').html('请输入你的密码').css({
                color: 'red'
            });
            $('.megTip-password').css({
                display: 'block'
            })
        }   
    })

    //跳转验证
    $('#registBtn').on('click',function(){
        let $username = $('#username').val();
        let $password = $('#password').val();
        if(usernameflag && passwordflag){
            $.ajax({
                url:'http://localhost/zhongguotushuwang/php/deposit.php',
                data:"username="+$username+"&password="+$password
            })
            alert('注册成功！！');
            $('#registBtn a').attr({href:'http://localhost/zhongguotushuwang/src/login.html'})
        }
    })
    
})(jQuery);