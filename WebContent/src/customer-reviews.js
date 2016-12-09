var ss = $;

/** -- FILE: customer-reviews.js -- **/
/**
Page object for the customer-reviews component.

@module Main
@submodule customer-reviews.js
@main Main
@ver.0.9
**/
/*global window, document, setInterval, clearInterval, Modernizr, eventBridge, eventDictionary, setTimeout, clearTimeout, console, Math, setHeroSize */
(function($) {

    /**
    @class $.PDPSecReview
    @constructor
    **/
    ss.PDPSecReview = function(params) {
        var $window = $(window);
        var $body = $(document);
        var $currentReviewPopup;
        var $currentReviewPopupContainer;
        var $currentReviewContents;
        var $countChar;
        var $countCharTitle;
        var $myReview;
        var $reviewTitle;
        var $rating;
        var $dummyPopupContainer = $("#dummy-popup-container");
        var $ratingContent = $(".ratings-content");
        var $reviewList = $(".store-review-list");
        var $btnHelpful = $(".helpful-section .click-thumb a");
        var $txaReport = $(".store-review .input-area textarea");
        var $btnAddReportAbuse = $(".store-review .input-area .btn-sec-01");
        var $btnCancelReportAbuse = $(".store-review .input-area .btn-sec-02");
        var $btnShowMore = $(".show-more");
        var $btnReportAbuse = $(".btn-report-abuse");
        var $btnRatings = $(".ratings-button");
        var $btnUpdate = $(".update-review-button");
        var $btnDelete = $(".delete-review-button");
        var $sortTab = $(".customer-review-sort a");
        var titleMaxLength = 50;
        var reviewMinLength = 50;
        var reviewMaxLength = 2000;
        var abuseMaxLength = 2000;
        var productCode = $("#modelCode").val();
        var userReviewId;
        var isUpdate = false;
        var isLogin = false;
        var key = "";

        function init() {
            loginCheck();
            initHelpful();
            initReport();
            bindEvent();
        }

        function loginCheck() {
            ss.Auth.checkSignIn(function(loginChk) {
                if (loginChk) {
                    isLogin = true;
                }
            }, false, false);
        }

        // Init helpful
        function initHelpful() {
            $btnHelpful.each(function() {
                var $this = $(this);
                if ($this.hasClass("on")) {
                    $this.parent().addClass("selected");
                }
            });

            $btnHelpful.each(function(i) {
                var key = "btn-helperful-" + i;
                $(this).attr("data-selector", "." + key).addClass(key);
            });
        }

        // Init report
        function initReport() {
            $btnAddReportAbuse.each(function(i, target) {
                var $target = $(target);
                $target.data("input", $target.parents(".store-review").find("textarea"));
                $target.data("toggle", $target.parents(".store-review").find(".btn-report-abuse"));

                var key = "insert-btn-" + i;
                $(this).addClass(key);
            });

            $btnCancelReportAbuse.each(function(i, target) {
                var $target = $(target);
                $target.data("input", $target.parents(".store-review").find("textarea"));
                $target.data("toggle", $target.parents(".store-review").find(".btn-report-abuse"));

                var key = "cancel-btn-" + i;
                $(this).addClass(key);
            });

            $txaReport.each(function(i, target){
                var $target = $(target);
                $target.data("count", $target.siblings(".count-char").find(".enter"));
                $target.on("change keyup paste", function(){
                    $(this).data("count").text(this.value.length);
                })
            });
        }

        // Bind event
        function bindEvent() {
            $btnHelpful.unbind("click");
            $btnShowMore.unbind("click");
            $btnReportAbuse.unbind("click");
            $btnAddReportAbuse.unbind("click");
            $btnCancelReportAbuse.unbind("click");
            $sortTab.unbind(ss.clickEvent);
            $btnRatings.unbind("click");
            $btnUpdate.unbind("click");
            $btnDelete.unbind("click");

            // Helpful / UnHelpful Button
            $btnHelpful.on("click", function(event) {
                if (isLogin) {
                    var $this = $(this);
                    var $parent = $this.parent();
                    if (!$parent.hasClass("selected")) {
                        $this.addClass("on");
                        $parent.addClass("selected");
                        if ($this.find(".icon-thumbsup").length > 0) {
                            iLike($this);
                        } else if ($this.find(".icon-thumbsdown").length > 0) {
                            iHate($this);
                        }
                    } else {
                        showReviewAlert($this.attr("data-selector"), 2);
                    }
                } else {
                    ss.Auth.popupLoginLayer();
                }
            });

            // ShowMore toggle
            $btnShowMore.on("click", function() {
                var $toggler = $(this),
                    args = {
                        content: $toggler.data("content"),
                        afterText: $toggler.data("after-text"),
                        currText: $toggler.data("text"),
                        autoScroll: $toggler.data("autoscroll")
                    },
                    toggleView = new ss.Toggle($toggler, args);
                toggleView.action();
            });

            // ReportAbuse toggle
            $btnReportAbuse.on("click", function() {
                if (isLogin) {
                    var $toggler = $(this),
                        args = {
                            content: $toggler.data("content"),
                            afterText: $toggler.data("after-text"),
                            currText: $toggler.data("text"),
                            autoScroll: $toggler.data("autoscroll")
                        },
                        toggleView = new ss.Toggle($toggler, args);

                    toggleView.action();
                } else {
                    ss.Auth.popupLoginLayer();
                }
            });

            // ReportAbuse Add Button
            $btnAddReportAbuse.on("click", function() {
                var $this = $(this);
                if (validateReport($this, $btnAddReportAbuse.index($this))) {
                    addReportAbuse($this, $btnAddReportAbuse.index($this));
                }
            });

            // ReviewAbuse cancle Button
            $btnCancelReportAbuse.on("click", function() {
                var $this = $(this);
                cancleReviewAbuse($this, $btnCancelReportAbuse.index($this));
            });

            // Sort tab
            $sortTab.on(ss.clickEvent, function() {
                setSortItem($(".customer-review-sort"), $(this))
            });

            // Review Insert Button
            $btnRatings.on("click", function() {
                var $this = $(this);
                var isblocked = $this.attr("isblocked");
                var isBuyProductYn = $this.attr("isBuyProductYn");
                if (isLogin) {
                    if (isblocked == 'Y') {
                        showReviewAlert(".store-review-list", 24);
                    } else if (isBuyProductYn == 'Y') {
                        isUpdate = false;
                        addReviewAlert(".ratings-button", $ratingContent.html());
                        bindReviewEvent();
                        showInput(null);
                    } else {
                        showReviewAlert(".store-review-list", 1);
                    }
                } else {
                    ss.Auth.popupLoginLayer();
                }
            });

            // Review Update Button
            $btnUpdate.on("click", function() {
                if (isLogin) {
                    isUpdate = true;
                    addReviewAlert(".update-review-button", $ratingContent.html());
                    bindReviewEvent();
                    estore.getMyReview({
                        productCode: productCode
                    }, function(data) {
                        showInput(data.review);
                    });
                } else {
                    ss.Auth.popupLoginLayer();
                }
            });

            // Review Delete Button
            $btnDelete.on("click", function() {
                if (isLogin) {
                    showReviewAlert(".delete-review-button", 10);

                    // ReviewDeletePopup Delete Button
                    $dummyPopupContainer.on("click", ".delete-review-confirm-button", function() {
                        deleteReview();
                    });

                    estore.getMyReview({
                        productCode: productCode
                    }, function(data) {
                        userReviewId = data.review.reviewId;
                    });
                } else {
                    ss.Auth.popupLoginLayer();
                }
            });
        }

        function bindReviewEvent() {
            // Rating click
            $dummyPopupContainer.on("click", ".icoStarBox span", function() {
                var $this = $(this);
                ratingCheck($this);
            });

            // Rating keydown
            $dummyPopupContainer.on("keydown", ".icoStarBox span", function(event) {
                if (event.keyCode === 13) {
                    var $this = $(this);
                    ratingCheck($this);
                }
            });

            // Title count
            $dummyPopupContainer.on("change keyup paste", "#y_summary", function(event) {
                $countCharTitle.text(this.value.length);
            });

            // Review count
            $dummyPopupContainer.on("change keyup paste", "#y_contents", function(event) {
                $countChar.text(this.value.length);
            });

            // ReviewPopup Insert/Update Button
            $dummyPopupContainer.on("click", ".btn-insert-review", function() {
                if (validateReview($dummyPopupContainer)) {
                    insertReview();
                }
            });

            // ReviewPopup Cancel Button
            $dummyPopupContainer.on("click", ".btn-cancel-review", function() {
                if (confirm(pdpMsg.reviewCancel)) {
                    hideReviewAlert();
                }
            });
        }

        function setSortItem(list, item) {
            var $sortButton = list.siblings(".sort-button");
            list.find("a.selected").removeClass("selected");
            item.addClass("selected");
            //$sortButton.filter(".sort-button-text").html(item.text());
			$("span").filter(".sort-button-text").html(item.text());
			console.log(item.text());
            $sortButton.click().focus();

            var filterType = item.attr("data-filter-type");
        }

        function validateReport(target, index) {
            var textarea = target.parents(".input-area").find("textarea");
            var content = textarea.val();
            if (content == null || content == "") {
                textarea.attr("placeholder", pdpMsg.abuseText);
                return false;
            } else if (content.length > abuseMaxLength) {
                showReviewAlert(".store-review .insert-btn-" + (index), 25);
                return false;
            }
            return true;
        }

        function validateReview(container) {
            var title = $reviewTitle.val();
            var review = $myReview.val();
            if (title == null || title == "") {
                alert(pdpMsg.validateTitle);
                return false;
            } else if (review == null || review == "") {
                alert(pdpMsg.validateReview);
                return false;
            }else if(title.length > titleMaxLength){
                alert(pdpMsg.validateTitleLengthMax);
                return false;
            } else if (review.length < reviewMinLength) {
                alert(pdpMsg.validateReviewLengthMin);
                return false;
            } else if (review.length > reviewMaxLength) {
                alert(pdpMsg.validateReviewLengthMax);
                return false;
            }
            return true;
        }

        function ratingCheck(target) {
            var rating = target.attr("rating");
            var $starDiv = target.parent().parent();
            var $ratingDiv = target.parent();
            var $ratingText = target.parent().parent().find(".fl");
            $ratingDiv.find("span").each(function() {
                (rating >= $(this).attr("rating") ? $(this).addClass("on").removeClass("off") : $(this).addClass("off").removeClass("on"));
            });
            target.parent().attr("rating", rating);

            $ratingDiv = $ratingDiv.detach();
            $starDiv.find("p:eq(1)").before($ratingDiv);

            switch (rating) {
                case '1':
                    $ratingText.text(pdpMsg.poor);
                    $ratingDiv.find("span:eq(0)").focus();
                    break;
                case '2':
                    $ratingText.text(pdpMsg.fair);
                    $ratingDiv.find("span:eq(1)").focus();
                    break;
                case '3':
                    $ratingText.text(pdpMsg.average);
                    $ratingDiv.find("span:eq(2)").focus();
                    break;
                case '4':
                    $ratingText.text(pdpMsg.good);
                    $ratingDiv.find("span:eq(3)").focus();
                    break;
                case '5':
                    $ratingText.text(pdpMsg.excellent);
                    $ratingDiv.find("span:eq(4)").focus();
                    break;
                default:
                    $ratingText.text("");
                    break;
            }
        }

        function showInput(data) {
            $countCharTitle = $(".popover-content .count-char .enter").eq(0);
            $countChar = $(".popover-content .count-char .enter").eq(1);
            $myReview = $(".popover-content #y_contents");
            $reviewTitle = $(".popover-content #y_summary");
            $rating = $(".popover-content .icoStarBox");
            if (data) {
                var index = parseInt(data.rating) - 1;
                var headline = data.headline;
                var reviewText = data.comment;
                headline = unEscapeText(headline);
                reviewText = unEscapeText(reviewText);
                ratingCheck($dummyPopupContainer.find(".icoStarBox span:eq(" + index + ")"));
                $reviewTitle.val(headline);
                $myReview.val(reviewText);
                $countCharTitle.text(headline.length);
                $countChar.text(reviewText.length);
                userReviewId = data.reviewId;
            } else {
                $rating.attr("rating", 1);
                $reviewTitle.val("");
                $myReview.val("");
                $countCharTitle.text(0);
                $countChar.text(0);
            }
        }

        function iLike(target) {
            var reviewId = target.parents(".review").attr("id");
            estore.addReviewHelpful({
                productCode: productCode,
                reviewId: reviewId
            }, function(data) {
                if (data && data.resultCode == "0000") {
                    addCount(target.find(".num"));
                } else if (data && data.resultCode == "8506") {
                    showReviewAlert(target.attr("data-selector"), 2);
                }
            });
        }

        function iHate(target) {
            var reviewId = target.parents(".review").attr("id");
            estore.addReviewUnHelpful({
                productCode: productCode,
                reviewId: reviewId
            }, function(data) {
                if (data && data.resultCode == "0000") {
                    addCount(target.find(".num"));
                } else if (data && data.resultCode == "8506") {
                    showReviewAlert(target.attr("data-selector"), 2);
                }
            });
        }

        function insertReview() {
            var rating = $rating.attr("rating");
            var reviewId = userReviewId;
            var headline = $reviewTitle.val();
            var comment = $myReview.val();
			/* 2 vars add 20160831 start */
			var iPlanetDirectoryPro = $.cookies.get("iPlanetDirectoryPro", {domain:".samsung.com"});             
			var iPlanetDirectoryProOptVal = $.cookies.get("iPlanetDirectoryProOptVal,", {domain:".samsung.com"});
			/* 2 vars add 20160831 end */
            key = $reviewList.attr("storeKey");

            headline = escapeText(headline);
            comment = escapeText(comment);
            if (isUpdate) {
                var param = {
                    productCode: productCode,
                    reviewId: reviewId,
                    headline: headline,
                    comment: comment,
					/* 2 params add 20160831 start */
					iPlanetDirectoryPro: iPlanetDirectoryPro, 
					iPlanetDirectoryProOptVal: iPlanetDirectoryProOptVal, 
					/* 2 params add 20160831 end */
                    rating: rating,
                    key: key
                };
                var url = '/' + SITE_CD + '/api/component/update-review';
                $.ajax({
                    type: 'POST',
                    url: url,
                    dataType: 'json',
                    data: param,
                    success: function(data) {
                        if (data && data.resultCode == "0000") {
                            insertReviewSuccess(data.samsungpoint);
                        }
                    }
                });
            } else {
                var param = {
                    productCode: productCode,
                    headline: headline,
                    comment: comment,
					/* 2 params add 20160831 start */
					iPlanetDirectoryPro: iPlanetDirectoryPro, 
					iPlanetDirectoryProOptVal: iPlanetDirectoryProOptVal, 
					/* 2 params add 20160831 end */
                    rating: rating,
                    key: key
                };
                var url = '/' + SITE_CD + '/api/component/insert-review';
                $.ajax({
                    type: 'POST',
                    url: url,
                    dataType: 'json',
                    data: param,
                    success: function(data) {
                        if (data && data.resultCode == "0000") {
                            insertReviewSuccess(data.samsungpoint);
                        }
                    }
                });
            }
        }

        function deleteReview() {
            var reviewId = userReviewId;
            estore.deleteReview({
                productCode: productCode,
                reviewId: reviewId
            }, function(data) {
                if (data && data.resultCode == "0000") {
                    deleteReviewSuccess();
                }
            });
        }

        function addCount(target) {
            var count = target.text();
            target.text(parseInt(count) + 1);
        }

        function addReportAbuse(target, index) {
            var reviewId = target.parents(".review").attr("id");
            var issueDescription = target.parents(".review").find("textarea").val();
            issueDescription = escapeText(issueDescription);
            key = $reviewList.attr("storeKey");
			/* 2 vars add 20161019 start */
			var iPlanetDirectoryPro = $.cookies.get("iPlanetDirectoryPro", {domain:".samsung.com"});             
			var iPlanetDirectoryProOptVal = $.cookies.get("iPlanetDirectoryProOptVal,", {domain:".samsung.com"});
			/* 2 vars add 20161019 end */
			
            var param = {
                productCode: productCode,
                reviewId: reviewId,
                issueDescription: issueDescription,
				/* 2 params add 20161019 start */
				iPlanetDirectoryPro: iPlanetDirectoryPro, 
				iPlanetDirectoryProOptVal: iPlanetDirectoryProOptVal, 
				/* 2 params add 20161019 end */
                key: key
				
            };
            var url = '/' + SITE_CD + '/api/component/insert-abuse';
            $.ajax({
                type: 'POST',
                url: url,
                dataType: 'json',
                data: param,
                success: function(data) {
                    if (data && data.resultCode == "0000") {
                        addReportSuccess(target, index);
                    } else {
                        showReviewAlert(".store-review .review:eq(" + index + ") .btn-area .btn-sec-01", 22);
                    }
                }
            });
        }

        function addReportSuccess(target, index) {
            showReviewAlert(".store-review .insert-btn-" + (index), 19);
            target.data("input").val("");
        }

        function cancleReviewAbuse(target, index) {
            showReviewAlert(".store-review .cancel-btn-" + (index), 20);
            $("#dummy-popup-container .cancel-confirm").one("click", function() {
                target.data("input").val("");
                target.parents(".store-review").find("textarea").data("count").text(0);
                hideReviewAlert();
            });
        }

        function insertReviewSuccess(point) {
            hideReviewAlert();
            if (isUpdate) {
                showReviewAlert($btnUpdate.selector, 21);
            } else {
                $(".sec-alert").find("#point").text(addComma(point));
                showReviewAlert($btnRatings.selector, 3);
            }
        }

        function deleteReviewSuccess() {
            hideReviewAlert();
            setTimeout(function() {
                listReload();
            }, 1000);
        }

        function showReviewAlert(target, type) {
            $currentReviewPopup = $dummyPopupContainer;
            var $target = $(target);
            $currentReviewPopup.target = $target;
            if (type < 10) {
                type = "0" + type;
            }
            $currentReviewPopupContainer = $('.sec-alert-' + type);
            $currentReviewContents = $currentReviewPopupContainer.html();
            $currentReviewPopup.html($currentReviewContents);
            $currentReviewPopupContainer.empty();
            $currentReviewPopup.show();
            $currentReviewPopup.before('<div class="lightbox-skrim"></div>');
            $currentReviewPopup.off().on("click", ".icon-close-x, .popup-confirm, .popup-cancel-button", hideReviewAlert);
            centerFlexibleReviewPopup();
            $currentReviewPopup.find("> div").attr("tabindex", 0).focus();
        }

        function addReviewAlert(target, content) {
            $currentReviewPopup = $dummyPopupContainer;
            var $target = $(target);
            $currentReviewPopup.target = $target;
            $currentReviewPopup.html(content);
            $currentReviewPopup.show();
            $currentReviewPopup.before('<div class="lightbox-skrim"></div>');
            $currentReviewPopup.off().on("click", ".icon-close-x", hideReviewAlert);
            centerFlexibleReviewPopup();
            $currentReviewPopup.find("> div").attr("tabindex", 0).focus();
        }

        function hideReviewAlert() {
            if ($currentReviewPopup) {
                $currentReviewPopup.hide();
                $currentReviewPopup.empty();
                $currentReviewPopup.target.focus();
                $currentReviewPopup = null;
                $('.lightbox-skrim').remove();
            }

            if ($currentReviewPopupContainer) {
                $currentReviewPopupContainer.html($currentReviewContents);
                $currentReviewPopupContainer = null;
            }

            if ($(this).attr("btn-case") == "reload") {
                setTimeout(function() {
                    listReload();
                }, 1000);
            }
        }

        function centerFlexibleReviewPopup() {
            if ($currentReviewPopup && $currentReviewPopup[0]) {
                var offset = $(".jump-module.docked").length > 0 ? $(".jump-module.docked").outerHeight() : 0;
                var widowHeight = $window.outerHeight() - offset;
                var popupHeight = $currentReviewPopup.outerHeight();
                var scrollTop = $body.scrollTop() + offset;
                var top = scrollTop + (widowHeight - popupHeight) / 2;
                if (top < scrollTop) top = scrollTop;
                $currentReviewPopup.css("top", top);
            }
        }

        function listReload() {
            var cSort = $(".customer-review-sort").find("a.selected").attr("data-filter-type");
            var cPage = 1;
            $reviewList.attr("id", "1");

            // local component method call - selectReviewList
            selectReviewList(cSort, cPage);
        }

        function addComma(str) {
            str = String(str);
            return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
        }

        function escapeText(str) {
            str = str.replace(/<script[^>]*>(.|[\t\n\r])*<\/script>/gi, '');
            str = str.replace(/=/gi, '&#61;');
            str = str.replace(/\\/gi, '&#92;');
            str = str.replace(/</gi, '&lt;');
            str = str.replace(/>/gi, '&gt;');
            str = str.replace(/\*/gi, '&#42;');
            str = str.replace(/\'/gi, '&#39;');

            return encodeURIComponent(str);
        }

        function unEscapeText(str) {
            str = str.replace(/&amp;/gi, '&');
            str = str.replace(/&#37;/gi, '%');
            str = str.replace(/&#39;/gi, "'");
            str = str.replace(/&#40;/gi, '(');
            str = str.replace(/&#41;/gi, ')');
            str = str.replace(/&#42;/gi, '*');
            str = str.replace(/&#61;/gi, '=');
            str = str.replace(/&#34;/gi, '"');
            str = str.replace(/&lt;/gi, '<');
            str = str.replace(/&gt;/gi, '>');

            return str;
        }

        init();
    };

}(jQuery));
