"use strict";!function(i){i.ajax({url:"http://localhost/zhongguotushuwang/php/bannerdata.php",dataType:"json"}).done(function(t){var o="<ul>",a="";i.each(t,function(t,n){o+='\n\t\t\t<li class="on" data-bg=",url('+n.url+')">\n\t\t\t\t<a href="javascript:;" title="'+n.title+'" target="_blank">\n\t\t\t\t\t<img src ="'+n.url+'" alt="'+n.title+'" class="bannerImg" />\t\n\t\t\t\t</a>\n\t\t\t</li>\n\t\t\t',a+="\n\t\t\t<a href=\"javascript:;\" target='_blank'>\n\t\t\t\t<span>"+n.title+"</span>\n\t\t\t</a>\n\t\t\t"}),o+="</ul>",i(".bannerList").html(o),i(".bannerdot").html(a),i(".bannerdot a:first").attr({class:"on"})}).done(function(){var t=null,n=null;function o(){++t>i(".bannerList li").length-1&&(t=0),i(".bannerList li").eq(t).addClass("on").siblings().removeClass("on"),i(".bannerdot a").eq(t).addClass("on").siblings().removeClass("on")}i(".bannerdot").on("mouseover","a",function(){t=i(this).index(),i(this).attr({class:"on"}).css({color:"#fff"}).siblings().removeAttr("class"),i(".bannerList li").eq(i(this).index()).addClass("on").siblings().removeClass("on")}),i(".rightArrow").on("click",function(){o()}),i(".leftArrow").on("click",function(){--t<0&&(t=i(".bannerList li").length-1),i(".bannerList li").eq(t).addClass("on").siblings().removeClass("on"),i(".bannerdot a").eq(t).addClass("on").siblings().removeClass("on")}),n=setInterval(function(){o()},3e3),i(".bannerList").hover(function(){clearInterval(n)},function(){n=setInterval(function(){o()},3e3)})})}(jQuery),$(window).on("scroll",function(){console.log($(".tstWrap .tstCon").position().top),$(window).scrollTop()+$(window).outerHeight(!0)>=$(".tstWrap .tstCon").position().top&&(console.log(1),$.ajax({url:"http://localhost/zhongguotushuwang/php/lunbodata.php",dataType:"json"}).done(function(t){var o="";$.each(t,function(t,n){o+='\n\t\t\t\t<li>\n\t\t\t\t<div class="bookCover"><a href="http://localhost/zhongguotushuwang/src/details.html?sid='+n.picid+'"\n\t\t\t\t\t\ttitle="'+n.title+'"\n\t\t\t\t\t\ttarget="_blank"> <img\n\t\t\t\t\t\t\tsrc="'+n.url+'"\n\t\t\t\t\t\t\talt="'+n.title+'"></a>\n\t\t\t\t</div>\n\t\t\t\t<p class="bookName"><a href="http://localhost/zhongguotushuwang/src/details.html?sid='+n.picid+'"\n\t\t\t\t\t\ttitle="'+n.title+'"\n\t\t\t\t\t\ttarget="_blank">'+n.title+'</a>\n\t\t\t\t</p>\n\t\t\t\t<div class="priceWrap"><span\n\t\t\t\t\t\tclass="salePrice"><b>团购价:</b><i>&yen;</i>'+n.price+'</span>\n\t\t\t\t\t\t<del class="price">&yen;'+n.yuanjia+'</del>\n\t\t\t\t\t\t<span class="discount">'+n.discount+"折</span></div>\n\t\t\t</li>\n\t\t\t\t"}),$(".tstList ul").html(o)}).done(function(){$(".tstCon").hover(function(){$(".tstCon .leftArrow").show(),$(".tstCon .rightArrow").show()},function(){$(".tstCon .leftArrow").hide(),$(".tstCon .rightArrow").hide()});var t=null;$(".tstCon .rightArrow").on("click",function(){++t>Math.ceil($(".tstCon ul li").length/4)-1&&(t=0),$(".tstCon ul").animate({left:4*-$(".tstCon ul li").outerWidth(!0)*t+"px"},0)}),$(".tstCon .leftArrow").on("click",function(){--t<0&&(t=Math.ceil($(".tstCon ul li").length/4)-1),$(".tstCon ul").animate({left:4*-$(".tstCon ul li").outerWidth(!0)*t+"px"},0)})}))}),function(){var n=$(".searchFrom input");n.on("input",function(){var t=n.val();$.ajax({url:"http://localhost/zhongguotushuwang/php/search.php",data:"value="+t,dataType:"json"}).done(function(t){var o="<table><tbody>";$.each(t,function(t,n){o+='\n\t\t\t\t<tr class="">\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<div>'+n.label+"</div><span>约<i>"+n.amount+"</i>种图书</span>\n\t\t\t\t\t</td>\n\t\t\t    </tr>\n\t\t\t\t"}),o+="</tbody></table>",$(".bigautocomplete-layout").html(o)}).done(function(){$(".bigautocomplete-layout").on("click","td",function(){$(".inputWrap input").val($(this).find("div").html())})})})}(jQuery),function(n){n(".hotBook .tabTit").eq(0).tab(n(".hotBook .tabCon").children(),"tabConList cur","tabConList","cur"),n(".floorTit  ul").each(function(t){n(this).tab(n(".floorCon .floorLeft .floorLeftInner").eq(t).children(),"floorTabItem clearfix cur","floorTabItem clearfix")}),console.log(n(".category .category-list").eq(0)),n(".category .category-list").eq(0).children().each(function(t){n(this).on("mouseover",function(){n(this).attr({class:"js_toggle hover"}).siblings().attr({class:"js_toggle"}),n(this).find(".menu-item").attr({style:"top: -2px; display: block;"}),n(this).siblings().find(".menu-item").attr({style:"top: -2px; display: none;"})})}),n(".category .category-list").eq(0).on("mouseout",function(){n(".category .category-list").eq(0).children().each(function(){n(this).find(".menu-item").attr({style:"top: -2px; display: none;"})})})}(jQuery);