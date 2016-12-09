/**
 * samsung.com - Country Messages Script
 * src : country/common/js/src/smg/messages/smg.messages.js
 * 
 * @version 1.0.0
 * @since 2015.09.22
 * @requires
 * 	jQuery
 * 	namespace.js
 * 	smg.static.js
 * 	smg.util.js
 * @update
 */
;(function(win, $) {
	'use strict';

	if('undefined' === typeof win.smg) {
		/**
		 * @global
		 */
		win.smg = {};
	}

	if('undefined' === typeof win.smg.messages) {
		/**
		 * @namespace
		 */
		win.smg.messages = {};
	}

	// Static Values
	var STATIC = win.smg.static,
	// Utility Script
	UTIL = win.smg.util;

	win.smg.messages = {
		'OPEN_SUB_MENU' : {
			'description': 'Navagation Open sub menu',
			'message': '메뉴 열기'
		},
		'CLOSE_SUB_MENU' : {
			'description': 'Navagation Close sub menu',
			'message': '메뉴 닫기'
		}
	};
	
	$(function() {
		STATIC.MESSAGE = UTIL.def(STATIC.MESSAGE, (win.smg.messages || {}));
	});

})(window, jQuery);