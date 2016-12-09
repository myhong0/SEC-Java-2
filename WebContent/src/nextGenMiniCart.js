
function getNextApiDomain()
{
	var nextGenDomain = STORE_DOMAIN ;
	var protocal_ = getProtocal();
	// var isPort = "N" == "Y";
	var domain_ = protocal_ + "://" + nextGenDomain;
	
	var port = "";
	
	// alert(domain_ + port);
	return domain_;
}

// Delete Cart Action Popup
var doCartConfirmPop = function (entryNumber) {
	var f = $("#miniEntryForm" + entryNumber);
	var signCheck = f.find("input[name='signCheck']").val() || f.find("input[name='signCheck']").attr("valueData");
	console.log("signCheck : " + signCheck);
	
	if(signCheck == "Y"){
		$("#btnMoveToWishList").css("display", "inline-block");
	}else{
		$("#btnMoveToWishList").css("display", "none");
		$(".close-button.icon-close-x").attr("data-tab-next","shop-popover-delete");
		$(".button.gray").attr("data-tab-previous","shop-popover-close");

	}
	nextViewPopup('#popup_delete_product_cart');
	
	//web accessibility
	$('#popup_delete_product_cart button.icon-close-x').focus();
	

	$("#miniEntryNumber").val(entryNumber);
	$("#miniEntryNumber").attr("valueData", entryNumber);
	$("#cartConfirmCreation").val('miniCart');	
	$("#isRightCartPage").val('');	
}

// Update Cart Count
function updateTotalCartCount(cnt)
{
	var pattern = /^[0-9]+$/;
	if(!pattern.test(cnt)) cnt = 0;
	$('#globalCartCount').text(cnt);
	//$("#ss_cart>.cartbutton>.cartnum").text(cnt);
}

// Hide minicart
function hideMiniCart()
{
	$('#ss_cart .item').removeClass("show");
	navigation.miniCartHide();
	//navigation.clearNav();	
}

// View Popup Layer
function nextViewPopup(v)
{
	var obj=$("#"+v.split("#")[1]);

	//navigation.clearNav();
	//dong_won.lee ^-^a
	if($('.sys-login-btn[data-button-type="1"]').size() === 0){
			$('.body_wrapper').css('-webkit-transform', 'none');
	}
	$(".layer_popup, .layer_popup_ng").hide();
	obj.parent().show();
	// alert($(".lightbox-skrim").length);
	if($(".lightbox-skrim").length < 1){
		// alert("test");
		$("body").append("<div class=\"lightbox-skrim\"></div>");
	}
	$(".lightbox-skrim").show();
	// popAlign(obj.attr("id"));
	var layer = document.getElementById(obj.attr("id"));
	console.log(layer);
	
	//layer.popAlign();
	setTimeout(function(){layer.popAlign();}, 100);
	
	return false;
}

// Hide Popup Layer
function hidePopup()
{
	$(".layer_popup, .layer_popup_ng").hide();
	$(".lightbox-skrim").hide(); 
	//dong_won.lee ^-^a 
	if($('.sys-login-btn[data-button-type="1"]').size() === 0){
			$('.body_wrapper').css('-webkit-transform', ''); 
	}
	//navigation.clearNav();
	return false;
}

// Show Gloval Error Message
function viewGlovalMessagePopup(message)
{
	var obj = $("#gloval_message_popup");
	obj.find(".msg-text").text(message);
	obj.find(".button").attr('tabindex','1');
	obj.find(".button").attr('data-focus-id','shop-popover-ok');
	obj.find(".button").attr('data-tab-next','shop-popover-close');
	obj.find('.icon-close-x').attr('data-tab-next','shop-popover-ok');
	obj.attr('data-tab-next','nav-cart-link');
	
	obj.find(".button").focus();


	
	nextViewPopup("#"+obj.attr("id"));
	//location.hash="button";
	obj.find(".button").focus();
	obj.find(".pop-btn>.button").click(function(){
		hidePopup();
		$('.cartbutton.item').focus();

		return false;
	});


}

function getProtocal()
{
	var url = document.location.href;
	var protocal = url.split("://")[0];
	return protocal;
}

