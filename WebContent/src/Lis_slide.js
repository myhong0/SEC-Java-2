(function ($) {
	ss.interiorSlider = function( $container ){
		var container = $container;
		var cover = container.find( ".cover_wrap" );
		var list = cover.find( "ul" );
		var listItems = list.find( "li" );
		var prevButton =  container.find(' .prev');
		var nextButton =  container.find(' .next');
		var control = container.find('.controls ul' );
		var controlItems = control.find( "li" );
		var hasControl = control.length > 0
		
		fnDotCreater();
		function fnDotCreater(){
			var countList = container.find('li').length;
			var dCount1 = Math.floor( countList/2 );
			var dCount2 = countList%2;
			var dotCount = dCount1 + dCount2; 
			for (var i = 0; i<dotCount ;i++ )
			{
				control.append("<li><a href='#'></a></li>");
			}
			controlItems = control.find( "li" );
			controlItems.eq(0).addClass('current');
			controlItems.off("click").on( "click", function(){
				var chkWidth = $(window).width();
				var chkCurrent2 =  $(this).index();
				controlItems.removeClass('current')
				$(this).addClass('current')
				list.stop().animate({'margin-left':-(chkCurrent2*chkWidth)},400);
				return false;
			});
			
			function fnSwipeMovement(n,x,y){
				list.on("swipeleft",function(e){
					var countDots = controlItems.length;
					var chkWindow = $(window).width();
					list.on('movestart', function(e) {
					  if ((e.distX > e.distY && e.distX < -e.distY) ||
						  (e.distX < e.distY && e.distX > -e.distY)) {
						e.preventDefault();
					  }
					});
					if ( x >= countDots-1) {
						return false;
					} else {
						x++;
						list.stop().animate({'margin-left':-(chkWindow*x)},400);
						controlItems.removeClass('current');
						controlItems.eq(x).addClass('current');
					}
				});
				list.on("swiperight",function(e){
					var countDots = controlItems.length;
					var chkWindow = $(window).width();
					if ( x <= 0)
					{
						return false;
					} else {
						x--;
						list.stop().animate({'margin-left':-(chkWindow*x)},400);
						controlItems.find('li').removeClass('current');
						controlItems.find('li').eq(x).addClass('current');
					}
				});
			}
		}
		
		var tempDate = +new Date();
		function fnListSize(m){
			var now = +new Date();
			if( now - tempDate < 120 ) return;
			tempDate = now;
			listItems.css({display:'block',border:'none'});
			var countList = listItems.length;
			var fWidth = cover.width();
			var bWidth = cover.parent().width();
			var cWidth = $(window).width();
			var aWidth = bWidth - 180;
			var rWidth = Math.floor(aWidth / m);
			var mWidth = Math.floor(fWidth / m);
			listItems.width(rWidth);
			var objWidth = listItems.eq(0).innerWidth();
			var totWidth = Math.floor(countList * objWidth);
			list.width(totWidth);		
			
			if( ss.metrics.device == "mobile" || ss.metrics.device == "mobile-landscape" ){
				var td = countList * cWidth;
				var yWidth = $(window).width();
				var xWidth = Math.floor(yWidth / m);
				cover.css('width','100%');
		        
				if( hasControl ){
					list.css('width',td);
					listItems.width(xWidth);
				}else{
					list.css('width','100%');
			        listItems.width('50%');
					listItems.css({display:'none'});
					cover.find('>ul>li:nth-child(-n+4)').css({display:'block', 'border-left':'1px solid #dadada','border-top':'1px solid #dadada','border-right':'none'});
					cover.find('>ul>li:nth-child(-n+2)').css({'border-top':'none'});
				}
			}else{
				cover.css('width',aWidth);
			}
		}
		
		function fnPrevAction( Va ){
			var targetLength = listItems.length;
			var targetBreakPoint = targetLength - Va;
			var targetCounterRoot = list.attr('data-count');
			var targetCounter = 0;

			if ( targetLength <= Va ){
				prevButton.addClass('disable');
				nextButton.addClass('disable');
			}
			
			prevButton.off("click").on("click", function(){	
				var targetWidth = listItems.eq(0).width();
				if ( targetCounter == 0 )
				{ 
					return false;
				} else {
					targetCounterRoot = list.attr('data-count');
					var targetCounter = targetCounterRoot;
					if (targetCounter <= 0)
					{
						return false;
					}
					targetCounter--;
					
					
					list.attr('data-count',targetCounter)
					list.stop().animate({'margin-left':-targetWidth*targetCounter},400);
				}

				if ( targetCounter == targetBreakPoint  ) {
					prevButton.removeClass('disable');
					nextButton.addClass('disable');
				} else if ( targetCounter > 0 ) {
					prevButton.removeClass('disable');
					nextButton.removeClass('disable');
				} else if ( targetCounter == 0 ) {
					prevButton.addClass('disable');
					nextButton.removeClass('disable');
				}
				return false;
			});
		}
		function compareVa (n,va){
			var targetCounter = listItems.length;
			
			if ( targetCounter <= va ) {
				list.attr('data-count',0)
				list.css('margin-left','0')
			} 

			if ( targetCounter <= va )
			{
				prevButton.addClass('disable');
				nextButton.addClass('disable');
			} 
			
			var xc = list.attr('data-count')
			if ( xc <= 0){
				prevButton.addClass('disable');
				nextButton.removeClass('disable');
			}
		}
		
		function fnNextAction( Va ){
			var targetLength = listItems.length;
			var targetBreakPoint = targetLength - Va;
			var targetCounterRoot = list.attr('data-count');
			var targetCounter = 0;
			
			if ( targetLength <= Va ){
				prevButton.addClass('disable');
				nextButton.addClass('disable');
			}
			nextButton.off("click").on( "click", function(){	
				var targetWidth = listItems.eq(0).width();
				if ( targetCounter >= targetBreakPoint )
				{ 
					return false;
				} else {
					targetCounterRoot = list.attr('data-count');
					var targetCounter = targetCounterRoot;
					if (targetCounter >= targetBreakPoint)
					{
						return false;
					}
					
					targetCounter++;
					list.attr('data-count',targetCounter)
					list.stop().animate({'margin-left':-targetWidth*targetCounter},400);
				}

				if ( targetCounter == targetBreakPoint  ) {
					prevButton.removeClass('disable');
					nextButton.addClass('disable');
				} else if ( targetCounter > 0 ) {
					prevButton.removeClass('disable');
					nextButton.removeClass('disable');
				} else if ( targetCounter == 0 ) {
					prevButton.addClass('disable');
					nextButton.removeClass('disable');
				}
				return false;
			});
		}
		function fnCarouselResize(n,m){
			var countFix = list.attr('data-count');
			var fWidth = cover.width();
			var rWidth = Math.floor(fWidth / m);
			var listWidth = listItems.eq(0).width();
			var targetLength = listItems.length;
			var targetBreakPoint = targetLength - m;
			list.css('margin-left',-(countFix*listWidth));		
			if ( targetBreakPoint <= countFix )
			{
				list.attr('data-count',targetBreakPoint)
				list.css('margin-left',-(targetBreakPoint*listWidth));		
			}
		};
		function fnMobileReset(){
			if ( $('html').hasClass('touch')){
				return;
			}

			list.css('margin-left',0);
		}
		function fnMobileMovement(){
			var mIdx2 = 0;
			var chkWidth = $(window).width();
			//>>>>>>>>>>>>>>>>var countList = $('#offers .cover_wrap .swipem').find('li').length;
			var countList = listItems.length;
			var dCount1 = Math.floor(countList/2);
			var dCount2 = countList%2;
			var dotCount = dCount1 + dCount2; 
		}
		function init() {
			var chkWidth = $(window).width();
			if( chkWidth <= 767) {
				fnMobileMovement();
				fnListSize( 2);
				fnMobileReset();
				$(window).on("orientationchange",function(){
				  if(window.orientation == 0) // Portrait
				  {
					fnListSize( 2);
					
				  }
				  else // Landscape
				  {
					fnListSize( 2);
					
				  }
				});
			} else if ( chkWidth >= 768 && chkWidth < 1024) {
				fnListSize( 3);
				fnCarouselResize( 3);
				compareVa ( 3)
				
			} else if ( chkWidth < 1279 ){
				fnListSize( 4);
				compareVa ( 4)
				fnCarouselResize( 4);
				
			} else if ( chkWidth >= 1280 ){
				fnListSize( 4);
				fnCarouselResize( 4);
				compareVa ( 4)
				
			} 
		
			if( chkWidth < 768) {
			} else if ( chkWidth > 768 && chkWidth < 1024) {
				fnPrevAction( 3);
				fnNextAction( 3);
			} else if ( chkWidth < 1279 ){
				fnPrevAction( 4);
				fnNextAction( 4);
			} else if ( chkWidth >= 1280 ){
				fnPrevAction( 4);
				fnNextAction( 4);
			}
		}
		setTimeout(function(){init() },200);
		
		eventBridge.on(eventDictionary.global.RESIZE, function() {
			if(  !ss.metrics.isIE8() ){
				setTimeout(function(){init() },200);
			}
		});
		
		/* mobile */
		if ( $('html').hasClass('touch') ){
			var chkWidth = $(window).width();
			
			if ( chkWidth < 767 )
			{
				console.log( "mobile" );
				init();
				var recopickCounter = 0;
				var storepickCounter = 0;
				fnSwipeMovement('lifeSamsung',storepickCounter,'lifeSamsung_list');
				
				function fnSwipeMovement(n,x,y){
					$("#"+n+" ."+y+"").on("swipeleft",function(e){
						var countDots = $("#"+n+" .controls").find('li').length;
						var chkWindow = $(window).width();
						 $("#"+n+" ."+y+"").on('movestart', function(e) {
						  if ((e.distX > e.distY && e.distX < -e.distY) ||
							  (e.distX < e.distY && e.distX > -e.distY)) {
							e.preventDefault();
						  }
						});
						if ( x >= countDots-1) {
							return false;
						} else {
							x++;
							$("#"+n+" ."+y+"").stop().animate({'margin-left':-(chkWindow*x)},400);
							$("#"+n+" .controls").find('li').removeClass('current');
							$("#"+n+" .controls").find('li').eq(x).addClass('current');
						}
					});
					$("#"+n+" ."+y+"").on("swiperight",function(e){
						var countDots = $("#"+n+" .controls").find('li').length;
						var chkWindow = $(window).width();
						if ( x <= 0)
						{
							return false;
						} else {
							x--;
							$("#"+n+" ."+y+"").stop().animate({'margin-left':-(chkWindow*x)},400);
							$("#"+n+" .controls").find('li').removeClass('current');
							$("#"+n+" .controls").find('li').eq(x).addClass('current');
						}
					});
					
				}
			}
		}
	}
	
}(jQuery));

$(function() {
	
	$( ".interior_products" ).each( function(){
		new ss.interiorSlider( $( this ) );
	});
});
