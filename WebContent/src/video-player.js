//aeseul.kim 임시 start
/*
var url = decodeURIComponent(location.href);
url = decodeURIComponent(url);
console.log($('#modelCode').val());
if($('#modelCode').val() != null && $('#modelCode').val() != "" && $('#modelCode').val() != 'undefined'){
	if(url.indexOf('/sec/consumer/tv-video/tv') > -1 || url.indexOf('/sec/consumer/store-only/store-tv') > -1){
		console.log('s');
		document.write('\x3Cscript type="text/javascript" src="/sec/next/js/src/pages/pdp-standard-sec.js">\x3C/script>');
	} else if(url.indexOf('/cn/consumer/tv-audio-video/televisions') > -1){
		console.log('c');
		document.write('\x3Cscript type="text/javascript" src="/common/next/js/src/pages/pdp-standard-cn.js">\x3C/script>');
	}
}
*/
//aeseul.kim 임시 end

//minkyu01.jung 임시 start
;(function(window, $) {
    'use strict';
	if(typeof SITE_CD !== 'undefined' && SITE_CD === 'ru'){
		if($('#modelCode').length > 0 && $('#modelCode').val() === 'RF24HSESBSR/WT'){
			console.log('target model');
			$('#seeAllAvailability,#jumpToSeeAllAvailability').find('span').html('Купить сейчас');
		}
	}
	/*
	if(typeof SITE_CD !== 'undefined' && SITE_CD === 'sec'){
		STORE_DOMAIN = 'store.samsung.com';
		if($('#modelCode').length > 0 && ['SM-N920SZSPSKO','SM-N920SZDPSKO','SM-N920KZDPKTO','SM-N920KZSPKTO'].indexOf($('#modelCode').val()) > -1 ){
			$('div.option-5').removeClass('option-5').addClass('option-4');
		}
	}
	*/
})(window, jQuery);
if($('#selectColor').length){
	var $pColor = $('#selectColor').find('a[data-color="#036423"]');
	if($pColor.length){
		var pTitle = $pColor.attr('title');
		var pClrName = $pColor.attr('data-colorname');
		$pColor.attr('title', pTitle.replace('pakistangreen', 'Green Emerald'))
		       .attr('data-colorname', pClrName.replace('pakistangreen', 'Green Emerald'))
		       .text('Green Emerald');
	}
}
//minkyu01.jung 임시 end

var ss = $;
/**
 Page object for the Video Player page.

 @module Main
 @submodule Video Player
 @main Main
 **/
/*global window */
/*global console */
/* global setTimeout */
/* global clearTimeout */
/* global brightcove */
/* global eventBridge */
/* global clearTimeout */
/* global eventDictionary */
/* global clearTimeout */
ss.VideoPlayerHandler = {
    init: function () {
		if ( arguments[0] == 'lazyVideo' ) {
			var videoObj = $('#' + arguments[0]);
			var lazyTime = setTimeout(function(){
				clearTimeout(lazyTime);
				ss.VideoPlayerHandler.init(videoObj.attr('id'));	
			}, 100);
		}
		else {
			ss.VideoPlayerHandler.active(arguments[0]);
		}
    },

	active: function(id) {
		$.vpList[id] = new ss.VideoPlayer(id);
		//vp.onTemplateLoad($('.BrightcoveExperience').attr('id'));
		$.vpList[id].onTemplateLoad(id);
	}
};
$.vpList = {};
/**
 @class $.VideoPlayer
 @constructor

 @property {Object} BCP - Brightcove Object.
 @property {HTMLElement} videoContainer - the container holding the video.
 @property {Object} videoPlayer - brightcove player api video player
 @property {Object} playProxy
 @property {Object} stopProxy
 @property {Object} stopUnbindProxy
 @property {Object} completeProxy
 @property {Object} experienceModule - Brightcove api module
 @property {Event} showVideoEvent - Show Video Event
 @property {Event} hideVideoEvent - Show Video Event
 **/