// Call Minicart List API
function getNextGenMiniCartList(ss_cart_item, cart_list_wrap, func)
{	
	$.ajax({
		type: "GET",
		url : getNextApiDomain()+"/sec/ng/p4v1/getMiniCartList",
		jsonp: "callback",
		dataType:"jsonp",
		success : function(result){
			var resultCode = result.resultCode;
			var resultMessage = result.resultMessage;
			var cartCount = 0;

			try{
				cartCount = result.cartCount;
			}catch (e){
				cartCount = 0;
			}
			updateTotalCartCount(cartCount);
			
			if(resultCode != "0000")
			{
				if(resultCode == "2100"){
					window.location.href=getNextApiDomain() + "/sec/ng/logout";
					// alert(getNextApiDomain() + "/sec/logout");
				}else{
				viewGlovalMessagePopup(resultMessage);
				ss_cart_item.removeClass("show");
				}
			}else{
				var cartlist = result.result;											
				cart_list_wrap.html(cartlist);
				
				var protocol = getProtocal();
				console.log("protocol check : " + protocol);
				if(protocol == "https"){			
					for(i = 0 ; i < cartCount ; i++){
						console.log("protocol change : " + protocol);
						var nextGenCartImageUrl = document.nextgenMiniCartImg[i].src;
						document.nextgenMiniCartImg[i].src = protocol + "://"+ nextGenCartImageUrl.split("://")[1];
					}
				}
				miniCartResult = true;
				func();
			}

			// omni tagging
			$("#shop-button-9").click(function(){
				var link = $(this).attr("href");
				if(link != undefined && link !=""){
					var productResult = "";
					$("input[name^='productName']").each(function(){
						try{
							var productValue = $(this).val() || $(this).attr("valueData");
							
							if(productValue != undefined && productValue != ""){
								productResult += (productResult != "") ? "," : "";
								productResult += ";";								
								productResult += productValue;
							}
							
						}catch(e){console.log(e);}
					});
					try{
						console.log('result:' + productResult);
					}catch(e){console.log(e);}
					
					
				}				
				return true;
			});
		},
		error : function(result){			
			var resultMessage = "현재 점검 중입니다. 불편을 드려 죄송합니다.";
			viewGlovalMessagePopup(resultMessage);
			ss_cart_item.removeClass("show");
		}
	});
	
}

// Call Delete Cart (move to wishlist) API 
function removeConfirmButton(moveWishList) {	
	var entryNumber = $("#miniEntryNumber").val() || $("#miniEntryNumber").attr("valueData");	
	// alert(entryNumber);
	var productCode = $('#miniEntryForm' + entryNumber).find("input[name^='productCode']").val() || $('#miniEntryForm' + entryNumber).find("input[name^='productCode']").attr("valueData");
	var productName = $('#miniEntryForm' + entryNumber).find("input[name^='productName']").val() || $('#miniEntryForm' + entryNumber).find("input[name^='productName']").attr("valueData");	
	
	// var f = $('#miniEntryForm' + entryNumber).serialize()+"&moveWishList="+moveWishList;
	var f = "productCode=" + productCode + 	"&moveWishList="+moveWishList;
	console.log('productCode : '+productName);

	// omni tagging
	if(moveWishList == "Y"){
		try { sendClickCode('wish_list', 'wish list:add'); } catch (e) {}
	}else{
		try { sendScRemove(";" + productName); } catch (e) {}		
	}

	// hide popup
	$(".layer_popup, .layer_popup_ng").hide();
	
	$.ajax({
		url: getNextApiDomain()+"/sec/ng/p4v1/delMiniCartItem",
		data: f,
		jsonp: "callback",
		dataType:"jsonp",
		type: 'GET',
		success: function (result)
		{
			var resultCode = result.resultCode;
			var resultMessage = result.resultMessage;
			var cartCount = 0;

			try{
				cartCount = result.cartCount;				
			}catch (e){
				cartCount = 0;
			}

			if(resultCode != "0000"){
				viewGlovalMessagePopup(resultMessage);
			}
			updateTotalCartCount(cartCount);
			hidePopup();
			hideMiniCart();
			// navigation.clearNav();
			if(moveWishList == "Y"){
				var resultMessage = "상품이 위시리스트에 추가되었습니다.";
				viewGlovalMessagePopup(resultMessage);
			}

		},
		error: function (result)
		{			
			var resultMessage = "죄송합니다. 요청하신 페이지를 실행하는 데 문제가 발생했습니다.";
			viewGlovalMessagePopup(resultMessage);
			hideMiniCart();
		}	
	});
	return false;
}

//dong_won.lee ^-^a
$(document).ready(function(){	
	$(".layer_popup .close, .layer_popup .icon-close-x, .layer_popup .alert-ok-button").click(function(){
		if($('.sys-login-btn[data-button-type="1"]').size() === 0){
			$('.body_wrapper').css('-webkit-transform', ''); 
		}
	});
});