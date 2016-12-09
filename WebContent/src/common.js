var ResponsiveImagesType = 0;
function ResponsiveImagesNew(winW){
	$(".responsive-image-new").each(function(){
		var winW = window.innerWidth;
		
		if(winW > 767 && $(this).attr("data-media-type") != "pc"){
			var url = $(this).attr("data-media-pc");
			$(this).attr("data-media-type","pc");
			chgImg($(this),url,"pc");
			tipsMove("pc");
		}
		if(winW <= 767 && $(this).attr("data-media-type") != "mobile"){
			var url = $(this).attr("data-media-mobile");
			$(this).attr("data-media-type","mobile");
			chgImg($(this),url,"mobile");
			tipsMove("mobile");
		}
	})
	function chgImg($target, url, type){
		$target.attr("src",url);
		$target.attr("data-media-type",type);
		$(".video").removeClass("on");
		var wrapperWidth = $(".featureWrap").width();
		$('.beforImg').width(wrapperWidth);

	}
	function tipsMove(type){
		var phrases, phrases2;
		var  $target = $('.featureSection');
		$target.each(function(idx, obj){
			if(type == "mobile"){
				phrases = $(obj).find('.prdTxt .tips.tipBtm').clone();
				phrases2 = $(obj).find('.prdInfo .tips.tipBtm').clone();
				phrases3 = $(obj).find('.titBox .tips.tipBtm').clone();

				$(obj).find('.prdTxt .tips.tipBtm').remove();
				$(obj).find('.prdInfo .tips.tipBtm').remove();
				$(obj).find('.titBox .tips.tipBtm').remove();
				$(this).find('.colWrap').append(phrases);
				$(this).find('.colWrap').append(phrases2);
				$(this).find('.featureBox').append(phrases3);
			}
			else{
				phrases = $(obj).find('.colWrap > .tips.tipBtm').clone();
				phrases2 = $(obj).find('.colWrap > .tips.tipBtm').clone();
				phrases3 = $(obj).find('.featureBox > .tips.tipBtm').clone();

				$(obj).find('.colWrap > .tips.tipBtm').remove();
				$(obj).find('.featureBox > .tips.tipBtm').remove();
				$(this).find('.colWrap .prdTxt').append(phrases);
				$(this).find('.colWrap .prdInfo').append(phrases2);
				$(this).find('.featureBox .titBox').append(phrases3);
			}
		});
	}
}
function _isMobile(){
	// if we want a more complete list use this: http://detectmobilebrowsers.com/
	// str.test() is more efficent than str.match()
	// remember str.test is case sensitive
	var isMobile = (/iphone|ipod|android|blackberry|fennec/).test(navigator.userAgent.toLowerCase());
	return isMobile;
}
function videoPlay($target,type){
	$target.find("video").each(function(){
		if(type == "play"){
			if(!_isMobile()) {
				$(this).parent().addClass("on");
				this.play();
				var _this = $(this)
				setTimeout(function(){_this.css("visibility","visible");},400)
			}
		}else if(type == "load"){
			$(this).parent().removeClass("on");
			this.load();
		}else{
			$(this).parent().removeClass("on");
			this.pause();
		}
	})
}
$(function(){
	//20161013 영상 수정 : s
	$("video").bind("ended", function() {
		if($(this).parent().hasClass("loadType")){
			videoPlay($(this).parent(),"load");
		}else{
			videoPlay($(this).parent(),"pause");		
		}		
	});
	$('.video.play:not(".videoMobile")').click(function(){
		$(this).find("video").each(function(){
			if(this.paused){
				$(this).parent().addClass("on");
				this.play();
				var _this = $(this)
				setTimeout(function(){_this.css("visibility","visible");},400)
			}else{
				$(this).parent().removeClass("on");
				this.pause();
			}
		})
	});
	if(_isMobile()){
		$('.videoMobile').click(function(){
			$(this).find("video").each(function(){
				if(this.paused){
					$(this).parent().addClass("on");
					this.play();
					var _this = $(this)
					setTimeout(function(){_this.css("visibility","visible");},400)
				}else{
					$(this).parent().removeClass("on");
					this.pause();
				}
			})
		});
		$(".videoMobile").each(function(){
			$(this).addClass("play");
		})
	}
	$("video").each(function(){
		var poster = $(this).attr("poster");
		$(this).parent().css("background-image","url("+poster+")");
	})
	//20161013 영상 수정 : e

	ResponsiveImagesNew();
	$(window).resize(function(){
		ResponsiveImagesNew();
	})



	var videos = document.querySelectorAll('video');
	var behavior = document.querySelector('#behavior');

	if (location.search === '?enabled=false') {
		behavior.innerHTML = '(module disabled everywhere via <code>?enabled=false</code>';
	} else if (location.search === '?enabled=true') {
		enableVideos(true);
		behavior.innerHTML = '(module enabled everywhere (whether it’s necessary or not) via <code>?enabled=true</code>)';
	} else {
		enableVideos();
	}

	function enableButtons(video) {
		var playBtn = video.parentNode.querySelector('.play');
		var fullscreenButton = video.parentNode.querySelector('.fullscreen');

		if (playBtn) {
			playBtn.addEventListener('click', function () {
				if (video.paused) {
					video.play();
				} else {
					video.pause();
				}
			});
		}

		if (fullscreenButton) {
			fullscreenButton.addEventListener('click', function () {
				video.webkitEnterFullScreen();
			});
		}
	}

// debug events
	function debugEvents(video) {
		[
			'loadstart',
			'progress',
			'suspend',
			'abort',
			'error',
			'emptied',
			'stalled',
			'loadedmetadata',
			'loadeddata',
			'canplay',
			'canplaythrough',
			'playing', // fake event
			'waiting',
			'seeking',
			'seeked',
			'ended',
			// 'durationchange',
			'timeupdate',
			'play', // fake event
			'pause', // fake event
			// 'ratechange',
			// 'resize',
			// 'volumechange',
			'webkitbeginfullscreen',
			'webkitendfullscreen',
		].forEach(function (event) {
				video.addEventListener(event, function () {
					//console.info('@', event);
				});
			});
	}

	function enableVideos(everywhere) {
		for (var i = 0; i < videos.length; i++) {
			window.makeVideoPlayableInline(videos[i], !videos[i].hasAttribute('muted'), !everywhere);
			enableButtons(videos[i]);
			debugEvents(videos[i]);
		}
	}
})


function over_img(img,n){

	var hover = "_"+n;
	if (img.hasClass("on") == false && img.find("img").length > 0){
		menuimg = img.find("img");

		if (menuimg.attr("src").indexOf(".jpg") > 0){
			menuimg_type = ".jpg";
		}else if (menuimg.attr("src").indexOf(".gif") > 0){
			menuimg_type = ".gif";
		}else if (menuimg.attr("src").indexOf(".png") > 0){
			menuimg_type = ".png";
		}


		menuimg_src = menuimg.attr("src").split("_off")[0];
		menuimg_src = menuimg_src.split("_on")[0];
		menuimg_src = menuimg_src.split("_select")[0];
		menuimg.attr("src",menuimg_src+hover+menuimg_type);
	}
}