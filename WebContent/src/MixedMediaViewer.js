/*!************************************************************************
*
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2013 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by trade secret or copyright law.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/
if(typeof s7viewers == "undefined") {
	s7viewers = {};
}else if(typeof s7viewers != "object") {
	throw new Error("Cannot initialize a root 's7viewers' package. s7viewers is not an object");
}

if(!s7viewers.MixedMediaViewer) {

	s7viewers.MixedMediaViewer = function () {
		this.sdkBasePath = '/common/next/js/lib/s7sdk/2.6/';
		this.containerId = null;
		this.params = {};
		this.onInitComplete = null;
		this.onInitFail = null;
		this.initializationComplete = false;
	}

	s7viewers.MixedMediaViewer.cssClassName = "s7mixedmediaviewer";

	s7viewers.MixedMediaViewer.prototype.setContainerId = function (inElemId) {
		this.containerId = inElemId || null;
	}

	s7viewers.MixedMediaViewer.prototype.getContentUrl = function () {
		 var contentUrl = "";
		 var viewerPath = "";
		 var scriptTags = null;
		 if (document.scripts){
			scriptTags = document.scripts;
		 }else{
			scriptTags = document.getElementsByTagName("script");
		 }
		 for(var i=0; i<scriptTags.length;i++){
			  if(scriptTags[i].getAttribute('src') && scriptTags[i].getAttribute('src').indexOf('MixedMediaViewer.js') > 0){
				  viewerPath = scriptTags[i].getAttribute('src');
				  break;
			  }
		 }

		 var idx = viewerPath.indexOf('lib/MixedMediaViewer.js'); 
		 if (idx >= 0) {
			  contentUrl = viewerPath.substring(0,idx);
		 }
		 if ((contentUrl != '') && (contentUrl.lastIndexOf('/') != contentUrl.length - 1)) {
			 contentUrl += '/';
		 }
		return contentUrl;
	}

	s7viewers.MixedMediaViewer.prototype.includeViewer = function () {
		s7sdk.Util.require("s7sdk.event.Event");
		s7sdk.Util.require("s7sdk.common.Button");
		s7sdk.Util.require('s7sdk.common.Container');
		s7sdk.Util.require("s7sdk.image.ZoomView");
		s7sdk.Util.require("s7sdk.set.SpinView");
		s7sdk.Util.require("s7sdk.set.MediaSet");
		s7sdk.Util.require("s7sdk.set.Swatches");
		s7sdk.Util.require("s7sdk.video.VideoControls");
		s7sdk.Util.require("s7sdk.video.VideoPlayer");
		s7sdk.Util.require("s7sdk.common.ControlBar");

        this.trackingManager = new s7sdk.TrackingManager(); // needs to be created first to track LOAD event
		
		var mixedMediaViewerLocalizedTexts = {
			"en":{
				"PanRightButton.TOOLTIP":"Spin East",			
				"PanLeftButton.TOOLTIP":"Spin West"
			},
			defaultLocale: "en"
		}		

		this.s7params = new s7sdk.ParameterManager(null,null,{"asset" : "MediaSet.asset"},this.getContentUrl()+"MixedMediaViewer_light.css");
		this.s7params.setViewer("505,$VERSION$");	 

		this.s7params.localizedTexts = mixedMediaViewerLocalizedTexts;

		for(var prm in this.params){
			if (prm != "localizedtexts"){
				this.s7params.push(prm, this.params[prm]);
			}else{
				this.s7params.setLocalizedTexts(this.params[prm]);
			}
		}

		this.container = null;
		this.zoomView = null;
		this.spinView = null;
		this.videoPlayer = null;
		this.activeView = null;

		this.toolbarContainer = null;
		this.zoomInButton = null;
		this.zoomOutButton = null;
		this.zoomResetButton = null;
		this.spinLeftButton = null;
		this.spinRightButton = null;
		this.fullScreenButton = null;
		this.videoFullScreenButton = null;

		this.videoControls = null;
		this.playPauseButton = null;
		this.videoScrubber = null;
		this.videoTime = null;
		this.mutableVolume = null;
		this.bcr_videoControls = null;
		this.bcr_playPauseButton = null;
		this.bcr_videoTime = null;
		this.bcr_videoScrubber = null;

		this.mediaSet = null; 
		this.s7mediasetDesc = null; 
		this.singleImage = null;

		this.colorSwatches = null; 
		this.currentColorSwatchesFrame = null;
		this.colorSwatchesActive = false;

		this.swatches = null; 
		this.currentSwatchesFrame = null;
		this.swatchesHeight = null;
		this.containerHeight = null;

		//visibility manager
		this.visibilityManagerZoom = null;
		this.visibilityManagerSpin = null;
		this.visibilityManagerVideo = null;

		//initial frame
		this.initialFrame = 0;

		
		this.container = document.getElementById(this.containerId);
		if (this.container.className != ""){
			if (this.container.className.indexOf(s7viewers.MixedMediaViewer.cssClassName) != -1){
				//
			}else{
				this.container.className += " "+s7viewers.MixedMediaViewer.cssClassName;
			}	
		}else{
			this.container.className = s7viewers.MixedMediaViewer.cssClassName;
		}
		
		var self = this;
		
		function initViewer(){
			self.s7params.push("Swatches.tmblayout", "0,1");
			self.s7params.push("tmblayout", "0,1");
			self.s7params.push("Swatches.textpos", "none");
			self.s7params.push("VideoPlayer.autoplay", "0");
			self.s7params.push("ZoomView.frametransition", "slide");


			
			if (s7sdk.browser.device.name == "desktop") self.s7params.push("ZoomView.singleclick", "zoomReset"); //singleclick and doubleclick for desktop have specific
			if (s7sdk.browser.device.name == "desktop") self.s7params.push("ZoomView.doubleclick", "reset");						
			if (s7sdk.browser.device.name == "desktop") self.s7params.push("SpinView.singleclick", "zoomReset"); //singleclick and doubleclick for desktop have specific
			if (s7sdk.browser.device.name == "desktop") self.s7params.push("SpinView.doubleclick", "reset");						
			if (s7sdk.browser.device.name != "desktop"){
				self.s7params.push("Swatches.enablescrollbuttons","0");	
			}			

			self.sdkContainer = new s7sdk.Container(self.containerId, self.s7params, self.containerId+"_container");
			self.containerHeight = self.sdkContainer.hei;

			self.swatches = new s7sdk.Swatches(self.containerId+"_container", self.s7params, self.containerId+"_swatches");
			self.swatchesHeight = self.swatches.size.height;
			self.trackingManager.attach(self.swatches);			

			self.zoomView = new s7sdk.ZoomView(self.containerId+"_container", self.s7params, self.containerId+"_zoomView");
			self.trackingManager.attach(self.zoomView);
			
			self.spinView = new s7sdk.SpinView(self.containerId+"_container", self.s7params, self.containerId+"_spinView");
			self.trackingManager.attach(self.spinView);

			self.toolbarContainer = document.createElement('div');
			self.toolbarContainer.className = "s7toolbarcontainer";
			self.toolbarContainer.setAttribute("id",self.containerId+"_toolbarContainer");
			self.toolbarContainer.style.position = "absolute";
			self.toolbarContainer.style.width= self.sdkContainer.wid + "px";
			self.toolbarContainer.style.top= self.containerHeight - self.swatchesHeight + "px";
			self.toolbarContainer.style.height = "0px";
			self.toolbarContainer.style.zIndex = "1";
			self.sdkContainer.obj.appendChild(self.toolbarContainer);


			// Create the VideoPlayer
			self.videoPlayer = new s7sdk.video.VideoPlayer(self.containerId+"_container", self.s7params, self.containerId + "_videoPlayer");
			self.trackingManager.attach(self.videoPlayer);
			// Create the ControlBar
			self.videoControls = new s7sdk.common.ControlBar(self.containerId+"_container", self.s7params, self.containerId + "_controls");
			self.bcr_videoControls = self.videoControls.obj.getBoundingClientRect();
			self.videoControlsHeight = self.bcr_videoControls.bottom - self.bcr_videoControls.top;
			self.videoControls.attachView(self.videoPlayer);
			// Create the PlayPauseButton
			self.playPauseButton = new s7sdk.common.PlayPauseButton(self.containerId + "_controls", self.s7params, self.containerId + "_playPauseButton");
			// Create the VideoScrubber
			self.videoScrubber = new s7sdk.video.VideoScrubber(self.containerId + "_controls", self.s7params, self.containerId + "_videoScrubber");
			// Create the VideoTime
			self.videoTime = new s7sdk.VideoTime(self.containerId + "_controls", self.s7params, self.containerId + "_videoTime");
			self.bcr_playPauseButton = self.playPauseButton.obj.getBoundingClientRect();
			self.bcr_videoTime = self.videoTime.obj.getBoundingClientRect();
			self.bcr_videoScrubber = self.videoScrubber.obj.getBoundingClientRect();

			// Create the MutableVolume
			self.mutableVolume = new s7sdk.video.MutableVolume(self.containerId + "_controls", self.s7params, self.containerId + "_mutableVolume");
			
			self.videoFullScreenButton = new s7sdk.common.FullScreenButton(self.containerId + "_controls", self.s7params, self.containerId + "_videofullScreenButton")

			self.supportsInline = self.videoPlayer.supportsInline();
			if(!self.supportsInline){
				// IF inline playback isn't available (iPhone, etc.), hide the controlbar.
				self.videoControls.obj.style.display = "none";
			}
			self.zoomInButton = new s7sdk.ZoomInButton(self.containerId+"_toolbarContainer", self.s7params, self.containerId+"_zoomInButton");
			self.zoomOutButton = new s7sdk.ZoomOutButton(self.containerId+"_toolbarContainer", self.s7params, self.containerId+"_zoomOutButton");
			self.zoomResetButton = new s7sdk.ZoomResetButton(self.containerId+"_toolbarContainer", self.s7params, self.containerId+"_zoomResetButton");

			//create container for SpinButtons
			self.divSpinButton = document.createElement('div');
			self.divSpinButton.setAttribute("id",self.containerId+"_divSpinButton");
			self.divSpinButton.className = "s7spinbuttons";
			self.divSpinButton.style.position = "absolute";
			self.divSpinButton.style.top = self.containerHeight - self.swatchesHeight + "px";
			self.sdkContainer.obj.appendChild(self.divSpinButton);
			self.spinLeftButton = new s7sdk.PanLeftButton(self.containerId+"_divSpinButton", self.s7params, self.containerId+"_spinLeftButton");
			self.spinRightButton = new s7sdk.PanRightButton(self.containerId+"_divSpinButton", self.s7params, self.containerId+"_spinRightButton");

			if ((self.s7params.get("closeButton", "0") == "1") || (self.s7params.get("closeButton", "0").toLowerCase() == "true")){
				self.closeButton = new s7sdk.common.CloseButton(self.containerId+"_container", self.s7params, self.containerId + "_closeButton");
				self.closeButton.addEventListener("click", closeWindow);
			}			

			//create container for ColorSwatches
			self.divColorSwatches = document.createElement('div');
			self.divColorSwatches.setAttribute("id",self.containerId+"_divColorSwatches");
			self.divColorSwatches.className = "s7colorswatches";
			self.divColorSwatches.style.position = "absolute";
			self.divColorSwatches.style.zIndex = "1";
			self.divColorSwatches.style.top = self.containerHeight - self.swatchesHeight + "px";
			self.sdkContainer.obj.appendChild(self.divColorSwatches);

			self.colorSwatches = new s7sdk.Swatches(self.containerId+"_divColorSwatches", self.s7params, self.containerId+"_colorSwatches");
			if (s7sdk.browser.device.name != "desktop"){
				self.colorSwatches.obj.style.pointerEvents = "none";
			}
			self.trackingManager.attach(self.colorSwatches);			

			self.fullScreenButton = new s7sdk.common.FullScreenButton(self.containerId+"_toolbarContainer", self.s7params, self.containerId + "_fullScreenButton")

			if (!self.sdkContainer.hasCustomSize && !self.sdkContainer.supportsNativeFullScreen()) {
				self.videoFullScreenButton.obj.style.display = "none";
				self.fullScreenButton.obj.style.display = "none";
			}
			
			//Initial preparation
			viewerPreparation();


			self.mediaSet = new s7sdk.MediaSet(null, self.s7params, self.containerId+"_mediaSet");
			self.trackingManager.attach(self.mediaSet);

			// ====================================== VisibilityManagers ====================================== //
			//Add VisibilityManager (for touch devices only)
			if (s7sdk.browser.device.name != "desktop") {
				self.visibilityManagerZoom = new s7sdk.VisibilityManager();
				self.visibilityManagerSpin = new s7sdk.VisibilityManager();
                self.visibilityManagerZoom.reference(self.zoomView);
                self.visibilityManagerSpin.reference(self.spinView);

				self.visibilityManagerZoom.attach(self.closeButton);
				self.visibilityManagerSpin.attach(self.closeButton);

				self.visibilityManagerZoom.attach(self.zoomInButton);
				self.visibilityManagerZoom.attach(self.zoomOutButton);
				self.visibilityManagerZoom.attach(self.zoomResetButton);
				if (self.sdkContainer.hasCustomSize || self.sdkContainer.supportsNativeFullScreen()) {
					self.visibilityManagerZoom.attach(self.fullScreenButton);
				}

				self.visibilityManagerSpin.attach(self.zoomInButton);
				self.visibilityManagerSpin.attach(self.zoomOutButton);
				self.visibilityManagerSpin.attach(self.zoomResetButton);
				self.visibilityManagerSpin.attach(self.spinLeftButton);
				self.visibilityManagerSpin.attach(self.spinRightButton);
				if (self.sdkContainer.hasCustomSize || self.sdkContainer.supportsNativeFullScreen()) {
					self.visibilityManagerSpin.attach(self.fullScreenButton);
				}

				self.visibilityManagerZoom.attach(self.colorSwatches);
				self.visibilityManagerZoom.attach(self.swatches);
				self.visibilityManagerSpin.attach(self.swatches);
				
				// IF inline playback isn't available (iPhone, etc.), do not create VisibilityManager for VideoPlayer.
				if (self.supportsInline) {
					self.visibilityManagerVideo = new s7sdk.VisibilityManager();
					self.visibilityManagerVideo.reference(self.videoPlayer);
					self.visibilityManagerVideo.attach(self.closeButton);
					self.visibilityManagerVideo.attach(self.videoControls);
					self.visibilityManagerVideo.attach(self.swatches);					
				}
			}		
			// ====================================== Event Listeners ====================================== //
			// Add Swatches event listeners
			self.swatches.addEventListener(s7sdk.AssetEvent.SWATCH_SELECTED_EVENT, swatchSelected, false); 
			// Add ColorSwatches event listeners
			self.colorSwatches.addEventListener(s7sdk.AssetEvent.SWATCH_SELECTED_EVENT, colorSwatchSelected, false); 
			// Add MediaSet event listeners
			self.mediaSet.addEventListener(s7sdk.AssetEvent.NOTF_SET_PARSED, onSetParsed, false);
			// Add Container event listeners
			self.sdkContainer.addEventListener(s7sdk.event.ResizeEvent.COMPONENT_RESIZE, onContainerResize,false);
			self.sdkContainer.addEventListener(s7sdk.event.ResizeEvent.FULLSCREEN_RESIZE, onContainerFullScreen,false);	

			// Add ZoomInButton event listeners
			self.zoomInButton.addEventListener("click", onZoomInClick, false);
			// Add ZoomOutButton event listeners
			self.zoomOutButton.addEventListener("click", onZoomOutClick, false);
			// Add ZoomResetButton event listeners
			self.zoomResetButton.addEventListener("click",onZoomResetClick, false);	

			// Add SpinLeftButton event listeners
			self.spinLeftButton.addEventListener("click", onSpinLeftButtonClick, false);
			// Add SpinRightButton event listeners
			self.spinRightButton.addEventListener("click", onSpinRightButtonClick, false);

			// Add FullScreenButton event listeners
			self.fullScreenButton.addEventListener("click", onFullScreenButtonClick);
			// Add VideoFullScreenButton event listeners
			self.videoFullScreenButton.addEventListener("click", onFullScreenButtonClick);

			// Add event listener for swipe image
			self.zoomView.addEventListener(s7sdk.event.AssetEvent.ASSET_CHANGED, onImageChanged, false);

			// Add buttons event listener (change states)
			self.zoomView.addEventListener(s7sdk.event.CapabilityStateEvent.NOTF_ZOOM_CAPABILITY_STATE,onChangeZoomState, false);				
			self.spinView.addEventListener(s7sdk.event.CapabilityStateEvent.NOTF_SPIN_CAPABILITY_STATE,onChangeZoomState, false);				

			// Add VideoPlayer event listeners
			self.videoPlayer.addEventListener(s7sdk.event.CapabilityStateEvent.NOTF_VIDEO_CAPABILITY_STATE, onVideoCapabilityStateChange, false);
			self.videoPlayer.addEventListener(s7sdk.event.VideoEvent.NOTF_DURATION, onVideoDuration, false);
			self.videoPlayer.addEventListener(s7sdk.event.VideoEvent.NOTF_LOAD_PROGRESS, onVideoLoadProgress, false);
			self.videoPlayer.addEventListener(s7sdk.event.VideoEvent.NOTF_CURRENT_TIME, onVideoCurrentTime, false);
			// Add PlayPauseButton event listeners
			self.playPauseButton.addEventListener("click", onPlayPauseButtonClick);
			// Add VideoScrubber event listeners
			self.videoScrubber.addEventListener(s7sdk.SliderEvent.NOTF_SLIDER_UP, onNotifyScrubberEvent, false);
			// Add MutableVolume event listeners
			self.mutableVolume.addEventListener("click", onMuteButtonClick);
			self.mutableVolume.addEventListener(s7sdk.SliderEvent.NOTF_SLIDER_DOWN, onVolumeDown, false);
			self.mutableVolume.addEventListener(s7sdk.SliderEvent.NOTF_SLIDER_MOVE, onVolumeMove, false);
			self.mutableVolume.addEventListener(s7sdk.SliderEvent.NOTF_SLIDER_UP, onVolumeMove, false);

			if (("onorientationchange" in window) && s7sdk.browser.device != "") {
				window.addEventListener("orientationchange", onOrientationChange); 
			}

			// ====================================== Event Handlers ====================================== //
			function onOrientationChange(event){
				/////
			}
			
			function onChangeZoomState(stateEvent){
				if (stateEvent.s7event.state.hasCapability(s7sdk.ZoomCapabilityState.ZOOM_IN))
					self.zoomInButton.activate();
				else
					self.zoomInButton.deactivate();
					
				if (stateEvent.s7event.state.hasCapability(s7sdk.ZoomCapabilityState.ZOOM_OUT))
					self.zoomOutButton.activate();
				else
					self.zoomOutButton.deactivate();						
						
				if (stateEvent.s7event.state.hasCapability(s7sdk.ZoomCapabilityState.ZOOM_RESET)){
					if (s7sdk.Util.getStyle(self.zoomInButton.obj,"visibility") == "hidden") self.zoomResetButton.obj.style.visibility = "inherit";
					self.zoomResetButton.activate();
				}
				else {
					if (s7sdk.Util.getStyle(self.zoomInButton.obj,"visibility") == "hidden") self.zoomResetButton.obj.style.visibility = "hidden";

					self.zoomResetButton.deactivate();										
				}										
			}

			function onZoomInClick(){
				if(self.activeView && (self.activeView.cl == "s7zoomview" || self.activeView.cl == "s7spinview")){
					self.activeView.zoomIn();
				}
			}
			function onZoomOutClick(){
				if(self.activeView && (self.activeView.cl == "s7zoomview" || self.activeView.cl == "s7spinview")){
					self.activeView.zoomOut();
				}
			}
			function onSpinLeftButtonClick(){
				if(self.activeView && self.activeView.cl == "s7spinview"){
					self.activeView.moveFrame(s7sdk.Enum.SPIN_DIRECTION.WEST);
				}
			}
			function onSpinRightButtonClick(){
				if(self.activeView && self.activeView.cl == "s7spinview"){
					self.activeView.moveFrame(s7sdk.Enum.SPIN_DIRECTION.EAST);
				}
			}
			function onZoomResetClick(){
				if(self.activeView && (self.activeView.cl == "s7zoomview" || self.activeView.cl == "s7spinview")){
					self.activeView.zoomReset();
				}
			}

			function onSetParsed(e) {
				self.s7mediasetDesc = e.s7event.asset;
				self.currentSwatchesFrame = null;
				self.initialFrame = Math.max(0,parseInt((typeof(self.s7params.get('initialframe')) != 'undefined') ? self.s7params.get('initialframe') : 0));
				if (self.initialFrame < self.s7mediasetDesc.items.length){
					//
				}else{
					self.initialFrame = 0;
				}
				if(self.s7mediasetDesc.items.length == 1) {
					self.singleImage = true;
					self.swatches.obj.style.visibility = "hidden";
					self.swatches.setMediaSet(self.s7mediasetDesc);
					self.swatches.selectSwatch(0, true);			
					if(self.sdkContainer.hasCustomSize){
						//self.sdkContainer.resize (self.sdkContainer.wid, self.containerHeight - self.swatchesHeight);
					}
					else {
						//self.sdkContainer.resize (self.sdkContainer.wid, self.containerHeight);
					}
				}
				else {
					self.singleImage = false;
					self.swatches.setMediaSet(self.s7mediasetDesc);
					self.swatches.selectSwatch(self.initialFrame, true);			
					self.swatches.obj.style.visibility = "inherit";
					//self.sdkContainer.resize (self.sdkContainer.wid, self.containerHeight);
				}
			}

			// FullScreenButtons Event Handlers
			function onFullScreenButtonClick() { 
				if (!self.sdkContainer.isFullScreen()){
					if(self.closeButton){
						self.closeButton.obj.style.display = "none";
					}
					self.sdkContainer.requestFullScreen();
				}
				else {
					if(self.closeButton){
						self.closeButton.obj.style.display = "block";
					}
					self.sdkContainer.cancelFullScreen();
				}					
			}				
			
			//Container Resize handler
			function onContainerResize(event) {
				if((typeof(event.target) == 'undefined') || (event.target == self.sdkContainer.obj)) {
					var hei = event.s7event.h;
					if(self.sdkContainer.hasCustomSize){
						if (self.singleImage){
							hei = event.s7event.h;
						}
						else hei = Math.max(event.s7event.h - self.swatchesHeight,1);
					}
					else {
						if (!self.singleImage) hei = Math.max(event.s7event.h - self.swatchesHeight,1);
					}

					if(self.closeButton){
						if(self.sdkContainer.isFullScreen()) {
							self.closeButton.obj.style.display = "none";
						}else{
							self.closeButton.obj.style.display = "block";
						}
					}
					self.toolbarContainer.style.top = hei + "px";
					self.toolbarContainer.style.width = event.s7event.w + "px";
					self.divColorSwatches.style.top = hei + "px";
					self.divColorSwatches.style.left = parseInt(event.s7event.w / 2 - self.colorSwatches.obj.getWidth()/2) + "px";
					self.divSpinButton.style.top = hei + "px";

					self.videoControls.obj.style.top = hei - self.videoControlsHeight+"px";
					self.videoControls.obj.style.width = event.s7event.w + "px";

					var bcr_playPauseButton = self.playPauseButton.obj.getBoundingClientRect();
					var bcr_videoTime = self.videoTime.obj.getBoundingClientRect();
					var bcr_videoScrubber = self.videoScrubber.obj.getBoundingClientRect();
					self.videoScrubber.resize(bcr_videoTime.left - bcr_playPauseButton.right - 10, (bcr_videoScrubber.bottom - bcr_videoScrubber.top));

					self.zoomView.resize($(self.container).width(), $(self.container).height());
					if (s7sdk.browser.device.name != "desktop") {
						//self.zoomView.resize(event.s7event.w, event.s7event.h);
						self.spinView.resize(event.s7event.w, event.s7event.h);
						self.videoPlayer.resize(event.s7event.w, event.s7event.h);
					}else{
						//self.zoomView.resize(event.s7event.w, hei);
						self.spinView.resize(event.s7event.w, hei);
						//self.videoPlayer.resize(event.s7event.w, hei);
					}
					self.swatches.resize(event.s7event.w, self.swatchesHeight);				
				}
			}
			
			//Container FullScreen Resize handler
			function onContainerFullScreen(event) {
				if(self.closeButton){
					if(self.sdkContainer.isFullScreen()) {
						self.closeButton.obj.style.display = "none";
					}else{
						self.closeButton.obj.style.display = "block";
					}
				}
				self.fullScreenButton.setSelected(self.sdkContainer.isFullScreen());
				self.videoFullScreenButton.setSelected(self.sdkContainer.isFullScreen());
			}
			
			// VideoPlayer Event Handlers
			function onVideoCapabilityStateChange(event){
				self.playPauseButton.setSelected(event.s7event.state.hasCapability(s7sdk.VideoCapabilityState.PLAY));				
			}
			function onVideoDuration(event){
				self.videoTime.setDuration(event.s7event.data);					
				self.videoScrubber.setDuration(event.s7event.data);
			}
			function onVideoLoadProgress(event){
				self.videoScrubber.setLoadedPosition(event.s7event.data);
			}
			function onVideoCurrentTime(event){
				self.videoTime.setPlayedTime(event.s7event.data);
				self.videoScrubber.setPlayedTime(event.s7event.data);
			}
			// PlayPauseButton Event handlers
			function onPlayPauseButtonClick(event) { 
				if (!self.playPauseButton.isSelected()) {
					// IF the video is over, restart from the beginning
					var rem = self.videoPlayer.getDuration() - self.videoPlayer.getCurrentTime();	// Time remaining
					if (rem <= 1){
						self.videoPlayer.seek(0);
					}
					self.videoPlayer.play();
				}
				else {
					self.videoPlayer.pause();
				}
			}
			// VideoScrubber Event Handlers
			function onNotifyScrubberEvent(event) {
				self.videoPlayer.seek(event.s7event.position * self.videoPlayer.getDuration());
			}
			// MutableVolume Event Handlers
			function onMuteButtonClick(event) {
				if(self.mutableVolume.isSelected()){
                    self.videoPlayer.mute();
                }else{
                    self.videoPlayer.unmute();
					self.videoPlayer.setVolume(self.mutableVolume.getPosition());
                }
			}
			function onVolumeDown(event){
				self.videoPlayer.unmute();	// Make sure the player isn't muted as soon as the user start to change volume
			}
			function onVolumeMove(event){
				self.videoPlayer.setVolume(event.s7event.position);
			}

			function showHide(element,show) { 
				if (element && element.style){
					if (!show){
						element.style.position = 'absolute';
						element.style.left = '-99999px';
					}else{
						element.style.left = '0px';
					}
				}
			}

			function viewerPreparation() { 
				self.zoomView.obj.style.display="none";
				self.spinView.obj.style.display="none";
				self.spinLeftButton.obj.style.display="none";
				self.spinRightButton.obj.style.display="none";
				self.toolbarContainer.style.display="none";
				self.videoPlayer.stop();
				self.videoControls.obj.style.visibility="hidden";//display="none";
				showHide(self.videoPlayer.obj,false);
				self.colorSwatches.hide();
				self.colorSwatchesActive = false;
				self.currentColorSwatchesFrame = null;
			}

			function swatchSelected(e) { 
				var asset = e.s7event.asset;
				if(self.currentSwatchesFrame != e.s7event.frame){
					viewerPreparation();

					switch(asset.type){
					case s7sdk.ItemDescType.IMG:
						if(self.zoomView){
							self.activeView = self.zoomView;
						
							var mediaDsc = new s7sdk.MediaSetDesc();
							var imgDsc = new s7sdk.ImageDesc(
										mediaDsc,
										asset.type,asset.name,
										asset.swatch,
										asset.width,asset.height,asset.version,asset.isDefault,asset.mod,asset.pmod,asset.label,null,null,null,
										(asset.maps && asset.maps.length) ? true:false,
										false,true
									);
							mediaDsc.items.push(imgDsc);
							self.zoomView.setItem(imgDsc);
							if (self.visibilityManagerZoom){
								self.visibilityManagerZoom.detach(self.colorSwatches);
							}
							self.zoomView.obj.style.display="block";
							self.toolbarContainer.style.display="block";
						}
						break;
					case s7sdk.ItemDescType.IMAGE_SET:
						if(self.zoomView){
							self.activeView = self.zoomView;
							self.colorSwatchesActive = true;
							if (self.visibilityManagerZoom){
								self.visibilityManagerZoom.attach(self.colorSwatches);
							}
							self.colorSwatches.show();
							self.colorSwatches.setMediaSet(asset);
							self.colorSwatches.selectSwatch(0, false);
							self.zoomView.obj.style.display="block";
							self.toolbarContainer.style.display="block";
						}
						break;
					case s7sdk.ItemDescType.SPIN_SET:
						if(self.spinView){
							self.activeView = self.spinView;
							self.spinLeftButton.obj.style.display="block";
							self.spinRightButton.obj.style.display="block";
							self.spinView.setMediaSet(asset);
							self.spinView.obj.style.display="block";
							self.toolbarContainer.style.display="block";
						}
						break;
					case s7sdk.ItemDescType.VIDEO:
						if(self.videoPlayer){
							self.activeView = self.videoPlayer;
							self.videoPlayer.setItem(asset);
							self.videoControls.obj.style.visibility="inherit";
							showHide(self.videoPlayer.obj,true);
						}
						break;
					case s7sdk.ItemDescType.VIDEO_SET:
						if(self.videoPlayer){
							self.activeView = self.videoPlayer;
							self.videoPlayer.setItem(asset);
							self.videoControls.obj.style.visibility="inherit";
							showHide(self.videoPlayer.obj,true);
						}
						break;
					default:
						break;
					}
				}
				self.currentSwatchesFrame = e.s7event.frame;
			}
	
			function colorSwatchSelected(e) { 
				var asset = e.s7event.asset;
					if(self.activeView && (self.activeView.cl == "s7zoomview")){
						if(self.activeView){
							self.activeView.setItem(asset);
							var directNega = false;
							var curIdx = $('#gallery-panel .thumbnail.current').attr('scene-index');

							$('#gallery-panel .thumbnail.current').removeClass('current');
							$('#gallery-panel .thumbnail[gallery-index=' + e.s7event.asset.swatch.frame + ']').addClass('current');


							$('.gallery-video.be').hide();
							$('.gallery-video.yt').hide();
							//
							var currentAsset = $('#gallery-panel .thumbnail[gallery-index=' + e.s7event.asset.swatch.frame + ']');//$('#gallery-panel .asset.current');
							if ( $('#gallery-panel .thumbnail.current').attr('gallery-type') == 'be' ) {
								$('.gallery-video.be').show();
                                try{
                                    var beVideo = brightcove.api.getExperience('videoBE').getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
                                    beVideo.cueVideoByID(currentAsset.attr('data-video-id'));
                                    beVideo.pause();
                                }catch(e){

                                }
							}
							else if ( $('#gallery-panel .thumbnail.current').attr('gallery-type') == 'yt' ) {
								$('.gallery-video.yt').show();
								var ytVideo = $('#firstYT').parent()[0].player;
								ytVideo.cueVideoById(currentAsset.attr('data-video-id'));
								ytVideo.pauseVideo();
							}
							//
							if ( curIdx == e.s7event.asset.swatch.frame ) {
								return;
							}
							else if ( parseInt(curIdx) > parseInt(e.s7event.asset.swatch.frame) ) {
								directNega = true;
							}
							
							if ( directNega ) {
								if ( window.galleryArrowPrev )
									window.galleryArrowPrev();
							}
							else {
								if ( window.galleryArrowNext)
									window.galleryArrowNext();
							}
						}
					}

			}

			function onImageChanged(e) {
				if (self.colorSwatches && self.colorSwatchesActive && e.s7event.frame != self.colorSwatches.getFrame()){
					self.currentColorSwatchesFrame = e.s7event.frame; 
					self.colorSwatches.selectSwatch(e.s7event.frame, true);
				}
			}

			function closeWindow() {
				try{
					if(s7sdk.browser.name != "firefox") {
						window.open(self.getContentUrl() + "s7sdkclose.html","_self"); //workaround for close self window with JS
					} else {
						window.close(); // Firefox does not allow workaround so we fall back to window.close to cover pop-up case
					} 
				}
				catch(e){
					s7sdk.Logger.log(s7sdk.Logger.WARN,"Cannot close the window");
				}
			}			
		}

		this.s7params.addEventListener(s7sdk.Event.SDK_READY,function(){
												self.initSiteCatalyst(self.s7params,initViewer);
										},false);
		this.s7params.init();
	};

	
	s7viewers.MixedMediaViewer.prototype.setParam = function(key, def){
		this.params[key] = def;	
	}

	s7viewers.MixedMediaViewer.prototype.setParams = function(inParams){
		var params = inParams.split("&");
		for (var i = 0; i < params.length; i++) {
			var pair = params[i].split("=");
			if (pair.length > 1) {
				this.setParam(pair[0],decodeURIComponent(params[i].split("=")[1]));
			}
		}
	}
	
	s7viewers.MixedMediaViewer.prototype.s7sdkUtilsAvailable = function(){
		return (typeof s7sdk != "undefined");
	};

	s7viewers.MixedMediaViewer.prototype.init = function(){
		var s7sdkUtilsAddedToDOM = false;
		var utilSrcPath = this.getDomain(this.getContentUrl()) + this.sdkBasePath + "js/s7sdk/utils/Utils.js";
		var allScripts = null;
		if (document.scripts){
			allScripts = document.scripts;
		}else{
			allScripts = document.getElementsByTagName("script");
		}
		for (var i=0; i<allScripts.length; i++){ 
			if (allScripts[i] && allScripts[i].getAttribute("src")!=null && allScripts[i].getAttribute("src").indexOf(utilSrcPath)!=-1){
				s7sdkUtilsAddedToDOM = true;
				break;
			}
		}

		if (this.s7sdkUtilsAvailable()){
			s7sdk.Util.init(); 
			this.includeViewer(); 
			this.initializationComplete = true; 
		}else if (!this.s7sdkUtilsAvailable() && s7sdkUtilsAddedToDOM) {
			var selfRef = this;
			var utilsWaitId = setInterval(
				function() {
					if (selfRef.s7sdkUtilsAvailable()) {
						clearInterval(utilsWaitId);
						s7sdk.Util.init(); 
						selfRef.includeViewer();
						selfRef.initializationComplete = true;  
					}
				}, 100
			);
		}else{
			var elem = document.createElement("script");
			elem.setAttribute("language", "javascript");
			elem.setAttribute("type", "text/javascript");
			elem.setAttribute("src", utilSrcPath);

			var elems = document.getElementsByTagName("head");
			var self = this;
			elem.onload = elem.onerror = function() {  
				if (!this.executed) { 
					this.executed = true;  
					if (self.s7sdkUtilsAvailable() && s7sdk.Util){
						s7sdk.Util.init(); 
						self.includeViewer();  
						self.initializationComplete = true;
					}
				}  
			};  

			elem.onreadystatechange = function() {  
				var self = this;  
				if (this.readyState == "complete" || this.readyState == "loaded") {  
					setTimeout(function() { 
						self.onload(); 
						self.onreadystatechange = null
					}, 0);
				}  
			};
			elems[0].appendChild(elem);
		}
	}
			
	s7viewers.MixedMediaViewer.prototype.getDomain = function(inUrl) {
		var res = /(^http[s]?:\/\/[^\/]+)/i.exec(inUrl);
		if (res == null) {
			return '';
		} else {
			return res[1];
		}
	}

	s7viewers.MixedMediaViewer.prototype.setAsset = function(inAsset) {
		if (this.mediaSet){
			this.mediaSet.setAsset(inAsset);
		}else{
			this.setParam("asset", inAsset);
		}
	}
	
	s7viewers.MixedMediaViewer.prototype.setLocalizedTexts = function(inText) {
		if (this.s7params){
			this.s7params.setLocalizedTexts(inText);
		}else{
			this.setParam("localizedtexts", inText);
		}
	}

	s7viewers.MixedMediaViewer.prototype.initSiteCatalyst = function(params,inCallback) {
			//integrate SiteCatalyst logging
			//strip modifier from asset and take the very first entry from the image list, and the first element in combination from that entry

			if ( typeof(params.get("asset", null, "MediaSet"))=='object') {
				if (typeof inCallback == "function"){
					inCallback();
				}
			}
			else {
				var siteCatalystAsset = params.get("asset", null, "MediaSet").split(',')[0].split(':')[0];
				var isConfig2Exist = false;
				if (siteCatalystAsset.indexOf('/') != -1) {
					var company = siteCatalystAsset.split('/')[0];
					var config2 = params.get("config2");
					isConfig2Exist = (config2 != '' && typeof config2 != "undefined");
					if (isConfig2Exist){
						// s7ComponentEvent function handles all the output from the SDK viewers.  The user can directly access
						// the tracking events if lower level control is desired - see UserEvent documentation.  
						//
						window.s7ComponentEvent = function s7ComponentEvent(objID, compClass, instName, timeStamp, eventData) {
							if (typeof s7track == "function"){
								s7track(eventData);
							}
						}

						var jsp_src =this.getContentUrl()+'../s_code.jsp?company=' + company + (config2 == '' ? '' : '&preset=' + config2);
						var elem = document.createElement("script");
						elem.setAttribute("language", "javascript");
						elem.setAttribute("type", "text/javascript");
						elem.setAttribute("src", jsp_src);

						var elems = document.getElementsByTagName("head");
						var self = this;
						elem.onload = elem.onerror = function() {  
							if (!this.executed) { 
								this.executed = true;  
								if (typeof inCallback == "function"){
									inCallback();
								}
							}  
						};  

						elem.onreadystatechange = function() {  
							var self = this;  
							if (this.readyState == "complete" || this.readyState == "loaded") {  
								setTimeout(function() { 
									self.onload(); 
									self.onreadystatechange = null
								}, 0);
							}  
						};
						elems[0].appendChild(elem);
					}else{
						if (typeof inCallback == "function"){
							inCallback();
						}
					}	
				}
			}
	}
}