ss.VideoPlayer = function (obj_id) {
    var scrollCount, multiPlayerTimer;
    return {
        BCP: {},
        /*
         videoContainer: $('.video-player'),
         */
        videoContainer: $('#' + obj_id).parents('.video-player'),
        videoPlayer: null,
        playProxy: null,
        stopProxy: null,
        stopUnbindProxy: null,
        completeProxy: null,
        playMediaEvent: null,
        experienceModule: null,
        showVideoEvent: null,
        hideVideoEvent: null,

        /**
         @function init
         Initializaiton function which runs at object instantiation time.
         **/
        init: function () {
//			this.onTemplateLoad($('.BrightcoveExperience').attr('id'));
        },

        /**
         @function onTemplateLoad
         Brightcove template load callback, called when template loads,
         this function stores a reference to the player and modules.
         @param {HTMLElement} experienceID - id of player.
         **/
        onTemplateLoad: function(experienceID) {
            // get a reference to the player and API Modules and Events
            this.showVideoEvent = jQuery.Event(eventDictionary.videoPlayer.EVENT_SHOW_VIDEO);
            this.hideVideoEvent = jQuery.Event(eventDictionary.videoPlayer.EVENT_HIDE_VIDEO);

            //if(!this.hasClass('video-player')) return;
            this.playProxy = $.proxy(this.playVideo, this);
            this.stopProxy = $.proxy(this.stopVideo, this);
            this.stopUnbindProxy = $.proxy(this.stopVideoUnbind, this);
            this.completeProxy = $.proxy(this.completeVideo, this);
            this.playMediaEvent = $.proxy(this.playVideoMediaEvent, this);

            this.BCP.player = brightcove.api.getExperience(experienceID);
            this.BCP.APIModules = brightcove.api.modules.APIModules;
            this.BCP.adEvent = brightcove.api.events.AdEvent;
            this.BCP.mediaEvent = brightcove.api.events.MediaEvent;

            this.onTemplateReady();
        },

        /**
         @function onTemplateReady
         Brightcove template ready event handler to ready the player modules for the API,
         set up new event listeners on the video player module for specific playback events that indicate how the user interacts with the player.
         @param {HTMLElement} evtObj - id of player.
         **/
        onTemplateReady: function(evtObj) {
            var bcp = this.BCP,
                self = this,
                bcpPlayer = bcp.player,
                vc = this.videoContainer;

            this.videoContainer.self = this;

            if(bcp.player){
                // get references to modules
                bcp.videoPlayer = bcpPlayer.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
                bcp.experienceModule = bcpPlayer.getModule(brightcove.api.modules.APIModules.EXPERIENCE);

                // add media COMPLETE event listerer
                bcp.videoPlayer.addEventListener(brightcove.api.events.MediaEvent.COMPLETE, this.completeProxy);
                bcp.videoPlayer.addEventListener(brightcove.api.events.MediaEvent.PLAY, this.playMediaEvent);

                //console.log(this);
                //console.log("view : " + this.videoContainer.attr('data-view'));
                if(vc.hasClass('noSwipe')){
                    vc.animate({opacity:0});
                    vc.addClass('not-visible');

                }else{
                    vc.css('opacity', "0");
                    vc.find('object').css('opacity', "1").css('z-index', '1');
                    vc.animate({opacity:1}, 1000);
                }

                if(vc.hasClass('isMulti')){
                    var thumbList = vc.find('.media-thumb-list'),
                        lis = thumbList.find('li'),
                        lisLen = lis.length,
                        thumbController = thumbList.find('.media-thumb-controller'),
                        videoCnt = thumbController.data('videoCount');

                    vc.find('.multi-player').css('padding-left', thumbList.width()+"px");
                    bcp.experienceModule.setSize(vc.width()-thumbList.width(), vc.height());

                    if(videoCnt === 0) thumbController.find('.roll-prev').css('display', 'none');
                    else if(videoCnt >= lisLen-4){
                        thumbController.find('.roll-next').css('display', 'none');
                        if(videoCnt > lisLen-1) thumbController.data('videoCount', lisLen);
                    }

                    if(lisLen < 4){
                        thumbController.find('.roll-prev').css('display', 'none');
                        thumbController.find('.roll-next').css('display', 'none');
                        lis.height(thumbList.height()/lisLen);
                    }else lis.height(thumbList.height()/4);

                    scrollCount = videoCnt > lisLen-4 ? lisLen-4 : videoCnt;
                    thumbList.find('ul').scrollTop(scrollCount*lis.height());
                }

                this.bindEvents();
            }

        },

        thumbSlide:function (){
            //`console.log('thumbSlide = ' + scrollCount) ;
            var vc = this.videoContainer,
                thumbList = vc.find('.media-thumb-list'),
                lis = thumbList.find('li'),
                lisLen = lis.length,
                targetHeight = lis.height(),
                thumbController = thumbList.find('.media-thumb-controller');

            thumbList.find('ul').scrollTop(targetHeight*scrollCount);
            if(scrollCount === 0) thumbController.find('.roll-prev').css('display', 'none');
            else if(scrollCount >= lisLen-4) thumbController.find('.roll-next').css('display', 'none');
            else{
                thumbController.find('.roll-prev').css('display', 'block');
                thumbController.find('.roll-next').css('display', 'block');
            }

        },

        /**
         @function bindEvents
         Bind events to elements within video player module
         **/
        bindEvents: function() {
            var self = this,
                vc = self.videoContainer;

			//if(SITE_CD == 'sg' && $('.product-card').length > 0 && $('.kv_area').length > 0) { // j_m.lee

				// current KV idx
				// var currentIdx = $('.pag.controls .dots ul li.current a').attr('data-index');
				// video idx
				var myExId = '';

				if(getOmniDeviceType() == "mobile") {
					myExId = vc.find('iframe').attr('id');
				} else {
					myExId = vc.find('object').attr('id');
				}
				
				var lastChr = myExId.charAt(myExId.length - 1);

				$('.play-btn[data-slide-index="'+lastChr+'"]').animate({opacity:1});

			//} else {
			//	$('.play-btn').animate({opacity:1});
			//}
			
            eventBridge.on(eventDictionary.global.RESIZE, function() {
				if ( self.videoContainer.parents('body').length > 0 ) {
					self.resize();
				}
            });

			//if(SITE_CD == 'sg' && $('.product-card').length > 0 && $('.kv_area').length > 0) { // j_m.lee

				// index 일치하는 버튼에만 event mapping
				$('.play-btn[data-slide-index="'+lastChr+'"], .play-other-link').on('click', function(){
					var data = $(this).data();
					if(!data.contents){
						$(this).animate({opacity:1});
						$(this).on('click', self.playProxy);
					}
				});
				$('.play-btn[data-slide-index="'+lastChr+'"]').click();

			/*} else {
				$('.play-btn, .play-other-link').each(function (){
					var data = $(this).data();
					if(!data.contents){
						$(this).animate({opacity:1});
						$(this).on('click', self.playProxy);
					}
				});
			}*/
			
            $('.multi-play-btn').on('click', self.playProxy);

            $('.close-video').each(function (){
                //console.log($(this).parent());
                if($(this).parent().hasClass('video-player')){
                    $(this).on('click', self.stopProxy);
                }
            });

            $('.close-video-player').on('click', self.stopProxy);

            /*
            //$('.media.gallery').on('click', this.stopUnbindProxy);
            $('.media.gallery').on('click', function (e){
                $('.close-video').each(function (){
                    if($(this).parent().hasClass('video-player')) $(this).first().trigger('click', self.stopProxy);
                });

            }); //MODIFY ADNSTYLE
            //$('.media.threesixty').on('click', this.stopUnbindProxy);
            $('.media.threesixty').on('click', function (e){
                $('.close-video').each(function (){
                    if($(this).parent().hasClass('video-player')) $(this).first().trigger('click', self.stopProxy);
                });
            });  // MODIFY ADNSTYLE

            $('.media.sampleimages').on('click', function (e){
                $('.close-video').each(function (){
                    if($(this).parent().hasClass('video-player')) $(this).first().trigger('click', self.stopProxy);
                });
            });
            */
            
            if(vc.hasClass('isMulti')){
                var thumbList = vc.find('.media-thumb-list'),
                    lisLen = thumbList.find('li').length,
                    thumbController = thumbList.find('.media-thumb-controller');

                thumbController.find('.roll-prev').on('click', function (e){
                    if(scrollCount > 0){
                        scrollCount--;
                        self.thumbSlide();
                    }
                });

                thumbController.find('.roll-next').on('click', function (e){
                    if(scrollCount < lisLen-4){
                        scrollCount++;
                        self.thumbSlide();
                    }
                });

            }

            self.accessibilityEvents();
        },

        /**
         @function accessibilityEvents
         Events added for accessibility.
         **/
        accessibilityEvents: function () {
            $('.play-btn').on('keydown', function (e) {
                if (e.keyCode === 13) { // enter button
                    var closeVideoTimeout = setTimeout( function() {
                        $('.close-video').focus();
                        clearTimeout(closeVideoTimeout);
                    }, 1000);
                }
            });

            $('.multi-play-btn').on('keydown', function (e){
                if (e.keyCode === 13) { // enter button
                    var closeVideoTimeout = setTimeout( function() {
                        $('.close-video').focus();
                        clearTimeout(closeVideoTimeout);
                    }, 1000);
                }
            });

            // Must close in order to tab out of player
            $('body').on('keydown', '.close-video:visible', function (e) {
                if (e.keyCode === 9) {
                    e.preventDefault();
                    return false;
                }
                // Give focus back to play button.
                if (e.keyCode === 13) {
                    var playVideoTimeout = setTimeout( function() {
                        $('.play-btn').focus();
                        clearTimeout(playVideoTimeout);
                    }, 461);
                }
            });
        },

        /**
         @function unbindEvents
         Unbind events to elements on home page
         **/
        unbindEvents: function() {
            $('.play-btn').off('click', this.playProxy);
            $('.multi-play-btn').off('click', this.playProxy);
            $('.close-video').off('click', this.stopProxy);
            //$('.media.gallery').off('click', this.stopUnbindProxy);
            //$('.media.threesixty').off('click', this.stopUnbindProxy);
            $('.play-btn').off('keydown');
            $('.multi-play-btn').off('keydown');
            $('.close-video').off('keydown');
        },

        /**
         @function resize
         Resize the iframe created by brightcove player based on width of container.
         **/
        resize: function () {
            var iframe = $('#bcVideo'),
                vc = this.videoContainer;

            vc.css('width','100%');
            //console.log("asd = " + vc.hasClass('isMulti') + ", " + vc.find('.media-thumb-list').width());
            if(vc.hasClass('isMulti')){
                var thumbList = vc.find('.media-thumb-list'),
                    lis = thumbList.find('li'),
                    lisLen = lis.length,
                    bcp = this.BCP;

                if(lis.length < lisLen) lis.height(thumbList.height()/lisLen);
                else lis.height(thumbList.height()/4);

                if(multiPlayerTimer) clearTimeout(multiPlayerTimer);
                multiPlayerTimer = setTimeout(function (){
                    vc.find('.multi-player').css('padding-left', thumbList.width()+"px");
                    bcp.experienceModule.setSize(vc.width()-thumbList.width(), vc.height());
                }, 150);
                this.thumbSlide();
                //vc.find('object')
            }else{
                this.BCP.experienceModule.setSize(vc.width(), vc.height());
            }
        },

        /**
         @function playVideo
         Show video container and plays video toggle controls off during video
         @param {HTMLElement} videoID - id of player.
         **/
        playVideo: function(evt_obj) {
            var self = this,
                targetPlayBtn = $(evt_obj.currentTarget),
                matchView = targetPlayBtn.data('view'),
                videoPlayerId = targetPlayBtn.data('videoPlayer');
            //console.log("videoPlayerId = " + videoPlayerId);
            //console.log("self.videoContainer.data('view') = " + self.videoContainer.data('view') + ", matchView = " + matchView);
            if ( !!matchView ) {
                if ( matchView == self.videoContainer.data('view') ) {
                    var vc = self.videoContainer;

                    $(eventBridge).trigger(self.showVideoEvent);
                    vc.removeClass('not-visible').addClass('show-video');
                    self.toggleControls(false);
                    vc.animate({opacity:1}, function() {
                        //self.BCP.videoPlayer.play();
                        console.log("videoPlayerId = " + videoPlayerId);

                    });

                    if(vc.hasClass('isMulti')){
                        var thumbList = vc.find('.media-thumb-list'),
                            thumbController = thumbList.find('.media-thumb-controller'),
                            lis = thumbList.find('li'),
                            videoCnt;

                        if(videoPlayerId){
                            lis.each(function (index){
                                if(this == targetPlayBtn.parent()[0]){
                                    videoCnt = index;
                                    thumbController.data('videoCount', index);
                                }
                            });
                        }else{
                            videoCnt = parseInt(thumbController.data('videoCount'));
                        }

                        lis.each(function (index){
                            //console.log('index = ' + index + ", videoCnt = " + videoCnt);
                            if(parseInt(index) === parseInt(videoCnt)) $(this).find('.play-btn').css('display', 'none');
                            else $(this).find('.play-btn').css('display', 'block');
                        });

                        vc.find('.media-thumb-list').css('visibility', 'visible');
                        if(!videoPlayerId) videoPlayerId = $(thumbList.find('li')[videoCnt]).find('a').data('videoPlayer');
                        self.BCP.videoPlayer.loadVideoByID( videoPlayerId );

                        if(multiPlayerTimer) clearTimeout(multiPlayerTimer);
                        multiPlayerTimer = setTimeout(function (){
                            vc.find('.multi-player').css('padding-left', thumbList.width()+"px");
                            self.BCP.experienceModule.setSize(vc.width()-thumbList.width(), vc.height());
                        }, 150);


                    }else{
                        if(videoPlayerId) self.BCP.videoPlayer.loadVideoByID( videoPlayerId );
                        else self.BCP.videoPlayer.play();
                    }

                }
            }
            else {
                // single by origin
                $(eventBridge).trigger(self.showVideoEvent);

                self.videoContainer.removeClass('not-visible').addClass('show-video');

                self.toggleControls(false);

                self.videoContainer.animate({opacity:1}, function() {
                    console.log("videoPlayerId = " + videoPlayerId);
                    if(videoPlayerId) self.BCP.videoPlayer.loadVideoByID( videoPlayerId );
                    else self.BCP.videoPlayer.play();
                });
            }
            setTimeout(function (){
                self.resize();
            },1);
        },

        /**
         @function completeVideo
         Rewind video to begining frame upon completion
         **/
        completeVideo: function() {
            this.BCP.videoPlayer.seek(0);
            this.stopVideo();
            $('.close-video').trigger('click');
        },

        /**
         @function stopVideoUnbind
         Stop video unbind
         **/
        stopVideoUnbind: function() {
            this.stopVideo(true);
            this.unbindEvents();
        },

        /**
         @function stopVideo
         Hide video container and stop video
         **/
        stopVideo: function(close_obj)  {
            var self = this;
            var videoObj = $(close_obj.currentTarget).parent();
            //console.log("videoObj.attr('data-view') = " + videoObj.attr('data-view'));

            $(eventBridge).trigger(self.hideVideoEvent);

            if ( !!videoObj.data('view') ) {
                if ( videoObj.is(self.videoContainer) ) {
                    self.BCP.videoPlayer.pause(true);
                }
            }
            else {
                self.BCP.videoPlayer.pause(true);
            }

            if(!videoObj.hasClass('noSwipe')) return;

            videoObj.animate({'opacity':'0'}, {duration: 450});

            var stopVideoTimeout = setTimeout( function() {
                //console.log("stopVideoTimeout = " + videoObj);
                videoObj.removeClass('show-video').addClass('not-visible');
                if(videoObj.is(self.videoContainer)){
                    self.toggleControls(true);
                    if(videoObj.hasClass('isMulti')){
                        videoObj.find('.media-thumb-list').css('visibility', 'hidden');
                    }
                }

                clearTimeout(stopVideoTimeout);
            }, 460);
        },

        playVideoMediaEvent : function (evt_obj){
            var self = this,
                carouselArea = self.videoContainer.parents('.ss-carousel');

            if(carouselArea.length > 0){
                var playPauseBtn = carouselArea.find('.pag').find('.dots li a').end().find('#cPlayPause');
                if(!playPauseBtn.hasClass('paused')){
                    playPauseBtn.trigger('click');
                }
            }

        },

        /**
         @function toggleControls
         Shows/hides player controls within video player container.

         @param {Boolean} show - true/false
         **/
        toggleControls: function (show) {
            var cssProps = show ? {opacity:1, 'z-index': 10} : {opacity:0, 'z-index': -1};
            //$('.controls:not(.protect)').animate(cssProps);
            $('.pag.controls:not(.protect)').animate(cssProps);
        }

    };
};


