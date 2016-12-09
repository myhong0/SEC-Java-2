/* --- GNB --- */
$("#search-form-input").blur(function(){
	var $width = $(window).width();
	if( $width > 1160 ){
		if( $(this).val() == "" ){
			$(".searchbox").removeClass("searchopen");
			$(".searchbutton").removeClass("on");
		}
	}else if( $width > 600 && $width < 1024 ){
		if( $(this).val() == "" ){
			$(".searchbox").removeClass("searchopen");
			$(".searchbutton").removeClass("on");
		}
	}
});
$("#search-form-input").keydown(function(event){
	if( event.keyCode == 9 ){
		$(".searchbutton").focus();
	}
});

//$(".global_header .nav nav").append("<button class='navclosebutton'><span class='icon-nav-close'>close</span></button>"); //2015-05-27 삭제 html에 직접삽입
$(".navclosebutton").click(function(){
	$("body").removeClass("navopen");
	$(".navbutton").removeClass("on");
	$("#overlay").height(0);
	$("#content .theme1 .item1 a").focus();//2015-05-27 추가
});
$(".nav .utillink .navLink").focus(function(){//2015-05-27 수정 (유틸 첫번째링크)
	$("body").addClass("navopen");
	$(".navbutton").addClass("on");
	utilityHeight();
});
var navfocus = true;
$(".nav .utillink .aboutus").blur(function(){//2015-05-27 수정 (유틸 마지막링크)
	$("body").removeClass("navopen");
	$(".navbutton").removeClass("on");
	navfocus = false;
});
$(".cartbutton").click(function(){
	if( $("body").hasClass("navopen") ){
		$("body").removeClass("navopen");
		$(".navbutton").removeClass("on");
	}
});

//2015-05-27 추가
var mobile = true;
function focusNav(){ //2015-05-27 추가 GNB모바일버전에서 focus시 메뉴보이도록 수정
	var $width = $(window).width();
	if( $width < 1024 ){ //1024이하

		if( mobile ){
			$(".nav .container").eq(0).clone().appendTo(".nav .mobile_container"); //2015-05-27추가 접근성관련 모바일focus순서
			mobile = false;
		}
		$(".navclosebutton").focus(function(){
			$("body").addClass("navopen");
			$(".navbutton").addClass("on");
		});
	}
}
focusNav();
$(window).resize(function(){
	focusNav();
});
//2015-05-27 추가 끝

/* --- FOOTER --- */
$(".notice_sec").prependTo(".footer");
$(".footer .middle.section").prependTo(".footer");
$(".footer-navi").hide();
$(".fnavibutton").toggle(function(){
		$(".footer-navi").show();
		$(this).addClass("on").html("&#48736&#47480 &#47700&#45684 &#45803&#44592");
	}, function(){
		$(".footer-navi").hide();
		$(this).removeClass("on").html("&#48736&#47480 &#47700&#45684 &#48372&#44592");
	}
);
$(".footer .middle.section .acclink img").each(function(){
	var src = $(this).attr("src").replace("/common/","/next/");
	$(this).attr("src", src );
});
/* --- GNB : UTILITY --- */
function utilityHeight(){
	var $width = $(window).width();
	var $globalHeader = $('.global_header'),
    $scrollWrapper = $('.scrollwrapper');
	$(".nav .utillink").css('height', ( $scrollWrapper.height() ) + 'px');
}
$(window).resize(function(){
	if( $("body").hasClass("navopen") ){
		utilityHeight();
	}
});
$(".navbutton").click(function(){
	utilityHeight();
});
$(".overlay.background").click(function(){
	if( $("body").hasClass("navopen") ){
		$("body").removeClass("navopen");
		$(".navbutton").removeClass("on");
	}
});

$(".navbutton").keydown(function(event){ //tab+shift 해결
	if( event.keyCode == 9 && event.shiftKey ){
		$("body").removeClass("navopen");
		$(".navbutton").removeClass("on");
		$("#overlay").attr("style","");
	}
});