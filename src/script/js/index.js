;
! function ($) {
	//banner数据
	$.ajax({
		url: 'http://localhost/zhongguotushuwang/php/bannerdata.php',
		dataType: 'json'
	}).done(function (bannerdata) {
		var $bannerstr = '<ul>';
		var $titlestr = '';
		$.each(bannerdata, function (index, value) {
			//banner图片的数据结构
			$bannerstr += `
			<li class="on" data-bg=",url()">
				<a href="javascript:;" title="${value.title}" target="_blank">
					<img src="${value.url}" alt="${value.title}" class="bannerImg" />	
				</a>
			</li>
			`
			//banner 标题的数据结构
			$titlestr += `
			<a href="javascript:;" target='_blank' class="on">
				<span>小学生会场--满100减50</span>
			</a>
			`
		});
		$bannerstr += '</ul>';
		$('.bannerList').html($bannerstr);
	});

	//lunbo数据
	$.ajax({
		url: 'php/banner.php',
		dataType: 'json'
	}).done(function (bannerdata) {
		$.each(bannerdata, function (index, value) {
			var $bannerstr = '<ul>';

		});
	});
	//tab切换数据
	$.ajax({
		url: 'php/banner.php',
		dataType: 'json'
	}).done(function (bannerdata) {
		$.each(bannerdata, function (index, value) {
			var $bannerstr = '<ul>';

		});
	});
}(jQuery);

! function () {
	//banner效果

}(jQuery);

! function () {
	//lunbo效果

}(jQuery);

! function () {
	//小效果

}(jQuery);