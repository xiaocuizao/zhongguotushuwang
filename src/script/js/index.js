;//banner数据渲染与效果
(function ($) {
	//懒加载
	$("img").lazyload({
		threshold : 200
		});
	//banner数据的获取
	$.ajax({
			url: 'http://localhost/zhongguotushuwang/php/bannerdata.php',
			dataType: 'json'
		}).done(function (bannerdata) {
			var $bannerstr = '<ul>';
			var $titlestr = '';
			$.each(bannerdata, function (index, value) {
				//banner里面图片的数据结构
				$bannerstr += `
			<li class="on" data-bg=",url(${value.url})">
				<a href="javascript:;" title="${value.title}" target="_blank">
					<img src ="${value.url}" alt="${value.title}" class="bannerImg" />	
				</a>
			</li>
			`
				//banner 里面标题的数据结构
				$titlestr += `
			<a href="javascript:;" target='_blank'>
				<span>${value.title}</span>
			</a>
			`
			});
			$bannerstr += '</ul>';
			$('.bannerList').html($bannerstr);
			$('.bannerdot').html($titlestr);
			$('.bannerdot a:first').attr({
				class: 'on'
			});
		})
		.done( //banner效果
			function () {
				let $num = null;
				let timer = null;
				//鼠标滑过小方块的标题，图片的切换与当店滑过的小块颜色变红的效果。
				$('.bannerdot').on('mouseover', 'a', function () {
					$num = $(this).index();
					$(this).attr({
						class: 'on'
					}).css({
						'color': '#fff'
					}).siblings().removeAttr('class');

					$('.bannerList li').eq($(this).index()).addClass('on').siblings().removeClass('on');
				})

				//鼠标点击左右键，图片切换效果
				$('.rightArrow').on('click', function () {
					rightclick();
				})

				$('.leftArrow').on('click', function () {
					$num--;
					if ($num < 0) {
						$num = $('.bannerList li').length - 1;
					}
					$('.bannerList li').eq($num).addClass('on').siblings().removeClass('on');
					$('.bannerdot a').eq($num).addClass('on').siblings().removeClass('on');
				})

				//自动轮播
				timer = setInterval(() => {
					rightclick();
				}, 3000);
				$('.bannerList').hover(function () {
					clearInterval(timer);
				}, function () {
					timer = setInterval(() => {
						rightclick();
					}, 3000);
				})


				//鼠标右键的函数
				function rightclick() {
					$num++;
					if ($num > $('.bannerList li').length - 1) {
						$num = 0;
					}
					$('.bannerList li').eq($num).addClass('on').siblings().removeClass('on');
					$('.bannerdot a').eq($num).addClass('on').siblings().removeClass('on');
				}
			}
		);
})(jQuery);
//海书团热销全场包邮，低至一折，每天上线-----(效果幻灯片数据)
;(function () {		
			$.ajax({
				url: 'http://localhost/zhongguotushuwang/php/lunbodata.php',
				dataType: 'json'
			})
			.done(function (lunbodata) {
				//渲染结构
				var $lunbostr = '';
				$.each(lunbodata, function (index, value) {
					$lunbostr += `
				<li>
				<div class="bookCover"><a href="http://localhost/zhongguotushuwang/src/details.html?sid=${value.picid}"
						title="${value.title}"
						target="_blank"> <img
							src="${value.url}"
							alt="${value.title}"></a>
				</div>
				<p class="bookName"><a href="http://localhost/zhongguotushuwang/src/details.html?sid=${value.picid}"
						title="${value.title}"
						target="_blank">${value.title}</a>
				</p>
				<div class="priceWrap"><span
						class="salePrice"><b>团购价:</b><i>&yen;</i>${value.price}</span>
						<del class="price">&yen;${value.yuanjia}</del>
						<span class="discount">${value.discount}折</span></div>
			</li>
				`
				});
				$('.tstList ul').html($lunbostr);
			})
			.done(
				//幻灯片效果
				function () {
					//鼠标经过，左右箭头的显示与隐藏	
					$('.tstCon').hover(
						function () {
							$('.tstCon .leftArrow').show();
							$('.tstCon .rightArrow').show();
						},
						function () {
							$('.tstCon .leftArrow').hide();
							$('.tstCon .rightArrow').hide();
						}
					)
					//点击左右箭头，图片切换
					let num = null;
					$('.tstCon .rightArrow').on('click', function () {
						num++;
						if (num > Math.ceil($('.tstCon ul li').length / 4) - 1) {
							num = 0
						}
						$('.tstCon ul').animate({
							left: -$('.tstCon ul li').outerWidth(true) * 4 * num + 'px'
						}, 0);
					})
	
					$('.tstCon .leftArrow').on('click', function () {
						num--;
						if (num < 0) {
							num = Math.ceil($('.tstCon ul li').length / 4) - 1;
						}
						$('.tstCon ul').animate({
							left: -$('.tstCon ul li').outerWidth(true) * 4 * num + 'px'
						}, 0);
					})
				}
			);
		

})();

//下拉菜单--结构渲染与效果
;(function () {
	//小效果
	//搜索栏的下拉提示效果
	let $oInput = $('.searchFrom input');

	$oInput.on('input', function () {
		var $searchVal = $oInput.val();
		$.ajax({
			url: "http://localhost/zhongguotushuwang/php/search.php",
			data: 'value=' + $searchVal,
			dataType: 'json',
		}).done(
			function (data) {
				var tablestr = '<table><tbody>';
				$.each(data, function (index, value) {
					tablestr += `
				<tr class="">
					<td>
						<div>${value.label}</div><span>约<i>${value.amount}</i>种图书</span>
					</td>
			    </tr>
				`;
				})
				tablestr += "</tbody></table>"
				$('.bigautocomplete-layout').html(tablestr);
			}
		).done(function () {
			//下拉菜单效果的实现
			$('.bigautocomplete-layout').on('click', 'td', function () {
				$('.inputWrap input').val($(this).find('div').html());
			})
		})


	})
})(jQuery);


//tab切换效果
;(function ($) {
	//新品特惠 本周精选  新书速递  读者热评 ----tab切换
	$('.hotBook .tabTit').eq(0).tab($('.hotBook .tabCon').children(),'tabConList cur','tabConList','cur');

	//文学图书 社科图书 少儿图书----tab切换
	$('.floorTit  ul').each(function(index){
		$(this).tab($('.floorCon .floorLeft .floorLeftInner').eq(index).children(),'floorTabItem clearfix cur','floorTabItem clearfix');
	})
	
	//图书分类---tab切换

	$('.category .category-list').eq(0).children().each(function(index){
		$(this).on('mouseover',function(){
			$(this).attr({class:'js_toggle hover'}).siblings().attr({class:'js_toggle'});
			$(this).find('.menu-item').attr({style:'top: -2px; display: block;'})
			$(this).siblings().find('.menu-item').attr({style:'top: -2px; display: none;'});
		})
	})
	$('.category .category-list').eq(0).on('mouseout',function(){
		$('.category .category-list').eq(0).children().each(function(){
			$(this).find('.menu-item').attr({style:'top: -2px; display: none;'});
		})
	})
})(jQuery);




