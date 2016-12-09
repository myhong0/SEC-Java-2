var ss = $;
var imsiFlag = true;
var isStoreAvailable = true; //aeseul.kim 20150727

//한국사이트 임시처리

$(".ss_samsung.b2c .breadcrumb").empty();


//바잉툴 상단 고정 dong_won.lee^^;
$("#content .pdp-hero .product-info-wrap .product-info-section").css('vertical-align', 'top');


/** -- FILE: pdp-standard.js -- **/

/**

Page object for the standard pdp page.



@module Main

@submodule PDPStandard

@main Main

@ver.0.9

**/

(function($) {

	$.fn.val2 = function(value) {

		if (!this.is('[data-placeholder-active]')) {

			return $.fn.val.apply(this, arguments);

		}



		// getter

		if (!arguments.length) {

			// compensation

			if (this.attr('data-placeholder-active') === 'true' && this.val() !== this.attr('data-placeholder-value')) {

				var val = this.val();

				this.val('');

				Placeholders.enable(this[0]);

				Placeholders.disable(this[0]);

				this.val(val);

			}

			return ss.inputValue(this);

		}



		// setter

		ss.inputValue(this, value);

		return this;

	};

}(jQuery));



/*global window, document, setInterval, clearInterval, Modernizr, eventBridge, eventDictionary, setTimeout, clearTimeout, console, Math, setHeroSize */

(function($) {



    var body = $('.ss_samsung');

    var isWow = body.hasClass('pdp_wow') || body.hasClass('instore') || body.hasClass('business') ? true : false;

    var viewSection = $('.view-section');



	/**

	@class $.PDPStandard

	@constructor

	@param {Object} params External object settings passed into the object.

	**/

	ss.PDPStandard = function(params) {

		function init(){



			if(isWow) new ss.PDPStandard.Wow();

			else new ss.PDPStandard.Standard();



		}



		init();

	};



	/**

	 * @class $.PDPStandard.Standard

	 * @constructor

	 * @param {Object}

	 *            params External object settings passed into the object.

	 */

	ss.PDPStandard.Standard = function (params) {

        /**

        Stores the top level scope.



        @property self

        **/

       var self = this;



       /**

        Hero module.



        @property heroContainer

        **/

       var heroContainer = $('.hero-module');





       var playBtns = heroContainer.find('.play-btn.popupVideo');

       var closeBtns = viewSection.find('.close-video.popupVideo');

       var vmPlayer = viewSection.find('.vm-player');



       window.firstAction = false;



       /**

       Initializaiton function which runs at object instantiation time.

       Sets up the various modules, popovers and event bindings.



       @method init

       **/

      function init() {

          //edit by hun
		  deleteSupportSservice();

          new ss.PDPStandard.PDPFeaturesController();

          new ss.PDPStandard.PDPAccessories();



          new ss.PDPStandard.PDPThreeSixty();

          if ( $('.media-module').find('.sampleimages').length > 0 ) {

              new ss.PDPStandard.PDPSampleImages();

          }



          bindEvents();



          new ss.PDPStandard.PDPCommon();

          new ss.PDPStandard.PDPStandardKv();

          new ss.PDPStandard.PDPCommonSEC();

          new ss.PDPStandard.PDPeCommerceSTD();

      }





      /**

       Bind events.



       @method bindEvents

       **/

      function bindEvents() {

      	var carousel = $( ".product-img-section>.ss-carousel");

      	var heros = carousel.find( ".viewer>ul>li [class*='hero'] > p");

      	var herosImg = heros.find( "> img");

      	var herosImgArea = heros.find( "> .click-area");

          eventBridge.on(eventDictionary.global.RESIZE, function() {

        	  heroSize();

          });



          // 모바일버전에서 이미지 클릭시 새창 열리는것 중단.

/*          herosImgArea.on( ss.clickEvent, function(e){

          	if( ss.metrics.deviceLayoutId === 1 && ss.metrics.isMobile() ){

          		var dataLink = $( this ).siblings( ".responsive-image" ).attr( "data-img-link" );

          		if(dataLink) window.open( dataLink );

          	}

          });*/



          playBtns.on('click', function (e){

              if(!viewSection.hasClass('on')) viewSection.addClass('on');

              if(!vmPlayer.hasClass('on')) vmPlayer.addClass('on');

              viewSection[0].popAlign();

              //setTimeout(function (){viewSection[0].popAlign();}, 1);

              $('.lightbox-skrim').remove();

              $('body').append('<div class="lightbox-skrim"></div>');

              $('.lightbox-skrim').on(ss.clickEvent, function (){

                  closeBtnClickHandler();

              });



              if($(this).attr('data-view')){

                  setTimeout(function (){vmPlayer.find('.video-player .close-video').focus();}, 1);

              }else{

                  setTimeout(function (){vmPlayer.find('.youtube-player .close-video').focus();}, 1);

              }



          });



          function heroSize(){

              var metrics = ss.metrics, width;

              if( metrics.isIE8() ) return;

              if( metrics.deviceLayoutId == 1 ) {

                  width = carousel.outerWidth();

                  carousel.outerHeight( width );

                  heros.outerHeight( width );

                  herosImg.outerHeight( width );

              }else if( metrics.deviceLayoutId == 2 ){

                  width = carousel.outerWidth()/3*2;

                  carousel.outerHeight( width );

                  heros.outerHeight( width );

                  herosImg.outerHeight( width );

              }else{

                  carousel.css( 'height', '' );

                  heros.css( 'height', '' );

                  herosImg.css( 'height', '' );

              }

          }



          closeBtns.on(ss.clickEvent, closeBtnClickHandler);



          function closeBtnClickHandler(e){

              if(vmPlayer.hasClass('on')) vmPlayer.removeClass('on');

              else return;



              if(viewSection.hasClass('on')) viewSection.removeClass('on');



              $('.lightbox-skrim').remove();



              var carousel = heroContainer.find('.ss-carousel'),

                  index = carousel.find('.dots li.current a').attr('data-index');

              console.log('index = ' + index);

              setTimeout(function (){carousel.find('li[data-index="'+ index +'"] a').first().focus();}, 461);





          }



      }



      init();

	};

	/**

      Check Support S-service events.

     **/

	 function deleteSupportSservice() {

		var currentItemLowerNm = $(".sw-update-item-group").text();
		var typeIaCode = $("#typeCode").val();
		//$(".sw-update-item-group").empty();

		if((typeIaCode != '05320000' && typeIaCode != '05350000')){
			$(".sw-update-item-group").empty();
		}
	 };

	ss.PDPStandard.PDPStandardKv = function (params) {



        var container = $('.product-img-section');

        var containerAnim = false;

        var carousel = container.find('.ss-carousel')[0].binder;

        var realchild = container.find( ".ss-carousel .viewer > ul" ).attr( "realchild");

        var kvImgs = container.find( ".responsive-image" );

        var thumbnailGallery = container.find('.thumbnail-visual');

        var currLabel = container.find('.current-num');

        var totalLabel = container.find('.all-num');

        var thumbs = thumbnailGallery.find('.thumbnail');

        var thumbNum = thumbs.length;

        var isPanning = false;

        var prevArrow = thumbnailGallery.find('.prev');

        var nextArrow = thumbnailGallery.find('.next');

        var currentThumbnail = 0;

        var thumbnailsAnim = false;

        var showNum = 5;

        var itemSize = 20;

        var pageNum = 0;

        var maxPage = thumbNum - showNum;

        var currentSwatchID;

        var domRefreshEvent = jQuery.Event(eventDictionary.dom.DOM_REFRESH);

        var isShownumMoreImg;

        var halfIndex = parseInt( showNum/2 );

        var isRTL = $("html").hasClass( "rtl" );

        carousel.callFn = carouselCallback;



        function carouselCallback(){

        	 var idx =  this.curr % realchild;

             if( currentThumbnail !=  idx  ){

                 if( idx <= halfIndex ) pageNum = 0;

                 else if( idx == thumbNum-1 ) pageNum = maxPage;

                 else pageNum = idx-halfIndex;

             }

             if( pageNum > maxPage ) pageNum = maxPage;

             else if( pageNum < 0 ) pageNum = 0;

             kvImgs.eq( idx ).show();

             setupThumbnailGallery( idx );

             window.InstResponsive.scan(ss.metrics);

        }

        /**

         Initialization function which runs at object instantiation time.



         @method init

         **/

        function init() {

            var imgLength = realchild;

            totalLabel.text( imgLength );

            if( imgLength == 1 ){

            	container.find( ".ss-carousel .controls").css( "visibility", "hidden");

            }else{

            	container.find( ".ss-carousel .controls").css( "visibility", "visible");

                bindEvents();

            }

            carousel.curr = 0;

            carouselCallback.call( carousel );

            isShownumMoreImg = imgLength > showNum;

            if( !isShownumMoreImg ){

            	prevArrow.addClass( 'disabled' );

            	nextArrow.addClass( 'disabled' );

            }

            initArrowControls();

            thumbnailGallery.find('.wrap').css('display','');

            setThumbZIndex();

            window.InstResponsive.init();

        	window.InstResponsive.scan(ss.metrics);



			// 첫 로딩 시 clr 값이 있을 경우 clr 컬러코드로 컬러칩 세팅

			var clrColor = $('#clr').val();

			if ((clrColor != "") && (clrColor != undefined) && (clrColor != null)) {

				clrColor = '#' + $('#clr').val();

				$('#currentColor').val(clrColor);

				$('#clr').val("");

				setupKeyVisualData(clrColor);

			}

        }



        function setThumbZIndex(){

        	if( !isRTL ) return;

        	thumbs.each(function(i) {

        		if( isRTL ) $(this).css("z-index", thumbs.length-i);

        	});

        }



        function bindEvents() {

            nextArrow.on(ss.clickEvent, function(e) {

                if (pageNum === maxPage) {

                    e.preventDefault();

                } else {

                	pageNum++;

                    slideThumbnails();

                }

            });



            prevArrow.on(ss.clickEvent, function(e) {

                if (pageNum === 0) {

                    e.preventDefault();

                } else {

                	pageNum--;

                    slideThumbnails();

                }

            });



            thumbnailGallery.swipe({

                swipeLeft: function (event, direction) {

                    var maxPos = maxPage;



                    if (pageNum === maxPos && !thumbnailsAnim) {

                        event.preventDefault();

                    } else {

                    	pageNum++;

                        slideThumbnails();

                    }

                },



                swipeRight: function (event, direction) {

                    if (pageNum === 0 && !thumbnailsAnim) {

                        event.preventDefault();

                    } else {



                    	pageNum--;

                        slideThumbnails();

                    }

                }

            });



            thumbnailGallery.on('swipeleft', function(e) {

                var maxPos = maxPage;



                if (pageNum === maxPos && !thumbnailsAnim) {

                    e.preventDefault();

                } else {

                	pageNum++;

                    slideThumbnails();

                }

            }).on('swiperight', function(e) {

                    if (pageNum === 0 && !thumbnailsAnim) {

                        e.preventDefault();

                    } else {

                    	pageNum--;

                        slideThumbnails();

                    }

                });



            thumbnailGallery.on(ss.clickEvent, '.thumbnail', function() {

                if(!$(this).hasClass('current')) {

                	sendClickCode('pdp_gallery','gallery:image');

                    $(thumbnailGallery).find('.thumbnail.current').removeClass('current');

                    $(this).addClass('current');

                    carousel.carouselSwipe.slide(parseInt($(this).attr('sampleimages-index'), 10));

                }

            });



            thumbs.on('focus', function() {

            	var thumb = $(this);

                currentThumbnail = parseInt(thumb.attr('sampleimages-index'), 10);

            	if( currentThumbnail == 0 ) pageNum = 0;

            	else if( currentThumbnail == thumbNum-1 ) pageNum = maxPage;

            	else pageNum = currentThumbnail;

                if( pageNum > maxPage ) pageNum = maxPage;

                else if( pageNum < 0 ) pageNum = 0;

                activeThumbnails();

            });

        }



        function setupThumbnailGallery(swatchIndex) {

            initArrowControls();

            thumbnailGallery.find('.thumbnail.current').removeClass('current');

            thumbs.eq(swatchIndex).addClass('current');

            var propName = isRTL ? "right" : "left";

            thumbs.each(function(i) {

            	$(this).css(propName, (i * itemSize) + '%');

            });



            currentThumbnail = parseInt(swatchIndex, 10);

            currLabel.text(currentThumbnail+1);

            activeThumbnails();

        }



        function initArrowControls() {

        	if( !isShownumMoreImg ) return;

        	if(pageNum === 0) {

        		prevArrow.addClass('disabled');

        		nextArrow.removeClass('disabled');

        	} else if(pageNum === maxPage) {

        		prevArrow.removeClass('disabled');

        		nextArrow.addClass('disabled');

        	} else {

        		prevArrow.removeClass('disabled');

        		nextArrow.removeClass('disabled');

        	}

        }



		function activeThumbnails() {

			if( thumbNum <= showNum ) return;

			thumbnailsAnim = true;

			initArrowControls();

			var moveOffset = ( -1 * currentThumbnail * itemSize ) + ( itemSize * halfIndex );

			var min = 0;

			var max = (thumbNum-showNum)*itemSize*-1;

			if( moveOffset > 0 ) moveOffset = 0;

			else if( moveOffset < max) moveOffset = max;

			if( isRTL ) aniOption = { marginRight: moveOffset + '%' };

			else aniOption = { marginLeft: moveOffset + '%' };

			thumbs.stop().animate(aniOption, 500, function () {

			    thumbnailsAnim = false;

			});

		}



        function slideThumbnails() {

            if( thumbNum <= showNum ) return;

            thumbnailsAnim = true;

            initArrowControls();

            var moveOffset = ( -1 * pageNum * itemSize );

            var aniOption = null;

            if( isRTL ) aniOption = { marginRight: moveOffset + '%' };

            else aniOption = { marginLeft: moveOffset + '%' };

            thumbs.stop().animate(aniOption, 500, function () {

                thumbnailsAnim = false;

            });

        }



        if(!window.firstAction){

	        $('#selectColor').find('a').on('click', function(e) {

	        	window.firstAction = true;

	        	e.preventDefault();

				var fromEStore = $('#fromEStore').val();

				var catid = $('#catid').val();

				var catnm = $('#catnm').val();



				var modelCode = $('#modelCode').val();

				var currentColor = $('#currentColor').val();

				var thisSwatch = $(this);



				if (thisSwatch.attr('data-color') !== currentColor) {

					sendClickCode('pdp_gallery','gallery:color');

					var url = $(this).attr('data-url');

					var group = $(this).attr('data-groupcode');

					var model = $(this).attr('data-modelcode');

					var swatchColor = $(this).attr('data-color');



					// 그룹으로 묶이지 않은 색상일경우

					if (group == "" || group == null) {

						$('#currentColor').val(swatchColor);

						setupKeyVisualData(swatchColor);



					// 그룹으로 묶인 색상일 경우

					}else{

						// 모델이 동일하지 않을경우

						if (model != modelCode) {



							// e-store breadcrumb 정보가 있으면 함께 전달한다.

							var decodedCnm = $('<div/>').html(catnm).text();

							if(fromEStore == 'Y'){

								if(url.indexOf('?') == -1){

									location.href = url + '?catid=' + catid + '&catnm=' + decodedCnm;

								}else{

									location.href = url + '&catid=' + catid + '&catnm=' + decodedCnm;

								}

							}else{

								location.href = url;

							}

							return false;



						// 모델이 동일한 경우

						}else{

							$('#currentColor').val(swatchColor);

							setupKeyVisualData(swatchColor);



						}

					}

				}



	        });

        }



        function setupKeyVisualData(colorCode) {



			var kvArea = $('#carousel-00 ul');

			var kvData = $('#prdImgData').clone(true, true);

			var kvThumbnailArea = $('.thumbnail-visual').find('.wrap');

			var colorChip = $('#selectColor');



			// 컬러칩 하이라이트 변경

			colorChip.find('.swatch').removeClass('active');

			colorChip.find('[data-color="' + colorCode + '"]').parent().addClass('active');



			// 기존 KV 데이터 삭제 (KV전용 이미지, 갤러리)

			kvArea.find('[data-heroimagetype="KV"]').remove();

			kvArea.find('[data-heroimagetype="G"]').remove();

			kvArea.find('[data-heroimagetype="V"]').remove();



			// 기존 KV썸네일 데이터 삭제

			kvThumbnailArea.empty();



			// KV, gallery&동영상 순서대로 KV영역에 데이터 복사

			kvArea.prepend(kvData.find('[image-color-type="' + colorCode + '"]'));

			kvArea.prepend(kvData.find('[data-heroimagetype="KV"]'));





			var kvDataLength = kvArea.find('li').length;



			for ( var i = 0; i < kvDataLength; i++) {

				var dataHtml = $(kvArea.find('li')[i]);

				var dataType = dataHtml.attr('data-heroimagetype');

				var dataGalleryUrl = dataHtml.find('img').attr('gallery-image-url') + "?wid=60&hei=60";

				var dataThumbUrl = dataHtml.find('img').attr('gallery-thumb-url');



				if (dataType == "KV") {

					var kvType = dataHtml.attr('data-kvType');

					if ( kvType == "H"){

						var form = $('#kvHtmlThumb').clone();

						form.attr('sampleimages-index', i);

						kvThumbnailArea.append(form);



					}else if (kvType == "I"){

						var form = $('#kvThumb').clone();

						form.attr('sampleimages-index', i);

						form.find('img').attr('src',dataThumbUrl);

						kvThumbnailArea.append(form);

					}



				} else if (dataType == "G") {

					var form = $('#galleryThumb').clone();

					form.attr('sampleimages-index', i);

					form.find('img').attr('src',dataGalleryUrl);

					kvThumbnailArea.append(form);



				} else if (dataType == "V") {

					var form = $('#videoThumb').clone();

					form.attr('sampleimages-index', i);

					kvThumbnailArea.append(form);



				}

			}





			heroSize();



			eventBridge.on(eventDictionary.global.RESIZE, function() {

				heroSize();

			});



			function heroSize() {

				var carousel = $( ".product-img-section>.ss-carousel");

				var heros = carousel.find( ".viewer>ul>li [class*='hero'] > p");

				var herosImg = heros.find( "> img");

				var metrics = ss.metrics, width;

				if (metrics.isIE8())

					return;

				if (metrics.deviceLayoutId == 1) {

					width = carousel.outerWidth();

					carousel.outerHeight(width);

					heros.outerHeight(width);

					herosImg.outerHeight( width );

				} else if (metrics.deviceLayoutId == 2) {

					width = carousel.outerWidth() / 3 * 2;

					carousel.outerHeight(width);

					heros.outerHeight(width);

					herosImg.outerHeight( width );

				} else {

					carousel.css('height', '');

					heros.css('height', '');

					herosImg.css( 'height', '' );

				}

			}



			var heroContainer = $('.hero-module');

			var playBtns = heroContainer.find('.play-btn.popupVideo');

			var closeBtns = viewSection.find('.close-video.popupVideo');

			var vmPlayer = viewSection.find('.vm-player');



			playBtns.on('click', function(e) {

				if (!viewSection.hasClass('on'))

					viewSection.addClass('on');

				if (!vmPlayer.hasClass('on'))

					vmPlayer.addClass('on');

				viewSection[0].popAlign();

				// setTimeout(function (){viewSection[0].popAlign();}, 1);

				$('.lightbox-skrim').remove();

				$('body').append('<div class="lightbox-skrim"></div>');

				$('.lightbox-skrim').on(ss.clickEvent, function() {

					closeBtnClickHandler();

				});



				if ($(this).attr('data-view')) {

					setTimeout(function() {

						vmPlayer.find('.video-player .close-video').focus();

					}, 1);

				} else {

					setTimeout(function() {

						vmPlayer.find('.youtube-player .close-video').focus();

					}, 1);

				}



			});



			closeBtns.on(ss.clickEvent, closeBtnClickHandler);



			function closeBtnClickHandler(e) {

				if (vmPlayer.hasClass('on'))

					vmPlayer.removeClass('on');

				else

					return;



				if (viewSection.hasClass('on'))

					viewSection.removeClass('on');



				$('.lightbox-skrim').remove();



				var carousel = heroContainer.find('.ss-carousel'), index = carousel.find('.dots li.current a').attr('data-index');

				console.log('index = ' + index);

				setTimeout(function() {

					carousel.find('li[data-index="' + index + '"] a').first().focus();

				}, 461);



			}



			$(eventBridge).trigger(jQuery.Event(eventDictionary.dom.DOM_REFRESH));

			new ss.PDPStandard.PDPStandardKv();

		}



        init();



	};



	/**

	 * @class $.PDPStandard.Wow

	 * @constructor

	 * @param {Object}

	 *            params External object settings passed into the object.

	 */

    ss.PDPStandard.Wow = function (params) {



		/**

		 * Stores the top level scope. demo

		 *

		 * @property self

		 */

		var self = this;



		/**

		Hero module.



		@property heroContainer

		**/

		var heroContainer = $('.hero-module');



		/**

		Gallery module.



		@property galleryContainer

		**/

		var galleryContainer = $('.gallery-module');



		/**

		Three Sixty module.



		@property threesixtyContainer

		**/

		var threesixtyContainer = $('.threesixty-module');



		/**

		Share Popover.



		@property sharePopover

		**/

		var sharePopover;



		/**

		AddToCart Popover.



		@property addToCartPopover

		**/





		/**

		Awards Popover.



		@property awardsPopover

		**/

		var awardsPopover;



		/**

		Review Sort Popover.



		@property reviewSortPopover

		**/

		var reviewSortPopover;

		/*

		var bcImgCnt = 0;



		var flagReadyBC = true;*/



		/**

		Dom Refresh Event.



		@property domRefreshEvent

		**/

		var domRefreshEvent = jQuery.Event(eventDictionary.dom.DOM_REFRESH);



		/**

		* store the metrics to help check for changes



		@property currentMetrics

		**/

		var currentMetrics;



		var slideTiming = 300;



		/**

		Initializaiton function which runs at object instantiation time.

		Sets up the various modules, popovers and event bindings.



		@method init

		**/

		function init() {

			//Check Support S-service events by kihun
			deleteSupportSservice();

			new ss.PDPStandard.PDPFeaturesController();

			new ss.PDPStandard.PDPAccessories();



			new ss.PDPStandard.PDPThreeSixty();

			new ss.PDPStandard.PDPGallery();

			//new ss.PDPStandard.PDPKeyVisual();



			if ($('.media-module').find('.sampleimages').length > 0) {

				new ss.PDPStandard.PDPSampleImages();

			}



			currentMetrics = ss.metrics;



			bindEvents();

			heroSize();

			throttleCarousel();



			new ss.PDPStandard.PDPCommon();

			new ss.PDPStandard.PDPCommonSEC();

			new ss.PDPStandard.PDPeCommerceWOW();



		}



        /**

        Bind events.



        @method bindEvents

        **/

       function bindEvents() {



			$('.media.gallery').on('click', function() {

				$('.vm-player').css('z-index', '0');

				$('.close-video').trigger('click');

				$('.close-video-player').trigger('click');

				$('.close-youtube-player').trigger('click');

			});



			$('.media.threesixty').on('click', function() {

				$('.vm-player').css('z-index', '0');

				$('.close-video').trigger('click');

				$('.close-video-player').trigger('click');

				$('.close-youtube-player').trigger('click');

			});



			$('.media.sampleimages').on('click', function() {

				$('.vm-player').css('z-index', '0');

				$('.close-video').trigger('click');

				$('.close-video-player').trigger('click');

				$('.close-youtube-player').trigger('click');

			});



			eventBridge.on(eventDictionary.pdpStandard.EVENT_HERO_SHOW, function(e, data) {

				clearTimeout(viewerInitTimer);

				heroContainer.slideDown(500, function() {

					$(eventBridge).trigger(domRefreshEvent);



				//ss.VideoPlayerHandler.init();

				});

			});



			var viewerInitTimer;

			eventBridge.on(eventDictionary.pdpStandard.EVENT_GALLERY_SHOW, function(e, data) {

				heroContainer.slideUp(500);



				if (window.fromG) {

					window.fromG = false;

					setTimeout(function() {

						if (!window.scene7) {

							var mixedMediaViewer = window.scene7 = new s7viewers.MixedMediaViewer();

							mixedMediaViewer.setContainerId("s7viewer");

							mixedMediaViewer.setParam("serverurl", imgServerUrlChk);



                            if(ss.metrics.isIE8()){

                                viewerInitTimer = setTimeout(initializationComplete, 200);

                                function initializationComplete(){

                                    if($('#s7viewer_container').width() && $('#s7viewer_container').width() !== 1280){

										//eventBridge.trigger(jQuery.Event(eventDictionary.global.RESIZE), ss.metrics);

										var container = $('.s7container'), zoomview = $('.s7zoomview');

										container.width('1280px').trigger('resize');

										zoomview.width('1280px').trigger('resize');

                                    }

                                   else{

                                        clearTimeout(viewerInitTimer);

                                        viewerInitTimer = setTimeout(initializationComplete, 200);

                                    }

                                }

                            }

							//var assetNode = { "i": { "n": "" }, "dx": "3000", "dy": "2000" }



							mixedMediaViewer.setAsset(assetJson);





							mixedMediaViewer.init();

						}

					}, 500);

				}

			});



			eventBridge.on(eventDictionary.pdpStandard.EVENT_SAMPLEIMAGES_SHOW, function(e, data) {

				clearTimeout(viewerInitTimer);

				heroContainer.slideUp(500);

			});



			eventBridge.on(eventDictionary.pdpStandard.EVENT_THREESIXTY_SHOW, function(e, data) {

				clearTimeout(viewerInitTimer);

				heroContainer.slideUp(500);

			});



            eventBridge.on(eventDictionary.global.RESIZE, function() {

                heroSize();

            });





			// Sink event for use case of orientation change during video play

			eventBridge.on(eventDictionary.videoPlayer.EVENT_SHOW_VIDEO, function() {

			// $(eventBridge).trigger(domRefreshEvent);

			// ss.VideoPlayerHandler.init();




			// $('.hero-module').first()

			//	 .css( 'background-size', 'cover' )

			//	 .css( '-webkit-background-size', 'cover' );



			});

			heroSize();



       }





		/**

		@function heroSize

		Sets height of the hero section based upon window size

		**/

		function heroSize() {

			var hero = $('.hero-module').first();

			if (hero.hasClass('d-height')) {

				var perHeight = (parseInt(hero.attr('d-height')) * (parseInt($(window).height() / 100)));

				if (ss.metrics.device == 'mobile') {

					if (perHeight > 420)

						perHeight = 420;

					else if (perHeight < 300) {

						perHeight = 300;

					}

				}

				else {



					if (perHeight > 600)

						perHeight = 600;

					else if (perHeight < 420) {

						perHeight = 420;

					}

				}

				hero.attr('height', perHeight + 'px');

			}

			var slideHeight = hero.find('li').first().outerHeight(),

			winheight = $(window).innerHeight(), heroHeight, sampleHeroHeight;



			if (ss.metrics.device === "desktop")

				heroHeight = 600, sampleHeroHeight = 500;

			else if (ss.metrics.device === "tablet-landscape")

				heroHeight = 600, sampleHeroHeight = 500;

			else if (ss.metrics.device === "tablet-portrait")

				heroHeight = 600, sampleHeroHeight = 500;

			else

				heroHeight = 420, sampleHeroHeight = 360;

/*			if (hero.hasClass('d-height')) {

				heroHeight = hero.attr('height');

			}

			else {

				hero.css('height', heroHeight);

			}*/



			heroHeight = parseInt(heroHeight) + 'px';

			sampleHeroHeight = parseInt(sampleHeroHeight) + 'px';

			if ($('.ss_samsung.pdp_wow').length == 0) {

				if ($('.ss-carousel').hasClass('sample')) {

					$('.ss-carousel').css('height', sampleHeroHeight);

				} else {

					$('.ss-carousel').css('height', heroHeight);

				}

				$('.ss-carousel').find('[class*="hero"]').each(function() {

					if ($(this).hasClass('sample')) {

						$(this).css('height', sampleHeroHeight);

					} else {

						$(this).css('height', heroHeight);

					}

				});



				$('.sampleimages-hero .ss-carousel').css('height', $('.sampleimages-hero .ss-carousel').parent().height());

				$('.sampleimages-hero .ss-carousel').find('[class*="hero"]').each(function() {

					$(this).css('height', sampleHeroHeight);

				});



			}

			else {

				var device = ss.metrics.device;

				var ratio;



				switch (device) {

					case 'mobile':

						ratio = 1.43;

						break;

					case 'mobile-landscape':

						ratio = 0.51875;

						break;

					case 'tablet-portrait':

						ratio = 1.43;

						break;

					case 'tablet-landscape':

						ratio = 0.51875;

						break;

					case 'desktop':

						ratio = 0.51875;

						break;

				}

				var heroCC2Height = $('.hero-cc').width() * ratio;



				$('div.hero-module').height(heroCC2Height);

				$('.ss-carousel').find('[class*="hero"]').each(function() {

					$(this).height(heroCC2Height);

				});



			}

			//$('.ss-carousel').find('[class*="hero"]').css('height', heroHeight);

			$('.vm-player').css('height', heroHeight); /* ADD ADNSTYLE */

		//var winheight = $(window).innerHeight(),

		//	heroHeight = (75 * winheight) / 100;

		//

		//heroHeight = parseInt(heroHeight) + 'px';

		//$('#content').find('[class*="hero"]').css('height', heroHeight);

		}



		/**

		* Throttles carousel tabbing with a 300ms delay (default)

		*

		* @method throttleCarousel

		*/

		function throttleCarousel() {

			$('.ss-carousel .pag li a').fastTabFix();

		}







		/* ADD ADNSTYLE */



		init();

	};

	/**

			Check Support S-service events.

	**/

		function deleteSupportSservice() {

			var currentItemLowerNm = $(".sw-update-item-group").text();
			var typeIaCode = $("#typeCode").val();
			//$(".sw-update-item-group").empty();

			if((typeIaCode != '05320000' && typeIaCode != '05350000')){
				$(".sw-update-item-group").empty();
			}
	};

	ss.PDPStandard.PDPCommon = function (){



		/**

		Reviews module.



		@property reviewsModule

		**/

		var reviewsModule = $('.reviews-module');



		/**

		Reviews sort button.



		@property reviewSortButton

		**/

		var reviewSortButton = reviewsModule.find('.review-controls .sort-button');



		/**

		Reviews module tabs.



		@property reviewsModuleTabs

		**/

		var reviewsModuleTabs = reviewsModule.find('.rating-type-toggle li a');



		/**

		Find in store button.



		@property findInStore

		**/

		var findInStore = $('.ss-onstore');



		/**

		In-store map module.



		@property instoreMap

		**/

		var instoreMap = $('.instore-map');



		/**

		Map module tabs.



		@property instoreMapTabs

		**/

		var instoreMapTabs = instoreMap.find('.map-floor-toggle li a');



		/**

		Media module.



		@property mediaModule

		**/

		var mediaModule = $('.media-module');



		var isIE8 = ss.metrics.isIE8();



        function init(){

        	setupPopovers();

        	bindEvents();

        	ratingSortTabIndex();

        	loadAwards();

        	initReviews();

        	setMediaNum();



			/*

      	   * REVIEW POPOVER 이벤트 초기화

      	   * @author syy.song

      	   */

      			bindReviewSubmitEvents();

        	$('.toggle-content').trigger('myScroll'); /* ADD ADNSTYLE */

        	$( ".button-area" ).addClass( "num-"+ $( ".button-area > a" ).length );

        	$( ".glance-list" ).addClass( "num-"+ $( ".glance-list > li" ).length );

        	eventBridge.trigger(jQuery.Event(eventDictionary.global.RESIZE), ss.metrics);



			// BrightCovePlayer 초기화

			var checktry = 0;

			if ($('#videoBE').length) {

				var videoInit = setInterval(function(){

					checktry++;

					if(brightcove.internal._instances['videoBE'] != undefined || checktry > 7){

						$.VideoPlayerHandler.init('videoBE');

						clearTimeout(videoInit);

					}

				}, 1000);

			}



			// Offer check

			var offerData = $('li[data-offer="Y"]');

            for(var i = 0; i<offerData.length; i++){

            	var offerDataLink = $(offerData[i]).find('a').attr('href');

            	if(offerDataLink != undefined && offerDataLink != null){



            		if(offerDataLink.indexOf("samsung.com") < 0 && offerDataLink.indexOf("/"+SITE_CD+"/") != 0){

            			$(offerData[i]).find('a').attr("target","_blank");

            		}else{

            			$(offerData[i]).find('a').attr("target","_self");

            		}

            	}

            }

        }



        function setMediaNum() {

			var num;

			if (ss.metrics.deviceLayoutId == 1 && !isIE8) {

				num = $(".media-module .wrap .media").not(".threesixty").length;

			} else {

				num = $(".media-module .wrap .media").length;

			}



			//aeseul.kim 위시리스트 현재 초기 display:none; 이므로 카운트 제외 처리
			if (($('.wishlist').attr('style') == 'display: none;') || ($('.wishlist').attr('style') == 'display:none')) {
				num = num-1;
			}

			if(num == 1) {
				$(".media-module .wrap .media").not(".wishlist").attr('style','width:9%');
			} else {
				$(".media-module .wrap .media").not(".wishlist").attr('style','');
			}



			$(".media-module .wrap").removeClass(function(index, css) {

				var classes = css.match(/num-[0-9]/g);

				if (classes) {

					return classes[0];

				} else {

					return null;

				}

			});

        	$( ".media-module .wrap" ).addClass( "num-" + num );

        }



        function initReviews() {

			var $currentMoreText;

			var $showmore = $(".owner-review .review-text .show-more").on("click", function(event) {

				var self = $(this)

				var contentName = self.data("content")

				$currentMoreText = self.siblings(contentName);

				$currentMoreText.on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", transitionEnd);

			});



			function transitionEnd(event) {

				eventBridge.trigger(jQuery.Event(eventDictionary.global.RESIZE), ss.metrics);

				$(this).off("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", transitionEnd)

			}



			var $overallViewBtn = $('.overall-section .tab-button');

			var $expertViewBtn = $('.latest-expert-section .tab-button');

			var $ownersSection = $('.owners-section');

			var $expertSection = $('.expert-section');

			var $sortByTit = $( '.owners-section .sort-by-tit' );

            var $sortBtn = $( '.owners-section .sort-button' );

			var toggleView = null;

			$overallViewBtn.on('click', toggleReviewsViewBtn);

			$expertViewBtn.on('click', toggleReviewsViewBtn);



			function toggleReviewsViewBtn() {

				if (ss.metrics.width < 1280)

					return;

				var hasToggled = false;

				var thisElement = $(this)[0];

				switch (thisElement) {

				case $overallViewBtn[0]:

					hasToggled = $expertSection.hasClass('toggled');

					if (hasToggled)

						triggerToggleState($expertViewBtn);

					break;

				case $expertViewBtn[0]:

					hasToggled = $ownersSection.hasClass('toggled');

					if (hasToggled)

						triggerToggleState($overallViewBtn);

					break;

				}

			}



			function triggerToggleState($toggler) {

				var args = {

				content : $toggler.data('content'),

				afterText : $toggler.data('after-text'),

				currText : $toggler.data('text'),

				autoScroll : $toggler.data('autoscroll')

				};

				toggleView = new ss.Toggle($toggler, args);

				toggleView.action();

			}



			eventBridge.on(eventDictionary.global.RESIZE, function() {

                if( ss.metrics.deviceLayoutId > 1 ){

                    $sortByTit.attr( "data-ignore-height", true );

                    $sortBtn.attr( "data-ignore-height", true );

                }else{

                    $sortByTit.removeAttr( "data-ignore-height" );

                    $sortBtn.removeAttr( "data-ignore-height" );

                }



                if( ss.metrics.device != 'desktop' ) return;

                if( $expertSection.hasClass( 'toggled') && $ownersSection.hasClass( 'toggled') ){

                    triggerToggleState( $overallViewBtn );

                }

            });

		}



		function initPopover(self){

			var bElm = self.attr('data-element');

			var bContent = $(self.attr('data-content-cls')).html();

			var bContainer = self.attr('data-container');

			new ss.Popover(bElm, {placement: 'auto top',content: bContent,html: true,container: bContainer,lightbox: 'true'});

		}



		/**

		 * Setup popovers.

		 *

		 * @method setupPopovers

		 */

        function setupPopovers() {

			sharePopover = new ss.Popover('.media-module .media.share', {placement: 'auto top',content: $('#share-popover').html(),html: true,container: 'body',animation: false});

			//awardsPopover = new ss.Popover('.awards-module .award-button', {placement: 'left auto', content: $('.awards-popover-content').html(), html: true, container: '.featured-review-wrap', animation: false});

			//addToCart = new ss.Popover('.nor-button:eq(1)', {placement: 'top', content: $('#addCartList').html(), html: true, container: 'body', animation: false});		/* ADD ADNSTYLE */

			//new ss.Popover('.shop-button', {placement: 'auto top', content: $('.shop-popover-content').html(), html: true, container: '#shop-popover-container', lightbox: 'true'});

			//new ss.Popover('.buy-button', {placement: 'auto top', content: $('.whereBox-content').html(), html: true, container: '#shop-popover-container', lightbox: 'true'});		/* ADD ADNSTYLE */



			$('.auto-popover').each(function() {

				initPopover($(this));

			});



			//Inits the "Shop It" popovers functionality

			$(document).on('shown.bs.popover', '.shop-button', function() {

				ss.commonWidgets.initShopWidget();

			});



			$(document).on('shown.bs.popover', '.popover-base', function() {

				$(this).addClass('active');

			});

			$(document).on('hidden.bs.popover', '.popover-base', function() {

				$(this).removeClass('active');

			});

			$(document).on('shown.bs.popover', '.share', function() {

				var shareWidgetTimeout = setTimeout(function() {

					ss.commonWidgets.initShareWidget();

					clearTimeout(shareWidgetTimeout);

				}, 100);

			});

			$('.ss-compare-button').on('keydown', function(e) {



				if (e.keyCode === 13 || e.which === 13) {

					var compareWidgetTimeout = setTimeout(function() {

						ss.commonWidgets.initCompareWidget();

						clearTimeout(compareWidgetTimeout);

					}, 150);

				}



			});



            $( document ).on( 'shown.bs.popover', '#seeAllAvailability', function() {

                var buyWidgetTimeout = setTimeout( function() {

                    ss.commonWidgets.setDefaultFocusInWidget( "#shop-popover-container .popover .shop-popover" );

                    clearTimeout(buyWidgetTimeout);

                }, 100);

            });



            $( document ).on( 'shown.bs.popover', '#jumpToSeeAllAvailability', function() {

                var buyWidgetTimeout = setTimeout( function() {

                    ss.commonWidgets.setDefaultFocusInWidget( "#shop-popover-container .popover .shop-popover" );

                    clearTimeout(buyWidgetTimeout);

                }, 100);

            });



            $( document ).on( 'shown.bs.popover', '.ratings-button', function() {

                var reviewWidgetTimeout = setTimeout( function() {

                    ss.commonWidgets.setFocusAtInWidget( ".popover .popover-content>.ylayerBox .icoStarBox>span:first-child" );

                    clearTimeout(reviewWidgetTimeout);

                }, 100);

            });



            // where to buy data setting.

            if(SITE_CD != 'ar') {

            	onlineRetailer();

            }

        }



        // where to buy관련.

        function onlineRetailer(){



			var buyOnlineUseSite = $("#buyOnlineUseSite").val();

			var buyInStoreUseSite = $("#buyInStoreUseSite").val();



        	var param = {};



        	param.siteCode	 = $("#siteCode").val();

        	param.modelCode	 = $("#modelCode").val();

        	param.modelName	 = $("#modelName").val();

        	param.displayName= $("#displayName").val();

        	param.iaCode	 = $("#iaCode").val();

        	param.entry 	 = "product";

        	param.groupName  = $("#group").val();

        	param.typeName	 = $("#type").val();

        	param.subTypeName	 = $("#subtype").val();



			if(buyOnlineUseSite.indexOf(',' + SITE_CD + ',') >= 0 && buyInStoreUseSite.indexOf(',' + SITE_CD + ',') >= 0){ // online retailer, storelocator

				onlineRetailerInfo(1, param);

			} else if (buyOnlineUseSite.indexOf(',' + SITE_CD + ',') >= 0) { // online retailer

				onlineRetailerInfo(2, param);

			} else if (buyInStoreUseSite.indexOf(',' + SITE_CD + ',') >= 0) { // storelocator

				onlineRetailerInfo(3, param);

			}

        }



		/**

		Review Submit Popover Events



		@method bindReviewSubmitEvents

		@author syy.song

		**/

		function bindReviewSubmitEvents() {



			// SUBMIT A REVIEW 일 경우 Omniture 적용

			$('.ratings-button').on('click', function() {

				sendClickCode('content_click', 'submit a review');

			});



			var $reviewSubmitPopup = $('#ratings-popover-container');



			$reviewSubmitPopup.on('focus', '[id^=y_radio]', function() {

			    var $this = $( this );

			    var id = $this.attr( "id" );

			    var $label = $this.siblings( "label[ for="+id+"]");

			    $label.addClass( "focused" );

			});

			$reviewSubmitPopup.on('blur','[id^=y_radio]', function() {

			    var $this = $( this );

			    var id = $this.attr( "id" );

			    var $label = $this.siblings( "label[ for="+id+"]");

			    $label.removeClass( "focused" );

			});



			/**

			 * Write Form 이벤트

			 */

			// 별점체크

			$reviewSubmitPopup.on('click', '.ratings-write-content .icoStarBox span', function(event) {

				var $this = $(this);

				var rating = $this.attr('rating');

				var $starDiv =  $this.parent().parent();

				var $ratingDiv = $this.parent();

				var $ratingText = $this.parent().parent().find('.fl');

				$ratingDiv.find('span').each(function() {

					(rating >= $(this).attr('rating') ? $(this).addClass('on').removeClass('off') : $(this).addClass('off').removeClass('on'));

				});

				$this.parent().attr('rating', rating);



				$ratingDiv =$ratingDiv.detach();

				$starDiv.find('p:eq(1)').before($ratingDiv);



				switch (rating) {

				case '1':

					$ratingText.text(pdpMsg.poor);

					$ratingDiv.find('span:eq(0)').focus();

					break;

				case '2':

					$ratingText.text(pdpMsg.fair);

					$ratingDiv.find('span:eq(1)').focus();

					break;

				case '3':

					$ratingText.text(pdpMsg.average);

					$ratingDiv.find('span:eq(2)').focus();

					break;

				case '4':

					$ratingText.text(pdpMsg.good);

					$ratingDiv.find('span:eq(3)').focus();

					break;

				case '5':

					$ratingText.text(pdpMsg.excellent);

					$ratingDiv.find('span:eq(4)').focus();

					break;

				default:

					$ratingText.text('');

					break;

				}



			});



			// 별점체크

			$reviewSubmitPopup.on('keydown', '.ratings-write-content .icoStarBox span', function(event) {

				if (event.keyCode === 13){

					event.preventDefault();

					var $this = $(this);

					var rating = $this.attr('rating');

					var $starDiv =  $this.parent().parent();

					var $ratingDiv = $this.parent();

					var $ratingText = $this.parent().parent().find('.fl');

					$ratingDiv.find('span').each(function() {

						(rating >= $(this).attr('rating') ? $(this).addClass('on').removeClass('off') : $(this).addClass('off').removeClass('on'));

					});

					$this.parent().attr('rating', rating);



					$ratingDiv =$ratingDiv.detach();

					$starDiv.find('p:eq(1)').before($ratingDiv);



					switch (rating) {

					case '1':

						$ratingText.text(pdpMsg.poor);

						$ratingDiv.find('span:eq(0)').focus();

						break;

					case '2':

						$ratingText.text(pdpMsg.fair);

						$ratingDiv.find('span:eq(1)').focus();

						break;

					case '3':

						$ratingText.text(pdpMsg.average);

						$ratingDiv.find('span:eq(2)').focus();

						break;

					case '4':

						$ratingText.text(pdpMsg.good);

						$ratingDiv.find('span:eq(3)').focus();

						break;

					case '5':

						$ratingText.text(pdpMsg.excellent);

						$ratingDiv.find('span:eq(4)').focus();

						break;

					default:

						$ratingText.text('');

						break;

					}

				}



			});





			// PREVIEW 버튼 클릭

			$reviewSubmitPopup.on('click', '.ratings-write-content .y_btnBox01 .ratings-submit-button', function() {

				// Validate

				if (!validateWriteForm())

					return;

				// submit form show

				$('.terms-content').hide();

				$('.review-content').hide();

				$('.ratings-submit-content').show();

				$('.ratings-submit-content').nextAll().hide();

				barSize(); // bar size 재계산

				$(this).parents('.popover-content').animate({scrollTop: 0}, 500);

				// submit Setting

				submitFormSetting();

				// Omniture 적용

				sendClickCode('reviews', 'consumer review:wirte');

			});



			// terms&conditions 버튼 클릭

			$reviewSubmitPopup.on('click', '.ratings-write-content .y_btnBox02 .terms-button', function() {

				sendClickCode('reviews', 'review:terms conditions');

				window.open('http://reviews.'+SITE_CD+'.samsung.com/content/' + reviewSubmitPopup.message.bvDisplayCd + '/termsandconditions.htm', 'termsConditionWindow', 'width=500px,height=550px');

			});



			// reivew guidelines 버튼 클릭

			$reviewSubmitPopup.on('click', '.ratings-write-content .y_btnBox02 .review-button', function() {

				sendClickCode('reviews', 'review:review guidelines');

				window.open('http://reviews.'+SITE_CD+'.samsung.com/content/' + reviewSubmitPopup.message.bvDisplayCd + '/guidelines.htm', 'guideLinesWindow', 'width=500px,height=550px');

			});



			// 내부 팝업 close 버튼 클릭

			$reviewSubmitPopup.on('click', '.ratings-write-content .icon-close-x.hide-parent', function(event) {

				event.preventDefault();

				$(this).parent().hide();

			});





			/**

			 * Submit Form 이벤트

			 */

			// terms&conditions 버튼 클릭

			$reviewSubmitPopup.on('click', '.ratings-submit-content .terms-button', function() {

				window.open('http://reviews.'+SITE_CD+'.samsung.com/content/' + reviewSubmitPopup.message.bvDisplayCd + '/termsandconditions.htm', 'termsConditionWindow', 'width=500px,height=550px');

			});

			// 내부 팝업 close 버튼 클릭

			$reviewSubmitPopup.on('click', '.ratings-submit-content .icon-close-x.hide-parent', function(event) {

				event.preventDefault();

				$(this).parent().hide();

			});

			// edit 버튼 클릭

			$reviewSubmitPopup.on('click', '.ratings-submit-content .edit-button', function(event) {

				// submit form hide

				$('.terms-content').hide();

				$('.ratings-submit-content').hide();

				$('.ratings-submit-content').nextAll().show();

				$(this).parents('.popover-content').animate({scrollTop: 0}, 500);

			});

			// submit 버튼 클릭

			$reviewSubmitPopup.on('click', '.ratings-submit-content .submit-button', function(event) {

				if (confirm(reviewSubmitPopup.message.validateSubmit)) {

					reviewSubmit();

				}

			});





			/**

			 * Private Function

			 */

			// Validate & submit Setting

			var validateWriteForm = function() {

				var $wform = $reviewSubmitPopup.find('.ratings-write-content');



				var title = $wform.find('[name=title]').val2();

				var reviewText = $wform.find('[name=reviewText]').val2();

				var userNickname = $wform.find('[name=userNickname]').val2();

				var userEmail = $wform.find('[name=userEmail]').val2();



				// validation

				if ('' === title || '' === reviewText || '' === userNickname || '' === userEmail) {

					alert(reviewSubmitPopup.message.validateBlank);

					return false;

				}

				if (reviewText.length < 50) {

					alert(reviewSubmitPopup.message.validateDetail);

					return false;

				}

				if (userNickname.length < 4) {

					alert(reviewSubmitPopup.message.validateNickname);

					return false;

				}

				var reg = new RegExp("^[\\w\\-]+(\\.[\\w\\-_]+)*@[\\w\\-]+(\\.[\\w\\-]+)*(\\.[a-zA-Z]{2,3})$", "gi");

				if (!reg.test(userEmail)) {

					alert(reviewSubmitPopup.message.validateEmail);

					return false;

				}

				return true;

			};



			// Review Submit Form 초기화

			var submitFormSetting = function() {

				var $wform = $reviewSubmitPopup.find('.ratings-write-content');

				var $sform = $reviewSubmitPopup.find('.ratings-submit-content');



				var title = $wform.find('[name=title]').val2();

				var reviewText = $wform.find('[name=reviewText]').val2();

				var userNickname = $wform.find('[name=userNickname]').val2();

				var userEmail = $wform.find('[name=userEmail]').val2();



				// submit setting

				$sform.find('[form-name=userNickname]').text(userNickname);

				$sform.find('[form-name=title]').text(title);

				// HTML Escape

				reviewText = reviewText.replace(/<script[^>]*>(.|[\t\n\r])*<\/script>/gi, '');

				reviewText = reviewText.replace(/>/gi, '&gt;');

				reviewText = reviewText.replace(/</gi, '&lt;');

				reviewText = reviewText.replace(/%3C/gi, '&lt;');

				reviewText = reviewText.replace(/%3E/gi, '&gt;');

				reviewText = reviewText.replace(/\n/gi, '<br/>');

				$sform.find('[form-name=reviewText]').html(reviewText);

				$sform.find('[form-name=userEmail]').attr('href', 'mailto:' + userEmail).text(userEmail);

				$wform.find('[ratingType]').each(function() {

					var ratingType = $(this).attr('ratingType');

					var rating = $(this).attr('rating');

					if ('rating' === ratingType) {

						var ortLabel = reviewSubmitPopup.message.overallRatingTypeLabel;

						$sform.find('[ratingType=rating]').attr('aria-label', ortLabel.replace('#rating#', rating));

						$sform.find('span[group=rating]').each(function() {

							(rating >= $(this).attr('rating') ? $(this).addClass('on').removeClass('off') : $(this).addClass('off').removeClass('on'));

						});

					} else {

						var rtLabel = reviewSubmitPopup.message.ratingTypeLabel;

						$sform.find('[ratingType=' + ratingType + '] h4').attr('aria-label', rtLabel.replace('#ratingtype#', ratingType).replace('#rating#', rating));

						$sform.find('[ratingType=' + ratingType + '] .rating-value').text(rating + '/5');

						var $barFull = $sform.find('[ratingType=' + ratingType + '] .barfull').eq(0);

						var barSize = $barFull.css('background-size').split('px')[0] / 5;

						$sform.find('[ratingType=' + ratingType + '] .barfull').css('width', rating * barSize);

					}

				});

			};



			// 리뷰 등록

			var reviewSubmit = function() {

				// parameter setting

				var $wform = $reviewSubmitPopup.find('.ratings-write-content');

				var param = {

					'title': $wform.find('[name=title]').val2(),

					'reviewtext': $wform.find('[name=reviewText]').val2(),

					'usernickname': $wform.find('[name=userNickname]').val2(),

					'useremail': $wform.find('[name=userEmail]').val2(),

					'isrecommended': $wform.find('[name=recommend]:checked').val(),

				};

				$wform.find('[ratingType]').each(function() {

					($(this).attr('rating') > 0 ? param[$(this).attr('ratingType')] = $(this).attr('rating') : param[$(this).attr('ratingType')] = '');

				});

				//var url = '/' + SITE_CD + '/data-consumer/review-submit/' + $('#modelCode').val();

				var url = 'http://api.bazaarvoice.com/data/submitreview.json?ApiVersion=5.4&PassKey=' + reviewSubmitPopup.message.passKey + '&ProductId=' + $('#modelCode').val().replace("/", "_") + '&Action=submit';

				$.ajax({

					type: 'POST',

					url: url,

					dataType: 'json',

					data: param,

					success: function(data) {

						// Omniture 적용

						sendClickCode('reviews', 'consumer review:review submit');

						// 팝업 클로즈

						$.Popover.activePopover.hide();

						$('.lightbox-skrim').remove();

					},

					error: function(data) {

						// 팝업 클로즈

						$.Popover.activePopover.hide();

						$('.lightbox-skrim').remove();

					}

				});

			};

		}







		/**

		Bind events.



		@method bindEvents

		**/

		function bindEvents() {

			/* breadcrumb 카테고리 URL 정보가 없을경우 처리 */

			$('.breadcrumb').find('a').on('click', function(e) {

				e.preventDefault();



				var breadcrumbURL = $(this).attr('href');



				if(breadcrumbURL == undefined || breadcrumbURL == null || breadcrumbURL == "" || breadcrumbURL == "#"){

					if($(this).attr("iaType") == "type"){

						breadcrumbURL =  '/'  + SITE_CD + '/consumer/' + $('#group').val() + '/' + $('#type').val() + '/';

					} else {

						breadcrumbURL =  '/'  + SITE_CD + '/consumer/' + $('#group').val() + '/' + $('#type').val() + '/' + $('#subtype').val() + '/';

					}

				}

				location.href = breadcrumbURL;

				return false;

			});



            /* 140610 ADD ADNSTYLE */

            $('.download-item-group .toggler').on('click', function (ev) {

                var mobile = new RegExp('(^mobile)');

                if (!mobile.test(ss.metrics.device)){

                    ev.preventDefault();

                    return false;

                }

            });

            /* 140610 ADD ADNSTYLE */



			// E-commerce 버튼 처리

			$('a.clearfix.toggle').on('click', function() {

				if ($('a.clearfix.toggle').hasClass('link-toggled')) {

					$('a.clearfix.toggle').addClass('active');

					$('a.clearfix.toggle').next('.nor-btnList').show();

				}

				else {

					$('a.clearfix.toggle').removeClass('active');

					$('a.clearfix.toggle').next('.nor-btnList').hide();

				}

			});





			/* ADD ADNSTYLE */

			$('.toggle').on('click', function(e) {

				eventBridge.trigger('myScroll', {link: this});

			});



			eventBridge.on('myScroll', function(e, data) {

				var $self = $(data.link);

				if ($self.hasClass('clsBtn')) {

					$self.parent().prev('.header').find('.icon-plus').removeClass('icon-minus');

				}

				if ($self.hasClass('extra-specs') && $self.attr('data-autoscroll') == "true") {

					if (!$('.more-specs').find('> .header').next().hasClass('toggled')) {

						$('.more-specs').find('> .header').trigger('click');

						var offset = ss.metrics.elemTop($('.more-specs'));

						ss.htmlBody.animate({scrollTop: offset}, 1000);

					}

				}

				if ($self.hasClass('top-wrap')) {

					if (!$('.header').next().hasClass('toggled')) {

						$('.product-specs-full').find('> .header').trigger('click');

						if ($self.hasClass('_bind-init2click')) {

							$self.removeClass('_bind-init2click');

						}

						else {

						//var offset = ss.metrics.elemTop($('.product-specs-full'));

						//ss.htmlBody.animate({ scrollTop : offset }, 1000);

						}

					}

				}

			});



			$('.play-btn').on('click', function() {

				if ($(this).parents('.bizcolumn').length > 0)

					return false;

				$('.vm-player').css('z-index', '100');

			});



			$('.close-video').on('click', function() {

				$('.vm-player').css('z-index', '0');

			});





			mediaModule.on(ss.clickEvent, '.save', function() {

				mediaModule.addClass('save-focus').removeClass('share-focus');

			});



			mediaModule.on(ss.clickEvent, '.share', function() {

				mediaModule.addClass('share-focus').removeClass('save-focus');

			});



			// Modify review sort popover after opening.

			//reviewSortButton.on('click', function() {

			//	reviewSortPopover.toggle();

			//	reviewsModule.find('.popover').width(reviewSortButton.width() - 10);



			//	reviewsModule.find('.popover').css({'top': (Number(reviewsModule.find('.popover').css('top').replace('px','')) + 9),'left': reviewSortButton.offset().left - reviewsModule.offset().left});

			//});



			reviewsModule.on(ss.clickEvent, '.review-sort-popover .sort', function() {

				//reviewSortPopover.hide();



				reviewSortButton.find('p').text($(this).attr('data-sort-text'));

			});



			reviewsModuleTabs.on(ss.clickEvent, function() {

				new ss.Tabs($(this), $(this).parents('ul').data('contents')).init();

			});



			instoreMapTabs.on(ss.clickEvent, function() {

				new ss.Tabs($(this), $(this).parents('ul').data('contents')).init();

			});



			reviewsModule.on(ss.clickEvent, '.reviews.expert .review .text .expand-button', function() {

				var collapsedContent = $(this).parent().find('.collapsed');

				var ellipses = $(this).parent().find('.ellipses');

				if (collapsedContent.hasClass('hide')) {

					collapsedContent.removeClass('hide');

					ellipses.hide();

					$(this).text($(this).attr('data-see-less-text'));



				} else {

					collapsedContent.addClass('hide');

					ellipses.show();

					$(this).text($(this).attr('data-see-more-text'));

				}

			});



			findInStore.on(ss.clickEvent, function() {

				$(this).toggleClass('active');

				instoreMap.stop().slideToggle(500, function() {

					$(this).toggleClass('hide');

				});

			});



			eventBridge.on(eventDictionary.global.RESIZE, function() {

				//heroSize();

				barSize(); /* ADD ADNSTYLE */

				setMediaNum();

			// $('.hero-module').first()

			//	 .css( 'background-size', 'cover' )

			//	 .css( '-webkit-background-size', 'cover' );

			// console.log( 'hero.size()' );



			});







			// $( window ).on( 'orientationchange', function(e) {



			//	 $('.hero-module').first()

			//		 .css( 'background-size', 'cover' )

			//		 .css( '-webkit-background-size', 'cover' );

			//	 console.log( 'window.orientationChange()' );



			// });



			reviewsModule.find('.sort-list a').on(ss.clickEvent, function() {

				var sortButton = reviewsModule.find('.sort-button');



				reviewsModule.find('.sort-list a.selected').removeClass('selected');

				$(this).addClass('selected');

				sortButton.find('.sort-button-text').html($(this).text() + ' <span class="icon-plus icon icon-minus"></span>');



				sortButton.click().focus();



				// @SDS This is where interaction with the service would occur based on filter type.

				var filterType = $(this).attr('data-filter-type');

			});

			//heroSize();

			barSize(); /* ADD ADNSTYLE */



			// IE에서 placeholder를 인식하지 못하는 문제

			if (navigator.appVersion.match(/MSIE [\d.]+/)) {

				$('.ratings-button').on('click', function() {

					$('#ratings-popover-container .input input[type=text], .input textarea').each(function() {

						$(this).val() == '' ? $(this).val($(this).attr('placeholder')) : false;

					});

				});

				// Placeholders.js가 작동을 안해서 임시처리

				$('#ratings-popover-container').on('blur', '.input input[type=text], .input textarea', function() {

					if ($(this).val() == '') {

						$(this).val($(this).attr('placeholder'));

						$(this).attr('data-placeholder-active', true);

					} else {

						$(this).attr('data-placeholder-active', false);

					}

				});

				$('#ratings-popover-container').on('focus', '.input input[type=text], .input textarea', function() {

					if ($(this).val() == $(this).attr('placeholder')) {

						$(this).val('');

					}

				});

			}



			$('.extend-list').on('click', function() {

				var iconObj = $(this).find('[class^=icon-]');

				var checkState = iconObj.attr('data-state');

				if (checkState == 'plus') {

					iconObj.attr('data-state', 'minus').removeClass('icon-plus').addClass('icon-minus');

					$(this).parent().find('li.hide').removeClass('hide').addClass('is-hide');

				}

				else {

					iconObj.attr('data-state', 'plus').removeClass('icon-minus').addClass('icon-plus');

					$(this).parent().find('li.is-hide').addClass('hide');

				}

			});

		/*$('.extra-specs').on('click', function(){

		$(this).parents('.product-specs-module').find('.module-heading').trigger('click');

	  });*/



			$('.ss_samsung').delegate('.cart-popover > .close-button', 'keydown', function(e)  {

                if(e.keyCode === 13 || e.keyCode === 32) {

                    $(this).trigger('click');

                    $('#addToCart').focus();

                }

            });

		}



		/**

		@function ratingSortTabIndex

		Modify tab index of reviews sort option based upon window size

		**/

		function ratingSortTabIndex() {

			if (ss.metrics.device !== 'desktop') {

				reviewsModule.find('.sort-list a').attr('tabindex', '-1');

			}

		}



		function loadAwards() {

			if ($(".awards-popover").length) {

				$(".awards-popover").insertAfter(".featured-review-wrap .title");

			}

		}



		function barSize() {

			$(".bars > .barfull").each(function(idx) {

				$(".bars:eq(" + idx + ") > .barfull").css("background-size", parseInt($(".bars:eq(" + idx + ") > .barfull").parent().width()) + "px 5px")

			});



			if (window.innerWidth > 1279) {

				$(".awards-popover ul > li.hide").addClass('is-hide').removeClass('hide');

				$(".awards-popover a.y_btnMore").addClass('hide').hide().find('[class^=icon-]').attr('data-state', 'minus').removeClass('icon-plus').addClass('icon-minus');

			}

			else {

				if ($(".awards-popover ul > li").length < 5) {

					$(".awards-popover a.y_btnMore").addClass('hide').hide();

				}

				else {

					if ($(".awards-popover a.y_btnMore").hasClass('hide')) {

						$(".awards-popover a.y_btnMore").removeClass('hide').show();

					}

				}

			}

		}





		/**

		@function heroSize

		Sets height of the hero section based upon window size

		**/

		function heroSize() {

			var hero = $('.hero-module').first();

			if (hero.hasClass('d-height')) {

				var perHeight = (parseInt(hero.attr('d-height')) * (parseInt($(window).height() / 100)));

				if (ss.metrics.device == 'mobile') {

					if (perHeight > 420)

						perHeight = 420;

					else if (perHeight < 300) {

						perHeight = 300;

					}

				}

				else {



					if (perHeight > 600)

						perHeight = 600;

					else if (perHeight < 420) {

						perHeight = 420;

					}

				}

				hero.attr('height', perHeight + 'px');

			}

			var slideHeight = hero.find('li').first().outerHeight(),

			winheight = $(window).innerHeight(), heroHeight, sampleHeroHeight;



			if (ss.metrics.device === "desktop")

				heroHeight = 600, sampleHeroHeight = 500;

			else if (ss.metrics.device === "tablet-landscape")

				heroHeight = 600, sampleHeroHeight = 500;

			else if (ss.metrics.device === "tablet-portrait")

				heroHeight = 600, sampleHeroHeight = 500;

			else

				heroHeight = 420, sampleHeroHeight = 360;

/*			if (hero.hasClass('d-height')) {

				heroHeight = hero.attr('height');

			}

			else {

				hero.css('height', heroHeight);

			}*/



			heroHeight = parseInt(heroHeight) + 'px';

			sampleHeroHeight = parseInt(sampleHeroHeight) + 'px';

			if ($('.ss_samsung.pdp_wow').length == 0) {

				if ($('.ss-carousel').hasClass('sample')) {

					$('.ss-carousel').css('height', sampleHeroHeight);

				} else {

					$('.ss-carousel').css('height', heroHeight);

				}

				$('.ss-carousel').find('[class*="hero"]').each(function() {

					if ($(this).hasClass('sample')) {

						$(this).css('height', sampleHeroHeight);

					} else {

						$(this).css('height', heroHeight);

					}

				});



				$('.sampleimages-hero .ss-carousel').css('height', $('.sampleimages-hero .ss-carousel').parent().height());

				$('.sampleimages-hero .ss-carousel').find('[class*="hero"]').each(function() {

					$(this).css('height', sampleHeroHeight);

				});



			}

			else {

				var device = ss.metrics.device;

				var ratio;



				switch (device) {

					case 'mobile':

						ratio = 1.43;

						break;

					case 'mobile-landscape':

						ratio = 0.51875;

						break;

					case 'tablet-portrait':

						ratio = 1.43;

						break;

					case 'tablet-landscape':

						ratio = 0.51875;

						break;

					case 'desktop':

						ratio = 0.51875;

						break;

				}

				var heroCC2Height = $('.hero-cc').width() * ratio;



				$('div.hero-module').height(heroCC2Height);

				$('.ss-carousel').find('[class*="hero"]').each(function() {

					$(this).height(heroCC2Height);

				});



			}

			//$('.ss-carousel').find('[class*="hero"]').css('height', heroHeight);

			$('.vm-player').css('height', heroHeight); /* ADD ADNSTYLE */

		//var winheight = $(window).innerHeight(),

		//	heroHeight = (75 * winheight) / 100;

		//

		//heroHeight = parseInt(heroHeight) + 'px';

		//$('#content').find('[class*="hero"]').css('height', heroHeight);

		}



		init();

	};

    /**

	 * PDPJumpModule class

	 *

	 * @class $.PDPStandard.PDPJumpModule

	 * @constructor

	 */

	ss.PDPStandard.PDPJumpModule = function(params) {



		var container = $('.jump-module');

		var containerClone = container.clone();

		var toggleButton = container.find('.header');

		var jumpLinks = null;

		var jumpLinksClone = null;

		var jumpLinksCount = -1;

		var toggleButtonClone = containerClone.find('.header');

		var jumpShim = $('.jump-module-shim');

		var jumpContents = $('.jump-contents');

		var moreItems = $('.more-item');

		var firstMoreItem = (moreItems && moreItems.length > 0) ? moreItems.eq(0) : null;

		var hasMore = (firstMoreItem) ? true : false;

		var jumpCollapsedHeight = 71;

		var collapsed = false;

		var docked = false;

		var self = this;

		var haltScrollListener = false;

		var currentWinWidth = ss.metrics.width;

		var currentWinHeight = ss.metrics.height;

		var selctedItem = null;

		var scrollUpdate = true;

		var infoSection = null;

		var infoSectionPl = null;

		var infoSectionPr = null;

		var btnSection = null;

		var btnGoTop = $('.btn-go-top');

		var backTotop = $('.topBtn');

		var currentScrollNo = -1;

		var scrollUse = null;

		//delivery-module
		var indexForDeliverModule =  jumpContents.length-1;

		if(backTotop.length === 0){
			backTotop = $('.back-top');
		}

		/**

		 * Initializaiton function which runs at object instantiation time.

		 *

		 * @method init

		 */

		function init() {

			var divider = $('.jump-divider');

			toggleButtonClone.removeClass('expanded');

			$('body').append(containerClone);



			var latestReview = $('.latest-expert-section');

			var ownerSection = $('.owners-section');

			var scrollWrapper = ss.scrollWrapper;

			// Toggle open/closed state

			$('body').on(ss.clickEvent, '.jump-module .header', function() {

				var $elem = $(this);

				if ($elem.hasClass('expanded')) {

					hide();

				} else {

					show();

				}

			});



			btnGoTop.on(ss.clickEvent, function() {

				sendClickCode('jumpto','back to top:floating');

				ss.htmlBody.animate({scrollTop : 0}, 1000);

			});



			$('body').on(ss.clickEvent, '.jump-links ul li a', function(e) {

				links = $('.jump-module ul li a');

				links.removeClass('clicked');

				var jumpTo = $('.' + $(this).data('jump'));

				currentJumpLink = this;

				e.preventDefault();

				e.stopPropagation();

				if (jumpTo && jumpTo.length > 0) {



					haltScrollListener = true;

					haltSelect = true;



					var bodyAnimateTimeout = setTimeout(function() {



						dock(true);

						var toggle = jumpTo.children('.toggle:not(.link-toggled)');

						if (toggle.length > 0) {

							toggle.click();

						}

						ss.htmlBody.animate({

							scrollTop : (ss.metrics.elemTop(jumpTo))

						}, 1000);

						var haltScrollTimeout = setTimeout(function() {

							haltScrollListener = false;

							clearTimeout(haltScrollTimeout);

						}, 500);

						clearTimeout(bodyAnimateTimeout);

					}, 10);

				}

			});



			$('body').on(ss.clickEvent, '.jump-toggle', function(e) {

				if (container.hasClass('open')) {

					container.removeClass('open');

					containerClone.removeClass('open');

				} else {

					container.addClass('open');

					containerClone.addClass('open');

				}

			});



			function checkBtnGoTopOverBottom() {

				if (!docked) return;

				if (($(window).scrollTop() + $(window).height()) > backTotop.offset().top) {

				//	(btnGoTop.hasClass('on')) ? btnGoTop.removeClass('on') : null;

				} else {

					(!btnGoTop.hasClass('on')) ? btnGoTop.addClass('on') : null;

				}

			}



			var scrollValue = -1;

			eventBridge.on(eventDictionary.global.SCROLL, function(e, metrics) {

				checkBtnGoTopOverBottom();

				// if (haltScrollListener || metrics.device ===

				// 'tablet-landscape' || metrics.device === 'desktop') {return;}

				var jumpTop = (container.offset().top)

				if (metrics.scrollTop >= jumpTop) {

					dock();

				} else {

					undock();

				}



				if (docked && scrollUpdate) {
					//delivery-module
					//if(!$('.jump-contents').hasClass('delivery-module')){
						setSelectedItemAt(getCurrentListItem(metrics.scrollTop),null);
					//}
				}


				dir = scrollValue < metrics.scrollTop ? 'down' : 'up';

				scrollValue = metrics.scrollTop;



				if (container.hasClass('open')) {

					container.removeClass('open');

					containerClone.removeClass('open');

				}

			});



			eventBridge.on(eventDictionary.global.RESIZE, function(e, metrics) {

				checkBtnGoTopOverBottom();

				currentWinHeight = ss.metrics.height;

				currentWinWidth = ss.metrics.width;

				var currentWin

				updateInfoSection();

				if (!metrics) {

					if (currentWinHeight <= 680 || ss.metrics.device === 'tablet-landscape' || ss.metrics.device === 'desktop') {

						undock();

					}

				}



				if ($('a.clearfix.toggle').is(':visible')) {

					if ($('a.clearfix.toggle').hasClass('link-toggled')) {

						$('a.clearfix.toggle').next('.nor-btnList').show();

					} else {

						$('a.clearfix.toggle').next('.nor-btnList').hide();

					}

				} else {

					$('a.clearfix.toggle').next('.nor-btnList').show();

				}



				if (ownerSection.length > 0 && latestReview.length > 0) {

					if ( ss.metrics.device === 'desktop' ) {

						if (latestReview.data("insertBefore") != 'true') {

							latestReview.insertBefore(ownerSection);

							latestReview.data("insertBefore", 'true');

						}

					} else {

						if (latestReview.data("insertBefore") != 'false') {

							latestReview.insertAfter(ownerSection);

							latestReview.data("insertBefore", 'false');

						}

					}

				}

			});

		}



		var updateInfoSection = function() {

			if (ss.metrics.width >= 768) {

				if (!infoSectionPl)

					infoSectionPl = parseInt(infoSection.css("padding-left"));

				if (!infoSectionPr)

					infoSectionPr = parseInt(infoSection.css("padding-right"));

				infoSection.width(container.outerWidth() - btnSection.outerWidth() - infoSectionPl - infoSectionPr - 20);

			} else {

				infoSection.css("width", "100%");

			}

		}



		var undock = function() {

			if (!docked) {

				return;

			}

			btnGoTop.removeClass( "on" )

			docked = false;

			containerClone.removeClass('docked');

			show();

			container.css('visibility', 'visible');

			btnSection.hide();

			setSelectedItem(jumpLinks.eq(0));

		};



		var dock = function(force) {

			// if (currentWinHeight <= 680) {return;}

			var f = typeof force === 'undefined' ? false : force;

			if (docked && !f) {

				return;

			}

			btnGoTop.addClass( "on" );

			containerClone.addClass('docked');

			container.css('visibility', 'hidden');

			hide();

			docked = true;

			btnSection.show();



			// 모바일 버젼일 경우 jump-module의 버튼이 겹치는 현상 수정.

			var jumpModuleCnt = $('body').find('.jump-module:last > p.btn-section > a:visible').length;



			if(jumpModuleCnt == 2){

				$('body').find('.jump-module:last > p.btn-section > a').each(function (idx) {

					if ($(this).css('display') != 'none') {

						if(!$(this).hasClass('[class^=btn-type]')){

							$(this).addClass(idx == 1 ? 'btn-type-left': 'btn-type-right');

						}

					}

				});

			}



		};



		var getCurrentListItem = function(scrollTop) {

			var contentsTop = 0;

			var contentsHeigth = 0;

			var $contents;

			scrollTop += 50

			for ( var i = 0, count = jumpContents.length; i < count; i += 1) {

				$contents = jumpContents.eq(i);

				contentsTop = $contents.offset().top - container.outerHeight();

				contentsHeigth = $contents.outerHeight();

				if( i === 0 ){
					contentsHeigth = jumpContents.eq(1).offset().top - contentsTop - $(".jump-module.docked").height();
				}

				if (contentsTop <= scrollTop && scrollTop <= contentsTop + contentsHeigth) {

					return i;

				} else if (hasMore && firstMoreItem.offset().top - container.outerHeight() <= scrollTop) {

					return jumpLinksCount - 1;

				}

			}

			return -1;

		};


		// jumptobar Click 시 글자 파란색
		var setSelectedItem = function($item) {

			if (selctedItem)

				selctedItem.removeClass('on');

			if (!$item)

				return;

			$item.addClass('on');

			selctedItem = $item;

		};



		var dir = null;

		var setSelectedItemAt = function(idx,scrollUse) {

			// jumptobar Click 시 글자 파란색
			setSelectedItem((idx == -1) ? null : jumpLinksClone.eq(idx));

			if(idx != -1 && currentScrollNo != idx){

				//delivery-module
				if (idx > jumpContents.length-1){
					currentScrollNo = indexForDeliverModule;
				} else {
					currentScrollNo = idx;
				}


				var currentItemLowerNm = $($('.jump-module').eq(0).find('.jump-link li a')[currentScrollNo]).attr('tag-code').toLowerCase();


				// jumptobar Click 시 tagging 
				if(scrollUse == "N"){

					sendClickCode('jumpto','jump to:'+currentItemLowerNm)

				    console.log("click : " +currentItemLowerNm);

				}else{

					sendClickCode('jumpto','jump to:scroll:'+currentItemLowerNm);

					console.log("scroll : " +currentItemLowerNm);

				}

			}

		};



		/**

		 * @method hide

		 */

		function hide() {

			toggleButton.removeClass('expanded');

			toggleButtonClone.removeClass('expanded');

			collapsed = true;

		}



		/**

		 * @method show

		 */

		function show() {

			toggleButton.addClass('expanded');

			toggleButtonClone.addClass('expanded');

			collapsed = false;

		}


		//jump to link 생성
		function createItems() {

			var firstMoreItemIndex = (hasMore) ? jumpContents.index(firstMoreItem) : -1;

			var listContainer = $('.jump-module > .jump-link-list > ul');

			var label = null;

			var tag = null;

			var $item;

			jumpContents.each(function(index, item) {

				label = $(item).find('.module-heading > .heading-text').text();

				tag =  $(item).attr( "tag-code" );

				if ($(item).attr( "tag-code" ) == null){

					tag = $(item).attr("id");

					if(tag == undefined || tag == null || tag == ""){

						tag = label;

						if(tag == "특장점"){ //RFC #196
							tag ="feature";
						}

					}

				}

				if ($(item).attr("id")==null && label=="상품평"){

					tag = "reviews";

				}



				/*

				if(tag == undefined || tag == null || tag == ""){

					tag = label;

				}

				*/

				//delivery-module
				if(tag=='delivery-module'){
					console.log('original label= ' + label);
 					$item = $('<li><a href="javascript:void(0);" class="jump-link" tag-code="'+tag+'">' + '배송/교환/반품' + '</a></li>');
					listContainer.append($item);
					$item = $('<li><a href="javascript:void(0);" class="jump-link" tag-code="'+tag+'">' + '판매자 정보' + '</a></li>');
					listContainer.append($item);
					if (categoryCodeAirConditioner == 'LI05') {
						$item = $('<li id="Jump_LI05"><a href="javascript:void(0);" class="jump-link"  tag-code="'+tag+'">' + '에어컨 설치비 안내' + '</a></li>');
						listContainer.append($item);
					}

				} else {
					$item = $('<li><a href="javascript:void(0);" class="jump-link" tag-code="'+tag+'">' + label + '</a></li>');
					listContainer.append($item);
				}

			});

			if (hasMore)

				listContainer.append($('<li><a href="javascript:void(0);" class="jump-link" data-href=".go-more" tag-code="MORE">' + pdpMsg.more + '</a></li>'));



			jumpLinks = container.find('ul li a.jump-link');

			jumpLinksClone = containerClone.find('ul li a.jump-link');

			jumpLinksCount = jumpLinksClone.length;



			setSelectedItem(jumpLinks.eq(0));

			// sec lazy loading 관련 height 재계산 로직 추가
			// goToHandlerFirst start
			var goToHandlerFirst = function (jumpTo) {

				dock(true);
				haltScrollListener = true;
				
				var bodyAnimateTimeout = setTimeout(function() {
					
					ss.htmlBody.stop().animate({
						scrollTop : (ss.metrics.elemTop(jumpTo))
							}, 1000, function() {
							scrollUpdate = true;
					});

					var haltScrollTimeout = setTimeout(function() {
						haltScrollListener = false;
						clearTimeout(haltScrollTimeout);
					}, 500);

		            clearTimeout(bodyAnimateTimeout);

				}, 10);
			}

			var eventCnt = 0;
			// goToHandlerFirst end

			var goToHandler = function(event) {

				var $item = $(this);

				var index = ((event.data.isClone) ? jumpLinksClone : jumpLinks).index($item);

				var dataHref = $item.attr('data-href');

				var jumpTo;

				if (dataHref == ".go-more")

					jumpTo = firstMoreItem;

				else 
					jumpTo = jumpContents.eq(index);

				scrollUpdate = false;

				if(jumpTo && jumpTo.length > 0){

					scrollUse = "N";

				}else{
					//delivery-module
					if (index > jumpContents.length-1){
						scrollUse = "N";
					} else {
						scrollUse = "";

						console.log("not scrollUse"+scrollUse);
					}
				}

				setSelectedItemAt(index,scrollUse);

				if (jumpTo && jumpTo.length > 0) {
					dock(true);
					haltScrollListener = true;

					if (eventCnt == 0) {

						if ("desktop".indexOf(getOmniDeviceType())!=-1) {

							var bodyAnimateTimeout = setTimeout(function() {
								ss.htmlBody.stop().animate({
									scrollTop : (ss.metrics.elemTop(jumpTo)-1000)
								}, 1000, function() {
									scrollUpdate = true;
									jumpContents.eq(index).find('.module-heading').trigger('focus');
									goToHandlerFirst(jumpTo);
								});
								var haltScrollTimeout = setTimeout(function() {
									haltScrollListener = false;
									clearTimeout(haltScrollTimeout);
								}, 500);
								clearTimeout(bodyAnimateTimeout);
							}, 10);

						} else {

							var bodyAnimateTimeout = setTimeout(function() {
								ss.htmlBody.stop().animate({
									scrollTop : (ss.metrics.elemTop(jumpTo))
								}, 1000, function() {
									scrollUpdate = true;
									jumpContents.eq(index).find('.module-heading').trigger('focus'); 
									goToHandlerFirst(jumpTo);
								});
								var haltScrollTimeout = setTimeout(function() {
									haltScrollListener = false;
									clearTimeout(haltScrollTimeout);
								}, 500);
								clearTimeout(bodyAnimateTimeout);
							}, 10);		
						
						}
						eventCnt++;
					} else { // if (eventCnt != 0) 

						var bodyAnimateTimeout = setTimeout(function() {
							ss.htmlBody.stop().animate({
								scrollTop : (ss.metrics.elemTop(jumpTo))
							}, 1000, function() {
								scrollUpdate = true;
								jumpContents.eq(index).find('.module-heading').trigger('focus');
							});
							var haltScrollTimeout = setTimeout(function() {
								haltScrollListener = false;
								clearTimeout(haltScrollTimeout);
							}, 500);
							clearTimeout(bodyAnimateTimeout);
						}, 10);
					} //else end

				} else if (index > jumpContents.length-1) { //start //delivery-module
					dock(true);
					haltScrollListener = true;

					if (eventCnt == 0) {

						if ("desktop".indexOf(getOmniDeviceType())!=-1) {

							var bodyAnimateTimeout = setTimeout(function() {
								ss.htmlBody.stop().animate({
									scrollTop : (ss.metrics.elemTop(jumpContents.eq(indexForDeliverModule))-1000)
								}, 1000, function() {
									scrollUpdate = true;
									jumpContents.eq(index).find('.module-heading').trigger('focus');
									goToHandlerFirst(jumpContents.eq(indexForDeliverModule));
								});
								var haltScrollTimeout = setTimeout(function() {
									haltScrollListener = false;
									clearTimeout(haltScrollTimeout);
								}, 500);
								clearTimeout(bodyAnimateTimeout);
							}, 10);

						} else {

							var bodyAnimateTimeout = setTimeout(function() {
								ss.htmlBody.stop().animate({
									scrollTop : (ss.metrics.elemTop(jumpContents.eq(indexForDeliverModule)))
								}, 1000, function() {
									scrollUpdate = true;
									jumpContents.eq(index).find('.module-heading').trigger('focus'); 
									goToHandlerFirst(jumpContents.eq(indexForDeliverModule));
								});
								var haltScrollTimeout = setTimeout(function() {
									haltScrollListener = false;
									clearTimeout(haltScrollTimeout);
								}, 500);
								clearTimeout(bodyAnimateTimeout);
							}, 10);		
						
						}
						eventCnt++;
					} else { // if (eventCnt != 0) 

						var bodyAnimateTimeout = setTimeout(function() {
							ss.htmlBody.stop().animate({
								scrollTop : (ss.metrics.elemTop(jumpContents.eq(indexForDeliverModule)))
							}, 1000, function() {
								scrollUpdate = true;
								jumpContents.eq(index).find('.module-heading').trigger('focus');
							});
							var haltScrollTimeout = setTimeout(function() {
								haltScrollListener = false;
								clearTimeout(haltScrollTimeout);
							}, 500);
							clearTimeout(bodyAnimateTimeout);
						}, 10);
					} //else end
				}//end //delivery-module


				if (container.hasClass('open')) {

					container.removeClass('open');

					containerClone.removeClass('open');

				}

				event.preventDefault();

				event.stopPropagation();

			}



			jumpLinksClone.on(ss.clickEvent, {

				isClone : true

			}, goToHandler);

			jumpLinks.on(ss.clickEvent, {

				isClone : false

			}, goToHandler);

			infoSection = $(".info-section");

			btnSection = $(".btn-section");

			eventBridge.trigger(jQuery.Event(eventDictionary.global.RESIZE));

		}



		init();

		createItems();

		btnSection.hide();

	};



	/**

	 * PDPFeaturesController class

	 *

	 * @class $.PDPStandard.PDPFeaturesController

	 * @constructor

	 */

	ss.PDPStandard.PDPFeaturesController = function(params) {

		var container = $('.features-module');

		var moreFeaturesWrapper = container.find('.more-features');

		var moreFeatures = moreFeaturesWrapper.find('.feature,.mgFeature_more');



		/**

		 * Initializaiton function which runs at object instantiation time.

		 *

		 * @method init

		 */

		function init() {



			var features = $('.features-module .set-size');

			// mobile-portrait: 360x640

			// mobile-landscape: 640x360

			// tablet-portrait: 800x1150

			// tablet-landscape: 1280x700

			// desktop: 1920x1129



			var onResize = function(e, metrics) {

				var h,

				w = metrics.width,

				device = metrics.device;



				if (device === 'mobile') {

					h = (w * 1150) / 800;

				} else if (device === 'mobile-landscape') {

					h = (w * 1150) / 800;

				} else if (device === 'tablet-portrait') {

					h = (w * 1472) / 1024;

				} else if (device === 'tablet-landscape') {

					h = (w * 684) / 1280;

				} else {

					h = (w * 1026) / 1920;

				}



				if (ss.metrics.isIE8() === 8) {

					w = 1280;

					h = (w * 684) / 1280;

				}



				features.css({

					width: w,

					height: h

				});

			};

			eventBridge.on(eventDictionary.global.RESIZE, function() {

				onResize(null, ss.metrics);



				if (!window.tmpCnt) {

					window.tmpCnt = 0;

				}

				window.tmpCnt += 1;

			/*

			 * $('#s7viewer').hide(); if (window.scene7 &&

			 * window.scene7.container && window.scene7.container.resize ) { var

			 * tmp=setTimeout(function(){

			 *

			 * window.tmpCnt -= 1; clearTimeout(tmp); if ( window.tmpCnt == 0 ) {

			 * window.scene7.container.resize($('#s7viewer').width(),

			 * $('#s7viewer').height());

			 * window.scene7.zoomView.resize($('#s7viewer').width(),

			 * $('#s7viewer').height()); $('#s7viewer').show(); } },200); }

			 */



			});

			// todo toggle refer

			container.find('.view-more-features .module-heading').on(ss.clickEvent, function() {



				if (!$(this).hasClass('expanded')) {

					$(this).addClass('expanded');



					moreFeatures.show();



					var offset = ss.metrics.elemTop(moreFeaturesWrapper);

					ss.htmlBody.animate({scrollTop: offset}, 1000);

				} else {

					$(this).removeClass('expanded');



					moreFeatures.hide();

				}



				container.find('.icon-plus').toggleClass('icon-minus');



			});



			onResize(null, ss.metrics);

		}



		init();

	};



	/**

	 * PDDAccessories class

	 *

	 * @class $.PDPStandard.PDDAccessories

	 * @constructor

	 */

	ss.PDPStandard.PDPAccessories = function(params) {

		var currentAccessory = 0;

		var accessoriesAnim = false;



		var container = $('.accessories-module');

		var containerLayout = container.find('.wrap');

		var accessoriesWraps = containerLayout.children('li');

		var accessories = $('.accessory');

		var carousel = []; /* ADD ADNStyle */



		var carouselSwipe = null;



		var previousAccessory = 0;



		/**

		Initializaiton function which runs at object instantiation time.



		@method init

		**/

		function init() {

			initAccessories();

		}



		function initCarousel() {

			if (carousel) {

				return;

			}



		/* skip carousel

			//container.removeClass('no-carousel').addClass('ss-carousel');

			//carousel = new ss.Carousel(container, {});

			//carousel.init();

	  */

		// carousel.fastTabFix();

		}



		function removeCarousel() {

			//carousel.destroy();

			carousel = null;

			containerLayout.css('width', '100%');

			container.removeClass('ss-carousel').addClass('no-carousel');

		}



		function needsCarousel() {

			var ie8 = ss.metrics.isIE8();

			return (ss.metrics.width <= 800 && !ie8);

		}

		/**

		@function initAccessories

		Setup accessories carousel

		**/

		function initAccessories() {



			if (needsCarousel()) {

				initCarousel();

			}

			eventBridge.on(eventDictionary.global.RESIZE, function() {

				if (needsCarousel()) {

					initCarousel();

				} else if (carousel) {

					removeCarousel();

				}

			});



			eventBridge.on(eventDictionary.global.EVENT_SHOW_VIDEO, function() {





			});



			accessoriesAltClasses();

		}



		/**

		Apply alternating classes style in IE8

		**/

		function accessoriesAltClasses() {

			var i;

			for (i = 0; i < accessories.length; i++) {

				var accessory = accessories.eq(i);

				i % 4 === 0 ? accessory.addClass('alternate') : '';

				(i + 1) % 4 === 0 ? accessory.addClass('alternate') : '';

				i % 2 === 0 ? accessory.addClass('odd') : accessory.addClass('even');

			}

		}



		init();

	};



	/**

	PDPThreeSixty class



	@class $.PDPStandard.PDPThreeSixty

	@constructor

	**/

	ss.PDPStandard.PDPThreeSixty = function(params) {

		// 기존url 값에  sitecode 값 받는 부분 없어서 추가

		var siteCode = $('#siteCode').val();

		var container = $('.threesixty-module');

		var containerAnim = false;

		var assetContainer = container.find('.product');



		var slider = container.find('.slider');

		var sliderHandle;

		var playButton = container.find('.play-button');

		var pauseButton = container.find('.pause-button');



		var threeSixtyButton = $('#threesixty-tab'); //$('.media-module').find('.threesixty');

		var closeButton = container.find('.close-button');



		var numAsets = 0;



		var currentPosition = 1;



		var isAnimating = false;

		var animTimer;

		var imgs = [];



        var onslideCnt=0;

        var assets;





		var spinSetId = assetContainer.attr('data-url');

		//		http://127.0.0.1:8080/spinImage/uk_PS51F4500AWXXU_black_spinset?mType=json

		if (siteCode != undefined && spinSetId != undefined

		&& siteCode != null && spinSetId != null && spinSetId != "") {

			//testurl :: /uk/spinImage/uk_EC-WB850FBPBGB_spin?mType=json

			//var url = '/' + siteCode + '/data-consumer/spinImage/' + spinSetId + '?mType=json';



			var url;



			var urlDomain = document.location.href.match(/http[s]*:\/\/([a-zA-Z0-9\-\.]*)/)[1];



			if(urlDomain.indexOf("preview4") > -1){

				url = 'http://stg-images.samsung.com/is/image/samsung/' + spinSetId;

			} else {

				url = 'http://images.samsung.com/is/image/samsung/' + spinSetId;

			}



			console.info("url  : " + url );



			$.ajax({

				url: url,

				data:  {

					req     : "imageset,json",

					handler : "S7jsonResponse"

				},

				dataType: 'jsonp',

				jsonpCallback : "S7jsonResponse",

				success: function(json) {



					responseData = eval(json);



					spinIArray = responseData.IMAGE_SET.split(",");



					numAsets = spinIArray.length;

					var imageList = spinIArray;



					for (var i = 0; i < numAsets; i++) {

						var asset = $('<div class="asset"></div>');

						//asset.append('<img class="loading-asset async-img" src="http://images.samsung.com/is/image/' + imageList[i] + '?wid=1080&amp;hei=1080' + '" alt="' + $('#displayName').val() + '" />');

						assetContainer.append(asset);



		                imgs[i] = new ss.AsyncImageLoader({

		                    container: asset,

		                    imagePath: "http://images.samsung.com/is/image/" + imageList[i].replace(";", "") + "?wid=1080&hei=1080",

		                    altText: $('#displayName').val(),

		                    instantLoad: false

		                });



						if (i === 0) {

							asset.css( 'display', 'block' );

							imgs[i].loadImg();

						}

					}



					assets = $( '.asset' );



					if (numAsets > 1) {

						init();

					} else {

						wrapBtnSize();

					}

				},

				error: function(xmlData) {

					console.info("Load Error!");

					wrapBtnSize();

				}

			});



			function wrapBtnSize() {

				$('#threesixty-tab').remove();



				// media-module 버튼 사이즈 재설정

				var num;

				if (ss.metrics.deviceLayoutId == 1 && !isIE8) {

					num = $(".media-module .wrap .media").not(".threesixty").length;

				} else {

					num = $(".media-module .wrap .media").length;

				}



				$(".media-module .wrap").removeClass(function(index, css) {

					var classes = css.match(/num-[0-9]/g);

					if (classes) {

						return classes[0];

					} else {

						return null;

					}

				});

	        	$( ".media-module .wrap" ).addClass( "num-" + num );

			}



			/**

				Initializaiton function which runs at object instantiation time.



				@method init

				**/

			function init() {

				var onSlideFn = ss.metrics.isIE8() || ss.metrics.isMobile() ? onSlideIE8 : onSlide

				slider.noUiSlider({

					range: [1, numAsets],

					start: 1,

					handles: 1,

					step: 1,

					slide: onSlideFn,

					set: function() {

						onSlideFn(true);

					}

				});



				sliderHandle = slider.find('.noUi-handle');

				sliderHandle.append('<span class="icon-slideHandle"></div>');



				bindEvents();



			}



	        var currentAsset;

	        function onSlideIE8(force) {

	            var sliderPosition = Math.round(slider.val());

	            if(sliderPosition !== currentPosition || force) {

	            	if( currentAsset ) currentAsset.css( 'display', 'none' );

	            	var asset = assets.eq( sliderPosition );

	            	asset.css( 'display', 'block' );

	            	currentAsset = asset;

	            }

	        }



			function onSlide(force) {

				var sliderPosition = Math.round(slider.val());



				if (sliderPosition !== currentPosition || force) {

	            	var asset = assets.eq( sliderPosition );

	            	if( asset.css( 'display' ) != 'block' ) asset.css( 'display', 'block' );

	            	asset.css( "z-index", onslideCnt++ );



					currentPosition = sliderPosition;

				}

			}



			function bindEvents() {



	            if(isWow){

	                threeSixtyButton.on(ss.clickEvent, threeSixtyButtonClickHandler_wow);

	                eventBridge.on(eventDictionary.pdpStandard.EVENT_HERO_SHOW, heroShow_wow);

	                eventBridge.on(eventDictionary.pdpStandard.EVENT_GALLERY_SHOW, galleryShow_wow);

	                eventBridge.on(eventDictionary.pdpStandard.EVENT_SAMPLEIMAGES_SHOW, sampleImagesShow_wow);

	                closeButton.on('click', closeButtonClickHandler_wow);

	            }else{

	                threeSixtyButton.on(ss.clickEvent, threeSixtyButtonClickHandler_standard);

	                eventBridge.on(eventDictionary.pdpStandard.EVENT_HERO_SHOW, heroShow_standard);

	                eventBridge.on(eventDictionary.pdpStandard.EVENT_GALLERY_SHOW, galleryShow_standard);

	                eventBridge.on(eventDictionary.pdpStandard.EVENT_SAMPLEIMAGES_SHOW, sampleImagesShow_standard);

	                closeButton.on('click', closeButtonClickHandler_standard);

	            }



	            function threeSixtyButtonClickHandler_wow() {



					/* Analytics_tagging */

					sendClickCode('pdp_360', '360');



					if (!containerAnim) {

						$('.media-module .media.current').removeClass('current');

						threeSixtyButton.addClass('current');



						containerAnim = true;



						container.slideDown(500, function() {

							containerAnim = false;

						});

						ss.scrollWrapper.scrollTop(0);





						eventBridge.trigger(jQuery.Event(eventDictionary.pdpStandard.EVENT_THREESIXTY_SHOW));

					}

					$('.play-button').trigger('click');

	            }



	            function threeSixtyButtonClickHandler_standard() {



					/* Analytics_tagging */

					sendClickCode('pdp_360', '360');



	                if(!containerAnim) {

	                    if(!viewSection.hasClass('on')) viewSection.addClass('on');



	                    $('.media-module .media.current').removeClass('current');

	                    threeSixtyButton.addClass('current');



	                    containerAnim = false;



	                    container.css('display', 'block');



	                    $('.lightbox-skrim').remove();

	                    $('body').append('<div class="lightbox-skrim"></div>');

	                    $('.lightbox-skrim').on(ss.clickEvent, function (){

	                        closeButton.trigger('click');

	                    });



	                    eventBridge.trigger(jQuery.Event(eventDictionary.pdpStandard.EVENT_THREESIXTY_SHOW));

	                    viewSection[0].popAlign();



	                    closeButton.focus();

	                }

	                $('.play-button').trigger('click');

	            }



	            function heroShow_wow(e, data){

	                container.slideUp(500);

	            }



	            function heroShow_standard(e, data){

	                container.css('display', 'none');

	            }



	            function galleryShow_wow(e, data){

	                container.slideUp(500);

	            }



	            function galleryShow_standard(e, data){

	                container.css('display', 'none');

	            }



	            function sampleImagesShow_wow(e, data){

	                container.slideUp(500);

	            }



	            function sampleImagesShow_standard(e, data){

	                container.css('display', 'none');

	            }



				// 360 close

	            function closeButtonClickHandler_wow(e) {



					e.preventDefault();



					$('.media-module .media.current').removeClass('current');



					if (isAnimating) {

						stopAnim();

					}



					container.slideDown(500, function() {

						containerAnim = false;

						$('.media-module').find('.gallery').trigger(ss.clickEvent);

					//eventBridge.trigger(jQuery.Event(eventDictionary.pdpStandard.EVENT_GALLERY_SHOW));

					});

				//eventBridge.trigger(jQuery.Event(eventDictionary.pdpStandard.EVENT_HERO_SHOW));

				//eventBridge.trigger(jQuery.Event(eventDictionary.pdpStandard.EVENT_THREESIXTY_PAUSE));

				}



	            function closeButtonClickHandler_standard(e) {



	                e.preventDefault();



	                $('.media-module .media.current').removeClass('current');



	                if(isAnimating) {

	                    stopAnim();

	                }



	                if(viewSection.hasClass('on')) viewSection.removeClass('on');

	                threeSixtyButton.focus();



	                eventBridge.trigger(jQuery.Event(eventDictionary.pdpStandard.EVENT_HERO_SHOW));

	                eventBridge.trigger(jQuery.Event(eventDictionary.pdpStandard.EVENT_THREESIXTY_PAUSE));

	            }



				function loadRestImgs() {

					for ( var i = 1; i < numAsets; i++) {

						imgs[i].loadImg();

					}

				}



				sliderHandle.on('click touchstart touchend', function() {

					if (isAnimating) {

						stopAnim();

					}

				});



				playButton.on('click', function() {

					if (!isAnimating) {

						startAnim();

					}

				});



				pauseButton.on('click', function() {

					if (isAnimating) {

						stopAnim();

					}

				});



				eventBridge.on(eventDictionary.pdpStandard.EVENT_THREESIXTY_PAUSE, function(e, data) {

					if (isAnimating) {

						stopAnim();

					}

				});



	            eventBridge.on(eventDictionary.pdpStandard.EVENT_THREESIXTY_SHOW, function(e, data) {

	                loadRestImgs();

	                //adding a timeout to compensate for 450ms transition to show the controls

	                var startAnimTimeout = window.setTimeout( function(){

	                    startAnim();

	                    clearTimeout(startAnimTimeout);

	                }, 550 );

	            });





			}







			function startAnim() {

				isAnimating = true;

				playButton.addClass('active');

				pauseButton.removeClass('active');

				if (animTimer) {

					clearInterval(animTimer);

				}

				animTimer = setInterval(advanceAnim, 100);

			}



			function advanceAnim() {

				currentPosition++;

				if (currentPosition > numAsets) {

					currentPosition = 0;

				}



				slider.val(currentPosition, true);

			}



			function stopAnim() {

				isAnimating = false;

				pauseButton.addClass('active');

				playButton.removeClass('active');



				clearInterval(animTimer);

			}

		}



		if ($('#threesixtyType').val() == 'D') {

			if (ss.metrics.device == "desktop") {

				$('#threesixty-tab').css('display', '');

				threeSixty3DBind();

			}

		}



		function threeSixty3DBind() {



            if(isWow){

                threeSixtyButton.on(ss.clickEvent, threeSixtyButtonClickHandler_wow);

                eventBridge.on(eventDictionary.pdpStandard.EVENT_HERO_SHOW, heroShow_wow);

                eventBridge.on(eventDictionary.pdpStandard.EVENT_GALLERY_SHOW, galleryShow_wow);

                eventBridge.on(eventDictionary.pdpStandard.EVENT_SAMPLEIMAGES_SHOW, sampleImagesShow_wow);

                closeButton.on('click', closeButtonClickHandler_wow);

            }else{

                threeSixtyButton.on(ss.clickEvent, threeSixtyButtonClickHandler_standard);

                eventBridge.on(eventDictionary.pdpStandard.EVENT_HERO_SHOW, heroShow_standard);

                eventBridge.on(eventDictionary.pdpStandard.EVENT_GALLERY_SHOW, galleryShow_standard);

                eventBridge.on(eventDictionary.pdpStandard.EVENT_SAMPLEIMAGES_SHOW, sampleImagesShow_standard);

                closeButton.on('click', closeButtonClickHandler_standard);

            }



            function threeSixtyButtonClickHandler_wow() {



				/* Analytics_tagging */

				sendClickCode('pdp_360', '360');



				if (!containerAnim) {

					$('.media-module .media.current').removeClass('current');

					threeSixtyButton.addClass('current');



					containerAnim = true;



					container.slideDown(500, function() {

						containerAnim = false;

					});

					ss.scrollWrapper.scrollTop(0);

					//$(window).scrollTop(0); //IE8



					eventBridge.trigger(jQuery.Event(eventDictionary.pdpStandard.EVENT_THREESIXTY_SHOW));

				}

			}



            function threeSixtyButtonClickHandler_standard() {



				/* Analytics_tagging */

				sendClickCode('pdp_360', '360');



                if(!containerAnim) {

                    if(!viewSection.hasClass('on')) viewSection.addClass('on');



                    $('.media-module .media.current').removeClass('current');

                    threeSixtyButton.addClass('current');



                    containerAnim = false;



                    container.css('display', 'block');



                    $('.lightbox-skrim').remove();

                    $('body').append('<div class="lightbox-skrim"></div>');

                    $('.lightbox-skrim').on(ss.clickEvent, function (){

                        closeButton.trigger('click');

                    });



                    eventBridge.trigger(jQuery.Event(eventDictionary.pdpStandard.EVENT_THREESIXTY_SHOW));

                    viewSection[0].popAlign();



                    closeButton.focus();

                }

            }



            function heroShow_wow(e, data){

                container.slideUp(500);

            }



            function heroShow_standard(e, data){

                container.css('display', 'none');

            }



            function galleryShow_wow(e, data){

                container.slideUp(500);

            }



            function galleryShow_standard(e, data){

                container.css('display', 'none');

            }



            function sampleImagesShow_wow(e, data){

                container.slideUp(500);

            }



            function sampleImagesShow_standard(e, data){

                container.css('display', 'none');

            }



            function closeButtonClickHandler_wow(e) {



				e.preventDefault();



				$('.media-module .media.current').removeClass('current');



				if (isAnimating) {

					stopAnim();

				}



				container.slideDown(500, function() {

					containerAnim = false;

					$('.media-module').find('.gallery').trigger(ss.clickEvent);

				});



				threeSixtyButton.focus();

			}



            function closeButtonClickHandler_standard(e) {



                e.preventDefault();



                $('.media-module .media.current').removeClass('current');



                if(isAnimating) {

                    stopAnim();

                }



                if(viewSection.hasClass('on')) viewSection.removeClass('on');

                threeSixtyButton.focus();



                eventBridge.trigger(jQuery.Event(eventDictionary.pdpStandard.EVENT_HERO_SHOW));

                eventBridge.trigger(jQuery.Event(eventDictionary.pdpStandard.EVENT_THREESIXTY_PAUSE));

            }



		}

	};



	ss.PDPStandard.IE8Zoom = function(params) {

		var container = params.container,

		zoomIn = params.zoomIn,

		zoomOut = params.zoomOut,

		maxScale = (params.scale - 1),

		currentScale = 0,

		breakpoints = [],

		currentDims = {

			width: 0,

			height: 0,

			left: 0,

			top: 0,

			'marginLeft': 0

		};





		function init() {

			refreshDimensions();

			bindEvents();

		}



		function bindEvents() {

			zoomIn.on('click', function() {

				zoom('in');

			});

			zoomOut.on('click', function() {

				zoom('out');

			});

		}



		function refreshDimensions() {

			var positionToUse = container.is(':visible') ? 'offset' : 'position';

			currentDims = {

				width: (container.outerWidth()),

				height: (container.outerHeight()),

				left: (container[positionToUse]().left),

				top: (parseInt(container.css('top'), 10)),

				'marginLeft': 0

			};



			breakpoints[0] = currentDims;

			for (var i = 1, len = (maxScale + 1); i < len; i++) {

				var b = breakpoints[i - 1];

				var newW = b.width + (b.width * 0.2);

				var newH = b.height + (b.height * 0.2);

				var newL = b.left - ((newW - b.width) / 2);

				var newT = b.top - ((newH - b.height) / 2);



				breakpoints[i] = {

					width: newW,

					height: newH,

					left: newL,

					top: newT,

					'marginLeft': 0

				};

			}

		}



		function zoom(which) {

			if (which === 'in' && currentScale < maxScale) {

				currentScale = currentScale + 1;

				//container.css(updateZoomDimensions('in'));

				container.css(breakpoints[currentScale]);

			} else if (which === 'out' && currentScale > 0) {

				//container.css(updateZoomDimensions('out'));

				currentScale = currentScale - 1;

				container.css(breakpoints[currentScale]);

			}

			if (currentScale === 0) {

				container.attr('data-zoom-direction', 'in');

			} else if (currentScale === maxScale) {

				container.attr('data-zoom-direction', 'out');

			}

		}



		init();

	};



	/**

	PDPGallery class



	@class $.PDPStandard.PDPGallery

	@constructor

	**/

	ss.PDPStandard.PDPGallery = function(params) {



		var container = $('.gallery-module');

		var containerAnim = false;

		var assetContainer = container.find('.product');



		var galleryButton = $('.media-module').find('.gallery');

		var closeButton = container.find('.close-button');

		var zoomIn = container.find('.zoom-in-button');

		var zoomOut = container.find('.zoom-out-button');



		var thumbnailGallery = container.find('.thumbnail-gallery');



		var firstLoad = true;

		var prdColor = getUrl('color');



		var selectColor = null;

		var selectIndex = 0;



		var isPanning = false;



		var prevArrow = thumbnailGallery.find('.prev');

		var nextArrow = thumbnailGallery.find('.next');



		var currentThumbnail = 0;

		var thumbnailsAnim = false;



		var currentSwatchID;

		window.imgServerUrlChk = $($('#prdImgData').find('[data-heroimagetype="G"]')[0]).find('div').attr('data-media-tablet-portrait');



		if (imgServerUrlChk == null) {

			imgServerUrlChk = "http://images.samsung.com/is/image/";

		} else {

			imgServerUrlChk = imgServerUrlChk.substr(0, imgServerUrlChk.indexOf('/is/')) + "/is/image/";

		}

		console.info("imgServerUrlChk :: ", imgServerUrlChk);



		//var zoomViewer = window.scene7 = new s7viewers.ZoomViewer();



		var video_url = $('#prdImgData').find("[data-heroimagetype='V']");



		window.assetJson = {"set": {"n": "scene","pv": "1.0","type": "media_set","item": [{"type": "img_set","set": {"n": "scene","type": "img_set","item": []}}]}};



		var productData = {'products': [{}]};

		var bindColorNames = $('#bindColorNames').val();

		if (bindColorNames == undefined || bindColorNames == null || bindColorNames == 'nocolor') {

			bindColorNames = ['default'];

		} else {

			bindColorNames = bindColorNames.split(',');

		}



		var bindColors = $('#bindColors').val();

		if (bindColors == undefined || bindColors == null || bindColors == "") {

			bindColors = ['default'];

		} else {

			bindColors = bindColors.split(',');

		}



		var rsptImgColor = $('#rpstColorCode').val();



		var defaultColorIndex = $('#selectColor').find('a').index($('#selectColor').find('[data-rsptColor="Y"]'));

		if(defaultColorIndex == -1){

			defaultColorIndex = 0;

			if(rsptImgColor != undefined  && rsptImgColor != null && rsptImgColor != ""){

				for(var i=0; i < bindColors.length; i++ ){

					if(rsptImgColor == bindColors[i]){

						defaultColorIndex = i;

					}

				}

			}

		}



		var defaultColor =  $('#selectColor').find('[data-rsptColor="Y"]').attr('data-color');

		if(defaultColor == undefined ){

			defaultColor = null;

			if(rsptImgColor != undefined  && rsptImgColor != null && rsptImgColor != ""){

				for(var i=0; i < bindColors.length; i++ ){

					if(rsptImgColor == bindColors[i]){

						defaultColor = bindColors[i];

					}

				}

			}

		}



		for (var i = 0; i < bindColorNames.length; i++) {

			var image_url = $('#prdImgData').find("[gallery-color-type='" + bindColors[i] + "']");

			productData.products[i] = {'swatchColor': bindColorNames[i],'swatchColorCode': bindColors[i],'images': []};



			var j = 0;

			for (; j < image_url.length; j++) {

				var assetUrl = '';

				if ($(image_url[j]).attr('gallery-image-url').indexOf('samsung/') != -1) {

					assetUrl = $(image_url[j]).attr('gallery-image-url').substr($(image_url[j]).attr('gallery-image-url').indexOf('samsung/'));

				} else {

					assetUrl = $(image_url[j]).attr('gallery-image-url');

				}

				productData.products[i].images[j] = {

					'type': 's7',

					'thumbnail': $(image_url[j]).attr('gallery-thumb-url')

					,'url': imgServerUrlChk

					,'asset': assetUrl + "?i=" + j

					,'width': $(image_url[j]).attr('gallery-size-width')

					,'height': $(image_url[j]).attr('gallery-size-height')

				};

			}



			for (var k = 0; k < video_url.length; k++) {

				var assetUrl = '';

				var assetWidth = '';

				var assetHeight = '';

				if ($(video_url[k]).find('div').attr('gallery-image-url').indexOf('samsung/') != -1) {

					assetUrl = $(video_url[k]).find('div').attr('gallery-image-url').substr($(video_url[k]).find('div').attr('gallery-image-url').indexOf('samsung/'));

					assetWidth = ($(video_url[k]).find('div').attr('gallery-size-width') == undefined || $(video_url[k]).find('div').attr('gallery-size-width') == "") ? "3000" : $(video_url[k]).find('div').attr('gallery-size-width');

					assetHeight = ($(video_url[k]).find('div').attr('gallery-size-height') == undefined || $(video_url[k]).find('div').attr('gallery-size-height') == "") ? "2000" : $(video_url[k]).find('div').attr('gallery-size-height')

				} else {

					assetUrl = "samsung/gallery_thumbnail";

					assetWidth = "700";

					assetHeight = "467";

				}



				if ($(video_url[k]).find('div').attr('gallery-image-url') == "") {

					productData.products[i].images[j] = {'thumbnail': "http://images.samsung.com/is/image/samsung/gallery_thumbnail"

						,'asset': assetUrl + "?i=" + j

						,'code': $(video_url[k]).find('div').attr('gallery-code')

						,'type': $(video_url[k]).find('div').attr('gallery-videoType') == "B" ? "be" : "yt"

						,'width': assetWidth

						,'height': assetHeight

					};

				} else {

					productData.products[i].images[j] = {'thumbnail': $(video_url[k]).find('div').attr('gallery-thumb-url')

						,'asset': assetUrl + '?i=' + j

						,'code': $(video_url[k]).find('div').attr('gallery-code')

						,'type': $(video_url[k]).find('div').attr('gallery-videoType') == "B" ? "be" : "yt"

						,'width': assetWidth

						,'height': assetHeight

					};

				}



				j++;

			}



		}



		// 첫 로딩 시 clr 값이 있을 경우 clr 컬러코드로 컬러칩 세팅

		var clrColor = $('#clr').val();

		if ((clrColor != "") && (clrColor != undefined) && (clrColor != null)) {

			clrColor = '#' + $('#clr').val();

			// 컬러칩 하이라이트 변경

			$('#selectColor').find('.swatch').removeClass('active');

			$('#selectColor').find('[data-color="' + clrColor + '"]').parent().addClass('active');

			$('#currentColor').val(clrColor);

			defaultColor = clrColor;

			// 몇번째 색상인지 체크

			$.each(productData.products, function(i) {

				if (productData.products[i].swatchColor === $('#selectColor').find('[data-color="' + defaultColor + '"]').attr('data-colorname')) {

					defaultColorIndex = i;

				}

			});

		}



		console.log("productData", productData);



		function getUrl(strParamName) {

			var strReturn = "";

			var strHref = window.location.href;

			var bFound = false;



			var cmpstring = strParamName + "=";

			var cmplen = cmpstring.length;



			if (strHref.indexOf("?") > -1) {

				var strQueryString = strHref.substr(strHref.indexOf("?") + 1);

				var aQueryString = strQueryString.split("&");

				for (var iParam = 0; iParam < aQueryString.length; iParam++) {

					if (aQueryString[iParam].substr(0, cmplen) == cmpstring) {

						var aParam = aQueryString[iParam].split("=");

						strReturn = aParam[1];

						bFound = true;

						break;

					}

				}

			}

			if (bFound == false)

				return null;

			return strReturn;

		}



		/**

		Initialization function which runs at object instantiation time.



		@method init

		**/

		function init() {

			if (productData.products.length > 1) {

				colorPickerPopover = new ss.Popover('.gallery-module .controls .color-picker', {placement: 'top',content: $('.color-picker-popover-content').html(),html: true,container: '.gallery-module',animation: false});

			}



			var modelCode = $('#modelCode').val();



			// Category에서 색상 값이 넘어올 경우

			/*if (prdColor != null && bindColorNames.length > 1) {

				for (var index = 0; index < bindColorNames.length; index++) {

					if (bindColorNames[index] == prdColor) {

						selectColor = bindColors[index];

						selectIndex = index;

					}

				}

				if (selectColor != null) {



					var url = $('#selectColor').find('[data-color="' + bindColors[selectIndex] + '"]').attr('data-url');

					var group = $('#selectColor').find('[data-color="' + bindColors[selectIndex] + '"]').attr('data-groupcode');

					var model = $('#selectColor').find('[data-color="' + bindColors[selectIndex] + '"]').attr('data-modelcode');



					if (selectIndex == defaultColorIndex) {

						$('#currentColor').val(selectColor);



					} else {



						// 그룹으로 묶이지 않은 색상일경우

						if (group == "" || group == null) {

							$('#currentColor').val(selectColor);



						// 그룹으로 묶인 색상일 경우

						} else {

							// 모델이 동일하지 않을경우

							if (model != modelCode) {

								location.href = url;

								return false;



							} else {

								// 모델이 동일한 경우

								$('#currentColor').val(selectColor);



							}

						}

					}





				} else {

					//new ss.PDPStandard.PDPeCommerce();

					$('#currentColor').val(defaultColorIndex);

				//setupThumbnailGallery(defaultColorIndex);



				}



			// Category에서 색상 값을 받지 못한 경우 또는 색상이 하나밖에 없을때

			} else {

				//new ss.PDPStandard.PDPeCommerce();

				$('#currentColor').val(defaultColorIndex);

			//setupThumbnailGallery(defaultColorIndex);

			}*/



			$('#currentColor').val(selectColor);



			bindEvents();

		}



		function galleryPopupOpen() {

			if (!containerAnim) {

				$('.media-module .media.current').removeClass('current');

				galleryButton.addClass('current');



				containerAnim = true;



				container.slideDown(500, function() {

					containerAnim = false;

				});



				ss.scrollWrapper.scrollTop(0);

				window.fromG = true;



				eventBridge.trigger(jQuery.Event(eventDictionary.pdpStandard.EVENT_GALLERY_SHOW));

				eventBridge.trigger(jQuery.Event(eventDictionary.pdpStandard.EVENT_THREESIXTY_PAUSE));

				$('.asset.current').panzoom('reset');



			}

		}



		function bindEvents() {







			container.on(ss.clickEvent, '.asset:not(.s7)', function() {

				var elem = $(this);

			/*

			  if (isPanning) {return;}



			  if (elem.attr('data-zoom-direction') === 'in') {

				zoomIn.trigger('click');

			  } else {

				zoomOut.trigger('click');

			  }

*/

			});

			galleryButton.on(ss.clickEvent, function() {



				/* Analytics_tagging */

				sendClickCode('pdp_gallery', 'gallery');



				setupThumbnailGallery(defaultColorIndex);



				if (!containerAnim) {

					$('.media-module .media.current').removeClass('current');

					galleryButton.addClass('current');



					containerAnim = true;



					container.slideDown(500, function() {

						containerAnim = false;

					});



					ss.scrollWrapper.scrollTop(0);

					window.fromG = true;



					eventBridge.trigger(jQuery.Event(eventDictionary.pdpStandard.EVENT_GALLERY_SHOW));

					eventBridge.trigger(jQuery.Event(eventDictionary.pdpStandard.EVENT_THREESIXTY_PAUSE));

					$('.asset.current').panzoom('reset');



				}





			});



			closeButton.on('click', function() {

				$('.media-module .media.current').removeClass('current');



				container.slideUp(500, function() {

					containerAnim = false;



				});

				eventBridge.trigger(jQuery.Event(eventDictionary.pdpStandard.EVENT_HERO_SHOW));

			});



			nextArrow.on(ss.clickEvent, function(e) {

				if (currentThumbnail === thumbnailGallery.find('.thumbnail').length - 10) {

					e.preventDefault();

				} else {

					currentThumbnail++;

					slideThumbnails();

				}

			});



			prevArrow.on(ss.clickEvent, function(e) {
				if (currentThumbnail === 0) {
					e.preventDefault();
				} else if (currentThumbnail >= (thumbnailGallery.find('.thumbnail').length - 9)){
					currentThumbnail = thumbnailGallery.find('.thumbnail').length - 11;
					slideThumbnails();
				} else {
					currentThumbnail--;
					slideThumbnails();
				}
			});



			window.galleryArrowNext = function() {

				if (currentThumbnail === thumbnailGallery.find('.thumbnail').length - 10) {

				} else {

					currentThumbnail++;

					slideThumbnails();

				}

			};

			window.galleryArrowPrev = function() {

				if (currentThumbnail === 0) {

				} else {

					currentThumbnail--;

					slideThumbnails();

				}

			};



			thumbnailGallery.swipe({

				swipeLeft: function(event, direction) {

					var maxPos = thumbnailGallery.find('.thumbnail').length - 10;



					if (currentThumbnail === maxPos && !thumbnailsAnim) {

						event.preventDefault();

					} else {

						currentThumbnail++;

						slideThumbnails();

					}

				},



				swipeRight: function(event, direction) {

					if (currentThumbnail === 0 && !thumbnailsAnim) {

						event.preventDefault();

					} else {



						currentThumbnail--;

						slideThumbnails();

					}

				}

			});



			thumbnailGallery.on('swipeleft', function(e) {

				var maxPos = thumbnailGallery.find('.thumbnail').length - 10;



				if (currentThumbnail === maxPos && !thumbnailsAnim) {

					e.preventDefault();

				} else {

					currentThumbnail++;

					slideThumbnails();

				}

			}).on('swiperight', function(e) {

				if (currentThumbnail === 0 && !thumbnailsAnim) {

					e.preventDefault();

				} else {

					currentThumbnail--;

					slideThumbnails();

				}

			});



			thumbnailGallery.on(ss.clickEvent, '.thumbnail', function() {



				/* Analytics_tagging */

				sendClickCode('pdp_gallery', 'gallery:image');

				if (!$(this).hasClass('current')) {

					$(thumbnailGallery).find('.thumbnail.current').removeClass('current');



					$(this).addClass('current');



					loadAsset($(this));

				//$('.asset.current').panzoom('reset');

				}

			});

			// tumbnail image arrows
			$('#gallery-panel .controls').on(ss.clickEvent, '.arrows', function() {
				sendClickCode('pdp_gallery', 'gallery:image');
				var indexNum = $(this).attr('scene-index');
				loadAsset($(this));
			});

			if (productData.products.length > 0) {

				$('#selectColor').find('a').on('click', function(e) {



					e.preventDefault();



					sendClickCode('pdp_gallery','gallery:color');



					var fromEStore = $('#fromEStore').val();

					var catid = $('#catid').val();

					var catnm = $('#catnm').val();



					var modelCode = $('#modelCode').val();

					var currentColor = $('#currentColor').val();

					//defaultColor = $('.swatch.active').children().attr('data-color');



					var thisSwatch = $(this);

					if (thisSwatch.attr('data-color') !== defaultColor) {

						var url = $(this).attr('data-url');

						var group = $(this).attr('data-groupcode');

						var model = $(this).attr('data-modelcode');



						// 몇번째 색상인지 체크

						var swatchIndex = 0;

						$.each(productData.products, function(i) {

							if (productData.products[i].swatchColor === thisSwatch.attr('data-colorname')) {

								swatchIndex = i;

							}

						});





						// 그룹으로 묶이지 않은 색상일경우

						if (group == "" || group == null) {



							setupThumbnailGallery(swatchIndex);

							galleryPopupOpen();



							$('#currentColor').val(thisSwatch.attr('data-color'));



						// 그룹으로 묶인 색상일 경우

						} else {

							// 모델이 동일하지 않을경우

							if (model != modelCode) {



								// e-store breadcrumb 정보가 있으면 함께 전달한다.

								var decodedCnm = $('<div/>').html(catnm).text();

								if(fromEStore == 'Y'){

									if(url.indexOf('?') == -1){

										location.href = url + '?catid=' + catid + '&catnm=' + decodedCnm;

									}else{

										location.href = url + '&catid=' + catid + '&catnm=' + decodedCnm;

									}

								}else{

									location.href = url;

								}

								return false;



							} else {

								// 모델이 동일한 경우

								$('#currentColor').val(thisSwatch.attr('data-color'));

								setupThumbnailGallery(swatchIndex);

								galleryPopupOpen();



							}

						}

					} else {

						$('#currentColor').val(thisSwatch.attr('data-color'));



					}

				});

			}

			zoomIn.on('click', function() {

				window.scene7.zoomView.zoomIn();



				/* Analytics_tagging */

				sendClickCode('pdp_gallery', 'gallery:zoom in');





			});

			zoomOut.on('click', function() {

				window.scene7.zoomView.zoomOut();



				/* Analytics_tagging */

				sendClickCode('pdp_gallery', 'gallery:zoom out');

			});



			eventBridge.on(eventDictionary.pdpStandard.EVENT_HERO_SHOW, function(e, data) {

				container.slideUp(500);

			});



			eventBridge.on(eventDictionary.pdpStandard.EVENT_THREESIXTY_SHOW, function(e, data) {

				container.slideUp(500);

			});



			eventBridge.on(eventDictionary.pdpStandard.EVENT_SAMPLEIMAGES_SHOW, function(e, data) {

				container.slideUp(500);

			});



		}



		function setupThumbnailGallery(swatchIndex) {
      window.scene7 = null;
      assetJson.set.item[0].set.item = [];
      assetContainer.find('.s7').empty();
      thumbnailGallery.find('.wrap').empty();

			if($('#gallery-panel .controls-wrap .thumbnail-cnt').length > 0){
				$('#gallery-panel .controls-wrap .thumbnail-cnt').remove();
				$('#gallery-panel .controls-wrap .arrows').remove();
			}

      currentThumbnail = 0;

      currentSwatchID = productData.products[swatchIndex].swatchColor;
      var sceneIdx = 0;
      var currentColorCode = productData.products[swatchIndex].swatchColorCode;
      console.info("currentSwatchID", currentSwatchID);

			// set control width
			if (productData.products[swatchIndex].images.length <= 10){
				$('#gallery-panel .thumbnail-gallery').css('width',productData.products[swatchIndex].images.length*90+'px');
				$('#gallery-panel .thumbnail-gallery .wrap').css('width',productData.products[swatchIndex].images.length*90+'px');
			}
			// big arrow element create append
			var arrowLeft = $('<a href="#none" class="arrows left_arrow" gallery-index="0" scene-index="0"></a>');
			var arrowReft = $('<a href="#none" class="arrows right_arrow" gallery-index="1" scene-index="1"></a>');
			$('#gallery-panel .controls-wrap').append(arrowLeft);
			$('#gallery-panel .controls-wrap').append(arrowReft);

      $.each(productData.products[swatchIndex].images, function(i) {

				var thumb = $('<a href="#none" class="thumbnail" alt=""><img src="http://images.samsung.com/is/image/'+productData.products[swatchIndex].images[i].asset+'" alt="'+productData.products[swatchIndex].images[i].type+'"></a>');

        thumb.attr('gallery-index', i);
        thumb.attr('scene-index', sceneIdx);
        thumb.attr('gallery-type', productData.products[swatchIndex].images[i].type);
        thumb.attr('media-image-url', productData.products[swatchIndex].images[i].asset);

        if (!!productData.products[swatchIndex].images[i]['code']) {
          thumb.attr('data-video-id', productData.products[swatchIndex].images[i].code);
        }
        //thumb.append('<img src="' + productData.products[swatchIndex].images[i].thumbnail + '" alt="' + $('#displayName').val() + '" />');

        //if ( productData.products[swatchIndex].images[i].type=='s7' ) {
        sceneIdx += 1;
        var assetNode = {"i": {"n": ""},"dx": productData.products[swatchIndex].images[i].width,"dy": productData.products[swatchIndex].images[i].height};
        assetNode.i.n = productData.products[swatchIndex].images[i].asset;
        assetJson.set.item[0].set.item.push(assetNode);
        //}

        if (i === 0) {
          thumb.addClass('current');
        }

        thumbnailGallery.find('.wrap').append(thumb);
      });

			// thumb-cnt element create append
			var thumbCnt = $('<div class="thumbnail-cnt"><span class="cnt-current">1</span>/'+productData.products[swatchIndex].images.length+'</div>');
			$('#gallery-panel .controls-wrap').append(thumbCnt);

      initArrowControls();

      // loadAsset($(thumbnailGallery.find('.thumbnail')[0]));
      /*      if(productData.products[swatchIndex].images.length > 0){*/

      thumbnailGallery.find('.thumbnail').each(function(i) {
				$(this).css({'left': (i * 90) + 'px'});
      });

      var thumbnails = thumbnailGallery.find('.thumbnail');
      thumbnails.on('focus', function() {

        var thumb = $(this);
        //if (thumb[0] === thumbnails.last()[0]) {
        //  nextArrow.addClass('disabled');
        //} else if (thumb[0] === thumbnails.first()[0]) {
        //  prevArrow.addClass('disabled');
        //} else {
        //  prevArrow.removeClass('disabled');
        //  nextArrow.removeClass('disabled');
        //}

        currentThumbnail = parseInt(thumb.attr('gallery-index'), 10);
        slideThumbnails();

      });
    /*      }else{
        assetContainer.find('.asset').hide();
      }*/
    }



		function initArrowControls() {
      if (currentThumbnail === 0) {
        prevArrow.addClass('disabled');
        nextArrow.removeClass('disabled');
      } else if (currentThumbnail >= thumbnailGallery.find('.thumbnail').length - 10) {
        prevArrow.removeClass('disabled');
        nextArrow.addClass('disabled');
      } else {
        prevArrow.removeClass('disabled');
        nextArrow.removeClass('disabled');
      }
			if(thumbnailGallery.find('.thumbnail').length <= 10){
        prevArrow.addClass('disabled');
        nextArrow.addClass('disabled');
      }
    }

    function slideThumbnails() {
			if(thumbnailGallery.find('.thumbnail').length <= 10){
        return false;
      }

			var marginLength = -1 * currentThumbnail * 90;
			if (currentThumbnail >= thumbnailGallery.find('.thumbnail').length - 10) {
				marginLength = (thumbnailGallery.find('.thumbnail').length - 10)*-1*90;
			}

      thumbnailsAnim = true;

      initArrowControls();

			thumbnailGallery.find('.thumbnail').animate({marginLeft: marginLength+'px'}, 500, function() {
        thumbnailsAnim = false;
      });
    }



		function loadAsset(j_elm) {
	      var url = j_elm.attr('media-image-url'),
	      index = j_elm.attr('gallery-index') || 0,
	      sIdx = j_elm.attr('scene-index') || 0,
	      asset_type = j_elm.attr('gallery-type'),
	      code = j_elm.attr('data-video-id');

				var arrows = $('#gallery-panel .controls .arrows');
				var thumbnails = $('#galleryThumbImg .thumbnail').length - 1;
				if(index == 0){
					arrows.eq(0).attr('gallery-index','0');
					arrows.eq(0).attr('scene-index','0');
					arrows.eq(1).attr('gallery-index','1');
					arrows.eq(1).attr('scene-index','1');
				}else if(index == thumbnails){
					arrows.eq(0).attr('gallery-index',thumbnails-1);
					arrows.eq(0).attr('scene-index',thumbnails-1);
					arrows.eq(1).attr('gallery-index',thumbnails);
					arrows.eq(1).attr('scene-index',thumbnails);
				}else{
					arrows.eq(0).attr('gallery-index',index-1);
					arrows.eq(0).attr('scene-index',index-1);
					arrows.eq(1).attr('gallery-index',Number(index)+1);
					arrows.eq(1).attr('scene-index',Number(index)+1);
				}

				// thumbnail-cnt get current number
				var thumbCnt = $('#gallery-panel .thumbnail-cnt .cnt-current');
				thumbCnt.text(Number(index)+1);

	      $('.gallery-video').hide();

	      if (asset_type == 's7') {


	        assetContainer.find('.asset').hide();
	        $('#s7viewer').addClass('current');
	        try{
	          window.scene7.colorSwatches.onSwatchClicked(null, window.scene7.colorSwatches.swatches_[sIdx]);
	        }catch (e) {

	        }


	        $('#s7viewer').show();

	      } else {
	        assetContainer.find('.asset').hide();
	        $('#s7viewer').addClass('current');
	        try{
	          window.scene7.colorSwatches.onSwatchClicked(null, window.scene7.colorSwatches.swatches_[sIdx])
	        }catch (e) {

	        }


	        $('#s7viewer').show();

	        var currentAsset = assetContainer.find('.asset[gallery-index="' + index + '"][data-swatch-color="' + currentSwatchID + '"]');
	        if (asset_type == 'be') {
	          $('.gallery-video.be').show();
	          var beVideo = brightcove.api.getExperience('videoBE').getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
	          beVideo.cueVideoByID($('.gallery-module').find('.thumbnail-gallery').find('[gallery-index="' + index + '"]').attr('data-video-id'));
	          beVideo.pause();
	        }
	        else if (asset_type == 'yt') {
	          $('.gallery-video.yt').show();
	          var ytVideo = $('#firstYT').parent()[0].player;
	          ytVideo.cueVideoById($('.gallery-module').find('.thumbnail-gallery').find('[gallery-index="' + index + '"]').attr('data-video-id'));
	          ytVideo.pauseVideo();
	        }
	      }
	    }

		function prevSwipe()
	    {
	      if (currentThumbnail === 0 && !thumbnailsAnim) {
	      //event.preventDefault();
	      } else {
	        currentThumbnail--;
	        slideThumbnails();

	      }
	      var curElm = $(thumbnailGallery).find('.thumbnail.current');
	      var prevElm = curElm.prev();
	      if (prevElm.length > 0) {
	        curElm.removeClass('current');

	        prevElm.addClass('current');

	        loadAsset(prevElm);
	      }
	    }
	    function nextSwipe()
	    {
				var maxPos = thumbnailGallery.find('.thumbnail').length - 10;

		    if (currentThumbnail === maxPos && !thumbnailsAnim) {
		    //event.preventDefault();
		    } else {
		      currentThumbnail++;
		      slideThumbnails();


		    }
		    var curElm = $(thumbnailGallery).find('.thumbnail.current');
		    var nextElm = curElm.next();
		    if (nextElm.length > 0) {
		      curElm.removeClass('current');
		      nextElm.addClass('current');
		      loadAsset(nextElm);
	      }
	    }



		init();

	};















	ss.PDPStandard.PDPSampleImages = function(params) {



        var container = $('.sampleimages-module');

        var containerAnim = false;



        var carousel = container.find('.ss-carousel')[0].binder;



        var sampleButton = $('.media-module').find('.sampleimages');

        var closeButton = container.find('.close-button');



        var descriptionToggleButtons = container.find('.toggle-button');



        var thumbnailGallery = container.find('.thumbnail-sampleimages');



        var isPanning = false;



        var prevArrow = thumbnailGallery.find('.prev');

        var nextArrow = thumbnailGallery.find('.next');



        var currentThumbnail = 0;

        var thumbnailsAnim = false;



        var currentSwatchID;



        var colorPickerPopover;



        var domRefreshEvent = jQuery.Event(eventDictionary.dom.DOM_REFRESH);

        /**

         Initialization function which runs at object instantiation time.



         @method init

         **/

        function init() {

            setupThumbnailGallery(0);


            bindEvents();

        }



        function bindEvents() {



            if(isWow){

                sampleButton.on(ss.clickEvent, sampleButtonClickHandler_wow);

                eventBridge.on(eventDictionary.pdpStandard.EVENT_HERO_SHOW, heroShow_wow);

                eventBridge.on(eventDictionary.pdpStandard.EVENT_THREESIXTY_SHOW, threeSixtyShow_wow);

                eventBridge.on(eventDictionary.pdpStandard.EVENT_GALLERY_SHOW, galleryShow_wow);

                closeButton.on('click', closeButtonClickHandler_wow);

            }else{

                sampleButton.on(ss.clickEvent, sampleButtonClickHandler_standard);

                eventBridge.on(eventDictionary.pdpStandard.EVENT_HERO_SHOW, heroShow_standard);

                eventBridge.on(eventDictionary.pdpStandard.EVENT_THREESIXTY_SHOW, threeSixtyShow_standard);

                eventBridge.on(eventDictionary.pdpStandard.EVENT_GALLERY_SHOW, galleryShow_standard);

                closeButton.on('click', closeButtonClickHandler_standard);

            }



            function sampleButtonClickHandler_wow() {



                if(!containerAnim) {

                    $('.media-module .media.current').removeClass('current');

                    sampleButton.addClass('current');



                    containerAnim = true;



                    container.slideDown(500, function() {

                        containerAnim = false;

                        $(eventBridge).trigger(domRefreshEvent);

                    });



                    ss.scrollWrapper.scrollTop(0);



                    eventBridge.trigger(jQuery.Event(eventDictionary.pdpStandard.EVENT_SAMPLEIMAGES_SHOW));

                    eventBridge.trigger(jQuery.Event(eventDictionary.pdpStandard.EVENT_THREESIXTY_PAUSE));



                }

            }



            function sampleButtonClickHandler_standard() {



                if(!containerAnim) {

                    if(!viewSection.hasClass('on')) viewSection.addClass('on');



                    $('.media-module .media.current').removeClass('current');

                    sampleButton.addClass('current');



                    containerAnim = false;



                    container.css('display', 'block');



                    $('.lightbox-skrim').remove();

                    $('body').append('<div class="lightbox-skrim"></div>');

                    $('.lightbox-skrim').on(ss.clickEvent, function (){

                        closeButton.trigger('click');

                    });



                    eventBridge.trigger(jQuery.Event(eventDictionary.pdpStandard.EVENT_SAMPLEIMAGES_SHOW));

                    eventBridge.trigger(jQuery.Event(eventDictionary.pdpStandard.EVENT_THREESIXTY_PAUSE));

                    viewSection[0].popAlign();



                    closeButton.focus();



                    $(eventBridge).trigger(domRefreshEvent);



                }

            }



            function heroShow_wow(e, data){

                container.slideUp(500);

            }



            function heroShow_standard(e, data){

                container.css('display', 'none');

            }



            function threeSixtyShow_wow(e, data){

                container.slideUp(500);

            }



            function threeSixtyShow_standard(e, data){

                container.css('display', 'none');

            }



            function galleryShow_wow(e, data){

                container.slideUp(500);

            }



            function galleryShow_standard(e, data){

                container.css('display', 'none');

            }



            function closeButtonClickHandler_wow(e){

                $('.media-module .media.current').removeClass('current');



                container.slideUp(500, function() {

                    containerAnim = false;

                });

                sampleButton.focus();

                eventBridge.trigger(jQuery.Event(eventDictionary.pdpStandard.EVENT_HERO_SHOW));

            }



            function closeButtonClickHandler_standard(e){

                $('.media-module .media.current').removeClass('current');



                if(viewSection.hasClass('on')) viewSection.removeClass('on');

                sampleButton.focus();

                eventBridge.trigger(jQuery.Event(eventDictionary.pdpStandard.EVENT_HERO_SHOW));

            }



            nextArrow.on(ss.clickEvent, function(e) {

                if (currentThumbnail === thumbnailGallery.find('.thumbnail').length - 4) {

                    e.preventDefault();

                } else {

                    currentThumbnail++;

                    slideThumbnails();

                }

            });



            prevArrow.on(ss.clickEvent, function(e) {

                if (currentThumbnail === 0) {

                    e.preventDefault();

                } else {

                    currentThumbnail--;

                    slideThumbnails();

                }

            });



            thumbnailGallery.swipe({

                swipeLeft: function (event, direction) {

                    var maxPos = thumbnailGallery.find('.thumbnail').length - 10;



                    if (currentThumbnail === maxPos && !thumbnailsAnim) {

                        event.preventDefault();

                    } else {

                        currentThumbnail++;

                        slideThumbnails();

                    }

                },



                swipeRight: function (event, direction) {

                    if (currentThumbnail === 0 && !thumbnailsAnim) {

                        event.preventDefault();

                    } else {



                        currentThumbnail--;

                        slideThumbnails();

                    }

                }

            });



            thumbnailGallery.on('swipeleft', function(e) {

                var maxPos = thumbnailGallery.find('.thumbnail').length - 10;



                if (currentThumbnail === maxPos && !thumbnailsAnim) {

                    e.preventDefault();

                } else {

                    currentThumbnail++;

                    slideThumbnails();

                }

            }).on('swiperight', function(e) {

                    if (currentThumbnail === 0 && !thumbnailsAnim) {

                        e.preventDefault();

                    } else {

                        currentThumbnail--;

                        slideThumbnails();

                    }

                });



            thumbnailGallery.on(ss.clickEvent, '.thumbnail', function() {

                if(!$(this).hasClass('current')) {

                    $(thumbnailGallery).find('.thumbnail.current').removeClass('current');



                    $(this).addClass('current');



                    carousel.carouselSwipe.slide(parseInt($(this).attr('sampleimages-index'), 10));



                    $('.asset.current').panzoom('reset');

                }

            });



            descriptionToggleButtons.on(ss.clickEvent, function (e){

                var parent = $(this).parent();

                var icon = $(this).find('.icon-plus');

                parent.toggleClass('show-information');

                if(parent.hasClass('show-information')) icon.addClass('icon-minus');

                else icon.removeClass('icon-minus');

            });

        }



        function setupThumbnailGallery(swatchIndex) {

            //thumbnailGallery.find('.wrap').empty();

            currentThumbnail = 0;

            initArrowControls();



            $(thumbnailGallery).find('.thumbnail.current').removeClass('current');

            thumbnailGallery.find('.thumbnail').first().addClass('current')

            thumbnailGallery.find('.thumbnail').each(function(i) {

                $(this).css({'left': (i * 25) + '%'});

            });



            var thumbnails = thumbnailGallery.find('.thumbnail');

            thumbnails.on('focus', function() {

                var thumb = $(this);

                currentThumbnail = parseInt(thumb.attr('sampleimages-index'), 10);

                slideThumbnails();

            });

        }



        function initArrowControls() {

            if(currentThumbnail === 0) {

                prevArrow.addClass('disabled');

                nextArrow.removeClass('disabled');

            } else if(currentThumbnail === thumbnailGallery.find('.thumbnail').length - 10) {

                prevArrow.removeClass('disabled');

                nextArrow.addClass('disabled');

            } else {

                prevArrow.removeClass('disabled');

                nextArrow.removeClass('disabled');

            }

        }



        function slideThumbnails() {

            if (currentThumbnail > thumbnailGallery.find('.thumbnail').length - 4) { return false; }



            thumbnailsAnim = true;



            initArrowControls();



            thumbnailGallery.find('.thumbnail').animate({marginLeft: (-1 * currentThumbnail * 25) + '%'}, 500, function () {

                thumbnailsAnim = false;

            });

        }



        init();

    };



	/**

	@class $.PDPStandard.PDPeCommerceSTD

	@constructor

	**/

	ss.PDPStandard.PDPeCommerceSTD = function(params) {

		var modelCode = $('#modelCode').val();

		var modelName = $('#modelName').val();

		var displayName = $('#displayName').val();

		var discontinued = $('#discontinued').val();

		var priceDisplay = $('#priceDisplay').val();

		var oldProductYN = $('#oldProductYN').val();

		var prdPrice = $('#prdPrice').val();

		var prdPriceDiscl = $('#prdPriceDiscl').val();

		var rrpDisplay = $('#rrpDisplay').val() == "true" ? true : false;

		var quickByButton = $('#quickByButton').val() == "true" ? true : false;

		var usePreOrder = false;

		var whereToBuyBtnUse = false;

		var addToCart;

		var whereToBuyBtn = $('#whereToBuyBtnYN').val();

		var whereToBuyBtnPDP = $('#whereToBuyBtnPDPYN').val();

		var onlineRetailerYN = $('#onlineRetailerYN').val();

		var storeLocatorYN = $('#storeLocatorUse').val() == "true" ? 'Y' : 'N';

		var typeCd = $('#typeCode').val();

		var buyNowFlag = false;

		var openPhoneFlag = false;

		var addToCartFlag = false;



		function init() {

			if ($('a.clearfix.toggle').is(':visible')) {

				if ($('a.clearfix.toggle').hasClass('link-toggled')) {

					$('a.clearfix.toggle').next('.nor-btnList').show();

				}

				else {

					$('a.clearfix.toggle').next('.nor-btnList').hide();

				}

			}

			else {

				$('a.clearfix.toggle').next('.nor-btnList').show();

			}



			getRealTimeProductSimpleInfo();

			bindEvents();

		}



		function bindEvents() {

			//849 픽업옵션 선택 후 매장 선택하지 않았을 경우 경고창
			function alertPickupMsgShow( message ) {
				if(isWow){
					if(message.indexOf('<br>')!=-1){
						message = message.replace('<br>','\n')
					}
					alert(message);
				}else{
					var $layer = $('#popup_alert');
					$layer.find('.msg-text').html( message );
					$(".layer_popup").hide();
					$layer.parent().show();
					$layer.find('.button.alert-ok-button').attr("data-tab-next","button alert-ok-button");
					$layer.find('.button.alert-ok-button').attr("data-tab-previous","button alert-ok-button");
					$layer.find('.button.alert-ok-button').focus();
					$('body').append('<div class="lightbox-skrim"></div>');
					var l = parseInt(($('body').width() - $layer.width())/2);
					var t = parseInt( $(window).scrollTop() + (($(window).height()-$layer.height())/2) );
					$layer.css({ "top":t+"px", "left":l+"px" });
				}
			}

			//바로구매 버튼

			$('#quickBuy').on('click', function() {

				//849 픽업옵션 선택 후 매장 선택하지 않았을 경우 경고창
				if($('#pickup-store-type').val() == 'pickup-01') {
					if($('#pickup-01').attr('checked') != 'checked' || $('#pickup-store-id').val() == '' || $('#pickup-store-id').val() == 'undefined'){
						alertPickupMsgShow('선택매장 정보가 없습니다. 상품을 수령하실 픽업매장을 선택하세요.');
						return;
					}
				}

				if(buyNowFlag ==  true){

					return;

				}

				console.log('quickBuy');

				buyNowFlag = true

				var url = 'http://' + STORE_DOMAIN + '/sec/ng/p4v1/makeBuyNowCookie';

				$.ajax({

					url: url,

				    type: 'GET',

				    dataType : 'jsonp',

					//jsonpCallback : "jQuery1910499421933433041_1385598221584",

				    jsonp : 'callback',

					success		: function (data) {

						if (data && data.resultCode == "0000") {

							var count = $(".order-quantity.sec-p-item input[type=text]").val();

							var storeId= $( "#pickup-store-id" ).val();

							var param;

							if($( "#pickup-01" ).attr( "checked")){

								param = {

										'productCode' : modelCode,

										'quantity' : count,

										'storeId': storeId

								};

							}else {

								param = {

										'productCode' : modelCode,

										'quantity' : count

								};

							}



							estore.buyNow(param, function(data) {

								console.info("quickBuy :: ",data);

								if (data && data.resultCode == "0000") {

									if (usePreOrder) {

										sendClickCode('wishlist', 'pre order now');

									} else {

										//sendClickCode('wishlist', 'quick buy');

										sendScBasket(modelName,modelCode);

									}

									buyNowFlag = false;

									//location.href = data.url;

									location.href = "http://" + STORE_DOMAIN + "/" + SITE_CD + "/ng/cartAndCheckout";

									return false;

								}

								buyNowFlag = false;

							});

						}

					},

					error		: function(data) {

						buyNowFlag = false;

					}

				});

			});



			//개통폰 버튼

			$('#openphone').on('click', function() {

				if(openPhoneFlag ==  true){

					return;

				}

				console.log('openphone');

				openPhoneFlag = true

				ss.Auth.checkSignIn(function(loginChk){

					if(loginChk){

						if( $("#optionCheck").val() != "Y"){

							ss.PDPStandard.secFn.openphoneAlert( ".price-option-module", 7);

							openPhoneFlag = false

							return;

						}

						var url = 'http://' + STORE_DOMAIN + '/sec/ng/p4v1/makeBuyNowCookie';

						$.ajax({

							url: url,

						    type: 'GET',

						    dataType : 'jsonp',

							//jsonpCallback : "jQuery1910499421933433041_1385598221584",

						    jsonp : 'callback',

							success		: function (data) {

								if (data && data.resultCode == "0000") {

									var param = {

											'productCode' : modelCode,

											'quantity' : '1',

											'opUsim' : $("#optionUsim").val(),

											'productCode' :  $("#modelCode").val(),

											'opMakerx': $("#optionMakerx").val(),

											'opCharge': $("#optionCharge").val(),

											'opJointype' : $("#optionJointype").val(),

											'opContract' : $("#optionContract").val(),

											'opMonthly': $("#optionMonthly").val(),

											'opSubside': $("#optionSubside").val()

									};

									estore.buyNow(param, function(data) {

										console.info("openphone :: ",data);

										if (data && data.resultCode == "0000") {

											openPhoneFlag = false;

											//location.href = data.url;

											location.href = "http://" + STORE_DOMAIN + "/" + SITE_CD + "/ng/cartAndCheckout";

											return false;

										}

										openPhoneFlag = false;

									});

								}

								sendScCheckoutStep('telesales:request');

							},

							error		: function(data) {

								openPhoneFlag = false;

							}

						});

					}else{

						openPhoneFlag = false

					}

				},true,true);

			});



			//매장 찾기 버튼

			$('#findStore').on('click', function() {

				sendClickCode('locator','stock_store');
				console.log('findStore');

				window.open('http://local.sec.samsung.com/comLocal/sec/dps/stockShopMain.do?productCode=' + modelCode);

			});



			$('.stock-condition.sec-p-item .btn-link-01').on('click', function() {

				$('#findStore').trigger('click');

			});



			//장바구니

			// Go To Check Out에 대한 옵니쳐 적용

			$('#addCartList').find('a').attr('onclick',"sendScView(\';"+ modelName + "\');");



			addToCart = new ss.Popover('#addToCart', {skipBoot: true,interOp2Hide: function(obj) { /*obj.toggle();*/},interOp2Show: function(obj) {

				//849 픽업옵션 선택 후 매장 선택하지 않았을 경우 경고창
				if($('#pickup-store-type').val() == 'pickup-01') {
					if($('#pickup-01').attr('checked') != 'checked' || $('#pickup-store-id').val() == '' || $('#pickup-store-id').val() == 'undefined'){
						alertPickupMsgShow('선택매장 정보가 없습니다. 상품을 수령하실 픽업매장을 선택하세요.');
						return;
					}
				}

				if(addToCartFlag ==  true){

					return;

				}

				console.log('addToCart');

				//Analytics_tagging

				sendScAddPrd(modelName,modelCode);



				// 미니카트 숨김처리

				navigation.miniCartHide();



				// addToCart 레이어팝업이 열려 있으면 호출 안함.

				if ($('.cart-popover').length <= 1) {

					var count = $(".order-quantity.sec-p-item input[type=text]").val();

					var storeId= $( "#pickup-store-id" ).val();

					var param;

					if($( "#pickup-01" ).attr( "checked")){

						param = {

								'productCode' : modelCode,

								'quantity' : count,

								'storeId': storeId

						};

					}else {

						param = {

								'productCode' : modelCode,

								'quantity' : count

						};

					}

					addToCartFlag = true

					estore.addCart(param, function(data) {

						console.info("addToCart :: ",data);

						if (data && data.resultCode == "0000") {

							//레코픽 태깅

							recoPick('page', 'basket', modelCode);



							$.Auth.getGlobalCartCount(function(data) {

								console.info("addCart", data);

							});



							$('#cartCount').text(pdpMsg.addedtocart);

							setTimeout("$('#cartCount').text(pdpMsg.addtocart);", 1000);



							obj.showOnly();



							ss.commonWidgets.setDefaultFocusInWidget( ".popover .cart-popover" );

						}

						addToCartFlag = false;

					});

				}

			},tapProtect: true,placement: 'auto top',content: $('#addCartList').html(),html: true,container: '.body_wrapper',animation: false}); /* ADD ADNSTYLE */

		}



		function jumpToBindEvents(){

			$('.jump-module').find('#jumpToQuickBuy').on('click', function() {

				$('#quickBuy').trigger('click');

			});



			$('.jump-module').find('#jumpToFindStore').on('click', function() {

				$('#findStore').trigger('click');

			});



			$('.jump-module').find('#jumpToOpenphone').on('click', function() {

				sendClickCode('jumpto','jump to:telesales:request');

				$('#openphone').trigger('click');

			});

		}



		// eCommerce 실시간 상품 정보 조회 처리

		function getRealTimeProductSimpleInfo() {

			// 스토어 사용국가이고 제품이 판매대상인지

			console.log("discontinued : "+discontinued);

			console.log("oldProductYN : "+oldProductYN);

			// RFC #1435
			if ( $('#buyingToolMsgYN').val() == 'Y' ){
				discontinued = 'Y';
				console.log("change discontinued : "+discontinued);
			}

			if (USE_ESTORE && discontinued != "Y") {

				// old product 일 경우

				if (oldProductYN == 'Y') {

					// chw.park  flag 변경 $( ".stock").css('color', '#f41c3a').text(pdpMsg.oldProductMsg);
					$( ".stock").css('color', '#0162b5').text("구매 시 해당 제품의 정보를 참고 바랍니다.");
					$(".product-info .product-title").css('padding-bottom', '15px');


					new ss.PDPStandard.PDPJumpModule();



					$('.jump-module .info-section').addClass('no-button');



					jumpToBindEvents();



				}else{

					estore.getRealTimeProductSimpleInfo({productCode: modelCode}, function(data) {
						if(imsiFlag && isStoreAvailable) { //aeseul.kim 20150727
						imsiFlag = false;
						isStoreAvailable = false; //aeseul.kim 20150727

						console.info('estore_data :: ', data);

						if (data && data.resultCode == "0000") {

							//delivery-module
							categoryCodeAirConditioner = data.categoryCode;
							$('#catid').val(categoryCodeAirConditioner);

							if (categoryCodeAirConditioner != 'LI05'){
								var li = $('.tab-menu').find('li');
								$('.item5').removeClass('item5').addClass('item4');
								 li.last().remove();
								 li = $('.tab-menu').find('li');
								//$('#LI05').attr('style','display:none');
								$('#LI05').hide();

								controlTabMenu();
							}

							ss.PDPStandard.secFn.additionalInformation(data);

							ss.PDPStandard.secFn.setUpperBanner(data);

							ss.PDPStandard.secFn.wishListButton(data);

							//spoint 적용을 위한 데이터 셋팅 dong_won.lee^^;
							if (data.spointData != null && data.spointData != "") {
								$('#pageTrack').after("<input id='spointratio' name='spointratio' type='hidden' value="+data.spointData.spointRatio + ">");
								$('#pageTrack').after("<input id='spointproduct' name='spointproduct' type='hidden' value="+data.spointData.spointProduct + ">");
							};

							if(data.salesStatus == 'SALES_END' || data.salesStatus == 'DISCONTINUED' || data.salesStatus == 'RESERVED_SALES_END'
									|| data.price == "" || data.price == "0 원"){ // #248 가격이 0원인 경우 판매 불가 메시지 노출

								// chw.park  flag 변경 $( ".stock").css('color', '#f41c3a').text("판매종료 상품");
								$( ".stock").css('color', '#0162b5').text("구매 시 해당 제품의 정보를 참고 바랍니다.");
								new ss.PDPStandard.PDPJumpModule();

								jumpToBindEvents();

								return;

							}

							ss.PDPStandard.secFn.setButton(data);

							ss.PDPStandard.secFn.flags(data);



							if(data.flagSetproduct == 'Y'){//매장판매 상품



							}else if(data.flagOpenPhone == 'Y'){

								ss.PDPStandard.secFn.stockQuantity(data);

								//ss.PDPStandard.secFn.preCalculator(data);

								ss.PDPStandard.secFn.samsungPoint(data);

								ss.PDPStandard.secFn.cardDiscount(data);

								ss.PDPStandard.secFn.stockCondition(data);

								ss.PDPStandard.secFn.freebie(data);

			        			ss.PDPStandard.secFn.price(data);

			        			ss.PDPStandard.secFn.pickupStore(data);

			        			ss.PDPStandard.secFn.limitOrderByIdQuantity(data);

								if(data.isOpenphone == 'Y'){

									ss.PDPStandard.secFn.openPhone(data);

								}

							}else if(data.flagPreOrder == 'Y'){		//예약판매

								if(data.periodCheck == "BEFORE" || data.periodCheck == "AFTER"){



								}else {

									ss.PDPStandard.secFn.stockQuantity(data);

									ss.PDPStandard.secFn.preCalculator(data);

									ss.PDPStandard.secFn.samsungPoint(data);

									ss.PDPStandard.secFn.cardDiscount(data);

									ss.PDPStandard.secFn.stockCondition(data);

									ss.PDPStandard.secFn.freebie(data);

				        			ss.PDPStandard.secFn.price(data);

				        			ss.PDPStandard.secFn.pickupStore(data);

				        			ss.PDPStandard.secFn.limitOrderByIdQuantity(data);

								}

								ss.PDPStandard.secFn.salePreOrderPeriod(data);

							} else if(data.flagLimitedSale == 'Y'){	     //한정판매

								if(data.periodCheck == "BEFORE" || data.periodCheck == "AFTER"){



								}else{

									ss.PDPStandard.secFn.stockQuantity(data);

									ss.PDPStandard.secFn.preCalculator(data);

									ss.PDPStandard.secFn.samsungPoint(data);

									ss.PDPStandard.secFn.cardDiscount(data);

									ss.PDPStandard.secFn.stockCondition(data);

									ss.PDPStandard.secFn.freebie(data);

				        			ss.PDPStandard.secFn.price(data);

				        			ss.PDPStandard.secFn.pickupStore(data);

				        			ss.PDPStandard.secFn.limitOrderByIdQuantity(data);

									ss.PDPStandard.secFn.saleLimitedPeriod(data);

								}

							}else {

								ss.PDPStandard.secFn.stockQuantity(data);

								ss.PDPStandard.secFn.preCalculator(data);

								ss.PDPStandard.secFn.samsungPoint(data);

								ss.PDPStandard.secFn.cardDiscount(data);

								ss.PDPStandard.secFn.stockCondition(data);

								ss.PDPStandard.secFn.freebie(data);

			        			ss.PDPStandard.secFn.price(data);

			        			ss.PDPStandard.secFn.pickupStore(data);

			        			ss.PDPStandard.secFn.limitOrderByIdQuantity(data);

							}

							$(".sec-point").prev(".sec-p-item").remove();

							if(data.salesStatus == 'ON_SALE' && !(data.flagLimitedSale == 'Y' && data.flags.indexOf('판매종료') >= 0)){ // #248 한정판매 종료인 경우 띠배너 문구 비노출
								$(".sec-point").before('<div class="sec-p-item ltext">판매가, 회원가, 상품보유현황은 삼성전자 온라인 스토어에만 적용됩니다.</div>');//20150629 수정
							}

						}else if(data && data.resultCode == "0000" && data.salesStatus == "" && (data.flags.indexOf("매장판매상품") >= 0) ){

							// chw.park  flag 변경
							data.flags = "구매 시 해당 제품의 정보를 참고 바랍니다.";
							ss.PDPStandard.secFn.flags(data);

						}else{

							data.flags = "스토어 미판매";

							ss.PDPStandard.secFn.flags(data);

						}

						new ss.PDPStandard.PDPJumpModule();

						jumpToBindEvents();

						}

					});

				}

			} else {



				/* chw.park  flag 변경
				// old product 일 경우
				if (oldProductYN == 'Y') {
					$( ".stock").css('color', '#f41c3a').text(pdpMsg.oldProductMsg);
				}
				*/

				// RFC #1435
				if ( $('#buyingToolMsgYN').val() == 'Y' ){
					var buyingToolMsg = $('#buyingToolMsg').val();
					$( ".stock").css('color', '#0162b5').text(buyingToolMsg);
				} else {
					$( ".stock").css('color', '#0162b5').text('구매 시 해당 제품의 정보를 참고 바랍니다.');
				}

				if(!isWow){
					$(".product-info .product-title").css('padding-bottom', '15px');
				} else {
					$(".wow-product-info .product-title").css('padding-bottom', '15px');
				}


				new ss.PDPStandard.PDPJumpModule();



				$('.jump-module .info-section').addClass('no-button');



				jumpToBindEvents();

			}

		}


		init();

	};



	/**

	@class $.PDPStandard.PDPeCommerceWOW

	@constructor

	**/

	ss.PDPStandard.PDPeCommerceWOW = function(params) {

		var modelCode = $('#modelCode').val();

		var modelName = $('#modelName').val();

		var displayName = $('#displayName').val();

		var discontinued = $('#discontinued').val();

		var priceDisplay = $('#priceDisplay').val();

		var oldProductYN = $('#oldProductYN').val();

		var prdPrice = $('#prdPrice').val();

		var prdPriceDiscl = $('#prdPriceDiscl').val();

		var rrpDisplay = $('#rrpDisplay').val() == "true" ? true : false;

		var quickByButton = $('#quickByButton').val() == "true" ? true : false;

		var usePreOrder = false;

		var whereToBuyBtnUse = false;

		var addToCart;

		var wowAddToCart;

		var btnCount = 0;

		var whereToBuyBtn = $('#whereToBuyBtnYN').val();

		var whereToBuyBtnPDP = $('#whereToBuyBtnPDPYN').val();

		var onlineRetailerYN = $('#onlineRetailerYN').val();

		var storeLocatorYN = $('#storeLocatorUse').val() == "true" ? 'Y' : 'N';

		var buyNowFlag = false;

		var openPhoneFlag = false;

		var addToCartFlag = false;



		var typeCd = $('#typeCode').val();



		function init() {

			btnCount = 0;

			if ($('a.clearfix.toggle').is(':visible')) {

				if ($('a.clearfix.toggle').hasClass('link-toggled')) {

					$('a.clearfix.toggle').next('.nor-btnList').show();

				}

				else {

					$('a.clearfix.toggle').next('.nor-btnList').hide();

				}

			}

			else {

				$('a.clearfix.toggle').next('.nor-btnList').show();

			}



			getRealTimeProductSimpleInfo();

			bindEvents();

		}



		function bindEvents() {

			//849 픽업옵션 선택 후 매장 선택하지 않았을 경우 경고창
			function alertPickupMsgShow( message ) {
				if(isWow){
					if(message.indexOf('<br>')!=-1){
						message = message.replace('<br>','\n')
					}
					alert(message);
				}else{
					var $layer = $('#popup_alert');
					$layer.find('.msg-text').html( message );
					$(".layer_popup").hide();
					$layer.parent().show();
					$layer.find('.button.alert-ok-button').attr("data-tab-next","button alert-ok-button");
					$layer.find('.button.alert-ok-button').attr("data-tab-previous","button alert-ok-button");
					$layer.find('.button.alert-ok-button').focus();
					$('body').append('<div class="lightbox-skrim"></div>');
					var l = parseInt(($('body').width() - $layer.width())/2);
					var t = parseInt( $(window).scrollTop() + (($(window).height()-$layer.height())/2) );
					$layer.css({ "top":t+"px", "left":l+"px" });
				}
			}

			//바로구매 버튼

			$( document ).on( "click", '#dummy-popup-container #wowQuickBuy', function() {

				//849 픽업옵션 선택 후 매장 선택하지 않았을 경우 경고창
				if($('#pickup-store-type').val() == 'pickup-01') {
					if($('#pickup-01').attr('checked') != 'checked' || $('#pickup-store-id').val() == '' || $('#pickup-store-id').val() == 'undefined'){
						alertPickupMsgShow('선택매장 정보가 없습니다. 상품을 수령하실 픽업매장을 선택하세요.');
						return;
					}
				}

				if(buyNowFlag ==  true){

					return;

				}

				console.log('wowQuickBuy');

				buyNowFlag = true

				var url = 'http://' + STORE_DOMAIN + '/sec/ng/p4v1/makeBuyNowCookie';

				$.ajax({

					url: url,

				    type: 'GET',

				    dataType : 'jsonp',

					//jsonpCallback : "jQuery1910499421933433041_1385598221584",

				    jsonp : 'callback',

					success		: function (data) {

						if (data && data.resultCode == "0000") {

							var count = $(".order-quantity.sec-p-item input[type=text]").val();

							var storeId= $( "#pickup-store-id" ).val();

							var param;

							if($( "#pickup-01" ).attr( "checked")){

								param = {

										'productCode' : modelCode,

										'quantity' : count,

										'storeId': storeId

								};

							}else {

								param = {

										'productCode' : modelCode,

										'quantity' : count

								};

							}



							estore.buyNow(param, function(data) {

								console.info("quickBuy :: ",data);

								if (data && data.resultCode == "0000") {

									if (usePreOrder) {

										sendClickCode('wishlist', 'pre order now');

									} else {

										//sendClickCode('wishlist', 'quick buy');

										sendScBasket(modelName,modelCode);

									}

									buyNowFlag = false;

									//location.href = data.url;

									location.href = "http://" + STORE_DOMAIN + "/" + SITE_CD + "/ng/cartAndCheckout";

									return false;

								}

								buyNowFlag = false;

							});

						}

					},

					error		: function(data) {

						buyNowFlag = false;

					}

				});

			});



			//개통폰 버튼

			$('#openphone').on('click', function() {

				if(openPhoneFlag ==  true){

					return;

				}

				console.log('wowOpenphone');

				openPhoneFlag = true

				ss.Auth.checkSignIn(function(loginChk){

					if(loginChk){

						if( $("#optionCheck").val() != "Y"){

							ss.PDPStandard.secFn.openphoneAlert( ".price-option-module", 7);

							openPhoneFlag = false

							return;

						}

						var url = 'http://' + STORE_DOMAIN + '/sec/ng/p4v1/makeBuyNowCookie';

						$.ajax({

							url: url,

						    type: 'GET',

						    dataType : 'jsonp',

							//jsonpCallback : "jQuery1910499421933433041_1385598221584",

						    jsonp : 'callback',

							success		: function (data) {

								if (data && data.resultCode == "0000") {

									var param = {

											'productCode' : modelCode,

											'quantity' : '1',

											'opUsim' : $("#optionUsim").val(),

											'productCode' :  $("#modelCode").val(),

											'opMakerx': $("#optionMakerx").val(),

											'opCharge': $("#optionCharge").val(),

											'opJointype' : $("#optionJointype").val(),

											'opContract' : $("#optionContract").val(),

											'opMonthly': $("#optionMonthly").val(),

											'opSubside': $("#optionSubside").val()

									};

									estore.buyNow(param, function(data) {

										console.info("openphone :: ",data);

										if (data && data.resultCode == "0000") {

											openPhoneFlag = false;

											//location.href = data.url;

											location.href = "http://" + STORE_DOMAIN + "/" + SITE_CD + "/ng/cartAndCheckout";

											return false;

										}

										openPhoneFlag = false;

									});

								}

								sendScCheckoutStep('telesales:request');

							},

							error		: function(data) {

								openPhoneFlag = false;

							}

						});

					}else{

						openPhoneFlag = false

					}

				},true,true);

			});



			//매장 찾기 버튼

			$('#findStore').on('click', function() {

				console.log('findStore');

				sendClickCode('locator','stock_store');
				window.open('http://local.sec.samsung.com/comLocal/sec/dps/stockShopMain.do?productCode=' + modelCode);

			});



			$( document ).on('click', '#dummy-popup-container .stock-condition.sec-p-item .btn-link-01', function() {

				$('#findStore').trigger('click');

			});



			// Go To Check Out에 대한 옵니쳐 적용

			//$('#addCartList').find('a').attr('onclick',"sendScView(\';"+ modelName + "\');");

			$('.added-msg').find('a').attr('onclick',"sendScView(\';"+ modelName + "\');");





			$( document ).on('click', '#dummy-popup-container #wowAddToCart', function() {

				//849 픽업옵션 선택 후 매장 선택하지 않았을 경우 경고창
				if($('#pickup-store-type').val() == 'pickup-01') {
					if($('#pickup-01').attr('checked') != 'checked' || $('#pickup-store-id').val() == '' || $('#pickup-store-id').val() == 'undefined'){
						alertPickupMsgShow('선택매장 정보가 없습니다. 상품을 수령하실 픽업매장을 선택하세요.');
						return;
					}
				}

				if(addToCartFlag ==  true){

					return;

				}

				console.log('wowAddToCart');

				//Analytics_tagging

				sendScAddPrd(modelName,modelCode);



				// 미니카트 숨김처리

				navigation.miniCartHide();



				var count = $(".order-quantity.sec-p-item input[type=text]").val();

				var storeId= $( "#pickup-store-id" ).val();

				var param;

				if($( "#pickup-01" ).attr( "checked")){

					param = {

							'productCode' : modelCode,

							'quantity' : count,

							'storeId': storeId

					};

				}else {

					param = {

							'productCode' : modelCode,

							'quantity' : count

					};

				}

				addToCartFlag = true;

				estore.addCart(param, function(data) {

					console.info("addToCart :: ",data);

					if (data && data.resultCode == "0000") {

						//레코픽 태깅

						recoPick('page', 'basket', modelCode);



						$.Auth.getGlobalCartCount(function(data) {

							console.info("addCart", data);

						});



						var cartBtn = $( "#dummy-popup-container #wowAddToCart" );

		        		cartBtn.text(pdpMsg.addedtocart);

		        		setTimeout( function(){

		        			cartBtn.text(pdpMsg.addtocart);

		        		},1000 );

		        		$( "#dummy-popup-container .added-msg" ).show();



					}

					addToCartFlag = false;

				});

			});

		}



		function jumpToBindEvents(){

			$('.jump-module').find('#jumpToFindStore').on('click', function() {

				$('#findStore').trigger('click');

			});



			$('.jump-module').find('#jumpToOpenphone').on('click', function() {

				sendClickCode('jumpto','jump to:telesales:request');

				$('#openphone').trigger('click');

			});

		}



		// eCommerce 실시간 상품 정보 조회 처리

		function getRealTimeProductSimpleInfo() {

			// 스토어 사용국가이고 제품이 판매대상인지

			console.log("discontinued : "+discontinued);

			console.log("oldProductYN : "+oldProductYN);

			// RFC #1435
			if ( $('#buyingToolMsgYN').val() == 'Y' ){
				discontinued = 'Y';
				console.log("change discontinued : "+discontinued);
			}

			if (USE_ESTORE && discontinued != "Y") {

				// old product 일 경우

				if (oldProductYN == 'Y') {

					$( ".stock.wow-front-stock span").css('color', '#0162b5').text("구매 시 해당 제품의 정보를 참고 바랍니다.");

					$(".wow-product-info .product-title").css('padding-bottom', '15px');



					new ss.PDPStandard.PDPJumpModule();



					$('.jump-module .info-section').addClass('no-button');



					$('#showMoreButton').hide();



					jumpToBindEvents();



				}else{

					estore.getRealTimeProductSimpleInfo({productCode: modelCode}, function(data) {
					if(isStoreAvailable) { //aeseul.kim 20150727
						isStoreAvailable = false; //aeseul.kim 20150727

						console.info('estore_data :: ', data);

						if (data && data.resultCode == "0000") {

							//delivery-module
							categoryCodeAirConditioner = data.categoryCode;
							$('#catid').val(categoryCodeAirConditioner);

							if (categoryCodeAirConditioner != 'LI05'){
								var li = $('.tab-menu').find('li');
								$('.item5').removeClass('item5').addClass('item4');
								 li.last().remove();
								 li = $('.tab-menu').find('li');
								//$('#LI05').attr('style','display:none');
								$('#LI05').hide();

								controlTabMenu();
							}

							ss.PDPStandard.secFn.additionalInformation(data);

							ss.PDPStandard.secFn.setUpperBanner(data);

							ss.PDPStandard.secFn.wishListButton(data);

							if(data.salesStatus == 'SALES_END' || data.salesStatus == 'DISCONTINUED' || data.salesStatus == 'RESERVED_SALES_END'
									|| data.price == "" || data.price == "0 원"){ // #248 가격이 0원인 경우 판매 불가 메시지 노출

								// chw.park  flag 변경 $( ".stock.wow-front-stock span").css('color', '#f41c3a').text("판매종료 상품");
								$( ".stock.wow-front-stock span").css('color', '#0162b5').text("구매 시 해당 제품의 정보를 참고 바랍니다.");

								new ss.PDPStandard.PDPJumpModule();

								$('#showMoreButton').hide();

								jumpToBindEvents();

								return;

							}

							ss.PDPStandard.secFn.setWOWButton(data);

							ss.PDPStandard.secFn.flags(data);



							if(data.flagSetproduct == 'Y'){ //매장판매 상품



							}else if(data.flagOpenPhone == 'Y'){ //개통폰

								//ss.PDPStandard.secFn.stockQuantity(data);

								//ss.PDPStandard.secFn.preCalculator(data);

								//ss.PDPStandard.secFn.samsungPoint(data);

								//ss.PDPStandard.secFn.cardDiscount(data);

								ss.PDPStandard.secFn.stockCondition(data);

								//ss.PDPStandard.secFn.freebie(data);

			        			ss.PDPStandard.secFn.WOWPrice(data);

			        			//ss.PDPStandard.secFn.pickupStore(data);

			        			ss.PDPStandard.secFn.limitOrderByIdQuantity(data);

								if(data.isOpenphone == 'Y'){

									ss.PDPStandard.secFn.openPhone(data);

								}

							}else if(data.flagPreOrder == 'Y'){  //예약판매

								if(data.periodCheck == "BEFORE" || data.periodCheck == "AFTER"){



								}else {

									ss.PDPStandard.secFn.stockQuantity(data);

									ss.PDPStandard.secFn.preCalculator(data);

									ss.PDPStandard.secFn.samsungPoint(data);

									ss.PDPStandard.secFn.cardDiscount(data);

									ss.PDPStandard.secFn.stockCondition(data);

									ss.PDPStandard.secFn.freebie(data);

				        			ss.PDPStandard.secFn.WOWPrice(data);

				        			ss.PDPStandard.secFn.price(data);

				        			ss.PDPStandard.secFn.pickupStore(data);

				        			ss.PDPStandard.secFn.limitOrderByIdQuantity(data);

								}

								ss.PDPStandard.secFn.salePreOrderPeriod(data);

							}else if(data.flagLimitedSale == 'Y'){//한정판매

								if(data.periodCheck == "BEFORE" || data.periodCheck == "AFTER"){



								}else {

									ss.PDPStandard.secFn.stockQuantity(data);

									ss.PDPStandard.secFn.preCalculator(data);

									ss.PDPStandard.secFn.samsungPoint(data);

									ss.PDPStandard.secFn.cardDiscount(data);

									ss.PDPStandard.secFn.stockCondition(data);

									ss.PDPStandard.secFn.freebie(data);

				        			ss.PDPStandard.secFn.WOWPrice(data);

				        			ss.PDPStandard.secFn.price(data);

				        			ss.PDPStandard.secFn.pickupStore(data);

				        			ss.PDPStandard.secFn.limitOrderByIdQuantity(data);

									ss.PDPStandard.secFn.saleLimitedPeriod(data);

								}

							} else {

								ss.PDPStandard.secFn.stockQuantity(data);

								ss.PDPStandard.secFn.preCalculator(data);

								ss.PDPStandard.secFn.samsungPoint(data);

								ss.PDPStandard.secFn.cardDiscount(data);

								ss.PDPStandard.secFn.stockCondition(data);

								ss.PDPStandard.secFn.freebie(data);

			        			ss.PDPStandard.secFn.WOWPrice(data);

			        			ss.PDPStandard.secFn.price(data);

			        			ss.PDPStandard.secFn.pickupStore(data);

			        			ss.PDPStandard.secFn.limitOrderByIdQuantity(data);

							}

							$(".sec-point").prev(".sec-p-item").remove();

							if(data.salesStatus == 'ON_SALE' && !(data.flagLimitedSale == 'Y' && data.flags.indexOf('판매종료') >= 0)){ // #248 한정판매 종료인 경우 띠배너 문구 비노출
								$(".sec-point").before('<div class="sec-p-item ltext">판매가, 회원가, 상품보유현황은 삼성전자 온라인 스토어에만 적용됩니다.</div>');//20150629 수정
							}
						}else {

							$('#showMoreButton').hide();

						}

						new ss.PDPStandard.PDPJumpModule();



						jumpToBindEvents();

					} //aeseul.kim 20150727
					});

				}

			} else {


				// old product 일 경우
				if (oldProductYN == 'Y') {
					$( ".stock .wow-front-stock span").css('color', '#0162b5').text("구매 시 해당 제품의 정보를 참고 바랍니다.");
				}

				// RFC #1435
				if ( $('#buyingToolMsgYN').val() == 'Y' ){
					var buyingToolMsg = $('#buyingToolMsg').val();
					$( ".stock").css('color', '#0162b5').text(buyingToolMsg);
				} else {
					$( ".stock").css('color', '#0162b5').text('구매 시 해당 제품의 정보를 참고 바랍니다.');
				}
				
				if(!isWow){
					$(".product-info .product-title").css('padding-bottom', '15px');
				} else {
					$(".wow-product-info .product-title").css('padding-bottom', '15px');
				}



				new ss.PDPStandard.PDPJumpModule();



				$('.jump-module .info-section').addClass('no-button');



				$('#showMoreButton').hide();



				jumpToBindEvents();

			}

		}



		init();

	};



	ss.PDPStandard.PDPCommonSEC = function() {

		var modelCode = $('#modelCode').val();

		var modelName = $('#modelName').val();

		var displayName = $('#displayName').val();

		var whereToBuyBtn = $('#whereToBuyBtnYN').val();

		var whereToBuyBtnPDP = $('#whereToBuyBtnPDPYN').val();

		//개통폰

		var openPhoneCookie = {

				'modelCode':modelCode,

				'optionUsim':'',

				'optionCharge':'',

				'optionJointype':'',

				'optionContract':'',

				'optionMonthly':'',

				'optionSubside':''

		};

		var useMobileDistributionLaw = "";

		var arrJointype = [];

		var arrContract = [];

		var arrMonthly = [];

		var arrSubside =[];

		var seleJointypeStr = "";

		var seleContractStr = "";

		var seleMonthlyStr = "";

		var seleSubsideStr = "";

		var seleEnd = "";

		var init_sContract = "";

		var init_sMonthly = "";

		var init_sSubside = "";



		//띠배너

		var mobileBanner="";

		var mobileBannerLink="";

		var tabletBanner="";

		var tabletBannerLink="";

		var desktopBanner="";

		var desktopBannerLink="";



		//공통 팝업관련

        var $currentPopup;

        var $currentPopupContainer;

        var $currentContents;



        //픽업매장

    	var $productInfo = $( ".sec-alert.wow-product-info" );

    	var $storeChoice = $( ".sec-alert.store-choice" );

    	var $calculator = $( ".sec-alert.calculator" );

    	var $calBtn;

    	var $pickupBtn;

    	var $changeStoreBtn;

    	var $storeBackBtn;

    	var $calBackBtn;

    	var pageType = "";



		ss.PDPStandard.secFn = {};



		function PDPCommonSECInit(){

        	Common();

        	if( isWow ){

            	wowInit();

            	bindWowEvent();

        	}

        	Aircon();

        	Delivery();

        	SellerInfo();

        	setPopovers();

        	findPrinterAccessory();

			buyingToolsUtil();

		}



		//wow 팝업

    	function wowInit(){

    		$productInfo.css( "position", "relative" );

    		$storeChoice.css( "position", "absolute" ).hide();

    		$calculator.css( "position", "absolute" ).hide();

    	}



    	function bindWowEvent(){

    		$( document ).on( "click", ".jump-module-shim .show-buy-option", function(){

    			showAlert17( ".jump-module-shim .show-buy-option" );

    		});



    		$( document ).on( "click", ".jump-module.docked .show-buy-option", function(){

    			showAlert17( ".jump-module.docked .show-buy-option" );

    		});



    		$( document ).on( "click", ".sub-hero-wrap .show-buy-option", function(){

    			showAlert17( ".sub-hero-wrap .show-buy-option" );

    		});



    		$( document ).on( "click", "#dummy-popup-container .btn-back", function(){

    			showInfo();

    		});

    	}



    	//wow 구매하기 클릭시 뜨는 팝업

    	function showAlert17( selector ){

    		showAlert( selector, 17 );

			$productInfo = $( "#dummy-popup-container .sec-alert.wow-product-info" );

        	$storeChoice =  $( "#dummy-popup-container .sec-alert.store-choice" );

        	$calculator = $( "#dummy-popup-container .sec-alert.calculator" );

        	$storeBackBtn = $storeChoice.find( ".btn-back" );

        	$calBackBtn = $calculator.find( ".btn-back" );

        	$calBtn = $productInfo.find( ".calculator" );

        	$pickupBtn = $productInfo.find( "#pickup-01" );

        	$changeStoreBtn = $productInfo.find( ".change-store" );

        	setToggleInPopup();


			if(!$("#pickup-01").hasClass('on')) {
	        	$ (".store-choice.sec-p-item" ).hide();
			}

        	$ (".store-stock.sec-p-item" ).hide();

        	$('.notice.store-notice').hide();

        	$(".order-quantity input[type=text]").numericSEC();

    	}



    	function showInfo(){

    		$productInfo.css( "position", "relative" ).show();

    		$storeChoice.css( "position", "absolute" ).hide();

    		$calculator.css( "position", "absolute" ).hide();

       		 switch( pageType ){

       		 	case "cal": $calBtn.focus(); break;

       		 	case "sto": $pickupBtn.focus(); break;

       		 	case "sto-change": $changeStoreBtn.focus(); break;

       		 }

       	}



    	//공통 팝업

        function showAlert( target, type ){

        	$currentPopup = $("#dummy-popup-container");

        	var $target = $( target );

        	$currentPopup.target = $target;

        	if( type < 10 ){  type = "0"+type;}

        	$currentPopupContainer = $('.sec-alert-'+ type );

        	$currentContents = $currentPopupContainer.html();

           	$currentPopup.html( $currentContents );

           	$currentPopupContainer.empty();

        	$currentPopup.show();

        	$currentPopup.before('<div class="lightbox-skrim"></div>');

			//dong_won.lee ^-^a
			if($('.sys-login-btn[data-button-type="1"]').size() === 0){
    			$('.body_wrapper').css('-webkit-transform', 'none');
			}

			$currentPopup.off().on( "click", ".icon-close-x, .popup-confirm, .popup-cancel-button", hideAlert );

			centerFlexiblePopup();

			$currentPopup.find( "> div").attr( "tabindex", 0 ).focus();

			$('body').on('click', '.lightbox-skrim', function() {
				hideAlert();
			});

        }



        function hideAlert(){

	       	 if( $currentPopup ){

	       		 $currentPopup.hide();

	       		 $currentPopup.empty();

	       		 $currentPopup.target.focus();

	       		 $currentPopup = null;

	           	 $('.lightbox-skrim').remove();

				 //dong_won.lee^-^a
				 if($('.sys-login-btn[data-button-type="1"]').size() === 0){
					$('.body_wrapper').css('-webkit-transform', '');
				 }

	       	 }



	       	 if( $currentPopupContainer ){

	       		 $currentPopupContainer.html( $currentContents );

	       		 $currentPopupContainer = null;

	       	 }

        }



        //개통신청 버튼 클릭시 옵션값 선택이 되지 않았을때 나오는 알럿

        ss.PDPStandard.secFn.openphoneAlert = function ( target, type ){

        	var tailText = ' 선택해 주세요.';

        	var headText = '';

			var optionCharge =  $("#optionCharge").val();

			var optionJointype =  $("#optionJointype").val();

			var optionContract =  $("#optionContract").val();

			var optionMonthly=  $("#optionMonthly").val();

			var optionSubside = $("#optionSubside").val();

        	switch ('') {

	    		case optionCharge:

	    			headText = '요금제를';

					break;

				case optionJointype:

					headText = '가입유형을';

					break;

				case optionContract:

					headText = '약정할인기간을';

					break;

				case optionMonthly:

					headText = '단말기 할부기간을';

					break;

				case optionSubside:

					headText = '추가할인을';

					break;

				default:

					headText = '요금제 및 개통 옵션을';

        	}



        	$('.sec-alert-07 .sec-alert-contents p').text(headText+tailText);

        	showAlert( target, type );

        }



        function setToggleButton(toggler){

     		var $toggler = $(toggler);

     		var args = {

                 content: "#dummy-popup-container " + $toggler.data('content'),

                 afterText: $toggler.data('after-text'),

                 currText: $toggler.data('text'),

                 autoScroll: $toggler.data('autoscroll')

             };



     		var toggleView = new ss.Toggle($toggler, args);

     		$($('._bind-init2click').attr('data-content')).find('[data-autoscroll="true"]').addClass('_protectScrollOnce');

			$('._bind-init2click').addClass('_protectScrollOnce');

			toggleView.action();

         }



        function setToggleInPopup(){

        	 $('#dummy-popup-container .toggle').on('click', function () {

             	setToggleButton(this);

             });

         }



        //tooltip 세팅

        function setPopovers(){

        	var popoverContainer = '.body_wrapper';

        	var popupList = [

        	                 	{ target:".estimate-price-section .call-question", contents:".sec-tooltip.type-01" },//월 납부 예상금액

        	                 	{ target:".sec-point .call-question", contents:".sec-tooltip.type-02" }, //삼성전자포인트

        	                 	{ target:".free-item .call-question", contents:".sec-tooltip.type-03" }, //사은품 증정안내

        	                 	{ target:".stock-condition .call-question", contents:".sec-tooltip.type-04" }, //매장재고확인

        	                 	{ target:".pickup .call-question", contents:".sec-tooltip.type-06" } //매장픽업

        	                 	//	{ target:".d-desc", contents:".sec-tooltip.type-08" },//청구할인

        	                 	//{ target:".ecomText .call-question", contents:".sec-tooltip.type-09" }//혜택가

        	                 ];

        	var popup;

        	var targets = [];

        	for( var i=0, count=popupList.length ; i<count ; i+=1 ){

        		popup = popupList[ i ];

        		new ss.Popover( popup.target, {placement: 'auto top', content: $( popup.contents )[0].outerHTML, html: true, container: popoverContainer, animation: false});

        		targets.push( popup.target );

        	}



            $(document).on('shown.bs.popover',  targets.join( ", "), function() {

            	$( ".popover.in:visible" ).attr( "tabindex","0").focus();

            	//ss.commonWidgets.setFocusAtInWidget( ".popover.in:visible" );

            });



            $( "#dummy-popup-container").on('click',  ".popup-confirm", function() {

            	hideAlert();

            });

        }



        //tooltip의 값이 동적인 경우에 사용 ex)청구할인

        function setPopover(target, contents){

        	var popoverContainer = '.body_wrapper';

        	new ss.Popover( target, {placement: 'auto top', content: $( contents )[0].outerHTML, html: true, container: popoverContainer, animation: false});



            $(document).on('shown.bs.popover',  target, function() {

            	$( ".popover.in:visible" ).attr( "tabindex","0").focus();

            	//ss.commonWidgets.setFocusAtInWidget( ".popover.in:visible" );

            });

        }



      //퍼블리싱 관련

        var $window = $( window );

        var $body = $( "body" );

        function centerFlexiblePopup(){

       	 if( $currentPopup && $currentPopup[ 0 ] ){

       		 var offset = $( ".jump-module.docked" ).length > 0 ? $( ".jump-module.docked" ).outerHeight() : 0;

       		 var widowHeight = $window.outerHeight()-offset;

       		 var popupHeight = $currentPopup.outerHeight();

       		 var scrollTop = $body.scrollTop() + offset;

       		 var top = scrollTop + (widowHeight-popupHeight)/2;

       		 if( top < scrollTop ) top = scrollTop;

       		 $currentPopup.css( "top", top );

            }

        }

      //퍼블리싱 관련

		function Common(){

		if( ($("#packageYN").attr('value') == 'Y') && ($("#contentsType").attr('value') == 'WOW') ) {

			$(".tech-spec-module").remove();

		}





        	$( document ).on( "focus", "input.hide-input", function(){

        		var $this = $( this );

 			    var id = $this.attr( "id" );

 			    var $label = $this.siblings( "label[ for="+id+"]");

 			    $label.addClass( "focused" );

        	});



        	$( document ).on( "blur", "input.hide-input", function(){

        		var $this = $( this );

			    var id = $this.attr( "id" );

			    var $label = $this.siblings( "label[ for="+id+"]");

			    $label.removeClass( "focused" );

        	});



        	var $priceOption = $(".price-option-module");



        	$( document ).on( "click", ".go-price-option" , function(){

        		var scrollTop = ss.metrics.elemTop($(".price-option-module"));

        		var dockedJump = $( ".jump-module.docked" )

        		if( dockedJump.length > 0  ){

        			scrollTop +=  dockedJump.height();

        		}

        		ss.htmlBody.animate({scrollTop:scrollTop}, 1000);

        	})



        	eventBridge.on(eventDictionary.global.RESIZE, function() {

        		upperBanner();

        		centerFlexiblePopup();

            });

        }

		//퍼블리싱 관련

        function Aircon(){

        	bindEvent();

        	function bindEvent(){

        		$('.item .item-tit').on('click', function (ev) {

                    var mobile = new RegExp('(^mobile)');

                    if (!mobile.test(ss.metrics.device) || ss.metrics.isIE8() ){

                        ev.preventDefault();

                        return false;

                    }

                });

        	}

        }

		//퍼블리싱 관련

        function Delivery(){

        	bindEvent();

        	function bindEvent(){

        		$('.info-item .item-tit').on('click', function (ev) {

                    var mobile = new RegExp('(^mobile)');

                    if (!mobile.test(ss.metrics.device) || ss.metrics.isIE8()){

                        ev.preventDefault();

                        return false;

                    }

                });

        	}

        }

      //퍼블리싱 관련

        function SellerInfo(){

        	var $sellerInfoList = $( ".seller-info-module-con ul" );

        	var $listItem = $sellerInfoList.find( "li" );

        	if( $listItem.length%2 != 0 ){

        		$sellerInfoList.append( '<li class="blank-box"><span></span></li>');

        	}

        }



        /*

         * [호환 가능 프린터 찾기]

         * 카테고리 코드 == '06010600' 인경우만 해당영역 노출 및 이벤트 바인딩

         */

		function findPrinterAccessory(){

			if($("#iaCode").val() == pdpMsg.printerAccessoryIaCode){

				$(".find-printer-module").show();

				$(".find-printer-module button").click(function() {

					getPrinterAccessoryCompatibility();

				});



				$(".find-printer-module .input-txt").keydown(function(e){

					   if(e.keyCode == 13){

						   getPrinterAccessoryCompatibility();

						   self.focus();

					   }

				});



				function getPrinterAccessoryCompatibility(){

					var searchKeyword = $(".find-printer-module .input-txt").val();



					searchKeyword = searchKeyword.replace(/(^\s*)|(\s*$)/gi, "");

					console.log(searchKeyword);



					var iaCode = $("#iaCode").val();



					var url = "/" + SITE_CD + "/api/product/checkcompatible/" + iaCode + "/" + modelCode + "?searchKeyword=" + searchKeyword + "&mType=json";



					$.ajax({

						type		: 'POST',

						url			: url,

						dataType	: "json",

						success		: function (data) {

							var result = data.PinterAccessoryCount;

							if(result=='1') {

								showAlert( ".find-printer-module button", 9);

							} else {

				        		showAlert( ".find-printer-module button", 8);

							}

						},

						error		: function(data) {

						}

					});

				}

			}

		}



		/*

		 * [띠배너]

		 * 화면사이즈 변화에 따른 띠배너 이미지 변경로직

		 */

		function upperBanner(){

			var bannerImg = $('.sec-store-banner img');

			var bannerLink = $('.sec-store-banner a');

			var device = ss.metrics.device;

        	switch (device) {

        		case 'mobile':

        			bannerImg.attr('src', mobileBanner);

        			bannerLink.attr('href', mobileBannerLink);

					break;

				case 'mobile-landscape':

					bannerImg.attr('src', mobileBanner);

					bannerLink.attr('href', mobileBannerLink);

					break;

				case 'tablet-portrait':

					bannerImg.attr('src', tabletBanner);

					bannerLink.attr('href', tabletBannerLink);

					break;

				case 'tablet-landscape':

					bannerImg.attr('src', tabletBanner);

					bannerLink.attr('href', tabletBannerLink);

					break;

				case 'desktop':

					bannerImg.attr('src', desktopBanner);

					bannerLink.attr('href', desktopBannerLink);

					break;

        	}

		}



		/*

		 * 천단위 (,)콤마 생성,제거

		 */

		function addComma(str){

			str = String(str);

			return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g,'$1,');

		}

		function removeComma(str) {

			str = String(str);

			str = str.replace(/^\$|,/g,"");;

			return str;

		}



		/*

		 * 숫자 입력부분에 숫자만 입력가능하도록 fucntion 생성

		 */

		function buyingToolsUtil(){

        	$.fn.alphanumericSEC = function(p) {

				p = $.extend({

					ichars: "!@#$%^&*()+=[]\\\';,/{}|\":<>?~`.-_ ",

					nchars: "",

					allow: ""

				  }, p);



				return this.each (function() {

					if (p.nocaps) p.nchars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

					if (p.allcaps) p.nchars += "abcdefghijklmnopqrstuvwxyz";



					var s = p.allow.split('');

					for ( i=0;i<s.length;i++) if (p.ichars.indexOf(s[i]) != -1) s[i] = "\\" + s[i];

					p.allow = s.join('|');



					var reg = new RegExp(p.allow,'gi');

					var ch = p.ichars + p.nchars;

					ch = ch.replace(reg,'');

					$(this).live("keydown",

						function(e){

							if (!e.charCode) k = String.fromCharCode(e.which);

								else k = String.fromCharCode(e.charCode);



							if (e.ctrlKey && k.toLowerCase()=='v'){



								e.preventDefault();

							}

						}

					);

					$(this).live("keypress",

						function(e){

							if (!e.charCode) k = String.fromCharCode(e.which);

								else k = String.fromCharCode(e.charCode);



							if (ch.indexOf(k) != -1){



								e.preventDefault();

							}

						}

					);

					if(!p.korean) {

						// chrom, ff 의 한글은 blur or keyup 에서 처리

						$(this).live("blur keyup", function() {

							$(this).val( $(this).val().replace( /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '' ) );

						});

					}

					$(this).bind('contextmenu',function () {return false;});

				});



			};



			$.fn.numericSEC = function(p) {

				var az = "abcdefghijklmnopqrstuvwxyz";

				az += az.toUpperCase();



				p = $.extend({

					nchars: az

				  }, p);



				return this.each (function() {

					$(this).css({"ime-mode":"disabled"});

					$(this).alphanumericSEC(p);

				});

			};

        }



		/*

		 * [위시리스트]

		 * 위시리스트 노출 여부

		 */

		ss.PDPStandard.secFn.wishListButton = function (data){

			if (USE_ESTORE && data.wishListBtnYn == 'Y') {

				$( '#wishlist-tab' ).show();

				new ss.WishListButton({container: $('.ss-wishlist-button')});

			}

		}



	    /*

	     * [매장 픽업]

	     * 매장 리스트 출력 및 버튼 이벤트 바인딩

	     */

		ss.PDPStandard.secFn.pickupStore = function (data){

			var currentPage = 0;

    		var isDisplayedStock = data.displayedStock;

    		var pickupFlag = true;

			//jeonggon.bang #882
			var isShowAllStores = false;

			if (ss.metrics.isMobile() != null) { //not PC
    			if ($.cookies.get('geoCoords') == undefined || $.cookies.get('geoCoords') == null ) {
    				eventBridge.trigger(jQuery.Event(eventDictionary.location.REQUEST_STORES));
    			}
    		}
    		else {  //PC
    			if ($.cookies.get('dongCd') == undefined || $.cookies.get('dongCd') == null ) {
    				eventBridge.trigger(jQuery.Event(eventDictionary.location.REQUEST_DONGCODE_STORES));
    			}
    		}

    		//wow인 경우 - 영역 노출 및 버튼 이벤트 바인딩

    		function wowPickupStoreInit(){

    			if(data.pickupAvailable == true ){

    				$( "#pickup-01" ).attr( "checked", false );

    				$( ".pickup").show();

					//849 매장픽업 신규 20160202 start
					$('#pickup-store-id').val('');
					$('.store-choice.sec-p-item p span').eq(0).text('상품을 수령하실 픽업매장을 선택하세요.');
					$('.store-choice.sec-p-item p span').eq(1).text('');
					$('.store-choice.sec-p-item p span').eq(2).find('.choice-store.btn-link-01').attr('style','display:block');
					$('.store-choice.sec-p-item p span').eq(2).find('.change-store.btn-link-01').attr('style','display:none');

					// 일반배송 클릭 시
					//$('.pickup #pickup-00').on('click',function(){
					$( document ).on( "click", ".pickup #pickup-00", function( event ){
						sendScCheckoutStep('pdp:store_online');
						$('#pickup-store-type').val('pickup-00');
						$('#pickup-01').attr('checked',false);
						$('.pickup #pickup-00').addClass('on');
						$('.pickup #pickup-01').removeClass('on');
						$('.store-choice.sec-p-item').hide();
						$('.store-stock.sec-p-item').hide();
					});

					// 매장픽업 클릭 시
					//$('.pickup #pickup-01').on('click',function(){
					$( document ).on( "click", ".pickup #pickup-01", function( event ){
						sendScCheckoutStep('pdp:store_pickup');
						$('#pickup-store-type').val('pickup-01');
						$('.pickup #pickup-00').removeClass('on');
						$('.pickup #pickup-01').addClass('on');
						$('.store-choice.sec-p-item').show();
						// 선택된 매장이 있으면(즉 스토어 아이디가 있으면) 해당 매장 노출
						if($('#pickup-store-id').val() != '' && $('#pickup-store-id').val() != undefined && $('#pickup-store-id').val() != 'undefined') {
							$('#pickup-01').attr('checked',true);
							$('.store-stock.sec-p-item').show();
						}
					});

					// 일시품절일 경우 매장픽업이 디폴트, 일반배송 선택 불가, 안내 문구 노출
					if(data.stockLevelStatus == 'outOfStock') {
						$('.pickup #pickup-01').trigger('click');
						//$('.pickup #pickup-00').off();
						$( document ).off( "click", ".pickup #pickup-00" );
						$('.message-01').attr('style','display:block');
					} else{ // 일시품절 아닌 상품은 일반배송이 디폴트
						$('.pickup #pickup-00').addClass('on');
						$('.pickup #pickup-01').removeClass('on');
						$('.message-01').attr('style','display:none');
						$('.store-stock.sec-p-item').hide();
					}
					//849 매장픽업 신규 20160202 end

    				//$( document ).on( "click", "#dummy-popup-container .pickup .check_text", function( event ){
					$( document ).on( "click", ".choice-store.btn-link-01", function( event ){ //849

            			event.preventDefault();

            			if(!$( "#pickup-01" ).attr( "checked")){

            				sendScCheckoutStep('pdp:store_pickup:select_stores');

            				pageType = "sto";

            				showPickupStoreAlert('', 0);

            			}else{
            				$( "#pickup-01" ).attr( "checked", false );

            				$('.store-choice.sec-p-item').hide();

            				$('.store-stock.sec-p-item').hide();

            				$('.notice.store-notice').hide();

            				// chw.park 매장 픽업 수정
							// 보유매장 버튼 노출 / 바로 구매, 장바구니 버튼 숨기기
							$('#findStore').show();

							$('#wowQuickBuy').hide();

							$('#wowAddToCart').hide();

						}

            		});


					//849 기존 매장픽업 체크 로직 주석처리
    				/*$( document ).on( "keydown", "#dummy-popup-container #pickup-01", function( event ){

            			if( event.keyCode == 32 ){

            				event.preventDefault();

                			if(!$( "#pickup-01" ).attr( "checked")){

                				sendScCheckoutStep('pdp:store_pickup');

                				pageType = "sto";

                				showPickupStoreAlert('', 0);

                			}else{

                				$( "#pickup-01" ).attr( "checked", false );

                				$('.store-choice.sec-p-item').hide();

                				$('.store-stock.sec-p-item').hide();

                				$('.notice.store-notice').hide();

                				// chw.park 매장 픽업 수정
								// 보유매장 버튼 노출 / 바로 구매, 장바구니 버튼 숨기기
								$('#findStore').show();

								$('#wowQuickBuy').hide();

								$('#wowAddToCart').hide();

								// #345 매장픽업 해제 시 수량도 원래의 수량으로 초기화
								ss.PDPStandard.secFn.stockQuantity(data);

                			}

            			}

            		});

    				$( document ).on( "click", "#dummy-popup-container #pickup-01", function( event ){

            			if($( "#pickup-01" ).attr( "checked")){

            				event.preventDefault();

            				sendScCheckoutStep('pdp:store_pickup');

            				pageType = "sto";

            				showPickupStoreAlert('', 0);

            			}else{

            				$( "#pickup-01" ).attr( "checked", false );

            				$('.store-choice.sec-p-item').hide();

            				$('.store-stock.sec-p-item').hide();

            				$('.notice.store-notice').hide();

            				// chw.park 매장 픽업 수정
            				// 온라인재고가 없어도 매장픽업 가능
            				if (data.stockLevelStatus == "outOfStock") {

								// 보유매장 버튼 노출 / 바로 구매, 장바구니 버튼 숨기기
								$('#findStore').show();

								$('#wowQuickBuy').hide();

								// $('#addToCart').hide();

            				}

            			}

            		});*/


    				$( document ).on( "click", "#dummy-popup-container .store-choice.sec-p-item .change-store", function( event ){

    					sendScCheckoutStep('pdp:store_pickup:change_stores');

            			pageType = "sto-change";

            			showPickupStoreAlert('', 0);

            		});

    				bindPickupStoreButton();

    			}

    		}



    		//standard인경우 - 영역 노출 및 버튼 이벤트 바인딩

        	function pickupStoreInit(){

    			if(data.pickupAvailable == true ){

    				$( "#pickup-01" ).attr( "checked", false );

    				$( ".ecom-text .pickup").show();

					//849 매장픽업 신규 20160202 start
					$('#pickup-store-id').val('');
					$('.store-choice.sec-p-item p span').eq(0).text('상품을 수령하실 픽업매장을 선택하세요.');
					$('.store-choice.sec-p-item p span').eq(1).text('');
					$('.store-choice.sec-p-item p span').eq(2).find('.choice-store.btn-link-01').attr('style','display:block');
					$('.store-choice.sec-p-item p span').eq(2).find('.change-store.btn-link-01').attr('style','display:none');

					// 일반배송 클릭 시
					//$('.pickup #pickup-00').on('click',function(){
					$( document ).on( "click", ".pickup #pickup-00", function( event ){
						sendScCheckoutStep('pdp:store_online');
						$('#pickup-store-type').val('pickup-00');
						$('#pickup-01').attr('checked',false);
						$('.pickup #pickup-00').addClass('on');
						$('.pickup #pickup-01').removeClass('on');
						$('.store-choice.sec-p-item').hide();
						$('.store-stock.sec-p-item').hide();
					});

					// 매장픽업 클릭 시
					//$('.pickup #pickup-01').on('click',function(){
					$( document ).on( "click", ".pickup #pickup-01", function( event ){
						sendScCheckoutStep('pdp:store_pickup');
						$('#pickup-store-type').val('pickup-01');
						$('.pickup #pickup-00').removeClass('on');
						$('.pickup #pickup-01').addClass('on');
						$('.store-choice.sec-p-item').show();
						// 선택된 매장이 있으면(즉 스토어 아이디가 있으면) 해당 매장 노출
						if($('#pickup-store-id').val() != '' && $('#pickup-store-id').val() != undefined && $('#pickup-store-id').val() != 'undefined') {
							$('#pickup-01').attr('checked',true);
							$('.store-stock.sec-p-item').show();
						}
					});

					// 일시품절일 경우 매장픽업이 디폴트, 일반배송 선택 불가, 안내 문구 노출
					if(data.stockLevelStatus == 'outOfStock') {
						$('.pickup #pickup-01').trigger('click');
						//$('.pickup #pickup-00').off();
						$( document ).off( "click", ".pickup #pickup-00" );
						$('.message-01').attr('style','display:block');
					} else{ // 일시품절 아닌 상품은 일반배송이 디폴트
						$('.pickup #pickup-00').addClass('on');
						$('.pickup #pickup-01').removeClass('on');
						$('.message-01').attr('style','display:none');
						$('.store-stock.sec-p-item').hide();
					}
					//849 매장픽업 신규 20160202 end

    				//$( ".pickup .check_text" ).on( "click", function( event ){
					$( ".choice-store.btn-link-01" ).on( "click", function( event ){ //849

    					event.preventDefault();

            			if(!$( "#pickup-01" ).attr( "checked")){

            				sendScCheckoutStep('pdp:store_pickup:select_stores');

                			showPickupStoreAlert('', 0);

            			}else{

							$('.cart-popover button.close-button').trigger('click');

            				$( "#pickup-01" ).attr( "checked", false );

            				$('.ecom-module .store-choice').hide();

            				$('.ecom-module .store-stock').hide();

            				$('.ecom-module .notice').hide();

            				// chw.park 매장 픽업 수정
            				// 온라인재고가 없어도 매장픽업 가능
            				if (data.stockLevelStatus == "outOfStock") {

            					// 보유매장 버튼 노출 / 바로 구매, 장바구니 버튼 숨기기
            					$('#findStore').show();

            					$('#quickBuy').hide();

            					//$('#addToCart').hide();
							}

							// #345 매장픽업 해제 시 수량도 원래의 수량으로 초기화
							ss.PDPStandard.secFn.stockQuantity(data);
            			}

            		});

					//849 기존 매장픽업 체크 로직 주석처리
            		/*$( "#pickup-01" ).on( "keydown", function( event ){

            			if( event.keyCode == 32 ){

            				event.preventDefault();

                			if(!$( "#pickup-01" ).attr( "checked")){

                				sendScCheckoutStep('pdp:store_pickup');

                				showPickupStoreAlert('', 0);

                			}else{

                				$('.cart-popover button.close-button').trigger('click');

                				$( "#pickup-01" ).attr( "checked", false );

                				$('.ecom-module .store-choice').hide();

                				$('.ecom-module .store-stock').hide();

                				$('.ecom-module .notice').hide();

                				// chw.park 매장 픽업 수정
                				// 온라인재고가 없어도 매장픽업 가능
                				if (data.stockLevelStatus == "outOfStock") {

                					// 보유매장 버튼 노출 / 바로 구매, 장바구니 버튼 숨기기
                					$('#findStore').show();

                					$('#quickBuy').hide();

                					//$('#addToCart').hide();
    							}
							}
            			}
            		});



            		$( "#pickup-01" ).on( "click", function( event ){

            			if($( "#pickup-01" ).attr( "checked")){

            				sendScCheckoutStep('pdp:store_pickup');

            				event.preventDefault();

            				showPickupStoreAlert('', 0);

            			}else{
							$('.cart-popover button.close-button').trigger('click');

            				$( "#pickup-01" ).attr( "checked", false );

            				$('.ecom-module .store-choice').hide();

            				$('.ecom-module .store-stock').hide();

            				$('.ecom-module .notice').hide();

						}

            		});*/


            		$( ".ecom-module .store-choice .change-store" ).on( "click", function(){

            			sendScCheckoutStep('pdp:store_pickup:change_stores');

            			showPickupStoreAlert('', 0);

            		});

            		bindPickupStoreButton();

    			}

        	 }



        	//로그인이 되어있는 경우 픽업매장API호출

        	function showPickupStoreAlert(addr, currentPage){

    			if (ss.metrics.isMobile() != null) {
	    			if ($.cookies.get('geoCoords') == undefined || $.cookies.get('geoCoords') == null ) {
	    				var param = {

		    					'addr' : addr,

		    					'page' :  currentPage,

		    					'productCode': modelCode,

		    					'searchall': 'N',

								'pickupAvailableYN' : 'Y'
		    			};
	    			}
	    			else {
	    				var latitude = $.cookies.get('geoCoords').latitude;
						var longitude = $.cookies.get('geoCoords').longitude;

						var param = {

		    					'addr' : addr,

		    					'page' :  currentPage,

		    					'productCode': modelCode,

		    					'searchall': 'N',

								'pickupAvailableYN' : 'Y',

								'latitude' : latitude,

		    					'longitude' : longitude

		    			};
	    			}
	    		}
	    		else {
	    			if ($.cookies.get('dongCd') == undefined || $.cookies.get('dongCd') == null ) {
	    				var param = {

		    					'addr' : addr,

		    					'page' :  currentPage,

		    					'productCode': modelCode,

		    					'searchall': 'N',

								'pickupAvailableYN' : 'Y'
		    			};
	    			}
	    			else {
	    				var dongCd = $.cookies.get('dongCd');

						var param = {

		    					'addr' : addr,

		    					'page' :  currentPage,

		    					'productCode': modelCode,

		    					'searchall': 'N',

								'pickupAvailableYN' : 'Y',

								'dongCd' : dongCd

		    			};
	    			}
	    		}

				if(pickupFlag == false){

					return;

				}

				pickupFlag = false;
				isShowAllStores = false;

				ss.Auth.checkSignIn(function(loginChk){

					if(loginChk){

		        		estore.stores(param, function(data) {

		        			console.info('pickup_store ::', data);

		        			//if (data && data.resultCode == "0000") {

		        				//setPickUpStoreAlert(data);

		        				//pickupFlag = true;

		        			//}
						   if (data && data.resultCode == "0000") {

								//jeonggon.bang
								if ( data.data.results.length == 0 ) {
								  //result = 0 이면 전체 리스트로 재호출
								  isShowAllStores = true;
								  var paramAll = {

									'addr' : addr,

									'page' :  currentPage,

									'productCode': modelCode,

									'searchall': 'N',

									'pickupAvailableYN' : 'Y'
								  };

								  estore.stores(paramAll, function(data) {

								  if (data && data.resultCode == "0000") {

									//jeonggon.bang #882
									setPickUpStoreAlert(data);
									pickupFlag = true;

								  }

								});

								}else {

								  //검색 결과가 있을 때
								  setPickUpStoreAlert(data);
								  pickupFlag = true;
								}

							}

		        		});

					}else {

						pickupFlag = true;

						if(isWow){

							hideAlert();

						}

					}

				},true,true);

        	}



        	//픽업매장 API재호출

        	function resetPickUpStoreList(addr, currentPage){

    			if (ss.metrics.isMobile() != null) {
	    			if ($.cookies.get('geoCoords') == undefined || $.cookies.get('geoCoords') == null ) {
	    				var param = {

		    					'addr' : addr,

		    					'page' :  currentPage,

		    					'productCode': modelCode,

		    					'searchall': 'N',

								'pickupAvailableYN' : 'Y'
		    			};
	    			}
	    			else {
	    				var latitude = $.cookies.get('geoCoords').latitude;
						var longitude = $.cookies.get('geoCoords').longitude;

						var param = {

		    					'addr' : addr,

		    					'page' :  currentPage,

		    					'productCode': modelCode,

		    					'searchall': 'N',

								'pickupAvailableYN' : 'Y',

								'latitude' : latitude,

		    					'longitude' : longitude

		    			};
	    			}
	    		}
	    		else {
					//jeonggon.bang #882
	    			if ($.cookies.get('dongCd') == undefined || $.cookies.get('dongCd') == null || isShowAllStores ) {
	    				var param = {

		    					'addr' : addr,

		    					'page' :  currentPage,

		    					'productCode': modelCode,

		    					'searchall': 'N',

								'pickupAvailableYN' : 'Y'
		    			};
	    			}
	    			else {
	    				var dongCd = $.cookies.get('dongCd');

						var param = {

		    					'addr' : addr,

		    					'page' :  currentPage,

		    					'productCode': modelCode,

		    					'searchall': 'N',

								'pickupAvailableYN' : 'Y',

								'dongCd' : dongCd

		    			};
	    			}
	    		}

				if(pickupFlag == false){

					return;

				}

				pickupFlag = false;

        		estore.stores(param, function(data) {

        			console.info('pickup_store ::', data);

        			if (data && data.resultCode == "0000") {

        				setPickUpStoreList(data);

        				pickupFlag = true;

        			}

        		});

        	}



        	//팝업 호출

        	function setPickUpStoreAlert(data){

    			setPickUpStoreList(data);

        		if(isWow){

        			showStore();

        		}else{

        			showAlert( $( "#pickup-01" ).selector, 16 );

        			setToggleInPopup();

        		}

				$( ".store-choice .stock-store a").attr('href', 'http://local.sec.samsung.com/comLocal/sec/dps/stockShopMain.do?productCode=' + modelCode);

				if( ss.metrics.isIE8() ){

    				ss.PlaceholderInPopup( $( "#dummy-popup-container" ) );

    			}

        	}



        	function showStore(){

        		$productInfo.css( "position", "absolute" ).hide();

        		$storeChoice.css( "position", "relative" ).show();

        		$calculator.css( "position", "absolute" ).hide();

        		$storeBackBtn.focus();

           	}



        	//매장픽업 API로 부터 받은 데이터로 리스트 생성

        	function setPickUpStoreList(data){

				var resultList ="";

				if(data.data.results != undefined && data.data.results != null && data.data.results != ""){

					if(data.data.results.length > 0){

						  //jeonggon.bang #882
						  if ( isShowAllStores || ss.metrics.isMobile() ) {
						  var prePdpStoreText = pdpMsg.pdpStoreChoiceInfo1;
						  $( ".store-choice .search-result-info p").eq(0).html(prePdpStoreText.replace('인근지역에 ','') + data.data.pagination.totalNumberOfResults + pdpMsg.pdpStoreChoiceInfo2);
						  $( ".store-choice .search-result-info p").eq(1).show();
						  $( ".store-choice .search-result-info p").eq(2).hide();
						  }else {
						  $( ".store-choice .search-result-info p").eq(0).html(pdpMsg.pdpStoreChoiceInfo1 + data.data.pagination.totalNumberOfResults + pdpMsg.pdpStoreChoiceInfo2);
						  $( ".store-choice .search-result-info p").eq(1).show();
						  $( ".store-choice .search-result-info p").eq(2).show();
						  $( ".store-choice .search-result-info p").eq(2).html('<a href="javascript:void(0);" class="search-all-stores" style="text-decoration:underline">' + pdpMsg.pdpSearchAll + '</a>');
						  }
						  //$( ".store-choice .search-result-info p").eq(0).html(pdpMsg.pdpStoreChoiceInfo1 + data.data.pagination.totalNumberOfResults + pdpMsg.pdpStoreChoiceInfo2);

    					for(var i=0; i< data.data.results.length; i++){

    						resultList += '<li><input type="hidden" value="'+ data.data.results[i].id+'" /><div class="address"><p>';

    						switch (data.data.results[i].shopType){

	        	        		case 'MOBILE':

	        	        			resultList += pdpMsg.pdpStoreTypeMobile

	        						break;

	        					case 'MARIE':

	        						resultList += pdpMsg.pdpStoreTypeMarie

	        						break;

	        					case 'PLAZA':

	        						resultList += pdpMsg.pdpStoreTypePlaza

	        						break;

	        					default:

        					}

    						//리스트의 상세보기 버튼 추가

    						var shopDetailurl = "javascript:void(window.open('http://local.sec.samsung.com/comLocal/sec/dps/wayPop.do?pageGubun=shop&shopNo=" + data.data.results[i].placeCode+"', '','height=850px, width=656px, location=no, scrollbars=1, resizable=yes'))";

    						resultList += '<span class="break-word">' + data.data.results[i].name + '</span></p>';

    						resultList += '<p>(' + data.data.results[i].address.line1 + ')</p>';

    						resultList += '<p>' + data.data.results[i].address.phone + '</p></div>';

    						resultList += '<div class="btn"><a href="' + shopDetailurl + '" title="' + pdpMsg.pdpNewScreenOpen + '" class="btn-sec-02" onclick="sendScCheckoutStep(\'pdp:store_pickup:detailes:'+data.data.results[i].name+'\');">' + pdpMsg.pdpStoreDetail + '</a>';



    						//리스트의 매장선택 버튼 노출여부 결정

    						if(data.data.results[i].storageLocation != null && data.data.results[i].stockData.stockLevel > 0 && data.data.results[i].storePickupAvailable==true){

    							if(data.data.results[i].storageLocation == "WC10"){

        							if(isDisplayedStock == 'N'){

    	    							resultList += '<br><a href="javascript:void(0);" class="btn-sec-01" stockLevel="' + data.data.results[i].stockData.stockLevel + '">' + pdpMsg.pdpStoreChoice + '</a>';

    	    						}

    							}else if(data.data.results[i].storageLocation == "WL10"){

        							if(isDisplayedStock == 'Y'){

    	    							resultList += '<br><a href="javascript:void(0);" class="btn-sec-01" stockLevel="' + data.data.results[i].stockData.stockLevel + '">' + pdpMsg.pdpStoreChoice + '</a>';

    	    						}

    							}

    						}

    						resultList += '</div></li>';

    					}

					}else {

						//$( ".store-choice .search-result-info p").eq(0).html(pdpMsg.pdpStoreChoiceInfo1 + '0' + pdpMsg.pdpStoreChoiceInfo2);
						//jeonggon.bang #882
						$( ".store-choice .search-result-info p").eq(0).html(pdpMsg.pdpSearchNoResult);
						$( ".store-choice .search-result-info p").eq(1).hide();
						$( ".store-choice .search-result-info p").eq(2).hide();

					}

				}else {

				  //$( ".store-choice .search-result-info p").eq(0).html(pdpMsg.pdpStoreChoiceInfo1 + '0' + pdpMsg.pdpStoreChoiceInfo2);
				  //jeonggon.bang #882
				  $( ".store-choice .search-result-info p").eq(0).html(pdpMsg.pdpSearchNoResult);
				  $( ".store-choice .search-result-info p").eq(1).hide();
				  $( ".store-choice .search-result-info p").eq(2).hide();

				}



				$( ".store-choice .result-list ul").html(resultList);

				pageButtonOnOff(data);

        	}



        	//페이지당 5개씩 보여주며, 이전,다음 버튼 생성 여부 결정

        	function pageButtonOnOff(data){

				currentPage = Math.ceil(data.data.pagination.currentPage);

				var numberOfPages = Math.ceil(data.data.pagination.totalNumberOfResults / 5);

				var previousPage = currentPage < 1 ? 0: currentPage-1;

				var nextPage = numberOfPages ==0 ? 0: currentPage == numberOfPages-1 ? numberOfPages-1: currentPage+1;



				if(currentPage == previousPage) {

    				$( ".store-choice .result-list-more .prev").hide();

				} else {

					$( ".store-choice .result-list-more .prev").show();

				}

				if(currentPage == nextPage) {

    				$( ".store-choice .result-list-more .next").hide();

				} else {

					$( ".store-choice .result-list-more .next").show();

				}

        	}



        	//버튼 이벤트 바인딩

        	function bindPickupStoreButton(){

        		$( document ).on( "submit", '#dummy-popup-container .find-store form', function(){

        			resetPickUpStoreList($(this).find('input[type=text]').val(), 0);

        			return false;

        		});



        		$( document ).on( "click", '#dummy-popup-container .result-list-more .next', function(){

        			resetPickUpStoreList('', currentPage+1);

        		});




        		$( document ).on( "click", '#dummy-popup-container .result-list-more .prev', function(){

        			resetPickUpStoreList('', currentPage-1);

        		});

				//jeonggon.bang #882
				$( document ).on( "click", '#dummy-popup-container .search-result-info .search-all-stores', function() {
				  isShowAllStores = true;
				  resetPickUpStoreList('', currentPage);
				});


    			$( document ).on( "click", "#dummy-popup-container .result-list li .btn-sec-01", function(){

					//849 매장선택 시 message-01 문구 삭제
					$('.message-01').attr('style','display:none');

    				$('.cart-popover button.close-button').trigger('click');

					if(isWow && $('.sec-alert.wow-product-info').css('display') == 'none' && $('.sec-alert.store-choice').css('display') != 'none') {
						$('body').append('<div class="lightbox-skrim"></div>');
					}

    				$( "#pickup-01" ).attr( "checked", true );

    				$('.store-choice.sec-p-item').show();

    				$('.store-stock.sec-p-item').show();

    				$('.notice.store-notice').show();



    				var address = $(this).parent().siblings();

    				$('.store-choice.sec-p-item p span').eq(0).text(address.find('p span').text());

    				$('.store-choice.sec-p-item p span').eq(1).text(address.find('p').eq(1).text());

    				$('#pickup-store-id').val($(this).parent().siblings('input').val());

					$('.store-choice.sec-p-item p span').eq(2).find('.choice-store.btn-link-01').attr('style','display:none'); //849
					$('.store-choice.sec-p-item p span').eq(2).find('.change-store.btn-link-01').attr('style','display:block'); //849

    				//옵니추어 태깅

    				sendScCheckoutStep('pdp:store_pickup:select:'+address.find('p span').text());

    				if(isWow){

    					showInfo();

        				// chw.park 매장 픽업 수정
        				// 온라인재고가 없어도 매장픽업 가능
        				if (data.stockLevelStatus == "outOfStock") {

    						// 바로 구매, 장바구니 버튼 노출 / 보유매장 버튼 숨기기

    						$('#findStore').hide();

    						$('#wowQuickBuy').show();

    						//$('#addToCart').show();

						}

    				}else{

    					hideAlert();

        				// chw.park 매장 픽업 수정
        				// 온라인재고가 없어도 매장픽업 가능
        				if (data.stockLevelStatus == "outOfStock") {

    						// 바로 구매, 장바구니 버튼 노출 / 보유매장 버튼 숨기기

    						$('#findStore').hide();

    						$('#quickBuy').show();

    						//$('#addToCart').show();

						}

    				}

					// #345 픽업할 매장의 재고에 따라 수량 조절 가능하도록 수정
					if(data.flagOpenPhone == 'N'){//정상 표현되는경우
						var stockLevel = $(this).attr('stockLevel');
						$(".order-quantity.sec-p-item input[type=text]").numericSEC();
						$(".order-quantity.sec-p-item input[type=text]").val('1');
						$(".order-quantity.sec-p-item .input-area").removeClass('disable');
						$(".order-quantity.sec-p-item .input-area .btn-quantity").show();
						$(".order-quantity.sec-p-item input[type=text]").attr('maxlength','2');
						$(".order-quantity.sec-p-item input[type=text]").attr('readonly','readonly');

						var maxQuantity = stockLevel;
						var minQuantity = 1;
						if(minQuantity > maxQuantity){
							maxQuantity = 1;
							minQuantity = 1;
						}
						$('.calculator #maxQuantity').val(maxQuantity);
						$('.calculator #minQuantity').val(minQuantity);

						$( document ).off( "focusout", ".order-quantity.sec-p-item input[type=text]" );
						$( document ).off( "click", ".order-quantity.sec-p-item .btn-quantity .plus, .order-quantity.sec-p-item .btn-quantity .minus" );

						$( document ).on( "focusout", ".order-quantity.sec-p-item input[type=text]", function(){
							var s = $(".order-quantity.sec-p-item input[type=text]").val();
							s= Number(s);
							if (s > maxQuantity) {
									$(".order-quantity.sec-p-item input[type=text]").val(maxQuantity);
									QuantityPopup('maxQuantity', maxQuantity);
									return false;
							}
							if (s < minQuantity) {
								$(".order-quantity.sec-p-item input[type=text]").val(minQuantity);
								QuantityPopup('minQuantity', minQuantity);
								return false;
							}
							$(".order-quantity.sec-p-item input[type=text]").val(s);
						});
						$( document ).on( "click", ".order-quantity.sec-p-item .btn-quantity .plus, .order-quantity.sec-p-item .btn-quantity .minus", function(){
							var s = $(".order-quantity.sec-p-item input[type=text]").val();
							s= Number(s);
							if( $( this ).hasClass( "plus" ) ){
								if (s+1 > maxQuantity) {
										$(".order-quantity.sec-p-item input[type=text]").val(maxQuantity);
										QuantityPopup('maxQuantity', maxQuantity);
										return false;
								}
								$(".order-quantity.sec-p-item input[type=text]").val(s+1);
							}else{
								if (s-1 < minQuantity) {
									$(".order-quantity.sec-p-item input[type=text]").val(minQuantity);
									QuantityPopup('minQuantity', minQuantity);
									return false;
								}
								$(".order-quantity.sec-p-item input[type=text]").val(s-1);
							}
						});

						//최대,최소 주문가능 수량 팝업 추가
						function QuantityPopup(type, quantity){
							var message = '';
							if(type == 'maxQuantity'){
								message = '선택하신 상품은 최대 '+quantity +'개까지만 주문 가능합니다.';
							}else if(type == 'minQuantity'){
								/*message = '최소 주문 가능 수량 : '+ quantity;*/
								//dong_won.lee
								message = '죄송합니다.<br>선택하신 수량이 상품의 최소 주문 수량 미만입니다.';
							}
							alertMsgShow(message);
						}

						function alertMsgShow( message ) {
							if(isWow){
								//<br>tag 스크립트 인식 문자로 치환 - dong_won.lee
								if(message.indexOf('<br>')!=-1){
									message = message.replace('<br>','\n')
								}
								alert(message);
							}else{
								var $layer = $('#popup_alert');
								$layer.find('.msg-text').html( message );
								$(".layer_popup").hide();
								$layer.parent().show();
								$layer.find('.button.alert-ok-button').attr("data-tab-next","button alert-ok-button");
								$layer.find('.button.alert-ok-button').attr("data-tab-previous","button alert-ok-button");
								$layer.find('.button.alert-ok-button').focus();
								$('body').append('<div class="lightbox-skrim"></div>');
								var l = parseInt(($('body').width() - $layer.width())/2);
								var t = parseInt( $(window).scrollTop() + (($(window).height()-$layer.height())/2) );
								$layer.css({ "top":t+"px", "left":l+"px" });
							}
						};
					}else {//1로 고정되는경우 ex)개통폰
						$(".order-quantity.sec-p-item .input-area").addClass('disable');
						$(".order-quantity.sec-p-item .input-area .btn-quantity").hide();
						$(".order-quantity.sec-p-item input[type=text]").attr('maxlength','0');
						$(".order-quantity.sec-p-item input[type=text]").attr('readonly','readonly');
					}
					$('.order-quantity.sec-p-item').show();

    			});

        	}



        	if(isWow){

        		wowPickupStoreInit();

        	}else {

        		pickupStoreInit();

        	}

		}



		/*

		 * [플래그]

		 * 플래그 노출 처리


		ss.PDPStandard.secFn.flags = function (data){

			if(data.flags && data.flags != ""){



				var flag = data.flags;

				flag = flag.split(',');



				if (flag.length) {

					var appendData = '';

					for (var index = 0; index < flag.length; index++) {

						var flagVal =  $.trim(flag[index]);

						if(flagVal != null && flagVal != ""){



							if (index != 0) {

								appendData += ' <span class="spacer">|</span> ';

							}

							appendData += flagVal;

						}

					}

					$('.badges').html(appendData);

				}

			}

		}

		 */

		 	ss.PDPStandard.secFn.flags = function (data){

			// chw.park flag 변경
			// top, badges 영역
			if(data.topAreaFlag && data.topAreaFlag != ""){

				var topAreaFlag = data.topAreaFlag;
				topAreaFlag = topAreaFlag.split(',');

				if (topAreaFlag.length) {
					var topFlagAppendData = '';
					for (var index = 0; index < topAreaFlag.length; index++) {
						var topFlagVal =  $.trim(topAreaFlag[index]);
						if(topFlagVal != null && topFlagVal != ""){

							if (index != 0) {
								topFlagAppendData += ' <span class="spacer">|</span> ';
							}
							topFlagAppendData += topFlagVal;
						}
					}
					if( typeof $(".badges").attr("class") != 'undefined' ){
						$('.badges').html(topFlagAppendData);
					}else{
						topFlagAppendData = '<div class="badges">' + topFlagAppendData + '</div>';
						$('.product-info .product-title').before(topFlagAppendData);
					}
				} else {
						$( ".badges").html(topAreaFlag);
				}
			}
			$( ".badges").css('border-bottom-width', '0px');
			if(!isWow){
				$(".product-info .product-title").css('padding-bottom', '15px');
			} else {
				$(".wow-product-info .product-title").css('padding-bottom', '15px');
			}

			// bottom
			if ((data.bottomAreaFlag && data.bottomAreaFlag != "")&&data.bottomAreaFlag.indexOf("예약판매") < 0 &&	data.bottomAreaFlag.indexOf("일시품절") < 0 &&	data.bottomAreaFlag.indexOf("품절임박") < 0	){
				// 특정 문구를 포함하거나 특정 미판매조건의 경우
				if (
					data.bottomAreaFlag.indexOf("판매종료") >= 0 ||
					data.bottomAreaFlag.indexOf("판매예정") >= 0 ||
					data.bottomAreaFlag.indexOf("매장판매") >= 0 ||
					data.flags.indexOf("스토어 미판매") >= 0 ||
					data.flags.indexOf("구매 시 해당 제품의 정보를 참고 바랍니다.") >= 0 ||
					data.salesStatus == 'SALES_END' ||
					data.salesStatus == 'DISCONTINUED' ||
					data.reservedDescription == '판매 예정입니다.' ||
					oldProductYN == 'Y'
					)
				{
					data.bottomAreaFlag = "구매 시 해당 제품의 정보를 참고 바랍니다.";
				}
				var bottomAreaFlag = data.bottomAreaFlag;

				if ((bottomAreaFlag.split(',')).length) {
					bottomAreaFlag = bottomAreaFlag.split(',');
					var bottomFlagAppendData = '';
					for (var index = 0; index < bottomAreaFlag.length; index++) {
						var bottomFlagVal =  $.trim(bottomAreaFlag[index]);
						if(bottomFlagVal != null && bottomFlagVal != ""){
							if (index != 0) {
								bottomFlagAppendData += ' <span class="spacer">|</span> ';
							}
							bottomFlagAppendData += bottomFlagVal;
						}
					}

					$( ".stock").not('.wow-front-stock').html(bottomFlagAppendData);
					$( ".stock").css('color', '#0162b5');
				} else {
					if (bottomAreaFlag == '구매 시 해당 제품의 정보를 참고 바랍니다.'){
						$( ".stock").css('color', '#0162b5').html(bottomAreaFlag);
						$('.product-info-section').css("vertical-align","");
					}else{
						$( ".stock").html(bottomAreaFlag);
						$( ".stock").css('color', '#0162b5');
					}
				}

			} else {
				// 특정 문구를 포함하거나 특정 미판매조건의 경우
				if((data.bottomAreaFlag && data.bottomAreaFlag != "")
						&& (data.bottomAreaFlag.indexOf("한정판매") >= 0 && data.bottomAreaFlag.indexOf("일시품절") >= 0)) { // #248 한정판매 기간 중 일시품절일 경우 플래그와 약정기간, 수량 노출
					$( ".stock").html("한정판매");
					$( ".stock").css('color', '#0162b5');
				} else if (
					data.bottomAreaFlag.indexOf("판매종료") >= 0 ||
					data.bottomAreaFlag.indexOf("판매예정") >= 0 ||
					data.bottomAreaFlag.indexOf("매장판매") >= 0 ||
					data.flags.indexOf("스토어 미판매") >= 0 ||
					data.flags.indexOf("구매 시 해당 제품의 정보를 참고 바랍니다.") >= 0 ||
					data.salesStatus == 'SALES_END' ||
					data.salesStatus == 'DISCONTINUED' ||
					data.reservedDescription == '판매 예정입니다.' ||
					oldProductYN == 'Y'
					)
				{
					$( ".stock").css('color', '#0162b5').html("구매 시 해당 제품의 정보를 참고 바랍니다.");
					$('.product-info-section').css("vertical-align","");
				}
			}
			$( ".stock").css('font-family', 'SECGCWM, sans-serif !important');
		}


		/*

		 * [배송비,판매자정보]

		 * 배송비,판매자정보 노출 처리

		 */

		ss.PDPStandard.secFn.additionalInformation = function (data){

			if(data.salesStatus != 'DISCONTINUED' && data.flagSetProduct != 'Y'){

				$('.delivery-module').show().addClass('jump-contents');

				$('.seller-info-module').show().addClass('jump-contents');

			}

			if(data.categoryCode != null && data.categoryCode != undefined && data.categoryCode == "LI05"){

				//delivery-module
				//$('.air-conditioner-section').show().addClass('jump-contents');

			}

		}



		/*

		 * [버튼 처리]

		 * 바로구매,장바구니,매장찾기에 대한 버튼 노출 처리

		 */

		ss.PDPStandard.secFn.setButton = function (data){

			//개통폰인 경우

			if(data.flagOpenPhone == 'Y' && data.isOpenphone =='Y'){

				$('#openphone').show();

				$('#jumpToOpenphone').show();

				return;

			}

			// quick buy 와 add to basket 버튼

			if (data.buyNowBtnYn == 'Y' && data.cartBtnYn == 'Y') {

				$('#quickBuy').show();

				$('#addToCart').show();

				$('#jumpToQuickBuy').show();

				$('#jumpToQuickBuy').attr("onclick","sendClickCode('jumpto','jump to:quick buy');");

			}else if(data.buyNowBtnYn == 'Y'){

				$('#quickBuy').show();

				$('#jumpToQuickBuy').show();

				$('#jumpToQuickBuy').attr("onclick","sendClickCode('jumpto','jump to:quick buy');");

			}else {

				if(whereToBuyBtn == 'Y' 	&& whereToBuyBtnPDP == 'Y' && data.whereToBuyBtnYn == 'Y') {

					$('#findStore').show();

					$('#jumpToFindStore').show();

				} else if(whereToBuyBtn == 'Y' 	&& whereToBuyBtnPDP == 'Y' && data.whereToBuyBtnYn == 'N') {

					$('#findStore').children().text(pdpMsg.pdpStoreFind);

					$('#findStore').show();

					$('#jumpToFindStore').text(pdpMsg.pdpStoreFind);

					$('#jumpToFindStore').show();

				}else{

					$('.jump-module .info-section').addClass('no-button');

				}

			}

			// 101991 / [sec] Serif TV 보유매장 및 상품보유매장찾기 버튼 비노출 처리
			// 스토어에서만 판매되는 제품  > '보유 매장' 버튼 hide
			if(data.isOnlineStoreOnly == 'Y') {
				$('.ecom-module div#multiShopButton a#findStore').hide();
				$('a#jumpToFindStore').hide();
			}

		}



		/*

		 * [wow버튼 처리]

		 * 바로구매,장바구니,매장찾기에 대한 버튼 노출 처리

		 */

		ss.PDPStandard.secFn.setWOWButton = function (data){

			//개통폰인 경우

			if(data.flagOpenPhone == 'Y' && data.isOpenphone =='Y'){

				$('#openphone').show();

				$('#jumpToOpenphone').show();

				$('#showMoreButton').hide();

				return;

			}

			// quick buy 와 add to basket 버튼
			if (data.buyNowBtnYn == 'Y' && data.cartBtnYn == 'Y') {

				$('#wowQuickBuy').show();

				$('#wowAddToCart').show();

				$('#quickBuy').show();

				if (window.location.pathname.indexOf('/it/')!=-1 && "product detail".indexOf(getOmniInputTag('pageTrack').value)!=-1) {
					//버튼 출력 오류 해결
					$('#showMoreButton').hide();
				}

				$('#quickBuy').attr("onclick","sendClickCode('wishlist','shop now|"+modelCode+"');");

				$('#quickBuy').addClass('show-buy-option');

				$('#jumpToQuickBuy').show();

				$('#jumpToQuickBuy').attr("onclick","sendClickCode('wishlist','shop now|"+modelCode+"');sendClickCode('jumpto','jump to:shop now');");

				if(data.stockLevelStatus == 'outOfStock' && data.pickupAvailable == false) {
					$('#findStore').show();
				}

			}else if(data.buyNowBtnYn == 'Y'){

				$('#wowQuickBuy').show();

				$('#quickBuy').show();

				$('#quickBuy').attr("onclick","sendClickCode('wishlist','shop now|"+modelCode+"');");

				$('#quickBuy').addClass('show-buy-option');

				$('#jumpToQuickBuy').show();

				$('#jumpToQuickBuy').attr("onclick","sendClickCode('wishlist','shop now|"+modelCode+"');sendClickCode('jumpto','jump to:shop now');");

				if(data.stockLevelStatus == 'outOfStock' && data.pickupAvailable == false) {
					$('#findStore').show();
				}

			}else {

				if(data.stockLevelStatus == 'outOfStock' && data.pickupAvailable == true) {
					whereToBuyBtn = 'N';
					whereToBuyBtnPDP = 'N';
					$('#quickBuy').show();
					$('#quickBuy').addClass('show-buy-option');
					$('#quickBuy').attr("onclick","sendClickCode('wishlist','shop now|"+modelCode+"');");
					$('#jumpToQuickBuy').show();
					$('#jumpToQuickBuy').attr("onclick","sendClickCode('wishlist','shop now|"+modelCode+"');sendClickCode('jumpto','jump to:shop now');");

					$('.pickup #pickup-01').trigger('click');
					$( document ).off( "click", ".pickup #pickup-00" );
					$('#wowQuickBuy').hide();
					$('#findStore').hide();
				}

				if(whereToBuyBtn == 'Y' 	&& whereToBuyBtnPDP == 'Y' && data.whereToBuyBtnYn == 'Y') {

					$('#findStore').show();

					$('#jumpToFindStore').show();

				} else if(whereToBuyBtn == 'Y' 	&& whereToBuyBtnPDP == 'Y' && data.whereToBuyBtnYn == 'N') {

					$('#findStore').children().text(pdpMsg.pdpStoreFind);

					$('#findStore').show();

					$('#jumpToFindStore').text(pdpMsg.pdpStoreFind);

					$('#jumpToFindStore').show();

				}else {

					$('.jump-module .info-section').addClass('no-button');

				}

				$('#showMoreButton').hide();

			}

			// 101991 / [sec] Serif TV 보유매장 및 상품보유매장찾기 버튼 비노출 처리
			// 스토어에서만 판매되는 제품  > '보유 매장' 버튼 hide
			if(data.isOnlineStoreOnly == 'Y') {
				$('.ecom-module div#multiShopButton a#findStore').hide();
				$('a#jumpToFindStore').hide();
			}

		}



		/*

		 * [예약판매상품]

		 * 예약판매상품

		 */

		ss.PDPStandard.secFn.salePreOrderPeriod = function (data){
             // chw.park  flag 변경
			 // 예약 판매 종료인 경우
			 if (data.reservedDescription == '판매 예정입니다.')
			 {
				if(!isWow){
					$( ".stock").css('color', '#0162b5').text('구매 시 해당 제품의 정보를 참고 바랍니다.');
					$(".product-info .product-title").css('padding-bottom', '15px');
				} else {
					$( ".stock .wow-front-stock span").css('color', '#0162b5').text("구매 시 해당 제품의 정보를 참고 바랍니다.");
					$(".wow-product-info .product-title").css('padding-bottom', '15px');
				}
			 } else {
				//예약판매 이전인경우 - 판매기간을 보여준다.
				if(data.periodCheck == 'BEFORE'){
					$(".date.sec-p-item").show();
					var date =data.reservedStartDate+' ~<span class="break-word">' +data.reservedEndDate+'</span>';
					$(".date.sec-p-item p").html(date);
					// chw.park  flag 변경 $( ".stock").css('color', '#f41c3a').text("판매예정 상품");
					return
				}

				//예약판매 이후의 경우
				/* chw.park  flag 변경

				if(data.periodCheck == 'AFTER'){
					$( ".stock").css('color', '#f41c3a').text("판매예정 상품");
					return;
				}
				*/

				//예약판매 중인경우 - 판매수량 노출

				if(!isNaN(data.reservationQuantity) && Number(data.reservationQuantity) > 0){
					$(".order-quantity.sec-p-item .desc").show();
					var description ='<span class="limit-num">(예약판매수량 : '+data.reservationQuantity+'개)</span>';
					$(".order-quantity.sec-p-item .desc p").html(description);
				}

				var today = new Date();
				var lastDate = data.reservedEndDate.split('/');
				var lastday = new Date(lastDate[0],(lastDate[1]-1),lastDate[2]);
				var day_calc=(lastday.getTime()-today.getTime())/(24*60*60*1000);
				var restDate = ' (남은 기간 : '+Math.ceil(day_calc)+'일)';
				if(Math.ceil(day_calc) == 0){
					restDate = ' (오늘 마감!)';
				}
				$(".date.sec-p-item").show();
				var date =data.reservedStartDate+' ~ <span class="break-word">' +data.reservedEndDate+'</span><span class="d-day">'+restDate+'</span>';
				$(".date.sec-p-item p").html(date);

				if(data.reservedMsg != ""){
					$(".delivery.sec-p-item").show();
					$(".delivery.sec-p-item p").html(data.reservedMsg);
				}
			 }

		}



		/*

		 * [ID별 구매수량]

		 * ID별 구매수량 제한 노출

		 */

		ss.PDPStandard.secFn.limitOrderByIdQuantity = function (data){

			//data.limitOrderByIdQuantity = 10;

			if(data.limitOrderByIdQuantity != undefined && data.limitOrderByIdQuantity != null && data.limitOrderByIdQuantity != ""){

				$(".order-quantity.sec-p-item .desc").show();

				$(".order-quantity.sec-p-item .desc p").append('<span>※ ID당 '+data.limitOrderByIdQuantity+'개 구매 한정 </span>');

				if(isWow){

					$( ".stock.wow-front-stock span").after(' (※ ID당 '+data.limitOrderByIdQuantity+'개 구매 한정)');

				}

			}

		}



		/*

		 * [한정판매 상품]

		 * 한정판매 상품 노출 여부

		 */

		ss.PDPStandard.secFn.saleLimitedPeriod = function (data){

			if(data.salesStatus == 'ON_SALE' && (data.stockLevelStatus != 'outOfStock'
					|| (data.stockLevelStatus == 'outOfStock' && data.flags.indexOf('일시품절') >= 0))){ // #248 한정판매 기간 중 일시품절일 경우 플래그와 약정기간, 수량 노출

				$(".order-quantity.sec-p-item .desc").show();

				var description = '<span class="limit-num"> (한정판매수량 : '+data.limitedQuantity+'개)</span>';

				if(data.stockLevelStatus == 'outOfStock' && data.flags.indexOf('일시품절') >= 0) { // #248 한정판매 기간 중 일시품절일 경우 플래그와 약정기간, 수량 노출
					$('.order-quantity.sec-p-item').show();
				}

				$(".order-quantity.sec-p-item .desc p").append(description);


				$(".date.sec-p-item").show();

				var data =data.limitedStartDate+' ~ <span class="break-word">' +data.limitedEndDate+'</span>';

				$(".date.sec-p-item p").html(data);

			}

		}



		/*

		 * [띠배너]

		 * 이미지와 링크url세팅

		 */

		ss.PDPStandard.secFn.setUpperBanner = function (data){

			if(data.bannerList.length == 3){

				//$('.sec-store-banner').show();

				for (var i = 0; i < data.bannerList.length; i++) {

					if(data.bannerList[i].gridType == '1'){//모바일

						mobileBanner = 'http://' + STORE_DOMAIN + '/' + data.bannerList[i].bannerMedias[0].img.url;

						mobileBannerLink = data.bannerList[i].bannerMedias[0].linkUrl;

					} else if(data.bannerList[i].gridType == '2'){//태블릿

						tabletBanner= 'http://' + STORE_DOMAIN + '/' + data.bannerList[i].bannerMedias[0].img.url;

						tabletBannerLink = data.bannerList[i].bannerMedias[0].linkUrl;

					} else if(data.bannerList[i].gridType == '3'){//PC

						desktopBanner= 'http://' + STORE_DOMAIN + '/' + data.bannerList[i].bannerMedias[0].img.url;

						desktopBannerLink = data.bannerList[i].bannerMedias[0].linkUrl;

					}

				}



				upperBanner();

			}

		}



		/*

		 * [S포인트]

		 * S포인트 노출

		 */

		ss.PDPStandard.secFn.samsungPoint = function (data){if(data.spointData != undefined && data.spointData != null && data.spointData != "" && data.flagOpenPhone != "Y"){

				//기본 베이스 포인트 체크
				if(data.spointData.spointBase != undefined && data.spointData.spointBase != null && data.spointData.spointBase != ""){

					$(".sec-point").show();

					var spointText = "";

					var spointHtml = "";

					var pointSum = 0;

					var spointProduct = 0;

					var spointPrice = 0;

					//전체 포인트 =  spointbase + spointProduct + spointPrice
					if(!isNaN(Math.floor(parseInt(data.spointData.spointBase)))){
						//기본 베이스 포인트 합
						pointSum = Math.floor(parseInt(data.spointData.spointBase));

					}
					if(!isNaN(Math.floor(parseInt(data.spointData.spointProduct)))){
						//기본 베이스 포인트 합
						spointProduct = Math.floor(parseInt(data.spointData.spointProduct));
						pointSum = pointSum + spointProduct;

					}
					if(!isNaN(Math.floor(parseInt(data.spointData.spointPrice)))){
						//기본 베이스 포인트 합
						spointPrice = Math.floor(parseInt(data.spointData.spointPrice));
						pointSum = pointSum + spointPrice;
					}

					// 포인트 계산
					spointText = addComma(pointSum) + " 포인트";


					// 포인트 Ratio 적용
					var persentSum = "( 기본 "+data.spointData.spointRatio+"%";

					//포인트 멤버십 적용
					if(data.spointData.spointMem != undefined && data.spointData.spointMem != null && data.spointData.spointMem != "" && data.spointData.spointMem != "0"){

						if(!isNaN(Math.floor(parseInt(data.spointData.spointMem)))){

							pointSum += Math.floor(parseInt(data.spointData.spointMem));

						}

						persentSum = persentSum +"+" + data.spointData.spointMemRatio+"%";

					}

					//spointHtml = addComma(pointSum) + persentSum+")";

					spointHtml = persentSum;

					//4가지의 경우에 따라서 buying tool적용
					/*  dong_won.lee^^;
						=======================================================
						1) 상품 추가 포인트 + 금액대별 포인트가 모두 있는 경우
						spointProduct / spointPrice가 모두 있는 경우
						( 기본 0.2% + 추가 100,000 + 구매포인트 80,000 )

						2) 상품 추가 포인트만 있는 경우
						spointProduct
						( 기본 0.2% + 추가 100,000 )

						3) 금액대별 포인트만 있는 경우
						( 기본 0.2% + 구매포인트 80,000 )
						spointPrice

						4) 기본 포인트만 있는 경우
						( 기본 0.2% )
						=======================================================

					*/
					if (spointProduct != undefined && spointProduct != null && spointProduct !="" && spointProduct != "0") {
							spointHtml += " + 추가 " +  addComma(spointProduct);
					}

					if (spointPrice != undefined && spointPrice != null && spointPrice !="" && spointPrice != "0") {
							spointHtml += " + 구매포인트 " +  addComma(spointPrice);
					}
					spointHtml += " )";


					//추가포인트가 있는경우

					if(data.spointData.spointAdd != undefined && data.spointData.spointAdd != null && data.spointData.spointAdd != "" && data.spointData.spointAdd != "0"){

						var pointAdd = 0;

						if(!isNaN(Math.floor(parseInt(data.spointData.spointAdd)))){

							//추가 포인트 적용 시킴.
							pointAdd = Math.floor(parseInt(data.spointData.spointAdd));

						}

						//spointHtml += " + 추가 " +addComma(pointAdd);

					}

					if($('.sec-point .sec-p-item.ltext').length <= 0){
						$('.sec-point .con').after("<div class='sec-p-item ltext'></div>");
					}
					spointHtmlP = "<p>" + spointHtml +"</p>";

					$('.sec-point .sec-p-item.ltext').empty();

					$('.sec-point .sec-p-item.ltext').append(spointHtmlP);

					//spointPrice가 없으면, 1라인으로 대체
					if (spointPrice == 0 || spointProduct == 0) {
						$('.sec-point .sec-p-item.ltext').remove();
						spointText = spointText + " " + spointHtml;
					}


					$(".sec-point .con").empty();

					$(".sec-point .con").append(spointText);

					/*
					 * Spoint Data cashing
					 */
					 //spoint 적용을 위한 데이터 셋팅 dong_won.lee^^;

					if (data.spointData != null && data.spointData != "") {
						if (data.spointData.spointMemRatio != "" && data.spointData.spointRatio != "") {
							var _spointRatio = parseFloat(data.spointData.spointRatio) + parseFloat(data.spointData.spointMemRatio);
						}else{
							var _spointRatio = parseFloat(data.spointData.spointRatio);
						}
						$('#pageTrack').after("<input id='spointratio' name='spointratio' type='hidden' value="+(_spointRatio) + ">");
						$('#pageTrack').after("<input id='spointproduct' name='spointproduct' type='hidden' value="+data.spointData.spointProduct + ">");
					};


				}

			}
		}

		/*

		 * [재고상태]

		 * 재고상태에 따라 문구 출력

		 */

		ss.PDPStandard.secFn.stockCondition = function (data){

			if(data.stockLevelStatusDisplay != undefined && data.stockLevelStatusDisplay != null && data.stockLevelStatusDisplay != ""){

				// 스토어에서만 판매되는 제품 > '상품보유매장 찾기' hide
				if(data.isOnlineStoreOnly == 'Y') {
					$('.stock-condition.sec-p-item .con a').hide();
				} else {
					$('.stock-condition.sec-p-item .con a').show();
				}

				$('.stock-condition').show();

				$('.stock-condition .condition').text(data.stockLevelStatusDisplay);

				switch (data.stockLevelStatus) {

					case 'outOfStock':

						$( ".stock.wow-front-stock span").text(pdpMsg.pdpStatusOutofstock);

						// chw.park  flag 변경 $( ".stock").not('.wow-front-stock').text(pdpMsg.pdpStatusOutofstock);

						//$('.jump-module #jumpToStockStatus').text(pdpMsg.pdpStatusOutofstock);

						break;

					case 'lowStock':

						 $( ".stock.wow-front-stock span").text(pdpMsg.pdpStatusLowstock);

						// chw.park  flag 변경 $( ".stock").not('.wow-front-stock').text(pdpMsg.pdpStatusLowstock);

						//$('.jump-module #jumpToStockStatus').text(pdpMsg.pdpStatusLowstock);

						break;

					case 'inStock':

						$( ".stock.wow-front-stock span").text(pdpMsg.pdpStatusInstock);

						// chw.park  flag 변경 $( ".stock").not('.wow-front-stock').text(pdpMsg.pdpStatusInstock);

						//$('.jump-module #jumpToStockStatus').text(pdpMsg.pdpStatusInstock);

						break;

				}

			}

		}



		/*

		 * [wow가격표시]

		 * wow의경우 가격표시 영역이 2개( standard는 1개)

		 * wow 첫화면에 노출되는 가격정보 나머지는 standard와 동일

		 */

		ss.PDPStandard.secFn.WOWPrice = function (data){

			//개통폰인 경우

			if(data.flagOpenPhone == 'Y'){

				$('.ecom-module .price-04').show();

				$('.ecom-module .price-04 .sale-price').text(data.price);

				if(data.isOpenphone == 'Y'){

					$('.ecom-module .price-05 ').show();

					$('.ecom-module .price-05 .sale-price').text(data.realSalePrice);

				}

				//$('#jumpToPrice').text(data.price);

				return;

			}

			//혜택가+즉시할인

			if(data.flagInstantCoupon == 'Y' && data.displaySetVoucherPrice=='true'){

				$(' .ecom-module .price-03 ').show();

				$(' .ecom-module .price-03 .price-tit').after(data.voucherPrice);

			}



			//회원가

			if(data.userPrice != undefined && data.userPrice != null && data.userPrice != ""){

				$(' .ecom-module .price-02').show();

				$(' .ecom-module .price-02 .sale-price').text(data.userPrice);

				if(data.userSalepriceComment != undefined && data.userSalepriceComment != null && data.userSalepriceComment != ""){

					$(' .ecom-module .price-02 .icon-signin').after('회원은 <span class="member-discount-rate">3%</span> 할인');

				}

			}



			// 판매가,할인가

			if (data.flagOptionDc == 'Y') {

				$(' .ecom-module .price-01').show();

				$(' .ecom-module .price-01 .after-price').text(data.promotionPrice);

				$(' .ecom-module .price-01 .before-price').text(data.price);

			} else if(data.price != undefined && data.price != null && data.price != ""){

				$(' .ecom-module .price-01').show();

				$(' .ecom-module .price-01 .after-price').text(data.price);

			}

		}



		/*

		 * [가격표시]

		 * 가격정보 노출

		 */

		ss.PDPStandard.secFn.price = function (data){

			//개통폰인 경우

			if(data.flagOpenPhone == 'Y'){

				$('.price-04.sec-p-item').show();

				$('.price-04.sec-p-item .sale-price').text(data.price);

				if(data.isOpenphone == 'Y'){

					$('.price-05.sec-p-item ').show();

					$('.price-05.sec-p-item .sale-price').text(data.realSalePrice);

				}

				//$('#jumpToPrice').text(data.price);

				return;

			}



			var setJumpToPrice = false;

			//혜택가+즉시할인

			if(data.flagInstantCoupon == 'Y' && data.displaySetVoucherPrice=='true'){

				$(' .price-03.sec-p-item ').show();

				$(' .price-03.sec-p-item .sale-price').text(data.voucherPrice);

				//$('#jumpToPrice').text(data.voucherPrice);

				//setJumpToPrice = true;



				//즉시할인

				$('.price-03.sec-p-item .discount #discount-rate').html(data.instantCouponName);



				var percent = pdpMsg.promotionPriceToolRate + ' ' + data.instantCouponName;

				var period = pdpMsg.promotionPriceToolPeriod + ' ' + data.instantCouponStartDate + ' ~ ' +data.instantCouponEndDate;



				$('.sec-tooltip.type-09 .rate .percent').html(percent);

				$('.sec-tooltip.type-09 #period').html(period);

				if(isWow){

					$('.price-03.sec-p-item .rate .rate-percent').html(percent);

					$('.price-03.sec-p-item #period').html(period);

					setPopover('.ecom-module .price-03 .call-question','.sec-tooltip.type-09');

				}else{

					setPopover('.price-03.sec-p-item .call-question','.sec-tooltip.type-09');

				}

			}



			//회원가

			if(data.userPrice != undefined && data.userPrice != null && data.userPrice != ""){

				$(' .price-02.sec-p-item').show();

				$(' .price-02.sec-p-item .sale-price').text(data.userPrice);

				if(setJumpToPrice == false){

					//$('#jumpToPrice').text(data.userPrice);

					//setJumpToPrice = true;

				}

				if(data.userSalepriceComment != undefined && data.userSalepriceComment != null && data.userSalepriceComment != ""){

					$(' .price-02.sec-p-item .icon-signin').after('회원은 <span class="member-discount-rate">3%</span> 할인');

				}

			}



			// 판매가,할인가

			if (data.flagOptionDc == 'Y') {

				$(' .price-01.sec-p-item').show();

				$(' .price-01.sec-p-item .after-price').text(data.promotionPrice);

				$(' .price-01.sec-p-item .before-price').text(data.price);

				//$('#jumpToPrice').text(data.promotionPrice);

				/*if(setJumpToPrice == false){

					$('#jumpToPrice').text(data.promotionPrice);

				}*/



				var description = data.promotionDescription;

				description = description.split(';');



				if (description.length) {

					var appendData ="";

					for (var index = 0; index < description.length; index++) {

						var descriptionVal =  description[index];

						if(descriptionVal != null && descriptionVal != ""){

							appendData += '<p>' + descriptionVal + '</p>';

						}

					}

					$(' .price-01.sec-p-item .con').append(appendData);

				}

			} else if(data.price != undefined && data.price != null && data.price != ""){

				$(' .price-01.sec-p-item').show();

				$(' .price-01.sec-p-item .after-price').text(data.price);

				/*if(setJumpToPrice == false){

					$('#jumpToPrice').text(data.price);

				}*/

			}

		}



		/*

		 * [개통폰]

		 */

		ss.PDPStandard.secFn.openPhone = function (data){

			//aeseul.kim 20151216 #711 약정폰 USIM 구매옵션 기능 개선
			if(data.uSimType == "INTEGRAL"){ // USIM 카드 구매 여부 비활성화, 체크=구매 안함
				$("#USIM_00").removeAttr("checked");
				$("#USIM_01").attr("checked", "checked");
				$("#optionUsim").attr("value", "N" );
				$("#USIM_00").attr("disabled", "disabled").next("label").addClass("disable");
				$("#USIM_01").attr("disabled", "disabled").next("label").addClass("disable");
			} else{ // USIM 카드 구매 여부 선택 가능, 체크=구매
				$("#USIM_00").attr("checked", "checked");
				$("#USIM_01").removeAttr("checked");
				$("#optionUsim").attr("value", "Y" );
				$("#USIM_00").removeAttr("disabled").next("label").removeClass("disable");
				$("#USIM_01").removeAttr("disabled").next("label").removeClass("disable");
			}

			//useMobileDistributionLaw 값이 Y가 아닌 경우 지원금,추가지원금 영역 비노출

			if(data.useMobileDistributionLaw != null && data.useMobileDistributionLaw !="" && data.useMobileDistributionLaw != undefined){

				useMobileDistributionLaw = data.useMobileDistributionLaw;

			}



			$(".price-option-module").show();



			function openPhoneInit(){

				openphoneOptionInit();

				optionUsimBindEvent();

				optionChargeBindEvent();

				optionJointypeBindEvent();

			 	optionContractBindEvent();

			 	optionMonthlyBindEvent();

		 	 	optionSubsideBindEvent();

				setOpenphoneData();

				setOpenphoneCookie();

			}



			//옵션선택시 쿠키에 저장해 두었다가, 페이지 전환후 다시 해당 페이지로 돌아올경우 기존 지정해둔 옵션값으로 세팅해준다.

			function setOpenphoneCookie(){

				var cookie = $.cookies.get('OpenPhone');

				if(cookie != null && cookie.modelCode == modelCode){

					if(cookie.optionUsim != ''){

						$('.option-selector.optionUsim .selected-option').trigger('click');

						$('.option-selector.optionUsim ul li[data-value="'+ cookie.optionUsim +'"] a').trigger('click');

					}

					if(cookie.optionCharge != ''){

						$('.option-selector.optionCharge .selected-option').trigger('click');

						$('.option-selector.optionCharge ul li[data-value="'+ cookie.optionCharge +'"] a').trigger('click');

					}

					if(cookie.optionJointype != ''){

						$('.option-selector.optionJointype .selected-option').trigger('click');

						$('.option-selector.optionJointype ul li[data-value="'+ cookie.optionJointype +'"] a').trigger('click');

					}

					if(cookie.optionContract != ''){

						$('.option-selector.optionContract .selected-option').trigger('click');

						$('.option-selector.optionContract ul li[data-value="'+ cookie.optionContract +'"] a').trigger('click');

					}

					if(cookie.optionMonthly != ''){

						$('.option-selector.optionMonthly .selected-option').trigger('click');

						$('.option-selector.optionMonthly ul li[data-value="'+ cookie.optionMonthly +'"] a').trigger('click');

					}

					if(cookie.optionSubside != ''){

						$('.option-selector.optionSubside .selected-option').trigger('click');

						$('.option-selector.optionSubside ul li[data-value="'+ cookie.optionSubside +'"] a').trigger('click');

					}

				}

			}



			//월납부 예상금액 초기화

			function openphoneOptionInit(){

				//$("#optionUsim").attr("value", "Y" );

				$("#optionMakerx").attr("value", data.makerxCode);

				$("#optionCharge").attr("value", "" );

				$("#optionJointype").attr("value", "" );

				$("#optionContract").attr("value", "" );

				$("#optionMonthly").attr("value", "" );

				$("#optionSubside").attr("value", "" );

				$("#optionCheck").attr("value", "N" );

				setPriceData("0::0::0::0::0::0::0::0::-1::-1");

			}



			//유심 선택 옵션 이벤트 바인딩

			function optionUsimBindEvent(){

				$('.option-selector.optionUsim').on('click', '.options li', function() {

	            	var value = $(this).attr('data-value');

	            	openPhoneCookie.optionUsim = value;

	            	$.cookies.set( 'OpenPhone', openPhoneCookie);

	            	$("#optionUsim").val(value);



					if( $("#optionCheck").val() == "Y" ){

						openphonePriceCalc();

					}

	            });

			}



			//요금제 선택 옵션 이벤트 바인딩(기본적으로 상위 옵션 선택시 하위옵션들은 초기화해준다)

			function optionChargeBindEvent(){

				$('.option-selector.optionCharge').on('click', '.options li', function() {

	            	var value = $(this).attr('data-value');

	            	openPhoneCookie.optionCharge = value;

	            	openPhoneCookie.optionJointype = '';

	            	openPhoneCookie.optionContract = '';

	            	openPhoneCookie.optionMonthly = '';

	            	openPhoneCookie.optionSubside = '';

	            	$.cookies.set( 'OpenPhone', openPhoneCookie);



	            	$("#optionCharge").val(value);



					var optionList;

					for(var i=0; i<arrJointype.length; i++){

						if( arrJointype[i][0]== value){

							optionList=arrJointype[i][1];

						}

					}



					var sumTxt = seleJointypeStr + optionList + seleEnd;

					$('.option-selector.optionJointype').html(sumTxt);

				 	$("#optionCheck").attr("value", "N" );

				 	setPriceData("0::0::0::0::0::0::0::0::-1::-1");



				 	$('.option-selector.optionContract').html(init_sContract);

				 	$('.option-selector.optionMonthly').html(init_sMonthly);

				 	$('.option-selector.optionSubside').html(init_sSubside);



					$("#optionJointype").attr("value","");

					$("#optionContract").attr("value","");

					$("#optionMonthly").attr("value","");

					$("#optionSubside").attr("value","");

				});

			}



			//가입유형 선택 옵션 이벤트 바인딩(기본적으로 상위 옵션 선택시 하위옵션들은 초기화해준다)

			function optionJointypeBindEvent(){

				$('.option-selector.optionJointype').on('click', '.options li', function() {

	            	var value = $(this).attr('data-value');

	            	openPhoneCookie.optionJointype = value;

	            	openPhoneCookie.optionContract = '';

	            	openPhoneCookie.optionMonthly = '';

	            	openPhoneCookie.optionSubside = '';

	            	$.cookies.set( 'OpenPhone', openPhoneCookie);



					var arrCode = value.split("__");



					if(arrCode.length>1) {

						currSelectedCode = arrCode[1] ;

					}

					$("#optionJointype").val(currSelectedCode);



					var optionList;

					for(var i=0; i<arrContract.length; i++){

						if( arrContract[i][0]== value){

							optionList=arrContract[i][1];

						}

					}



					var sumTxt = seleContractStr + optionList + seleEnd;

					$('.option-selector.optionContract').html(sumTxt);

				 	$("#optionCheck").attr("value", "N" );

				 	setPriceData("0::0::0::0::0::0::0::0::-1::-1");



				 	$('.option-selector.optionMonthly').html(init_sMonthly);

				 	$('.option-selector.optionSubside').html(init_sSubside);



					$("#optionContract").attr("value","");

					$("#optionMonthly").attr("value","");

					$("#optionSubside").attr("value","");

				});

			}



			//약정할인기간 선택 옵션 이벤트 바인딩(기본적으로 상위 옵션 선택시 하위옵션들은 초기화해준다)

			function optionContractBindEvent(){

				$('.option-selector.optionContract').on('click', '.options li', function() {

	            	var value = $(this).attr('data-value');

	            	openPhoneCookie.optionContract = value;

	            	openPhoneCookie.optionMonthly = '';

	            	openPhoneCookie.optionSubside = '';

	            	$.cookies.set( 'OpenPhone', openPhoneCookie);



					var arrCode = value.split("__");



					if(arrCode.length>1) {

						currSelectedCode = arrCode[2] ;

					}

					$("#optionContract").val(currSelectedCode);



					var optionList;

					for(var i=0; i<arrMonthly.length; i++){

						if( arrMonthly[i][0]== value){

							optionList=arrMonthly[i][1];

						}

					}



					var sumTxt = seleMonthlyStr + optionList + seleEnd;

					$('.option-selector.optionMonthly').html(sumTxt);

				 	$("#optionCheck").attr("value", "N" );

				 	setPriceData("0::0::0::0::0::0::0::0::-1::-1");



				 	$('.option-selector.optionSubside').html(init_sSubside);



					$("#optionMonthly").attr("value","");

					$("#optionSubside").attr("value","");

				});

			}



			//단말기할부기간 선택 옵션 이벤트 바인딩(기본적으로 상위 옵션 선택시 하위옵션들은 초기화해준다)

			function optionMonthlyBindEvent(){

				$('.option-selector.optionMonthly').on('click', '.options li', function() {

	            	var value = $(this).attr('data-value');

	            	openPhoneCookie.optionMonthly = value;

	            	openPhoneCookie.optionSubside = '';

	            	$.cookies.set( 'OpenPhone', openPhoneCookie);



					var arrCode = value.split("__");



					if(arrCode.length>1) {

						currSelectedCode = arrCode[3] ;

					}

					$("#optionMonthly").val(currSelectedCode);



					var optionList;

					var yesOption = 0;

					for(var i=0; i<arrSubside.length; i++){

						if( arrSubside[i][0]== value){

							if(!(arrSubside[i][1].lastIndexOf('__N" ><a href="javascript:void(0);"></a></li>')>-1)){

								optionList=arrSubside[i][1];

								yesOption++;

							}

						}

					}



				 	if(yesOption>0){

				 		var sumTxt = seleSubsideStr + optionList + seleEnd   ;

				 	  	$('.option-selector.optionSubside').html(sumTxt);

				 	 	$("#optionCheck").attr("value", "N" );

				 	 	setPriceData("0::0::0::0::0::0::0::0::-1::-1");

				 		$("#optionSubside").attr("value","");

				 	}else{

				 		$('.option-selector.optionSubside').html("");

				 		$("#optionSubside").attr("value","N");

						if(currSelectedCode!=0 && currSelectedCode!="") {

							openphonePriceCalc();

						}

				 	}

				});

			}



			//추가할인 선택 옵션 이벤트 바인딩(기본적으로 상위 옵션 선택시 하위옵션들은 초기화해준다)

			function optionSubsideBindEvent(){

				$('.option-selector.optionSubside').on('click', '.options li', function() {

	            	var value = $(this).attr('data-value');

	            	openPhoneCookie.optionSubside = value;

	            	$.cookies.set( 'OpenPhone', openPhoneCookie);



					var arrCode = value.split("__");



					if(arrCode.length>1) {

						currSelectedCode = arrCode[4] ;

					}

					$("#optionSubside").val(currSelectedCode);



		 			if( currSelectedCode!="") {

		 				openphonePriceCalc();

		 			}

				});

			}



			//최초 전달받은 데이터를 select로 보여주기 위한 형태로 세팅한다.

			function setOpenphoneData(){

				if(useMobileDistributionLaw != 'Y'){

					$('.estimate-price-section .section-con .price-list-price').hide();

				}



				for (i in data.arrOptionList1) {

					with(data.arrOptionList1[i]){

						if(partPoint != "KTF_071" && partPoint != "KTF_073" && partPoint != "KTF_082" && partPoint != "KTF_089" && partPoint != "KTF_078" && partPoint != "KTF_091")	{

							$('.option-selector.optionCharge .options').append("<li data-value='"+partPoint+"'><a href='javascript:void(0);'>"+optionName+"</a></li>");

						}

					}

				}



				setOpenphoneOption(arrJointype, data.arrOptionList2);

				setOpenphoneOption(arrContract, data.arrOptionList3);

				setOpenphoneOption(arrMonthly, data.arrOptionList4);

				setOpenphoneOption(arrSubside, data.arrOptionList5);



				seleJointypeStr = '<a href="javascript:void(0)" class="selected-option" aria-label="Select option" title="'+pdpMsg.pdpLayerOpen+'">'+pdpMsg.openPhoneOption3+'</a><ul class="options">';

				seleContractStr = '<a href="javascript:void(0)" class="selected-option" aria-label="Select option" title="'+pdpMsg.pdpLayerOpen+'">'+pdpMsg.openPhoneOption4+'</a><ul class="options">';

				seleMonthlyStr = '<a href="javascript:void(0)" class="selected-option" aria-label="Select option" title="'+pdpMsg.pdpLayerOpen+'">'+pdpMsg.openPhoneOption5+'</a><ul class="options">';

				seleSubsideStr =   '<a href="javascript:void(0)" class="selected-option" aria-label="Select option" title="'+pdpMsg.pdpLayerOpen+'">'+pdpMsg.openPhoneOption6+'</a><ul class="options">';

				seleEnd = '</ul>';



				init_sContract = seleContractStr + seleEnd;

				init_sMonthly = seleMonthlyStr + seleEnd;

				init_sSubside = seleSubsideStr + seleEnd;

			}



			//개통폰 옵션데이터 세팅

			function setOpenphoneOption(arr, optionList){

				var pre = '';

				var arrTempStr = "";

				var arrCount = 0;

				arr[arrCount] = new Array();

				for (var i =0; i < optionList.length ; i++) {

					if(i==0){

						pre =  optionList[0].parentCode;

						arr[arrCount][0] =  optionList[0].parentCode;

					}



					if(pre !=  optionList[i].parentCode ){

						arr[arrCount++][1] = arrTempStr;

						arrTempStr = "";

						pre =  optionList[i].parentCode;

						arr[arrCount] = new Array();

						arr[arrCount][0] =  optionList[i].parentCode;

					}

					arrTempStr += '<li data-value="'+optionList[i].partPoint+'" ><a href="javascript:void(0);">'+ optionList[i].optionName +'</a></li>';

				}

				arr[arrCount][1] = arrTempStr;

			}



			//가격조회

			function openphonePriceCalc(){

				var param = {

					'optionUsim' : $("#optionUsim").val(),

					'productCode' :  $("#modelCode").val(),

					'optionMakerx': $("#optionMakerx").val(),

					'optionCharge': $("#optionCharge").val(),

					'optionJointype' : $("#optionJointype").val(),

					'optionContract' : $("#optionContract").val(),

					'optionMonthly': $("#optionMonthly").val(),

					'optionSubside': $("#optionSubside").val()

				};



				estore.showProductOpenphoneOption(param, function(pricedata) {

					console.info("openphonePrice :: ",pricedata);

					setPriceData(pricedata.openphonePrice);

				});

			}



			//조회된 가격을 화면에 출력

			function setPriceData(pricedata){

				var priceList = $('.estimate-price-section .section-con');

				if (pricedata.lastIndexOf("error")>0){

					pricedata= "0::0::0::0::0::0::0::0::-1::-1";

					$("#optionCheck").attr("value", "N" );

				}



				if (pricedata.indexOf("::") != -1) {

					var arrData = pricedata.split("::");

					priceList.find('#price00').html(arrData[0] + ' 원');

					priceList.find('#price01').html(arrData[1] + ' 원');

					priceList.find('#price02').html(arrData[2] + ' 원');

					priceList.find('#price03').html(arrData[3] + ' 원');

					if(arrData[4]!=0){

						priceList.find('#price04').html(' - ' + arrData[4] + ' 원');

					}else{

						priceList.find('#price04').html(arrData[4] + ' 원');

					}

					priceList.find('#price05').html(arrData[5] + ' 원');

					priceList.find('#price06 .price-total').html(arrData[6] + ' 원' + pdpMsg.openPhonePrice6);

					priceList.find('#price07').html(arrData[7] + ' 원');

					if(arrData[8]==0){

						priceList.find('#price08').html('-');

					}else if(arrData[8]==-1){

						priceList.find('#price08').html('0 원');

					}else{

						priceList.find('#price08').html(arrData[8] + ' 원');

					}

					if(arrData[9]==0){

						priceList.find('#price09').html('-');

					}else if(arrData[9]==-1){

						priceList.find('#price09').html('0 원');

					}else{

						priceList.find('#price09').html(arrData[9] + ' 원');

					}



				 	if(pricedata!= "0::0::0::0::0::0::0::0::-1::-1"){

				 		$("#optionCheck").attr("value", "Y" );

				 	}

				}

			}



			openPhoneInit();

		}



		/*

		 * [재고수량]

		 * 재고수량 노출 여부

		 */

		ss.PDPStandard.secFn.stockQuantity = function (data){

			$('.order-quantity.sec-p-item').show();

			if(data.flagSoldOut == 'N' && data.availMaxCnt !="" && data.availMinCnt != ""){

				//입력textbox에 숫자만 입력가능하도록,

						$(".order-quantity.sec-p-item input[type=text]").numericSEC();

						$(".order-quantity.sec-p-item input[type=text]").val(data.availMinCnt);





				if(data.flagOpenPhone == 'N'){//정상 표현되는경우

					$(".order-quantity.sec-p-item input[type=text]").attr('maxlength','2');

					var maxQuantity = Number(data.availMaxCnt);

	    			var minQuantity = Number(data.availMinCnt);

	    			if(minQuantity == 0){

	    				minQuantity = 1;

	    			}

	    			if(minQuantity > maxQuantity){

    					maxQuantity = 1;

    					minQuantity = 1;

    				}



	    			$('.calculator #maxQuantity').val(maxQuantity);

	    			$('.calculator #minQuantity').val(minQuantity);



	    			$( document ).on( "focusout", ".order-quantity.sec-p-item input[type=text]", function(){

		    			var s = $(".order-quantity.sec-p-item input[type=text]").val();



		    			s= Number(s);

		        		if (s > maxQuantity) {

		        				$(".order-quantity.sec-p-item input[type=text]").val(maxQuantity);

		        				QuantityPopup('maxQuantity', maxQuantity);

		        				return false;

		        		}

		    			if (s < minQuantity) {

		    				$(".order-quantity.sec-p-item input[type=text]").val(minQuantity);

		    				QuantityPopup('minQuantity', minQuantity);

		    				return false;

		    			}

		    			$(".order-quantity.sec-p-item input[type=text]").val(s);

		    		});



					$( document ).on( "click", ".order-quantity.sec-p-item .btn-quantity .plus, .order-quantity.sec-p-item .btn-quantity .minus", function(){

		    			var s = $(".order-quantity.sec-p-item input[type=text]").val();



		    			s= Number(s);

		    			if( $( this ).hasClass( "plus" ) ){

		            		if (s+1 > maxQuantity) {

		            				$(".order-quantity.sec-p-item input[type=text]").val(maxQuantity);

		            				QuantityPopup('maxQuantity', maxQuantity);

		            				return false;

		            		}

		        			$(".order-quantity.sec-p-item input[type=text]").val(s+1);

		    			}else{

	            			if (s-1 < minQuantity) {

	            				$(".order-quantity.sec-p-item input[type=text]").val(minQuantity);

	            				QuantityPopup('minQuantity', minQuantity);

	            				return false;

	            			}

	            			$(".order-quantity.sec-p-item input[type=text]").val(s-1);

		    			}

		    		})

				}else {//1로 고정되는경우 ex)개통폰

					$(".order-quantity.sec-p-item .input-area").addClass('disable');

					$(".order-quantity.sec-p-item .input-area .btn-quantity").hide();

					$(".order-quantity.sec-p-item input[type=text]").attr('maxlength','0');

					$(".order-quantity.sec-p-item input[type=text]").attr('readonly','readonly');

				}

			}else{

				$(".order-quantity.sec-p-item .input-area").addClass('disable');

				$(".order-quantity.sec-p-item input[type=text]").attr('maxlength','0');

				$(".order-quantity.sec-p-item input[type=text]").attr('readonly','readonly');

			}



			//최대,최소 주문가능 수량 팝업 추가

			function QuantityPopup(type, quantity){

				var message = '';

				if(type == 'maxQuantity'){

					message = '선택하신 상품은 최대 '+quantity +'개까지만 주문 가능합니다.';

				}else if(type == 'minQuantity'){

					message = '죄송합니다.<br>선택하신 수량이 상품의 최소 주문 수량 미만입니다.';

				}



				alertMsgShow(message);

			}

			function alertMsgShow( message ) {

				if(isWow){
					//<br>tag 스크립트 인식 문자로 치환 - dong_won.lee
					if(message.indexOf('<br>')!=-1){
						message = message.replace('<br>','\n')
					}
					alert(message);

				}else{

					var $layer = $('#popup_alert');

					$layer.find('.msg-text').html( message );

					$(".layer_popup").hide();

					$layer.parent().show();
					$layer.find('.button.alert-ok-button').attr("data-tab-next","button alert-ok-button");
					$layer.find('.button.alert-ok-button').attr("data-tab-previous","button alert-ok-button");
					$layer.find('.button.alert-ok-button').focus();

					$('body').append('<div class="lightbox-skrim"></div>');

					var l = parseInt(($('body').width() - $layer.width())/2);

					var t = parseInt( $(window).scrollTop() + (($(window).height()-$layer.height())/2) );

					$layer.css({ "top":t+"px", "left":l+"px" });

				}

			};

		}



		/*

		 * [미리계산기]

		 */

		ss.PDPStandard.secFn.preCalculator = function (data){

			var voucherCode="";

			var eventCode="";

			// mobile coupon
			var mobileCoupon="";
			var mobileInputOnlyCheck = false;
			var alertFlag = "Y";

			var maxSpoint=0;

			var minSpoint=5000;

			var maxSubTotal = "";

			var cartCode = "";

			var hasCode = false;

			var usePointAvailavle = false;

			var applyFlag = true;

			var preCalFlag = true;


			// chw.park OK캐쉬백 포인트 미리 계산기 적용
			var okcashpoint = 0;
			var onlyspoint = 0;
			var okcashUserYn = "";


			//standard인경우 초기화

			function preCalculatorInit(){

				if(data.preCalBtnYn == 'Y'){

					$('.price-01.sec-p-item .calculator').show();



		    		$( ".sec-product-info .calculator" ).on( "click", function(){

		    			sendScCheckoutStep('pdp:pre_calculation');

		    			var inputQuantity = $(".order-quantity.sec-p-item input[type=text]").val();

		    			if(preCalFlag == false) {

		    				return;

		    			}

		    			preCalFlag = false;

		    			//로그인이 되어 있는경우만 가능 되어있지 않다면 로그인 팝업 호출

						ss.Auth.checkSignIn(function(loginChk){

							if(loginChk){

				    			estore.preCalc({productCodePost:modelCode, quantity:inputQuantity,spointratio:$('#spointratio').attr('value'),spointproduct:$('#spointproduct').attr('value')}, function(data) {

				    				console.info("preCalc ::", data);

				        			if(data.login == false){

				        				ss.Auth.popupLoginLayer();

				        			}else{

				        				setPreCalculator(data);

				        				showAlert( ".sec-product-info .calculator", 15 );

				        				$(".calculator .order-quantity input[type=text]").numericSEC();

				        				$('.calculator .sec-alert-contents .coupon-list li:first input').prop("checked",true);

				        				if(hasCode){

				        					$('.calculator .sec-alert-contents .code-list li:first input').prop("checked",true);

				        				}

				        				if($('.calculator .sec-alert-contents .code-list li:first input').attr('id') != 'event-choice-input'){

				        					$( '.calculator .event-code input[type=text]' ).attr("readonly", true);

				        				}

										// mobile coupon 초기화
										// 디폴트가 '사용 안 함'
										$('.calculator .sec-alert-contents .code-list-02 li:last input').prop("checked", true);
										// 직접 입력란 readonly
										$( '.calculator .mobile-coupon input[type=text]' ).attr("readonly", true);

										var spointText = "";

										var spointHtml = "";

										var pointSum = 0;

										var spointProduct = 0;

										var spointPrice = 0;

										//전체 포인트 =  spointbase + spointProduct + spointPrice
										if(!isNaN(Math.floor(parseInt(data.spointbase)))){
											//기본 베이스 포인트 합
											pointSum = Math.floor(parseInt(data.spointbase));

										}
										if(!isNaN(Math.floor(parseInt(data.spointproduct)))){
											//기본 베이스 포인트 합
											spointProduct = Math.floor(parseInt(data.spointproduct));
											pointSum = pointSum + spointProduct;

										}
										if(!isNaN(Math.floor(parseInt(data.spointprice)))){
											//기본 베이스 포인트 합
											spointPrice = Math.floor(parseInt(data.spointprice));
											pointSum = pointSum + spointPrice;
										}
										// 포인트 계산
										spointText = "적립예정 포인트";
											// 포인트 Ratio 적용
										var persentSum = "( 기본 "+data.spointratio+"%";

										spointHtml = persentSum;

										//4가지의 경우에 따라서 buying tool적용
										/*  dong_won.lee^^;
											=======================================================
											1) 상품 추가 포인트 + 금액대별 포인트가 모두 있는 경우
											spointProduct / spointPrice가 모두 있는 경우
											( 기본 0.2% + 추가 100,000 + 구매포인트 80,000 )

											2) 상품 추가 포인트만 있는 경우
											spointProduct
											( 기본 0.2% + 추가 100,000 )

											3) 금액대별 포인트만 있는 경우
											( 기본 0.2% + 구매포인트 80,000 )
											spointPrice

											4) 기본 포인트만 있는 경우
											( 기본 0.2% )
											=======================================================

										*/
										if (spointProduct != undefined && spointProduct != null && spointProduct !="" && spointProduct != "0") {
												spointHtml += " + 추가 " +  addComma(spointProduct);
										}

										if (spointPrice != undefined && spointPrice != null && spointPrice !="" && spointPrice != "0") {
												spointHtml += " + 구매포인트 " +  addComma(spointPrice);
										}
										spointHtml += " )";

										spointHtmlP = addComma(pointSum) + " 포인트<br> " + spointHtml;

										$('.pre-price .sub .sub-con').empty();

										$('.pre-price .sub .sub-con').html(spointHtmlP);

										$('.pre-price .sub .sub-tit').empty();

										$('.pre-price .sub .sub-tit').html(spointText);

										/*
										 * Spoint Data cashing
										 */
										 //spoint 적용을 위한 데이터 셋팅 dong_won.lee^^;


											//$('#pagetrack').after("<input id='spointratio' name='spointratio' type='hidden' value="+(parsefloat(data.spointdata.spointratio) + parsefloat(data.spointdata.spointmemratio)) + ">");
											//$('#pagetrack').after("<input id='spointproduct' name='spointproduct' type='hidden' value="+data.spointdata.spointproduct + ">");
											$('#pageTrack').after("<input id='spointproductone' name='spointproductone' type='hidden' value="+data.spointproductone + ">");


										
										// 바잉툴에서 수량 2개 선택 후 미리계산기 팝업 띄웠을 경우
										// mobile coupon > 수량 두 개 이상인 경우 : mobile coupon 및 s-point 비활성화
										// start
										if(inputQuantity >= 2) {

											var upText = $('#dummy-popup-container .calculator .use-point input[type=text]');
											var preUpValue = upText.val();

											var usePoint = $('#dummy-popup-container .sec-alert-contents .use-point');
											var prePrice = $('#dummy-popup-container .sec-alert-contents .pre-price');

											if(usePoint.find("#use-point-01").attr('checked') || usePoint.find('input[type=text]').val() != '0') {
												prePrice.find('.price').text(addComma(parseInt(prePrice.find('.price').text().replace(',',''))+parseInt(preUpValue.replace(',','')))+' 원');
												usePoint.find("#use-point-01").removeAttr('checked');
											}
											usePoint.find('input[type=text]').attr("readonly", true);
											usePoint.find("#use-point-01").attr("disabled", true);
											usePoint.find('input[type=text]').attr("value", 0);

											// 모바일 쿠폰 전체 해제시켜 버리고 disabled
											$("input[name='mobile-coupon-choice']:radio").each(function(index) {
												$(this).prop("checked", false);
												$(this).prop("disabled", true);
											});

											mobileCoupon = '';

											$( '#dummy-popup-container .calculator .mobile-coupon input[type=text]' ).val('');
											$( '#dummy-popup-container .calculator .mobile-coupon input[type=text]' ).attr("readonly", true);

											$("#dummy-popup-container .mobile-coupon button").attr("disabled", true);

											// 미노출로 기획 변경
											$('.sec-alert-contents .mobile-coupon').hide();
											$('.sec-alert-contents .use-point').hide();

										}
										// end


				        			}

				        			preCalFlag = true;

				    			});

							}else{

								preCalFlag = true;

							}

						},true,true);

		    		});



		    		bindPreCalculator();

				}

			}



			//wow인경우 초기화

			function wowPreCalculatorInit(){

				if(data.preCalBtnYn == 'Y'){

					$('.price-01.sec-p-item .calculator').show();



		    		$( document ).on( "click", "#dummy-popup-container .wow-product-info .calculator", function(){

		    			sendScCheckoutStep('pdp:pre_calculation');

		    			var inputQuantity = $(".order-quantity.sec-p-item input[type=text]").val();

		    			if(preCalFlag == false) {

		    				return;

		    			}

		    			preCalFlag = false;

		    			//로그인이 되어 있는경우만 가능 되어있지 않다면 로그인 팝업 호출

						ss.Auth.checkSignIn(function(loginChk){

							if(loginChk){

				    			estore.preCalc({productCodePost:modelCode, quantity:inputQuantity,spointratio:$('#spointratio').attr('value'),spointproduct:$('#spointproduct').attr('value')}, function(data) {

				    				console.info("preCalc ::", data);

				        			if(data.login == false){

				        				ss.Auth.popupLoginLayer();

				        			}else{

				        				pageType = "cal";

				        				setPreCalculator(data);

				        				showCalculator();

				        				$('.calculator .sec-alert-contents .coupon-list li:first input').prop("checked",true);

				        				if(hasCode){

				        					$('.calculator .sec-alert-contents .code-list li:first input').prop("checked",true);

				        				}

				        				if($('.calculator .sec-alert-contents .code-list li:first input').attr('id') != 'event-choice-input'){

				        					$( '.calculator .event-code input[type=text]' ).attr("readonly", true);

				        				}

										// mobile coupon 초기화
										// 디폴트가 '사용 안 함'
										$('.calculator .sec-alert-contents .code-list-02 li:last input').prop("checked", true);
										// 직접 입력란 readonly
										$( '.calculator .mobile-coupon input[type=text]' ).attr("readonly", true);

										var spointText = "";

										var spointHtml = "";

										var pointSum = 0;

										var spointProduct = 0;

										var spointPrice = 0;

										//전체 포인트 =  spointbase + spointProduct + spointPrice
										if(!isNaN(Math.floor(parseInt(data.spointbase)))){
											//기본 베이스 포인트 합
											pointSum = Math.floor(parseInt(data.spointbase));

										}
										if(!isNaN(Math.floor(parseInt(data.spointproduct)))){
											//기본 베이스 포인트 합
											spointProduct = Math.floor(parseInt(data.spointproduct));
											pointSum = pointSum + spointProduct;

										}
										if(!isNaN(Math.floor(parseInt(data.spointprice)))){
											//기본 베이스 포인트 합
											spointPrice = Math.floor(parseInt(data.spointprice));
											pointSum = pointSum + spointPrice;
										}
										// 포인트 계산
										spointText = "적립예정 포인트";
											// 포인트 Ratio 적용
										var persentSum = "( 기본 "+data.spointratio+"%";

										spointHtml = persentSum;

										//4가지의 경우에 따라서 buying tool적용
										/*  dong_won.lee^^;
											=======================================================
											1) 상품 추가 포인트 + 금액대별 포인트가 모두 있는 경우
											spointProduct / spointPrice가 모두 있는 경우
											( 기본 0.2% + 추가 100,000 + 구매포인트 80,000 )

											2) 상품 추가 포인트만 있는 경우
											spointProduct
											( 기본 0.2% + 추가 100,000 )

											3) 금액대별 포인트만 있는 경우
											( 기본 0.2% + 구매포인트 80,000 )
											spointPrice

											4) 기본 포인트만 있는 경우
											( 기본 0.2% )
											=======================================================

										*/
										if (spointProduct != undefined && spointProduct != null && spointProduct !="" && spointProduct != "0") {
												spointHtml += " + 추가 " +  addComma(spointProduct);
										}

										if (spointPrice != undefined && spointPrice != null && spointPrice !="" && spointPrice != "0") {
												spointHtml += " + 구매포인트 " +  addComma(spointPrice);
										}
										spointHtml += " )";

										spointHtmlP = addComma(pointSum) + " 포인트<br> " + spointHtml;

										$('.pre-price .sub .sub-con').empty();

										$('.pre-price .sub .sub-con').html(spointHtmlP);

										$('.pre-price .sub .sub-tit').empty();

										$('.pre-price .sub .sub-tit').html(spointText);

										/*
										 * Spoint Data cashing
										 */
										 //spoint 적용을 위한 데이터 셋팅 dong_won.lee^^;


											//$('#pagetrack').after("<input id='spointratio' name='spointratio' type='hidden' value="+(parsefloat(data.spointdata.spointratio) + parsefloat(data.spointdata.spointmemratio)) + ">");
											//$('#pagetrack').after("<input id='spointproduct' name='spointproduct' type='hidden' value="+data.spointdata.spointproduct + ">");
											$('#pageTrack').after("<input id='spointproductone' name='spointproductone' type='hidden' value="+data.spointproductone + ">");



										// 바잉툴에서 수량 2개 선택 후 미리계산기 팝업 띄웠을 경우
										// mobile coupon > 수량 두 개 이상인 경우 : mobile coupon 및 s-point 비활성화
										// start
										if(inputQuantity >= 2) {

											var upText = $('#dummy-popup-container .calculator .use-point input[type=text]');
											var preUpValue = upText.val();

											var usePoint = $('#dummy-popup-container .sec-alert-contents .use-point');
											var prePrice = $('#dummy-popup-container .sec-alert-contents .pre-price');

											if(usePoint.find("#use-point-01").attr('checked') || usePoint.find('input[type=text]').val() != '0') {
												prePrice.find('.price').text(addComma(parseInt(prePrice.find('.price').text().replace(',',''))+parseInt(preUpValue.replace(',','')))+' 원');
												usePoint.find("#use-point-01").removeAttr('checked');
											}
											usePoint.find('input[type=text]').attr("readonly", true);
											usePoint.find("#use-point-01").attr("disabled", true);
											usePoint.find('input[type=text]').attr("value", 0);

											// 모바일 쿠폰 전체 해제시켜 버리고 disabled
											$("input[name='mobile-coupon-choice']:radio").each(function(index) {
												$(this).prop("checked", false);
												$(this).prop("disabled", true);
											});

											mobileCoupon = '';

											$( '#dummy-popup-container .calculator .mobile-coupon input[type=text]' ).val('');
											$( '#dummy-popup-container .calculator .mobile-coupon input[type=text]' ).attr("readonly", true);

											$("#dummy-popup-container .mobile-coupon button").attr("disabled", true);

											// 미노출로 기획 변경
											$('.sec-alert-contents .mobile-coupon').hide();
											$('.sec-alert-contents .use-point').hide();

										}
										// end


				        			}

				         			preCalFlag = true;

				    			});

							}else{

								preCalFlag = true;

								hideAlert();

							}

						},true,true);

		    		});



    				bindPreCalculator();

				}

			}



	    	function showCalculator(){

	    		$productInfo.css( "position", "absolute" ).hide();

	    		$storeChoice.css( "position", "absolute" ).hide();

	    		$calculator.css( "position", "relative" ).show();

	    		//$calBackBtn.focus();
				$calculator.focus();

	    	}



			//최초 미리계산기 팝업 화면구성

			function setPreCalculator(data){

				maxSubTotal = parseInt(data.cartData.subTotalWithDiscounts.value);

				cartCode = data.cartData.code;

				var salePrice = $('.calculator .sec-alert-contents .sale-price .con');

				var orderQuantity = $('.calculator .sec-alert-contents .order-quantity .con input[type=text]');

				var totalOrderPrice = $('.calculator .sec-alert-contents .total-order-price .price');

				var memberDiscount = $('.calculator .sec-alert-contents .member-discount .price');

				var couponList = $('.calculator .sec-alert-contents .coupon-list');

				var choiceResult = $('.calculator .sec-alert-contents .choice-result');

				var eventList = $('.calculator .sec-alert-contents .code-list');

				var eventResult = $('.calculator .sec-alert-contents .event-code-result');

				var mobileList = $('.calculator .sec-alert-contents .code-list-02'); // mobile coupon

				var mobileResult = $('.calculator .sec-alert-contents .mobile-coupon-result'); // mobile coupon

				var usePoint = $('.calculator .sec-alert-contents .use-point');

				var prePrice = $('.calculator .sec-alert-contents .pre-price');



				if(data.totalPrice.value == data.basePrice.value){

					salePrice.find('.after-price').text(data.basePrice.formattedValue);

				}else{

					salePrice.find('.before-price').text(data.basePrice.formattedValue);

					salePrice.find('.after-price').text(data.totalPrice.formattedValue);

				}



				orderQuantity.attr("value",data.cartData.totalUnitCount);

				totalOrderPrice.html(data.cartData.subTotal.formattedValue);



				if(data.cartData.promo3PerCentDiscountforKorea != null &&

						data.cartData.promo3PerCentDiscountforKorea != undefined &&

							data.cartData.promo3PerCentDiscountforKorea != "" ) {

					memberDiscount.html("-"+data.cartData.promo3PerCentDiscountforKorea.formattedValue);

				} else {

					memberDiscount.html("-0 원");

				}



				//쿠폰리스트 영역

				var coupon = "";

				if(data.applyInstantDiscountCouponYn == 'Y'){

					coupon = '<li><input type="radio" class="hide-input" value="" name="coupon-choice" id="coupon-choice-00">'

											+ '<label for="coupon-choice-00">'+pdpMsg.precalcCoupon+'</label></li>';

				}else {

					if(data.voucherDataList.length == 0){

						coupon =	 '<li><label >'+pdpMsg.precalcNoCoupon+'</label></li>';

					}else {

						for(var i=0; i < data.voucherDataList.length; i++){

							if(i == 0) {

								coupon = '<li><input type="radio" class="hide-input" value="'+data.voucherDataList[0].voucherCode+'" name="coupon-choice" id="coupon-choice-00">'

									+ '<label for="coupon-choice-00">'+data.voucherDataList[0].couponDescription+'</label></li>';

								voucherCode = data.voucherDataList[0].voucherCode;

							}else {

								coupon += '<li><input type="radio" class="hide-input" value="'+data.voucherDataList[i].voucherCode+'" name="coupon-choice" id="coupon-choice-0'+i+'">'

								+ '<label for="coupon-choice-0'+i+'">'+data.voucherDataList[i].couponDescription+'</label></li>';

							}

						}



						if(data.voucherDataList.length > 0){

							coupon += '<li><input type="radio" class="hide-input" value="RELEASE" name="coupon-choice" id="coupon-choice-end">'

								+ '<label for="coupon-choice-end">'+pdpMsg.precalcNotUseCoupon+'</label></li>';

						}

					}

				}

				couponList.find('ul').html(coupon);



				//쿠폰 가격 영역

				if(data.voucherDataList.length > 0 || data.applyInstantDiscountCouponYn == 'Y'){

					choiceResult.find('.saving').html("-"+data.cartData.couponDiscountValue.formattedValue);

				}else {

					choiceResult.hide();

				}



				//이벤트 리스트 영역

				var event ="";

				for(var i=0; i < data.eventCodeDataList.length; i++){

					hasCode = true;

					if(i == 0){

						event = '<li><input type="radio" class="hide-input" value="'+data.eventCodeDataList[0].voucherCode+'" name="event-choice" id="event-choice-00">'

						+ '<label for="event-choice-00">'+data.eventCodeDataList[0].couponDescription+'</label></li>';

					eventCode = data.eventCodeDataList[0].voucherCode;

					}else {

						event += '<li><input type="radio" class="hide-input" value="'+data.eventCodeDataList[i].voucherCode+'" name="event-choice" id="event-choice-0'+i+'">'

						+ '<label for="event-choice-0'+i+'">'+data.eventCodeDataList[i].couponDescription+'</label></li>';

					}

				}



				event += '<li class="user-input"><input type="radio" class="hide-input"  value="NEW_EVENT_CODE" name="event-choice" id="event-choice-input">'+

				'<label for="event-choice-input"><span class="blind">'+pdpMsg.precalcFill+'</span></label>'+

				'<input type="text" maxlength=30 placeholder="'+pdpMsg.precalcFill+'" title="'+pdpMsg.precalcFillEventCode+'"/>'+

				'<button type="button" class="btn-sec-01">'+pdpMsg.precalcUse+'</button></li>';



				event += '<li><input type="radio" class="hide-input"  value="RELEASE" name="event-choice" id="event-choice-end" >'+

				'<label for="event-choice-end">'+pdpMsg.precalcNotUseEvent+'</label></li>';


				//이벤트 가격 영역

				eventList.find('ul').html(event);

				eventResult.find('.saving').html("-"+data.cartData.promotionCodeDiscountValue.formattedValue);


				// mobile coupon UI start
				// 모바일 쿠폰 영역

				var mCoupon ="";

				mCoupon += '<li class="user-input"><input type="radio" class="hide-input"  value="NEW_MOBILE_COUPON" name="mobile-coupon-choice" id="mobile-coupon-input">'+
				'<label for="mobile-coupon-input"><span class="blind">'+pdpMsg.precalcFill+'</span></label>'+
				'<input type="text" maxlength=30 placeholder="'+pdpMsg.precalcFill+'" title="'+pdpMsg.precalcFillMobileCoupon+'"/>'+
				'<button type="button" class="btn-sec-01">'+pdpMsg.precalcUse+'</button></li>';

				mCoupon += '<li><input type="radio" class="hide-input"  value="RELEASE" name="mobile-coupon-choice" id="mobile-coupon-choice-end" >'+
				'<label for="mobile-coupon-choice-end">'+pdpMsg.precalcNotUseMobileCoupon+'</label></li>';

				mobileList.find('ul').html(mCoupon);

				// 디폴트가 '사용 안 함' 
				mobileCoupon = 'RELEASE';
				mobileResult.find('.saving').html("-0 원");

				// mobile coupon UI end



				if(!isNaN(Math.floor(parseInt(data.spoint)))){

					maxSpoint = Math.floor(parseInt(data.spoint));
					// chw.park OK캐쉬백 포인트 미리 계산기 적용
					okcashpoint = Math.floor(parseInt(data.okcashpoint));
					onlyspoint = Math.floor(parseInt(data.onlyspoint));
					okcashUserYn = data.okcashUserYn;

				}


				// chw.park OK캐쉬백 포인트 미리 계산기 적용
				// usePoint.find('#own-point').html('(보유 포인트 <span class="has-point">'+addComma(maxSpoint) +'</span> 포인트)');
				if (okcashUserYn == 'Y')
				{
					$('.use-point').find('h4').find('.dsc-point').html(" 총 보유 포인트 <span class='has-point'>"+addComma(maxSpoint)+"</span>");
					usePoint.find('#own-point').html('( 삼성전자 포인트 <span class="has-point">' +addComma(onlyspoint) + '</span> 포인트 / OK캐쉬백 <span class="has-point">' +addComma(okcashpoint) + '</span> 포인트 ) ');
				}else{
					$('.use-point').find('h4').find('span').remove();
					usePoint.find('#own-point').html('(보유 포인트 <span class="has-point">'+addComma(maxSpoint) +'</span> 포인트)');
					$('.sec-alert-contents div.notice').find('ul').find('li:eq(2)').remove();
				}
				usePoint.find('input[type=text]').attr("value", 0);

				usePointAvailavle = maxSpoint > minSpoint;

				if(!usePointAvailavle) {

					usePoint.find('input[type=text]').attr("readonly", true);

					usePoint.find("#use-point-01").attr("disabled", true);

				}

				prePrice.find('.price').html(data.cartData.subTotalWithDiscounts.formattedValue);

			}



			//버튼 이벤트 바인딩

			function bindPreCalculator(){

				$(".calculator .order-quantity input[type=text]").attr('maxlength','2');

				var maxQuantity = $('.calculator  #maxQuantity').val();

				var minQuantity = $('.calculator #minQuantity').val();



				$( document ).on( "focusout", "#dummy-popup-container .calculator .order-quantity input[type=text]", function(){

	    			var qty = $("#dummy-popup-container .calculator .order-quantity input[type=text]");

	    			var s= Number(qty.val());

	        		if (s > maxQuantity) {

	        			fncPreCalcApply(maxQuantity, '', 'N');

	        			return false;

	        		}

	    			if (s < minQuantity) {

	    				fncPreCalcApply(minQuantity, '', 'N');

	    				return false;

	    			}

	    			fncPreCalcApply(parseInt(s), '', 'N');

	    		});



				$( document ).on( "click", "#dummy-popup-container .calculator .btn-quantity .plus, #dummy-popup-container .calculator .btn-quantity .minus", function(){

	    			var qty = $("#dummy-popup-container .calculator .order-quantity input[type=text]");

					var upText = $('#dummy-popup-container .calculator .use-point input[type=text]');
					var preUpValue = upText.val();

					var usePoint = $('#dummy-popup-container .sec-alert-contents .use-point');
					var prePrice = $('#dummy-popup-container .sec-alert-contents .pre-price');


	    			var s= Number(qty.val());

	    			if( $( this ).hasClass( "plus" ) ){

						// mobile coupon > 수량 두 개 이상인 경우 : mobile coupon 및 s-point 비활성화
						if((s+1) >= 2) {

							if(usePoint.find("#use-point-01").attr('checked') || usePoint.find('input[type=text]').val() != '0') {
								prePrice.find('.price').text(addComma(parseInt(prePrice.find('.price').text().replace(',',''))+parseInt(preUpValue.replace(',','')))+' 원');
								usePoint.find("#use-point-01").removeAttr('checked');
							}
							usePoint.find('input[type=text]').attr("readonly", true);
							usePoint.find("#use-point-01").attr("disabled", true);
							usePoint.find('input[type=text]').attr("value", 0);

							// 모바일 쿠폰 전체 해제 시켜 버리고 disabled
							$("input[name='mobile-coupon-choice']:radio").each(function(index) {
								$(this).prop("checked", false);
								$(this).prop("disabled", true);
							});

							mobileCoupon = '';

							$( '#dummy-popup-container .calculator .mobile-coupon input[type=text]' ).val('');
							$( '#dummy-popup-container .calculator .mobile-coupon input[type=text]' ).attr("readonly", true);

							$("#dummy-popup-container .mobile-coupon button").attr("disabled", true);

							// 미노출로 기획 변경
							$('.sec-alert-contents .mobile-coupon').hide();
							$('.sec-alert-contents .use-point').hide();							

						}

	            		if (s+1 > maxQuantity) {

	            			fncPreCalcApply(maxQuantity, '', 'N');

	            			return false;

	            		}

	            		fncPreCalcApply(s+1, '', 'N');

	    			}else{

						// mobile coupon > 수량 한 개인 경우 : mobile coupon 및 s-point 비활성화 부분 해제
						if((s-1) == 1) {

							usePointAvailavle = false;

							$("input[name='mobile-coupon-choice']:radio").each(function(index) {
								$(this).prop("disabled", false);
							});
							
							// 모바일 쿠폰 사용 안 함 선택
							$("#dummy-popup-container .mobile-coupon button").attr("disabled", false);
							$("#dummy-popup-container input[name='mobile-coupon-choice'][value='RELEASE']").attr('checked', true);

							// s point 비활성화 해제
							var currentSpoint = parseInt($('.sec-alert-contents .use-point span.has-point').text().replace(',',''));
							if (currentSpoint >= 5000) {
								usePointAvailavle = true;
								usePoint.find('input[type=text]').attr("readonly", false);
								usePoint.find("#use-point-01").attr("disabled", false);
							}

							// 미노출로 기획 변경
							$('.sec-alert-contents .mobile-coupon').show();
							$('.sec-alert-contents .use-point').show();

							

						}

	    				if( s > 1 ){

	            			if (s-1 < minQuantity) {

	            				fncPreCalcApply(minQuantity, '', 'N');

	            				return false;

	            			}

	            			fncPreCalcApply(s-1, '', 'N');

	    				}

	    			}

	    		});



				//쿠폰
				$( document ).off( "change", "#dummy-popup-container input[name='coupon-choice']:radio")
	    		$( document ).on( "change", "#dummy-popup-container input[name='coupon-choice']:radio", function(){

	    			fncVoucherApply(this);

					alertFlag = 'Y';

	    		} );



	    		//이벤트
				$( document ).off( "change", "#dummy-popup-container input[name='event-choice']:radio")
	    		$( document ).on( "change", "#dummy-popup-container input[name='event-choice']:radio", function(){

	    			var vCode = $( '#dummy-popup-container .calculator .event-code input[type=text]' );

	    			if(this.id == 'event-choice-input'){

						// input 클릭시 기존 이벤트 코드 환원을 위해 추가
						fncEventApply(this);

	    				vCode.attr("readonly", false);

	    				vCode.focus();

	    			}else{

	    				vCode.attr("readonly", true);

	    				vCode.val('');

	    				fncEventApply(this);

	    			}

					alertFlag = 'Y';

	    		} );



	    		//이벤트 사용버튼

	    		$( document ).on( "click", "#dummy-popup-container .event-code button", function(){

	    			fncEventApply($( '#dummy-popup-container input[id="event-choice-input"]' ));

	    		} );

				// mobile coupon change
				$( document ).off( "change", "#dummy-popup-container input[name='mobile-coupon-choice']:radio")
				$( document ).on( "change", "#dummy-popup-container input[name='mobile-coupon-choice']:radio", function(){

	    			var vCode = $( '#dummy-popup-container .calculator .mobile-coupon input[type=text]' );

					// input 으로 바뀌면 input readonly false
	    			if(this.id == 'mobile-coupon-input'){

						fncMobileCouponApply(this);
	    				vCode.attr("readonly", false);
	    				vCode.focus();

					// release 로 바뀌면 input readonly, 값 초기화하면서 모바일 쿠폰 환원 api 호출 > CouponNum : ''
	    			}else{

	    				vCode.attr("readonly", true);
	    				vCode.val('');
	    				fncMobileCouponApply(this);

	    			}

	    		} );


				// mobile coupon 사용 버튼

				$( document ).off( "click", "#dummy-popup-container .mobile-coupon button");
				$( document ).on( "click", "#dummy-popup-container .mobile-coupon button", function(){

					if($("#dummy-popup-container .calculator .mobile-coupon input[type=text]").val().length != 12) return false;

	    			fncMobileCouponApply($( '#dummy-popup-container input[id="mobile-coupon-input"]' ));

	    		} );


				// moblie coupon input validation check

				$( document ).on("input", "#dummy-popup-container .calculator .mobile-coupon input[type=text]", function(){

					var mCouponTxt = $(this).val();

					if(mCouponTxt != '' && mCouponTxt != null) {

						if(isNaN(mCouponTxt)) { // input 값이 숫자가 아닐 경우 > 해당 문자 제거
							alert("쿠폰 번호는 숫자만 유효합니다.");
							$(this).val(mCouponTxt.substring(0,mCouponTxt.length-1));
							
						} else if (mCouponTxt.length > 12) { // input 값이 12자리가 넘는 경우
							alert("쿠폰 번호는 12 자리를 넘을 수 없습니다.");
							$(this).val(mCouponTxt.substring(0,mCouponTxt.length-1));
						}

					}
					
				});


	    		//S포인트 전액사용 처리

	    		$( document ).on( "change", "#dummy-popup-container #use-point-01", function(){

	    			var upText = $('#dummy-popup-container .calculator .use-point input[type=text]');

					var prePrice = $('#dummy-popup-container .calculator .sec-alert-contents .pre-price');

					var preUpValue = upText.val();

	    			if( this.checked  ){

	    				if(maxSubTotal < maxSpoint){

	    					upText.val(addComma(maxSubTotal));

	    				}else{

	    					upText.val(addComma(maxSpoint));

	    				}

	    				upText.trigger('change');

	    				upText.attr("readonly", true);

						// mobile coupon
						// 전액사용 체크하는 경우 > 모바일 쿠폰 초기화
						// 모바일 쿠폰 사용 안 함 trigger
						$("#dummy-popup-container input[name='mobile-coupon-choice'][value='RELEASE']").trigger('click');


	    			}else{

	    				upText.trigger('change');

	    				upText.attr("readonly", false);

						// 체크 해제시 적용가격 초기화
						upText.val('0');

						// spoint 차감으로 가지고 있던 값 미리계산 금액에 다시 add
						//prePrice.find('.price').text(addComma(parseInt(prePrice.find('.price').text())+parseInt(preUpValue.replace(',','')))+" 원");
						prePrice.find('.price').text(addComma(parseInt(prePrice.find('.price').text().replace(',','').replace('원','').replace(' ',''))+parseInt(preUpValue.replace(',','')))+" 원");

	    			}

	    		} );



	    		//S포인트 액수 입력

				$( document ).on( "change", "#dummy-popup-container .calculator .use-point input[type=text]", function(){

					if(usePointAvailavle) {

						var upText = $('#dummy-popup-container .calculator .use-point input[type=text]');

						var prePrice = $('#dummy-popup-container .calculator .sec-alert-contents .pre-price');

						var upValue = Math.floor(Number(removeComma(upText.val())));

						var preUpValue = upValue;



						if(isNaN(upValue)) {

							upText.attr("value", 0);

							prePrice.find('.price').text(addComma(maxSubTotal) + ' 원');

							return;

						}



						if(upValue <= 0){

							upText.attr("value", 0);

							prePrice.find('.price').text(addComma(maxSubTotal) + ' 원');

						}else {

							if(upValue > maxSpoint){

								upValue = maxSpoint;

							}

							if(upValue < maxSubTotal){

								upText.attr("value", addComma(upValue));

								prePrice.find('.price').text(addComma(compare(maxSubTotal, upValue)) + ' 원');

							}else{

								upText.attr("value", addComma(maxSubTotal));

								prePrice.find('.price').text('0 원');

							}

						}

						// mobile coupon
						// available 상태에서 입력 가능한 경우 > 모바일 쿠폰 초기화
						// 모바일 쿠폰 사용 안 함 trigger
						$("#dummy-popup-container input[name='mobile-coupon-choice'][value='RELEASE']").trigger('click');

					}

	    		});

	    		/*

	    		 * 예상 적립 S포인트

	    		$( "#dummy-popup-container" ).on( "change", "#save-point-01", function(){

	    			console.log( this.checked )

	    			if( this.checked  ){

	    			}else{

	    			}

	    		} );

	    		*/

			}



			//재계산 ajax호출

			function fncPreCalcApply(qty, vCode, releaseYn, voucherType) {

				console.log(cartCode+","+ qty+","+ vCode+","+ releaseYn);

				vCode =  encodeURIComponent(vCode);

				var spointratio = $('#spointratio').attr('value');

   				var spointproductone = $('#spointproductone').attr('value');

				var voucherTypeFlag = "coupon";

				if(voucherType != null && voucherType != ''){

					voucherTypeFlag = voucherType;

				}

				var orderQuantity = $('#dummy-popup-container .sec-alert-contents .order-quantity .con input[type=text]');

				var totalOrderPrice = $('#dummy-popup-container .sec-alert-contents .total-order-price .price');

				var memberDiscount = $('#dummy-popup-container .sec-alert-contents .member-discount .price');

				var choiceResult = $('#dummy-popup-container .sec-alert-contents .choice-result');

				var eventResult = $('#dummy-popup-container .sec-alert-contents .event-code-result');

				var usePoint = $('#dummy-popup-container .sec-alert-contents .use-point');

				var prePrice = $('#dummy-popup-container .sec-alert-contents .pre-price');

				// mobile coupon
				var mobileResult = $('.calculator .sec-alert-contents .mobile-coupon-result');
				var couponNum = $( '#dummy-popup-container .calculator .mobile-coupon input[type=text]' ).val();



				if(applyFlag == false) return;



				applyFlag = false;


				// mobile coupon num 파라미터 추가
				estore.preCalcApply({cartCode:cartCode, qty:qty, voucherCode:vCode, releaseYn:releaseYn, voucherType:voucherTypeFlag, couponNum:couponNum, spointratio:spointratio, spointproduct:spointproductone}, function(data) {

					console.info("preCalcApply :: ", data);

					totalOrderPrice.html(data.cartData.subTotal.formattedValue);



					choiceResult.find('.saving').html("-"+data.cartData.couponDiscountValue.formattedValue);

					eventResult.find('.saving').html("-"+data.cartData.promotionCodeDiscountValue.formattedValue);

					// mobile coupon
					//data.cartData.mobileCouponAmount.value > 스토어 api element 생성후여야 유효
					//data.moneyConInterface.result

					if(couponNum != '' && couponNum != null && data.cartData.mobileCouponAmount.value && data.moneyConInterface.result == 'success') {
						mobileResult.find('.saving').html("-"+addComma(data.cartData.mobileCouponAmount.value)+" 원");
					} else {
						mobileInputOnlyCheck = false;
						mobileResult.find('.saving').html('-0 원');
					}

					// 모바일 쿠폰 유효하지 않을 경우
					// 경고 메시지 + mobileInputOnlyCheck : false 로 다시 사용 버튼 유효하게 설정
					if(couponNum != '' && couponNum != null && data.result == '1001') {
						alert(data.errorMessage);
						mobileInputOnlyCheck = false;
					}



					orderQuantity.attr("value",data.cartData.entries[0].quantity);



					if(data.cartData.promo3PerCentDiscountforKorea != null) {

						memberDiscount.html("-"+data.cartData.promo3PerCentDiscountforKorea.formattedValue);

					} else {

						memberDiscount.html("-0 원");

					}



					var upValue = parseInt(removeComma(usePoint.find('input[type=text]').val()));

					var upText = usePoint.find('input[type=text]');

					var upChceked = usePoint.find('#use-point-01').prop('checked');

					maxSubTotal = parseInt(data.cartData.subTotalWithDiscounts.value);

					var result = 0;

					if(usePointAvailavle) {

						if(upChceked){

							if(maxSubTotal >= maxSpoint){

								upText.attr("value", addComma(maxSpoint));

								result = compare(maxSubTotal, maxSpoint);

							}else{

								upText.attr("value", addComma(maxSubTotal));

							}

						}else{

							if(upValue < maxSubTotal){

								upText.attr("value", addComma(upValue));

								result = compare(maxSubTotal, upValue);

							}else{

								upText.attr("value", addComma(maxSubTotal));

							}

						}

					} else {

						result = maxSubTotal;

					}



					prePrice.find('.price').text(addComma(result) + ' 원');

					//미리계산기 적용 dong_won.lee^^;
					var sumPoint = parseInt(data.spointbase) + parseInt(data.spointprice) + parseInt(data.spointproduct);
					var persentSum = "( 기본 "+data.spointratio+"%";
					if (data.spointproduct != undefined && data.spointproduct != null && data.spointproduct !="" && data.spointproduct != "0") {
							persentSum += " + 추가 " +  addComma(data.spointproduct);
					}

					if (data.spointprice != undefined && data.spointprice != null && data.spointprice !="" && data.spointprice != "0") {
							persentSum += " + 구매포인트 " +  addComma(data.spointprice);
					}
					persentSum += " )";
					prePrice.find('.sub .sub-con').html(addComma(sumPoint) +" 포인트<br>" + persentSum);

					if(data.voucherStatus == 'fail' && vCode != '') {

						alert(pdpMsg.precalcAlertMessage5);

					}



					applyFlag = true;

				});

			}



			// 쿠폰 적용

			function fncVoucherApply(obj) {

				var preVoucherCode = voucherCode;

				var newVoucherCode = $(obj).val();

				var orderQuantity = $('#dummy-popup-container .sec-alert-contents .order-quantity .con input[type=text]');



				if(newVoucherCode != preVoucherCode) {

					if(newVoucherCode == 'RELEASE') {

						fncPreCalcApply(orderQuantity.val(), preVoucherCode, 'Y');

					} else {

						if(alertFlag == 'Y' && ($('.calculator .sec-alert-contents .mobile-coupon-result .saving').html() != '-0 원' || $('.calculator .sec-alert-contents .event-code-result .saving').html() != '-0 원')) { 
							alert(pdpMsg.precalcAlertMessage7);
							alertFlag = 'N';
						}

						// mobile coupon
						// 쿠폰 변경시, 체크되어 있던 모바일 쿠폰 찾아 해제 > 디폴트 체크
						$("input[name='mobile-coupon-choice']:radio").each(function(index) {

							if($(this).attr("checked") == 'checked') {

								if($(this).val() != 'RELEASE') {

									$(this).prop("checked", false);

									mobileCoupon = "";

									$( '#dummy-popup-container .calculator .mobile-coupon input[type=text]' ).val('');

									$( '#dummy-popup-container .calculator .mobile-coupon input[type=text]' ).attr("readonly", true);

									//if(alertFlag == 'N') alert(pdpMsg.precalcAlertMessage7);

								}

							}

						});

						//fncPreCalcApply(orderQuantity.val(), newVoucherCode, 'N');

						// sec 미리계산기 오류 수정
						// 기존 적용된 쿠폰 환원 및 새로 적용할 쿠폰 추가
						fncPreCalcApply(orderQuantity.val(), preVoucherCode+":"+newVoucherCode, 'R');

						// 쿠폰 변경시, 체크되어 있던 이벤트 코드 찾아 해제
						$("input[name='event-choice']:radio").each(function(index) {

							if($(this).attr("checked") == 'checked') {

								if($(this).val() != 'RELEASE') {

									$(this).prop("checked", false);

									eventCode = "";

									$( '#dummy-popup-container .calculator .event-code input[type=text]' ).val('');

									$( '#dummy-popup-container .calculator .event-code input[type=text]' ).attr("readonly", true);

									//alert(pdpMsg.precalcAlertMessage4);

								}

							}

						});

					}

					voucherCode = newVoucherCode;

				}

			}



			//이벤트 코드 적용

			function fncEventApply(obj) {

				var preEventCode = eventCode;

				var newEventCode = $(obj).val();

				var orderQuantity = $('#dummy-popup-container .sec-alert-contents .order-quantity .con input[type=text]');

				var voucherCode = $( '#dummy-popup-container .calculator .event-code input[type=text]' );

				var usePoint = $('.calculator .sec-alert-contents .use-point');



				if(newEventCode != preEventCode) {

					// mobile coupon
					// 쿠폰 변경인데 RELEASE 아닌 경우 공통 
					if(newEventCode != 'RELEASE') {

						// 쿠폰 변경시, 체크되어 있던 모바일 쿠폰 찾아 해제 > 디폴트 체크
						$("input[name='mobile-coupon-choice']:radio").each(function(index) {

							if($(this).attr("checked") == 'checked') {

								if($(this).val() != 'RELEASE') {

									$(this).prop("checked", false);

									mobileCoupon = '';

									$( '#dummy-popup-container .calculator .mobile-coupon input[type=text]' ).val('');

									$( '#dummy-popup-container .calculator .mobile-coupon input[type=text]' ).attr("readonly", true);

									if(alertFlag == 'Y' && $('.calculator .sec-alert-contents .mobile-coupon-result .saving').html() != '-0 원') { alert(pdpMsg.precalcAlertMessage7); alertFlag = 'N'; }

								}

							}

						});

						// s point 비활성화 해제
						var currentSpoint = parseInt($('.sec-alert-contents .use-point span.has-point').text().replace(',',''));
						if (currentSpoint >= 5000) {
							usePointAvailavle = true;
							usePoint.find('input[type=text]').attr("readonly", false);
							usePoint.find("#use-point-01").attr("disabled", false);
						}
					
					}


					if(newEventCode == 'RELEASE') {

						fncPreCalcApply(orderQuantity.val(), preEventCode, 'Y');

						eventCode = newEventCode;

					} else if(newEventCode == 'NEW_EVENT_CODE') {

						if(!voucherCode.attr("readonly")){

							fncPreCalcApply(orderQuantity.val(), voucherCode.val(), 'N', 'promotion');

							eventCode = voucherCode.val();

						} else { // 그냥 input 체크해서 들어왔을 때

							fncPreCalcApply(orderQuantity.val(), preEventCode, 'Y');

							eventCode = '';
						
						}

					} else {

						//fncPreCalcApply(orderQuantity.val(), newEventCode, 'N');

						// sec 미리계산기 오류 수정
						// 기존 적용된 이벤트코드 환원 및 새로 적용할 이벤트코드 추가
						fncPreCalcApply(orderQuantity.val(), preEventCode+":"+newEventCode, 'R');

						eventCode = newEventCode;

					}

				}

			}


			// mobile coupon 적용

			function fncMobileCouponApply(obj) {

				var preMobileCoupon = mobileCoupon; // default : RELEASE
				var newMobileCoupon = $(obj).val(); // RELEASE / NEW_MOBILE_COUPON

				var usePoint = $('.calculator .sec-alert-contents .use-point'); // mobile coupon 체크시 samsung point 비활성화하기 위해 마크업 선언

				var upText = $('#dummy-popup-container .calculator .use-point input[type=text]');
				var prePrice = $('#dummy-popup-container .calculator .sec-alert-contents .pre-price');
				var preUpValue = upText.val();

				var orderQuantity = $('#dummy-popup-container .sec-alert-contents .order-quantity .con input[type=text]');
				
				// 모바일 쿠폰 코드 input 값
				var voucherCode = $( '#dummy-popup-container .calculator .mobile-coupon input[type=text]' );

				if(newMobileCoupon != preMobileCoupon || mobileInputOnlyCheck == true) { // 다른 옵션으로 변경됐을 경우

					if(newMobileCoupon == 'RELEASE') { // release 누르면 couponNum 공백으로 ajax 호출해서 모바일 쿠폰 미적용 상태로

						// estore.preCalcApply ajax > couponNum : ''
						voucherCode.val('');
						fncPreCalcApply(orderQuantity.val(), '', 'N', 'coupon');
						mobileCoupon = newMobileCoupon;

						// s point 비활성화 해제
						var currentSpoint = parseInt($('.sec-alert-contents .use-point span.has-point').text().replace(',',''));
						if (currentSpoint >= 5000) {
							usePointAvailavle = true;
							usePoint.find('input[type=text]').attr("readonly", false);
							usePoint.find("#use-point-01").attr("disabled", false);
						}

					} else if(newMobileCoupon == 'NEW_MOBILE_COUPON') { // 모바일 쿠폰 input 선택

						if(voucherCode.attr("readonly")==false || !voucherCode.attr("readonly")){ // input 체크, 입력된 상태에서 사용 버튼 클릭한 경우만 유효

							// estore.preCalcApply ajax > couponNum : couponNum
							fncPreCalcApply(orderQuantity.val(), '', 'N', 'coupon');

							mobileCoupon = voucherCode.val();

							mobileInputOnlyCheck = false;

							// s point 초기화 및 비활성화
							usePointAvailavle = false;
							if(usePoint.find("#use-point-01").attr('checked') || usePoint.find('input[type=text]').val() != '0') {
								prePrice.find('.price').text(addComma(parseInt(prePrice.find('.price').text().replace(',',''))+parseInt(preUpValue.replace(',','')))+' 원');
								usePoint.find("#use-point-01").removeAttr('checked');
							}
							usePoint.find('input[type=text]').attr("readonly", true);
							usePoint.find("#use-point-01").attr("disabled", true);
							usePoint.find('input[type=text]').attr("value", 0);

						} else { // 그냥 input 체크해서 들어왔을 때

							mobileCoupon = newMobileCoupon;

							mobileInputOnlyCheck = true;

							usePointAvailavle = false;

						}

					} else { // 모바일 쿠폰은 투가지 타입이므로 실질적으로 쓰지 않는 부분
					
					}

				}

			}


			function compare(num1 ,num2){

				return num1 > num2 ? num1-num2 : 0;

			}



			if(isWow){

				wowPreCalculatorInit();

			}else{

				preCalculatorInit();

			}

		}



		/*

		 * [사은품]

		 */

		 ss.PDPStandard.secFn.freebie = function (data){

			 //추가 요건으로 인해 추가 해당값이 true인 겨우만 노출

			 if(data.displayFreeGift != 'true'){

				 return

			 }



			if(data.freeGiftName != undefined  &&  data.freeGiftName != null && data.freeGiftName != ""){

				if(data.freeGiftTotQty != undefined  &&  data.freeGiftTotQty != null && data.freeGiftTotQty != ""){

					$('.freebie').show();

					if(data.freeGiftTotQty == '0'){

						$('.freebie .free-item').append(pdpMsg.feebieEndMessage);

					}else {

						$('.freebie .free-item').append(data.freeGiftName + ' <span class="break-word">  선착순 ' + data.freeGiftTotQty + '개</span>');

					}

				}

			}else{

				if(data.freeGiftTotQty != undefined  &&  data.freeGiftTotQty != null && data.freeGiftTotQty != ""){

					if(data.freeGiftTotQty == '0'){

						$('.freebie').show();

						$('.freebie .free-item').append(pdpMsg.feebieEndMessage);

					}else {

						$('.freebie .free-item').append(data.freeGiftName + ' <span class="break-word">  선착순 ' + data.freeGiftTotQty + '개</span>');

					}

				}

			}

		 }



		 /*

		  * [청구할인]

		  */

		ss.PDPStandard.secFn.cardDiscount = function (data){

			if(data.flagChargeSale == 'Y'){

				$(".card-discount").show();

	        	var cardDiscountTag = $(".card-discount ul" );



	        	if( data.creditCardCorpView1 == true){

	        		var str = '<li><span class="icon-sec-card"></span> '+ data.creditCardName1+" ";

	        		if(data.buyAmount1 > 0){

	        			str += data.buyAmount1+"만원 이상 결제 시 ";

	        		}

	        		str += '<span class="rate">'+data.discountRate1+'</span>% 청구할인 <span class="term">('+data.chargeSaleStartDate1+"~"+data.chargeSaleEndDate1+')</span></li>';

	        		cardDiscountTag.append(str);

	        	}

	        	if( data.creditCardCorpView2 == true){

	        		var str = '<li><span class="icon-sec-card"></span> '+data.creditCardName2+" "

	        		if(data.buyAmount2 > 0){

	        			str += data.buyAmount2+"만원 이상 결제 시 ";

	        		}

	        		str += '<span class="rate">'+data.discountRate2+'</span>% 청구할인 <span class="term">('+data.chargeSaleStartDate2+"~"+data.chargeSaleEndDate2+')</span></li>';

	        		cardDiscountTag.append(str);

	        	}

	        	if( data.creditCardCorpView3 == true){

	        		var str = '<li><span class="icon-sec-card"></span> '+data.creditCardName3+" ";

	        		if(data.buyAmount3 > 0){

	        			str += data.buyAmount3+"만원 이상 결제 시 ";

	        		}

	        		str +='<span class="rate">'+data.discountRate3+'</span>% 청구할인 <span class="term">('+data.chargeSaleStartDate3+"~"+data.chargeSaleEndDate3+')</span></li>';

	        		cardDiscountTag.append(str);

	        	}

			}

		}



        PDPCommonSECInit();

	};



}(jQuery));



$(function() {

	new ss.PDPStandard();

	var initBindT = setTimeout(function() {

		clearTimeout(initBindT);

		$('._bind-init2click').trigger('click');

	}, 500);



	// keyVisual Text theme change

/*	if ($('.ss-carousel.hero.top-view').length > 0) {

		$('.ss-carousel.hero.top-view')[0].binder.callFn = function() {

			var currentTextTheme = $('#currnetTextTheme').val();

			var textThemeClass = $('.product-info.inner-x').eq(0);

			var addClass = $('.ss-carousel.hero.top-view').eq(0).find('[data-index="' + arguments[0].curr + '"]').children().attr('data-theme');

			textThemeClass.removeClass(currentTextTheme);

			textThemeClass.addClass(addClass);

			$('#currnetTextTheme').val(addClass);

		};

	}*/

});

//aeseul.kim 20150727
/*$(function() {
	var testCount = 1;
	var intervalID = setInterval(function() {
		testCount++;
		if(testCount > 2) {
			clearInterval(intervalID);
			if(isStoreAvailable) {
				isStoreAvailable = false;

				var body = $('.ss_samsung');
				var isWow = body.hasClass('pdp_wow') || body.hasClass('instore') || body.hasClass('business') ? true : false;

				$( ".badges").css('border-bottom-width', '0px');
				if(!isWow){
					$(".product-info .product-title").css('padding-bottom', '15px');
				} else {
					$(".wow-product-info .product-title").css('padding-bottom', '15px');
				}

				new ss.PDPStandard.PDPJumpModule();

				if(isWow){
					$('.jump-module').find('#jumpToQuickBuyContract').on('click', function() {
						$('.sub-hero-wrap #quickBuyContract').trigger('click');
					});
				}
			}
		}
	}, 3000);

});*/
/* lifeSamsung  팝업 실행 스크립트 : 2016-04-25 */
/* jquery resizeend event : 2016-04-25 */

! function(a) {var b = window.Chicago || { utils: { now: Date.now || function() {return (new Date).getTime() }, uid: function(a) {return (a || "id") + b.utils.now() + "RAND" + Math.ceil(1e5 * Math.random()) }, is: { number: function(a) {return !isNaN(parseFloat(a)) && isFinite(a) }, fn: function(a) {return "function" == typeof a }, object: function(a) {return "[object Object]" === Object.prototype.toString.call(a) } }, debounce: function(a, b, c) {var d; return function() {var e = this, f = arguments, g = function() { d = null, c || a.apply(e, f) }, h = c && !d; d && clearTimeout(d), d = setTimeout(g, b), h && a.apply(e, f) } } }, $: window.jQuery || null }; if ("function" == typeof define && define.amd && define("chicago", function() {return b.load = function(a, c, d, e) {var f = a.split(","), g = [], h = (e.config && e.config.chicago && e.config.chicago.base ? e.config.chicago.base : "").replace(/\/+$/g, ""); if (!h) throw new Error("Please define base path to jQuery resize.end in the requirejs config."); for (var i = 0; i < f.length;) {var j = f[i].replace(/\./g, "/"); g.push(h + "/" + j), i += 1 } c(g, function() { d(b) }) }, b }), window && window.jQuery) return a(b, window, window.document); if (!window.jQuery) throw new Error("jQuery resize.end requires jQuery") }(function(a, b, c) { a.$win = a.$(b), a.$doc = a.$(c), a.events || (a.events = {}), a.events.resizeend = { defaults: { delay: 250 }, setup: function() {var b, c = arguments, d = { delay: a.$.event.special.resizeend.defaults.delay }; a.utils.is.fn(c[0]) ? b = c[0] : a.utils.is.number(c[0]) ? d.delay = c[0] : a.utils.is.object(c[0]) && (d = a.$.extend({}, d, c[0])); var e = a.utils.uid("resizeend"), f = a.$.extend({ delay: a.$.event.special.resizeend.defaults.delay }, d), g = f, h = function(b) { g && clearTimeout(g), g = setTimeout(function() {return g = null, b.type = "resizeend.chicago.dom", a.$(b.target).trigger("resizeend", b) }, f.delay) }; return a.$(this).data("chicago.event.resizeend.uid", e), a.$(this).on("resize", a.utils.debounce(h, 100)).data(e, h) }, teardown: function() {var b = a.$(this).data("chicago.event.resizeend.uid"); return a.$(this).off("resize", a.$(this).data(b)), a.$(this).removeData(b), a.$(this).removeData("chicago.event.resizeend.uid") } }, function() { a.$.event.special.resizeend = a.events.resizeend, a.$.fn.resizeend = function(b, c) {return this.each(function() { a.$(this).on("resizeend", b, c) }) } }() });
function _layer_pop(_el) {
    var el = _el;
    var w = $(window);
    var pop_layout = $('#interior_pop');
    var pop_layout_cont = pop_layout.find('.popup_cnt');
    var pop_layout_close = pop_layout.find('.close-button');
    var interior_name = el.find($('.interior_name')).text();
    var interior_image = el.find($('.interior_image')).html();
    var interior_model = el.find($('.interior_model')).text();
    var interior_source = el.find($('.interior_source')).text();
    pop_layout.show();
   

    var set_position = function() {
        var top_cal = 0;
        top_cal = (w.scrollTop() + (w.height() / 2 ) - (pop_layout_cont.height() / 2));
        pop_layout.css({ marginLeft: '-' + (pop_layout.width() / 2) + 'px', top: top_cal + 'px' });
	    pop_layout.trigger('focus');
    };

    /* 항목 정보 대치 */
    pop_layout.find('h3').text(interior_name);
    pop_layout.find('.img_viewer > ul > li').html(interior_image);
    pop_layout.find('.info > .name').text(interior_model);
    pop_layout.find('.info > .source').text(interior_source);

    /* 닫기 버튼 */
    pop_layout_close.off().one('click', function() {
        pop_layout.hide();
        el.trigger('focus');
    });
    /* init */
    set_position();
    $(window).on('resizeend', 250, function() {
        set_position();
    });
}

//delivery-module
function controlTabMenu(){

	(function($) {$.resizeend = function(el, options) {var base = this; base.$el = $(el); base.el = el; base.$el.data("resizeend", base); base.rtime = new Date(1, 1, 2000, 12, 00, 00); base.timeout = false; base.delta = 200; base.init = function() {base.options = $.extend({}, $.resizeend.defaultOptions, options); if (base.options.runOnStart) base.options.onDragEnd(); $(base.el).resize(function() {base.rtime = new Date(); if (base.timeout === false) {base.timeout = true; setTimeout(base.resizeend, base.delta); } }); }; base.resizeend = function() {if (new Date() - base.rtime < base.delta) {setTimeout(base.resizeend, base.delta); } else {base.timeout = false; base.options.onDragEnd(); } }; base.init(); }; $.resizeend.defaultOptions = {onDragEnd: function() {}, runOnStart: false }; $.fn.resizeend = function(options) {return this.each(function() {(new $.resizeend(this, options)); }); }; })(jQuery);

	var el = $('.delivery-module');
	var nav = el.find('nav');
	var bnts = nav.find('button');
	var prevBtn = nav.find('button.prev');
	var nextBtn = nav.find('button.next');
	var tab = nav.find('.tab-menu');
	var li = tab.find('li');
	var tab_a = li.find('a');
	var tab_cont = el.find('.tab-cont > div')

	/* Mobile : Prev,Next Events */
	bnts.on('click', function() {
		var dir = $(this).attr('class');
		var tab_size = li.size();
		if (dir == 'next') {
			if (tab_size == 4) { //0  1  2  3
				li.first().hide();
				li.eq(1).show();
				li.eq(2).show();
				li.last().show(); //3
			} else {
				li.first().hide();
				li.eq(1).hide();
				li.eq(3).show();
				li.last().show();
			}
			prevBtn.show();
			$(this).hide();
		} else {

			if (tab_size == 4) { //0  1  2  3
				li.first().show();
				li.eq(1).show();
				li.eq(2).show();
				li.last().hide();
			} else {
				li.first().show();
				li.eq(1).show();
				li.eq(3).hide();
				li.last().hide();
			}
			nextBtn.show();
			$(this).hide();
		}
	});
	$(window).resizeend({
		onDragEnd: function() {
			var width = $(window).width();
			var dir_flag = 0;
			if (width < 767) {
				var tab_size = li.size();
				var active_tab = tab.find('.on').index();
				if (tab_size == 5 && active_tab == 2) {
					if (nextBtn.is(':visible')) {
						dir_flag = 0;
					} else {
						dir_flag = 1;
					}
				} else {
					dir_flag = (active_tab < 3) ? 0 : 1;
				}
				console.log(dir_flag);
				if (dir_flag == 0) {
					nextBtn.show();
					prevBtn.hide();
					if (tab_size == 4) {
						li.last().hide();
						li.first().show();
					} else if (tab_size == 5) {
						li.first().show();
						li.eq(1).show();
						li.eq(3).hide();
						li.last().hide();

					} else {
						console.log('탭 개수 오류!');
					}
				} else {
					nextBtn.hide();
					prevBtn.show();
					if (tab_size == 4) {
						li.first().hide();
					} else if (tab_size == 5) {
						li.first().hide();
						li.eq(1).hide();
						li.eq(3).show();
						li.last().show();
					} else {
						console.log('탭 개수 오류!');
					}
				}
			} else {
				li.show();
				bnts.hide();
			}
		},
		runOnStart: true
	});

}

$(document).ready(function() {
    var $life_samsung = $(".lifeSamsung_list li a");
    $life_samsung.on('click', function() {
        _layer_pop($(this));
        return false;
    });
	//delivery-module
	var categoryCodeAirConditioner = null;
});
$(window).resizeend(function() {
    var $life_samsung = $(".lifeSamsung_list li a");
    $life_samsung.on('click', function() {
        _layer_pop($(this));
        return false;
    });
});
