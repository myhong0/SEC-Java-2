

	$(document).ready(function(){
		//var cookie = document.cookie; 		
		var cookies = document.cookie.split(";"); 
		var id = new Array();		 	
		var cval = new Array();
		for (var i = 1; i < cookies.length; i++) {
	       id[i] = cookies[i].substr(0,cookies[i].indexOf("="));
	       cval[i] = cookies[i].substr(cookies[i].indexOf("=")+1);
	       $("#cookiesValueSet").append("<input type='text' id="+id[i]+" class="+id[i]+" value="+cval[i]+">");
		}
	});
	 
	var retailerSiteCode;
	var retailerModelCode;
	var retailerModelName;
	var retailerDisplayName;
	var retailerIaCode;
	var retailerEntry;
	var retailerGroupName;
	var retailerTypeName;
	var retailerSubTypeName;
	var retailerUniSiteCode;
	var retailerMsgChecker;
	var retailerLinkInfo;

	function onlineRetailerInfo(flag, param) {

		retailerSiteCode = param.siteCode;
		retailerModelName = param.modelName;
		retailerModelCode = param.modelCode;
		retailerIaCode = param.iaCode;
		retailerEntry = param.entry;
		retailerGroupName = param.groupName;
		retailerTypeName = param.typeName;
		retailerSubTypeName = param.subTypeName;
 		retailerSiteCode == 'fr' ?  retailerDisplayName  = param.displayName : undefined;
		retailerMsgChecker = false;	
		
		if(getOmniInputTag('pageTrack').value == 'product category' && retailerSiteCode =='in'){		
			// buy-online & buy-instore 함께쓰는 팝업에서 초기 로딩시 buy-instore가 active되어 있는 오류 수정( for quickFixTwoOptionUseFlag & 'in' where to buy )
			var active = 'active';	
			var nodata = '';
			$('.shop-popover ul li:first').attr('class', active); // 로딩시 강제 삽입
			$('.shop-popover ul li:nth-child(2)').attr('class', nodata); // 로딩시 강제 삽입		

			// buy-online & buy-instore 함께쓰는 팝업에서 초기 로딩시 h4 태그가 활성화되는 부분 수정
			if($('.shop-popover .type01').attr('style') !='display: none;'){ // buy-online & buy-instore 두 개 다 쓰는 창이라면
				$(".shop-popover > h4").eq(0).hide();
				$(".shop-popover > h4").eq(1).hide();
			}
		
			// buy-online & buy-instore 함께쓰는 팝업에서 초기 로딩 시 buy-online이 active되어 있는데 내용이 buy-instore가 show되어 있는 오류 수정
			var buyonlineshow = 'tab-content buy-online show';
			var buyonline = 'tab-content buy-online';

			var buyinstoreshow='tab-content buy-instore show';
			var buyinstore = 'tab-content buy-instore';

			if($('.shop-popover ul li:first').attr('class') =='active'){ // buy-online 이 active일 때
				if($('.shop-tab-contents > .tab-content.buy-online').attr('class') !='tab-content buy-online show'){ // buy-online 내용이 show가 아니라면
					$('.shop-tab-contents').find('.tab-content.buy-online').attr('class', buyonlineshow); // buy-online에 show 생성
					$('.shop-tab-contents').find('.tab-content.buy-instore').attr('class', buyinstore); // buy-instore는 show 제거					
				}
			} else { // buy-instore가 acttive일 때
				if($('.shop-tab-contents > .tab-content.buy-instore').attr('class') !='tab-content buy-instore show'){ // buy-instore 내용이 show가 아니라면					
					$('.shop-tab-contents').find('.tab-content.buy-online').attr('class', buyonline);  // buy-online에 show 제거					
					$('.shop-tab-contents').find('.tab-content.buy-instore').attr('class', buyinstoreshow); // buy-instore에 show 생성
				}
			}
		}
		

		if(retailerSiteCode == 'nz'){
			retailerLinkInfo = {
				"mobile-devices|smartphones" : [{
					"retailer_name" : "Noel Leeming",
					"retailer_url" : "https://www.noelleeming.co.nz/shop/Samsung/cameras-phones/phones-and-gps/smartphones/c11902-c12704-cSmartphonesProducts-bsamsung-p1.html"
				}, {
					"retailer_name" : "Harvey Norman",
					"retailer_url" : "http://www.harveynorman.co.nz/phone-and-gps/mobile-phones/?subcats=Y&features_hash=V26"
				}, {
					"retailer_name" : "JB HiFi",
					"retailer_url" : "http://shop.jbhifi.co.nz/mobile-phones.htm"
				}, {
					"retailer_name" : "Warehouse Stationary",
					"retailer_url" : "http://search.warehousestationery.co.nz/search?p=Q&w=samsung%20smartphone"
				}, {
					"retailer_name" : "The Warehouse",
					"retailer_url" : "http://search.thewarehouse.co.nz/search?p=Q&lbc=thewarehouse&uid=179773820&ts=custom&w=samsung&af=br:samsung%20cat2:mobilephones&isort=score&method=and&view=grid"
				}, {
					"retailer_name" : "Spark",
					"retailer_url" : "http://www.spark.co.nz/shop/mobile/phones.html"
				}, {
					"retailer_name" : "2D",
					"retailer_url" : "https://www.2degreesmobile.co.nz/shop"
				}, {
					"retailer_name" : "Vodafone",
					"retailer_url" : "https://www.vodafone.co.nz/shop/mobileListing.jsp?reset=true&categoryId=cat80064&manufacturerId=500006&menuKey=mnit700029"
				}, {
					"retailer_name" : "Smith City",
				}, {
					"retailer_name" : "Heathcotes",
					"retailer_url" : "https://www.heathcotes.co.nz/communication-gps/mobile-phones/vodafone?brand=samsung"
				}, {
					"retailer_name" : "DTR",
					"retailer_url" : "http://www.dtr.co.nz/collections/vodafone"
				}],
				"mobile-devices|tablets" : [{
					"retailer_name" : "Noel Leeming",
					"retailer_url" : "https://www.noelleeming.co.nz/shop/Samsung/computers/tablets/tablet-computers/c8001-c35817-c3684-bsamsung-p1.html"
				}, {
					"retailer_name" : "Harvey Norman",
					"retailer_url" : "http://www.harveynorman.co.nz/computers/tablet-and-accessories/tablets/?subcats=Y&features_hash=V26"
				}, {
					"retailer_name" : "JB HiFi",
					"retailer_url" : "http://shop.jbhifi.co.nz/support.aspx?post=1&results=10&q=samsung+tablet&source=all&bnSearch=Go%21"
				}],
				"mobile-devices|wearables" : [{
					"retailer_name" : "Noel Leeming",
					"retailer_url" : "https://www.noelleeming.co.nz/shop/Samsung/computers/wearables/c8001-cphones_wearables-bsamsung-p1.html"
				}, {
					"retailer_name" : "Harvey Norman",
					"retailer_url" : "http://www.harveynorman.co.nz/connected-health-fitness/sport-and-activity-trackers/?1=&subcats=Y&features_hash=V8388.V26"
				}, {
					"retailer_name" : "JB HiFi",
					"retailer_url" : "http://shop.jbhifi.co.nz/mobile-phones/mobile-accessories/mobile-accessories-other.htm"
				}, {
					"retailer_name" : "Spark",
					"retailer_url" : "http://www.spark.co.nz/shop/mobile/phones.html"
				}, {
					"retailer_name" : "Vodafone",
					"retailer_url" : "https://www.vodafone.co.nz/shop/accessoryListing.jsp?&reset=true&categoryId=cat2370011&menuKey=mnit900003"
				}],
				"mobile-devices|other-phones" : [{
					"retailer_name" : "Noel Leeming",
					"retailer_url" : "https://www.noelleeming.co.nz/shop/Samsung/cameras-phones/phones-and-gps/smartphones/c11902-c12704-cSmartphonesProducts-bsamsung-p1.html"
				}, {
					"retailer_name" : "Harvey Norman",
					"retailer_url" : "http://www.harveynorman.co.nz/phone-and-gps/mobile-phones/?subcats=Y&features_hash=V26"
				}, {
					"retailer_name" : "JB HiFi",
					"retailer_url" : "http://shop.jbhifi.co.nz/mobile-phones.htm"
				}, {
					"retailer_name" : "Warehouse Stationary",
					"retailer_url" : "http://search.warehousestationery.co.nz/search?p=Q&w=samsung%20smartphone"
				}, {
					"retailer_name" : "The Warehouse",
					"retailer_url" : "http://search.thewarehouse.co.nz/search?p=Q&lbc=thewarehouse&uid=179773820&ts=custom&w=samsung&af=br:samsung%20cat2:mobilephones&isort=score&method=and&view=grid"
				}, {
					"retailer_name" : "Spark",
					"retailer_url" : "http://www.spark.co.nz/shop/mobile/phones.html"
				}, {
					"retailer_name" : "2D",
					"retailer_url" : "https://www.2degreesmobile.co.nz/shop"
				}, {
					"retailer_name" : "Vodafone",
					"retailer_url" : "https://www.vodafone.co.nz/shop/mobileListing.jsp?reset=true&categoryId=cat80064&manufacturerId=500006&menuKey=mnit700029"
				}, {
					"retailer_name" : "Smith City",
					"retailer_url" : "http://www.smithscity.co.nz/cameras-and-phones/mobile-phones/samsung.htm"
				}, {
					"retailer_name" : "Heathcotes",
					"retailer_url" : "https://www.heathcotes.co.nz/communication-gps/mobile-phones/vodafone?brand=samsung"
				}, {
					"retailer_name" : "DTR",
					"retailer_url" : "http://www.dtr.co.nz/collections/vodafone"
				}],
				"mobile-devices|accessories" : [{
					"retailer_name" : "Noel Leeming",
					"retailer_url" : "https://www.noelleeming.co.nz/shop/Samsung/cameras-phones/phone-accessories/c11902-cPhone_Accessories-bsamsung-p1.html"
				}, {
					"retailer_name" : "Harvey Norman",
					"retailer_url" : "http://www.harveynorman.co.nz/phone-and-gps/mobile-phone-accessories/"
				}, {
					"retailer_name" : "PB tech",
					"retailer_url" : "http://www.pbtech.co.nz/index.php?z=c&p=phone_acc&b=Samsung"
				}, {
					"retailer_name" : "JB HiFi",
					"retailer_url" : "http://shop.jbhifi.co.nz/mobile-phones/mobile-accessories/mobile-accessories-other.htm"
				}, {
					"retailer_name" : "Warehouse Stationary",
					"retailer_url" : "http://search.warehousestationery.co.nz/search?p=Q&w=samsung%20accessories"
				}, {
					"retailer_name" : "The Warehouse",
					"retailer_url" : "http://search.thewarehouse.co.nz/search?p=Q&lbc=thewarehouse&uid=179773820&ts=custom&w=samsung%20accessories&af=cat2:mobilephones%20br:samsung&isort=score&method=and&view=grid"
				}, {
					"retailer_name" : "Spark",
					"retailer_url" : "http://www.spark.co.nz/shop/mobile/phones.html"
				}, {
					"retailer_name" : "2D",
					"retailer_url" : "https://www.2degreesmobile.co.nz/shop"
				}, {
					"retailer_name" : "Vodafone",
					"retailer_url" : "https://www.vodafone.co.nz/shop/accessoryListing.jsp?&reset=true&categoryId=cat2370011&menuKey=mnit900003"
				}],
				"cameras-and-camcorders|cameras" : [{
					"retailer_name" : "JB HiFi",
					"retailer_url" : "http://shop.jbhifi.co.nz/digital-cameras.htm"
				}],
				"cameras-and-camcorders|lenses" : [{
					"retailer_name" : "Noel Leeming",
					"retailer_url" : "https://www.noelleeming.co.nz/shop/Samsung/cameras-phones/photography/lenses/c11902-c10066-c2513-bsamsung-p1.html"
				}],
				"home-appliances|washing-machines" : [{
					"retailer_name" : "Noel Leeming",
					"retailer_url" : "https://www.noelleeming.co.nz/shop/Samsung/appliances/whiteware-appliances/washing-machines/c8002-c100007-c00313-bsamsung-p1.html"
				}, {
					"retailer_name" : "Harvey Norman",
					"retailer_url" : "http://www.harveynorman.co.nz/whiteware/laundry/washing-machines/?subcats=Y&features_hash=V26"
				}, {
					"retailer_name" : "Smith City",
					"retailer_url" : "http://www.smithscity.co.nz/appliances/kitchen-and-laundry/washing-machines.htm?filter&aspect=Brand%5eSamsung"
				}, {
					"retailer_name" : "100%",
					"retailer_url" : "http://www.100percent.co.nz/laundry-and-cleaning/washing-machines.htm?&aspect=Brand^Samsung"
				}, {
					"retailer_name" : "Heathcotes",
					"retailer_url" : "https://www.heathcotes.co.nz/kitchen-laundry/washing-machines?brand=samsung"
				}],
				"home-appliances|refrigerators" : [{
					"retailer_name" : "Harvey Norman",
					"retailer_url" : "http://www.harveynorman.co.nz/whiteware/kitchen/fridges/?subcats=Y&features_hash=V26"
				}, {
					"retailer_name" : "Noel Leeming",
					"retailer_url" : "https://www.noelleeming.co.nz/shop/Samsung/appliances/whiteware-appliances/fridges-freezers/c8002-c100007-c00282-bsamsung-p1.html"
				}, {
					"retailer_name" : "Smith City",
					"retailer_url" : "http://www.smithscity.co.nz/appliances/kitchen-and-laundry/fridge-freezers.htm?filter&aspect=Brand%5eSamsung"
				}, {
					"retailer_name" : "Kitchen Things",
					"retailer_url" : "http://www.kitchenthings.co.nz/Products/type/ViewSearch/TypeID/17/CustomFieldIDs/50/SearchValues/SAMSUNG"
				}, {
					"retailer_name" : "100%",
					"retailer_url" : "http://www.100percent.co.nz/kitchen-and-cooking/refrigeration.htm?&aspect=Brand^Samsung"
				}, {
					"retailer_name" : "Heathcote",
					"retailer_url" : "https://www.heathcotes.co.nz/t/categories/kitchen-laundry/refrigeration?utf8=%E2%9C%93&search%5Bbrand_any%5D%5B%5D=60"
				}],
				"home-appliances|dishwashers" : [{
					"retailer_name" : "Harvey Norman",
					"retailer_url" : "http://www.harveynorman.co.nz/whiteware/kitchen/dishwashers/?subcats=Y&features_hash=V26"
				}, {
					"retailer_name" : "Noel Leeming",
					"retailer_url" : "https://www.noelleeming.co.nz/shop/Samsung/appliances/whiteware-appliances/dishwashers/c8002-c100007-c5455-bsamsung-p1.html"
				}, {
					"retailer_name" : "Smith City",
					"retailer_url" : "http://www.smithscity.co.nz/appliances/kitchen-and-laundry/dishwashers.htm?filter&aspect=Brand%5eSamsung"
				}, {
					"retailer_name" : "Kitchen Things",
					"retailer_url" : "http://www.kitchenthings.co.nz/Products/type/ViewSearch/TypeID/15/CustomFieldIDs/50/SearchValues/SAMSUNG"
				}, {
					"retailer_name" : "100%",
					"retailer_url" : "http://www.100percent.co.nz/kitchen-and-cooking/dishwashers.htm?&aspect=Brand^Samsung"
				}],
				"home-appliances|cooking-appliances" : [{
					"retailer_name" : "Harvey Norman",
					"retailer_url" : "http://www.harveynorman.co.nz/store-finder.html"
				}, {
					"retailer_name" : "Smith City",
					"retailer_url" : "http://www.smithscity.co.nz/appliances/kitchen-and-laundry/cooktops.htm?filter&aspect=Brand%5eSamsung"
				}, {
					"retailer_name" : "Kitchen Things",
					"retailer_url" : "http://www.kitchenthings.co.nz/Products/type/ViewSearch/TypeID/19/CustomFieldIDs/50/SearchValues/SAMSUNG"
				}, {
					"retailer_name" : "100%",
					"retailer_url" : "http://www.100percent.co.nz/kitchen-and-cooking/microwaves.htm?&aspect=Brand^Samsung"
				}],
				"home-appliances|vacuum-cleaners" : [{
					"retailer_name" : "Harvey Norman",
					"retailer_url" : "http://www.harveynorman.co.nz/home-appliances/vacuums-and-floor-care/robotic-vacuum-cleaners/?subcats=Y&features_hash=V26"
				}],
				"home-appliances|heat-pump-ac" : [{
					"retailer_name" : "Heathcotes",
					"retailer_url" : "https://www.heathcotes.co.nz/heating-cooling/heat-pumps-air-conditioning?brand=samsung"
				}, {
					"retailer_name" : "Albany Extreme",
					"retailer_url" : "http://www.albanyextreme.co.nz/afa.asp?CATID=152&strBrand=Samsung&strPriceRange=&strKeyword=&x=24&y=7&SubmitType=GO&idWebPage=46201&page=1"
				}],
				"monitors-printers|monitors" : [{
					"retailer_name" : "Noel Leeming",
					"retailer_url" : "https://www.noelleeming.co.nz/shop/Samsung/computers/computer-accessories/computer-monitors/c8001-c10198-c12351-bsamsung-p1.html"
				}, {
					"retailer_name" : "JB HiFi",
					"retailer_url" : "http://shop.jbhifi.co.nz/computers-laptops/monitors.htm"
				}, {
					"retailer_name" : "PB tech",
					"retailer_url" : "http://www.pbtech.co.nz/index.php?z=c&p=monitors&b=Samsung"
				}],
				"monitors-printers|printers" : [{
					"retailer_name" : "Warehouse Stationery",
					"retailer_url" : "http://search.warehousestationery.co.nz/search?p=Q&w=samsung%20monitor&view=grid&isort=score&sli_sid=DbuqIoeDC5aoItIIdUy1KJYvx8htwU6Xu28="
				}],
				"monitors-printers|print-supplies" : [{
					"retailer_name" : "Warehouse Stationery",
					"retailer_url" : "http://www.warehousestationery.co.nz/is-bin/INTERSHOP.enfinity/WFS/WSL-B2C-Site/en_NZ/-/NZD/ViewStandardCatalog-Browse?CatalogCategoryID=kGAKBTFw8aAAAAEunqUYtFBu"
				}],
				"tv-av|tv" : [{
					"retailer_name" : "Noel Leeming",
					"retailer_url" : "https://www.noelleeming.co.nz/shop/Samsung/home-entertainment/televisions/c10017-c10137-bsamsung-p1.html"
				}, {
					"retailer_name" : "Harvey Norman",
					"retailer_url" : "http://www.harveynorman.co.nz/tv-and-audio/televisions/?subcats=Y&features_hash=V26"
				}, {
					"retailer_name" : "100%",
					"retailer_url" : "http://www.100percent.co.nz/default.aspx?q=samsung+tv&submit.x=0&submit.y=0"
				}, {
					"retailer_name" : "Smith City",
					"retailer_url" : "http://www.smithscity.co.nz/tv-and-audio/television.htm?filter&aspect=Brand%5eSamsung#catpage=2"
				}, {
					"retailer_name" : "JB HiFi",
					"retailer_url" : "http://www.jbhifi.co.nz/tv-lcd-led-plasma/samsung/"
				}, {
					"retailer_name" : "Heathcotes",
					"retailer_url" : "https://www.heathcotes.co.nz/tv-dvd/tvs?brand=samsung"
				}],
				"tv-av|audio-video" : [{
					"retailer_name" : "Noel Leeming",
					"retailer_url" : "https://www.noelleeming.co.nz/shop/Samsung/home-entertainment/home-audio/c10017-c100177-bsamsung-p1.html"
				}, {
					"retailer_name" : "Harvey Norman",
					"retailer_url" : "http://www.harveynorman.co.nz/tv-and-audio/blu-ray-and-home-theatre/?subcats=Y&features_hash=V26"
				}, {
					"retailer_name" : "100%",
					"retailer_url" : "http://www.100percent.co.nz/tv-and-audio/audio.htm?&aspect=Brand^Samsung"
				}, {
					"retailer_name" : "Smith City",
					"retailer_url" : "http://www.smithscity.co.nz/tv-and-audio/audio-and-home-theatre.htm?filter&aspect=Brand%5eSamsung"
				}, {
					"retailer_name" : "JB HiFi",
					"retailer_url" : "http://shop.jbhifi.co.nz/plasma-lcd-tvs/home-theatre/soundbars.htm"
				}, {
					"retailer_name" : "Heathcotes",
					"retailer_url" : "https://www.heathcotes.co.nz/audio-mp3/audio-systems?brand=samsung"
				}],
				"tv-av|accessories" : [{
					"retailer_name" : "Smith City",
					"retailer_url" : "http://www.smithscity.co.nz/tv-and-audio/television/tv-accessories.htm?filter&aspect=Brand%5eSamsung"
				}, {
					"retailer_name" : "JB HiFi",
					"retailer_url" : "http://shop.jbhifi.co.nz/plasma-lcd-tvs/tv-accessories.htm"
				}, {
					"retailer_name" : "Heathcotes",
					"retailer_url" : "https://www.heathcotes.co.nz/tv-dvd/accessories?brand=samsung"
				}]
			};
		} 
				
			
		if(retailerSiteCode == 'nz' && $('#modelCode').length > 0 && $('#iaUrlNamePath').length > 0){
			onlineRetailerMsg.retailerNoData = [
 				'<p>We’re sorry. The product you are looking at is not currently advertised online in New Zealand. Please check with one of our retail partners for availability.</p>',
 				' <ul>'];				
			var iaUrlNamePath = $("#iaUrlNamePath").val();					
			for(j=0; j<Object.keys(retailerLinkInfo).length; j++){
				if(iaUrlNamePath.indexOf(Object.keys(retailerLinkInfo)[j]) === 0){
					for (i=0; i<retailerLinkInfo[Object.keys(retailerLinkInfo)[j]].length; i++){ 
						onlineRetailerMsg.retailerNoData.push(
						'   <li>', 
						'     <label class="retailer_name">' + retailerLinkInfo[Object.keys(retailerLinkInfo)[j]][i].retailer_name + '</label>',
						'     <a class="retailer_url button ss-button darkblue" href="'+ retailerLinkInfo[Object.keys(retailerLinkInfo)[j]][i].retailer_url+'" target="_blank"' + 'onclick="sendClickCode(\'wishlist_step2\', \'buy online:' + retailerLinkInfo[Object.keys(retailerLinkInfo)[j]][i].retailer_name + '|' + retailerModelCode.toLowerCase() + '|' + retailerModelName.toLowerCase() + '\');">GO</a>',
						'   </li>'
						);
					}
				}	
			}	
 			onlineRetailerMsg.retailerNoData.push(' </ul>');
 			onlineRetailerMsg.retailerNoData = onlineRetailerMsg.retailerNoData.map(function (s) { return s.trim(); }).join('');
			retailerMsgChecker = true;		
		}			
	
		if(flag != 3){
			
			if(retailerSiteCode == 'ar' /*|| retailerSiteCode == 'mx'*/ || retailerSiteCode == 'py' || retailerSiteCode == 'uy' || retailerSiteCode == 'cl'){
				retailerDisplayName = param.displayName.replace(/ /g, "+");
				var $buyonlineTemplate = $('#shop-popover-container .buy-online > ul');
				$buyonlineTemplate.empty();
				var buyonlineHtml = "";
				
				var parameter = "";
				var url = "";
				
				if(retailerSiteCode == 'ar') {
					parameter = "group=" + retailerGroupName + "&type=" + retailerTypeName + "&subtype=" + retailerSubTypeName + "&iaAcc=&model_code="+retailerModelCode+"&model_name="+retailerModelName+"&display_model_name="+retailerDisplayName;
					url = "https://assets.etailing-la.com/samsung/ar/getData.php?" + parameter;
				} else if(retailerSiteCode == 'py') {
					parameter = "group=" + retailerGroupName + "&type=" + retailerTypeName + "&subtype=" + retailerSubTypeName + "&iaAcc=&model_code="+retailerModelCode+"&model_name="+retailerModelName+"&display_model_name="+retailerDisplayName;
					url = "http://assets.etailing-la.com/samsung/py/getData.php?" + parameter;  
				} else if(retailerSiteCode == 'uy') {
					parameter = "group=" + retailerGroupName + "&type=" + retailerTypeName + "&subtype=" + retailerSubTypeName + "&iaAcc=&model_code="+retailerModelCode+"&model_name="+retailerModelName+"&display_model_name="+retailerDisplayName;
					url = "http://assets.etailing-la.com/samsung/uy/getData.php?" + parameter;
				}  else if(retailerSiteCode == 'cl') {
					parameter = "group=" + retailerGroupName + "&type=" + retailerTypeName + "&subtype=" + retailerSubTypeName + "&iaAcc=&model_code="+retailerModelCode+"&model_name="+retailerModelName+"&display_model_name="+retailerDisplayName;
					url = "https://assets.etailing-la.com/samsung/cl/getData.php?" + parameter;
				} else {
					if(retailerTypeName == 'accessories' || retailerTypeName == 'mobile-phones' || retailerTypeName == 'televisions' || retailerTypeName == 'air-conditioners' || retailerTypeName == 'audio-systems' 
						|| retailerTypeName == 'wireless-audio-with-dock' || retailerTypeName == 'cameras' || retailerTypeName == 'smart-compact' || retailerTypeName == 'printers' || retailerTypeName == 'odd'
							|| retailerTypeName == 'home-theaters' || retailerTypeName == 'galaxy-camera' || retailerTypeName == 'mwo' || retailerTypeName == 'laundry' || retailerTypeName == 'digital-camera' 
								|| retailerTypeName == 'monitors' || retailerTypeName == 'smart-nx' || retailerTypeName == 'ultra-mobile-pc' || retailerTypeName == 'refrigerators' || retailerTypeName == 'soundbar' 
									|| retailerTypeName == 'video' || retailerTypeName == 'camcorders' || retailerTypeName == 'visual-solutions' || retailerTypeName == 'lens'
										 || retailerTypeName == 'tv' || retailerTypeName == 'audio-video' || retailerTypeName == 'smartphones') {
						parameter = "group=" + retailerGroupName + "&type=" + retailerTypeName + "&subtype=" + retailerSubTypeName + "&iaAcc=&model_code="+retailerModelCode+"&model_name="+retailerModelName+"&display_model_name="+retailerDisplayName+"&output=embed";
						url = "http://198.61.129.0/onlineRetailers/index.php?" + parameter;
					}
				}
				
				
				console.info("url >>>>>>>> ", url);
				
				buyonlineHtml = "<iframe src='" + url + "' style='border:none;' width='100%' height='310'></iframe>";
				
				$buyonlineTemplate.append(buyonlineHtml);

				popoverDefaultHeight($('.buy-instore'), onlineRetailerMsg.gelocationNoCheck, 'buyinstore');
			}  else {
				
				//코드값 강제 삽입
				var retailerUniSiteCode = $.cookies.get("country_codes");
				if (retailerUniSiteCode && retailerUniSiteCode != "") {
					retailerUniSiteCode = retailerUniSiteCode.toLowerCase();
				} else {
					retailerUniSiteCode = "";
				}
				
				$.ajax({
					type: "POST"
					,url: "/" + retailerSiteCode + "/data-consumer/online-retailer?mType=xml"
					,data: {
						 siteCode: retailerSiteCode
						,modelCode: retailerModelCode
						,iaCode: retailerIaCode
						,retailerUniSiteCode : retailerUniSiteCode
					}
					,dataType: "xml"
					,async: false
					,block: true
					,success: function(data) {
						console.log('** online retailer success');
						// BUY ONLINE TAB. [START]
						var buyonlineList = $(data).find("map").find("entry").find("onlineRetailerInfo");
						
						var $buyonlineTemplate = $('.buy-online > ul');
						var ortApiUseFl = buyonlineList.attr("ortApiUseFl");
						var buyonlineHtml = "";
						var etcName = "";
												
						$buyonlineTemplate.empty();


						if(retailerMsgChecker == true && buyonlineList.attr("onlineRetailerListCnt") == 0){
						onlineRetailerMsg.buyonlineTabMsg = "BUY IN-STORE";
						$(".shop-popover > ul:first").hide();
						$(".shop-popover-title").text(onlineRetailerMsg.buyonlineTabMsg).show();
						}

						var tabMsg = flag == 2 ? onlineRetailerMsg.buyonlineTabMsg : onlineRetailerMsg.buyinstoreTabMsg;
						if(flag == 2){
							$(".shop-popover > ul:first").hide();
							$(".shop-popover-title").text(tabMsg).show();
						}
						// retailer 개수가 5개 이하일 때는 페이징부분 display:none 처리.
						if (buyonlineList.attr("onlineRetailerListCnt") < 6) {
							$(".tab-content .controls").hide();
						}
				
						if (buyonlineList.attr("onlineRetailerListCnt") > 0 && buyonlineList.attr("ortDisplayFlag") == "Y") {
							buyonlineList.find("onlineRetailerList").find("onlineRetailer").each(function(idx) {
								
								var name = $(this).find("name");
								var displayType = $(this).find("displayType");
								var instock = $(this).find("instock");
								var deeplinkUrl = $(this).find("deeplinkUrl");
								var logoUrl = $(this).find("logoUrl");
								var price = $(this).find("price");

								if (instock.text() != "") {

									etcName = instock.text() == "true" ? onlineRetailerMsg.instock : onlineRetailerMsg.outofstock;

									/*
									if ("uk".indexOf(retailerSiteCode)!=-1 &&"SM-G925FZKFBTU,SM-G920FZKEBTU,SM-G920FZKFBTU,SM-G925FZKEBTU,SM-G925FZKFBTU,SM-G920FZKAPHN,SM-G920FZKEPHN, SM-G920FZKFPHN, SM-G925FZKAPHN, SM-G925FZKEPHN, SM-G925FZKFPHN, SM-G920FZKALUX, SM-G920FZKELUX, SM-G925FZKALUX, SM-G925FZKELUX, SM-G925FZKFLUX, SM-G920FZKALUX, SM-G920FZKELUX, SM-G925FZKALUX, SM-G925FZKELUX, SM-G925FZKFLUX".indexOf(retailerModelCode)!=-1 && instock.text() == "true") {
										etcName = 'Pre-order';
									}
									if(retailerSiteCode == "uk" && instock.text() == "true" && $('#lightPdpFl').val()== "Y") {
										etcName = 'Pre-order';
									}
									 */

								}
								
								//buyonlineHtml += idx < 5 ? "<li>" : "<li class='hide'>";
								buyonlineHtml += "<li>";
								buyonlineHtml += "<span class='store-name'>";
								if (displayType.text() == "N-M") {
									buyonlineHtml += name.text();
								} else if (displayType.text() == "L-G") {
									buyonlineHtml += "<img src='" + logoUrl.text() + "' alt='"+ name.text() +"' />";
								} else {
									buyonlineHtml += "<img src='" + logoUrl.text() + "' alt='"+ name.text() +"' />" + name.text();
								}
								buyonlineHtml += "</span>";
								if (ortApiUseFl == "Y") {
									buyonlineHtml += "<span class='etc'>" + price.text() + "</span>";
									buyonlineHtml += "<span class='etc-name'>" + etcName + "</span>";
								}
								buyonlineHtml += "<span>";
								if(SITE_CD == 'jp') {
									buyonlineHtml += "<button type=\"button\" class=\"go ss-button darkblue\" aria-label=\"Go purchase at Littlewood's\" onclick=\"$_retailerLocation('" + deeplinkUrl.text() + "','" + name.text() + "');"+"ga('send', 'event', 'Buy "+typeNmGglTag+"', 'button click','"+ dispNmGglTag +"');"+"\">" + onlineRetailerMsg.btngo + "</button>";
								} else {
									buyonlineHtml += "<button type=\"button\" class=\"go ss-button darkblue\" aria-label=\"Go purchase at Littlewood's\" onclick=\"$_retailerLocation('" + deeplinkUrl.text() + "','" + name.text() + "');\">" + onlineRetailerMsg.btngo + "</button>";
								}
								buyonlineHtml += "</span>";
								buyonlineHtml += "</li>";
							
							});
							
							$buyonlineTemplate.append(buyonlineHtml);
		
							$_retailerLocation = function(deeplinkUrl, name) {
								sendClickCode('wishlist_step2', 'buy online:' + name + '|' + retailerModelCode.toLowerCase() +'|' + retailerModelName.toLowerCase() + '');
								if("fr".indexOf(retailerSiteCode)!=-1 && location.href.indexOf('samsung.com/fr/')!=-1){
									  s_sendOmnitureData('where_to_buy:online:link', name);         //    2015-02-13 [fr] tagging added
								} 
								var openNewWindow = window.open("about:blank");
								openNewWindow.location.href = deeplinkUrl;
							};
						
						} else if (buyonlineList.attr("ortDisplayFlag") == "N") {
							if(flag == 2){
								popoverDefaultHeight($buyonlineTemplate, onlineRetailerMsg.retailerNoData, '');
							} else {
								
								$(".shop-popover > ul:first").hide();
								$(".shop-popover-title").text(onlineRetailerMsg.buyinstoreTabMsg).show();
								
								$(".shop-popover").find(".tab-content").each(function(elm) {
									$(this).toggleClass('show');
								});
							}
						} else {
							// buy online에 retailer data가 없다고 표시.
							popoverDefaultHeight($buyonlineTemplate, onlineRetailerMsg.retailerNoData, '');
						}
						
						if(SITE_CD != 'fr'){
							popoverDefaultHeight($('.buy-instore'), onlineRetailerMsg.gelocationNoCheck, 'buyinstore');
						} else {
							popoverDefaultHeight($('.buy-instore'), onlineRetailerMsg.storeNoData, 'buyinstore');
						}
						
					// BUY ONLINE TAB. [END]
					},
					error: function(xhr, st, err) {
						var $buyonlineTemplate = $('.buy-online > ul');
						
						popoverDefaultHeight($buyonlineTemplate, onlineRetailerMsg.retailerNoData, '');
						$(".tab-content .controls").hide();
						popoverDefaultHeight($('.buy-instore'), onlineRetailerMsg.gelocationNoCheck, 'buyinstore');
						console.info("error", err);
					}
				});
			}
			
			
		} else {
			
			if(SITE_CD != 'fr'){
				popoverDefaultHeight($('.buy-instore'), onlineRetailerMsg.gelocationNoCheck, 'buyinstore');
			} else {

				popoverDefaultHeight($('.buy-instore'), onlineRetailerMsg.storeNoData, 'buyinstore');
			}
			
			$(".shop-popover > ul:first").hide();
			$(".shop-popover-title").text(onlineRetailerMsg.buyinstoreTabMsg).show();
			
			$(".shop-popover").find(".tab-content").each(function(elm) {
				$(this).toggleClass('show');
			});
		}
	}
	

	// online retailer - store locator info.
	(function ($) {

		// 160928 jp국가 buy-instore탭 제거, buy-online탭 클릭 스타일 제거
		if(SITE_CD == 'jp'){
			$('.tabs li:nth-child(2)').remove();
			$('.tabs li a').attr('style','cursor: default');
		}
		ss.StoreLocator = function () {
			eventBridge.on(eventDictionary.location.GEOLOCATION_RESOLVED, function(ev, usrloc) {
				
				$.ajax({
					type: "POST"
					,url: "/" + retailerSiteCode + "/data-consumer/buyin-store?mType=xml"
					,data: {
						 siteCode: retailerSiteCode
						,latitude: usrloc.ob // latitude
						,longitude: usrloc.pb // longitude
						,iaCode: retailerIaCode
						,modelCode: retailerModelCode
						,entering: "buyInStore"
					}
					,dataType: "xml"
					,async: false
					,block: true
					,success: function(data) {
			
						// BUY IN-STORE TAB. [START]
						var storelocatorList = $(data).find("map").find("entry").find("storeLocatorInfo");
						
						var $storeTemplate = $('.buy-instore');
						
						
						$storeTemplate.empty();
						
						/* shop popover
							tab type 01 (헤더)				buy-online & buy-instore (ex smartphone)	|	only buy-online or only buy-instore (ex tv)
								ul
									buy-online									O						  |			X
									buy-instore									O						  |			X
								h4
									buy-instore or buy online					X						  |			O
							shop-tab-contents (내용)
								tab-content buy-online							O						  |			only buy-online일 경우 O
								tab-content buy-instore							O						  |			only buy-instore일 경우 O
						*/		
							
						// dong_won.lee, only buy-instore (ex TV) POP UP 내용 비노출 오류 수정 ( for quickFixTwoOptionUseFlag & 'in' where to buy )
						if(getOmniInputTag('pageTrack').value == 'product category' && retailerSiteCode =='in'){  //quickFixTwoOptionUseFlag == 'true' 사용 불가함
							if($(".shop-popover > ul").attr('style') == 'display: none;'){ // only buy-instore 일 경우
								// ex.  $storeTemplate = [div.tab-content.buy-instore, div.tab-content.buy-instore.show, ......
								if ($storeTemplate.eq(0).attr('class') != 'tab-content buy-instore show') { 
									$storeTemplate.eq(0).addClass('show');
									if ($storeTemplate.eq(1).attr('class') != 'tab-content buy-instore') {
											$storeTemplate.eq(1).removeClass('show');
									}
								}
							}
						}

						if (storelocatorList.attr("storeLocatorListCnt") > 0) {
							
							storelocatorList.find("storeLocatorList").each(function(idx) {
								
								var dslLogoImgPath = $(this).find("store").find("contact").find("dslLogoImgPath");
								var dslLogoImgDesc = $(this).find("store").find("contact").find("dslLogoImgDesc");
								var name = $(this).find("store").find("name");
								var distance = $(this).find("store").find("map").find("distance");
								var contact = $(this).find("store").find("contact");
								var city = contact.find("city");
								var phone = contact.find("phone");
								var email = contact.find("email");
								var oprTime = contact.find("oprTime");
								
								var storeHtml = "";
								
								// [14.08.19] tw국가만 BUY_IN_STORE영역에 구매옵션 마크업 적용.
								if(SITE_CD == 'tw' || SITE_CD == 'kz_ru'){
									var expLinkUrl = SITE_CD == 'tw' ? '/tw/support/channels/index.html' : 'http://www.samsung.com/kz_ru/brandshops/';
									storeHtml += "<div class='tw-contents'>";

									if(SITE_CD != 'kz_ru'){
										storeHtml += "<h3 class='tit'>" + onlineRetailerMsg.provincialSalesText1 + "</h3>";                            
										storeHtml += "<a href='" + expLinkUrl + "' class='button btnstore-01'>" + onlineRetailerMsg.provincialSalesText2 + "</a>";
									}

									storeHtml += "<h4 class='sub-tit'>" + onlineRetailerMsg.provincialSalesText3 + "</h4>";
								}
								
								if (dslLogoImgPath.text() != "") {
									storeHtml += "<p class='whereLogo'>";
									storeHtml += "<img src='" + dslLogoImgPath.text() + "' alt='" + dslLogoImgDesc.text() + "'/>";
									storeHtml += "</p>";
								}
								storeHtml += "<div class='whereEtc'>";
								
								// UAE Title and tip[Sitecode : ae] 2015.02.12
								if(retailerSiteCode == 'ae') {
									storeHtml += "<h4 class='where-etc-title'>Nearest store located is:</h4>";
								}
								// UAE Title and tip[Sitecode : ae_ar] 2015.02.12
								if(retailerSiteCode == 'ae_ar') {
									storeHtml += "<h4 class='where-etc-title'>أقرب متجر تم تحديده هو:</strong></h4>";
								}


								// ru contents add [Sitecode : ru] 2015.10.7
								if(retailerSiteCode == 'ru') {
									storeHtml += "<p class='NearbyShops'>Ближайший магазин: </p>";
								}
								
								storeHtml += "	<p><strong>" + name.text() + "</strong></p>";
								storeHtml += "  <p>";
								if (city.text() != "") {
									storeHtml += city.text() + ", ";
								}
								storeHtml += "		<strong>" + distance.text() + " " + onlineRetailerMsg.milekmText + "</strong></p>";
								storeHtml += "</div>";
								storeHtml += "<p class='store-address'>" + address(contact); + "</p>";
								if (phone.text() != "") {
									storeHtml += "<p class='store-phone'><span class='stand-out'>" + onlineRetailerMsg.phonemsg + " : </span>" + phone.text() + "</p>";
								}
								if (email.text() != "") {
									storeHtml += "<p class='store-phone'>";
									storeHtml += "<span class='stand-out'>" + onlineRetailerMsg.emailmsg + " : </span>";
									storeHtml += "<a href='mailto:'" + email.text() + "''> " + email.text() + "</a>";
								}
								storeHtml += "</p>";
								if (oprTime.text() != "") {
									storeHtml += "<p class='etc-details mt10'>" + oprTime.text().replace(/\n/g, '<br/>') + "</p>";
								}


								// ru contents add [Sitecode : ru] 2015.10.7
								if(retailerSiteCode == 'ru') {
									storeHtml +="<p class='NearbyShopsTip'>Уточняйте наличие модели в магазине</p>";
								}

// 2014.11.11 - au 사이트일 때만 disclaimer 추가
								if( retailerSiteCode == 'au' ) {
									storeHtml += "<br><p>Please contact the store to confirm product availability. To view all stores click Go To Store Locator below.<p>";
								}
								
								// UAE Title and tip[Sitecode : ae] 2015.02.12
								if(retailerSiteCode == 'ae') {
									storeHtml += "<p class='store-check'>Prices, inventory and promotions may vary by retailer.<br/>Please call the store first to check actual availability of this item.</p>";
								}
								// UAE Title and tip[Sitecode : ae_ar] 2015.02.12
								if(retailerSiteCode == 'ae_ar') {
									storeHtml += "<p class='store-check'>قد تختلف الأسعار، المنتجات المتوفرة والعروض الترويجية باختلاف المتجر. يرجى الاتصال بالمتجر أولاً للتحقق منتوفر المنتج المطلوب.</p>";
								}								
								

								storeHtml += "<div class='bottom-wrap'>";
								storeHtml += "	<a href='#' class='button btnstore'>" + onlineRetailerMsg.gotostore + "</a>";
								storeHtml += "</div>";
								
								// [14.08.19] tw국가만 BUY_IN_STORE영역에 구매옵션 마크업 적용.
								if(SITE_CD == 'tw' || SITE_CD == 'kz_ru'){
									storeHtml += "</div>";	
								}
								
								$storeTemplate.append(storeHtml);
								
								function address(contact) {
									var address = "";
									if (SITE_CD == 'jp') {
										if (contact.find("postalCode").text() != "")
											address = contact.find("postalCode").text();
										if (contact.find("city").text() != "")
											address += ", " + contact.find("city").text();
										if (contact.find("address").text() != "")
											address += ", " + contact.find("address").text();
									} else {
										if (contact.find("address").text() != "")
											address = contact.find("address").text();
										if (contact.find("city").text() != "")
											address += ", " + contact.find("city").text();
										if (contact.find("area").text() != "")
											address += ", " + contact.find("area").text();
										if (contact.find("postalCode").text() != "")
											address += ", " + contact.find("postalCode").text();
									}
									return address;
								}
							});
						} /*else if (SITE_CD == 'jp' && storelocatorList.attr("storeLocatorListCnt") == 0) { // jp PDP buy instore 없을 경우, 탭 미노출 처리
							var $buyInstoreTemplate = $('.shop-popover ul li a[data-focus-id="buy-instore-tab"]').parent();
							$buyInstoreTemplate.empty();
						}*/ else {
							popoverDefaultHeight($storeTemplate, onlineRetailerMsg.storeNoData, 'buyinstore');
						}
					// BUY IN-STORE TAB. [END]
					},
					error: function(xhr, st, err) {
						console.info("error", err);
					}
				
				});
			});
		};
	}(jQuery));
	
    $(function() {
 	   storeLocator = new ss.StoreLocator();
	});
	
    // storelocator로 이동.
	$('.btnstore').live('click', function() {
		sendClickCode('locator','locator|' + retailerModelName.toLowerCase() + '');

		if(SITE_CD == 'jp') {
			ga('send', 'event', 'Buy '+typeNmGglTag, 'button click', dispNmGglTag);
			location.href="/jp/galaxyshop/#shoplist";
			return true;
		}

		// outlink가 있는 국가는 outlink에 설정되어있는 url로 이동하도록 수정. (fr, cn)
		if($.trim(onlineRetailerMsg.outLinkUrl) != ""){
			var actionUrl = "";
			if (SITE_CD == 'fr') {
				actionUrl = onlineRetailerMsg.outLinkUrl + "?id=" + retailerModelCode;
			} else if (SITE_CD == 'cn'){
				var typeVal = retailerGroupName == 'mobile-phones' ? "1" : "2";
				actionUrl = onlineRetailerMsg.outLinkUrl + "?type=" + typeVal + "&ng_productType=" + retailerTypeName + "&model_nm=" + retailerModelName;
				
				console.info("actionUrl >>>>>>>> ", actionUrl);
			}
			$("#onlineRetailerfrm").attr("action", actionUrl);
			
		} else {
			
			$("#storeModelCode").val(retailerModelCode);
			$("#storeModelName").val(retailerModelName);
			$("#storeIaCode").val(retailerIaCode);
			
		}
		
		$("#onlineRetailerfrm").submit();
	});
	
	function popoverDefaultHeight(tabClass, msg, flag) {
		var msgHtml = "";
		
		// [14.08.19] tw국가만 BUY_IN_STORE영역에 구매옵션 마크업 적용.
		if((SITE_CD == 'tw' || SITE_CD == 'kz_ru') && flag == "buyinstore"){
			var expLinkUrl = SITE_CD == 'tw' ? '/tw/support/channels/index.html' : 'http://www.samsung.com/kz_ru/brandshops/';
			msgHtml += "<div class='tw-contents'>";

			if(SITE_CD != 'kz_ru'){
				msgHtml += "<h3 class='tit'>" + onlineRetailerMsg.provincialSalesText1 + "</h3>";
				msgHtml += "<a href='" + expLinkUrl + "' class='button btnstore-01'>" + onlineRetailerMsg.provincialSalesText2 + "</a>";
			}

			msgHtml += "<h4 class='sub-tit'>" + onlineRetailerMsg.provincialSalesText3 + "</h4>";
			msgHtml += "</div>";
		}
		
		msgHtml += "<div class='text-noti'>" + msg + "</div>";
		if (flag == "buyinstore") {
			msgHtml += "<div class='bottom-wrap'>";
			msgHtml += "	<a href='#' class='button btnstore'>" + onlineRetailerMsg.gotostore + "</a>";
			msgHtml += "</div>";
		}
		tabClass.html(msgHtml);
	}
	
	// online retailer tab controll.
	$('body').on('click', '.tabs.type01 li:not(.active) a', function() {
		//jeonggon.bang
		if ( retailerSiteCode != 'abc') {
			$('.tabs.type01 li').toggleClass('active');
		}
		var targetVar = $(this).attr('data-controls');
		
		// pdp, category, wishlist에서 where to buy layer popup창의 buy online, buy in-store 탭 클릭 시 tagging 호출. 
		if (targetVar == "buy-online-tabpanel") {
			if(retailerEntry == 'category'){ //category
				sendClickCode('wishlist', 'buy online||' + retailerModelName.toLowerCase() + '');
			} else { // pdp, wishlist
				sendClickCode('wishlist', 'buy online');
			}
		} else {
			if(retailerEntry == 'category'){ //category
				sendClickCode('wishlist', 'buy in-store||' + retailerModelName.toLowerCase() + '');
			} else { // pdp, wishlist
				sendClickCode('wishlist', 'buy in-store');
			}
		}
		
//		$(this).parents('.shop-popover').find('.tab-content').each(function(elm) {
//			$(this).toggleClass('show');
//		});
		//jeonggon.bang 
		 if(retailerSiteCode == 'abc')  {
		 	if (targetVar == "buy-instore-tabpanel") {
				var brandshopsUrl = "http://" + window.location.host + "/" + retailerSiteCode + "/brandshops/?modelcode=" + retailerModelCode;
		 		window.open(brandshopsUrl,"_blank");	
		 	}
		 }else {
 			$(this).parents('.shop-popover').find('.tab-content').each(function(elm) {
				$(this).toggleClass('show');
			});
		 }

		
		// buy-online & buy-instore 함께쓰는 팝업 오류 수정
		var buyonlineshow = 'tab-content buy-online show';
		var buyonline = 'tab-content buy-online';

		var buyinstoreshow='tab-content buy-instore show';
		var buyinstore = 'tab-content buy-instore';

		if(getOmniInputTag('pageTrack').value == 'product category' && retailerSiteCode =='in'){  //quickFixTwoOptionUseFlag == 'true' 사용 불가
			if($('.shop-popover ul li:first').attr('class') =='active'){ // buy-online 이 avtive일 때
				if($('.shop-tab-contents > .tab-content.buy-online').attr('class') !='tab-content buy-online show'){ // buy-online 내용이 show가 아니라면
					$('.shop-tab-contents').find('.tab-content.buy-online').attr('class', buyonlineshow); // buy-online에 show 생성
					$('.shop-tab-contents').find('.tab-content.buy-instore').attr('class', buyinstore); // buy-instore는 show 제거					
				}
			} else { // buy-instore가 acttive일 때
				if($('.shop-tab-contents > .tab-content.buy-instore').attr('class') !='tab-content buy-instore show'){ // buy-instore 내용이 show가 아니라면					
					$('.shop-tab-contents').find('.tab-content.buy-online').attr('class', buyonline);  // buy-online에 show 제거					
					$('.shop-tab-contents').find('.tab-content.buy-instore').attr('class', buyinstoreshow); // buy-instore에 show 생성
				}
			}
		}  

	});
	
	/*
	$('body').on('click', '.tab-content.buy-online button.active', function() {
		var $self = $(this);
		var prevNextBtn = $.trim($self.attr('class').replace('active',''));
		
		sendClickCode('content_click','buy online:' + prevNextBtn + '|'+ retailerModelName.toLowerCase() +'');
		
		$('.shop-tab-contents ul').each(function() {
			if ($self.hasClass('next')) {
				
				$(this).parent().find('button.prev').addClass('active');
				
				var hideLi = $(this).find('li:not(.hide)').last().nextAll();
				var loopLen = 5;
				if (hideLi.length <= loopLen) {
					loopLen = hideLi.length;
					$(this).parent().find('button.next').removeClass('active');
				}
				for (var iii = 0; iii < 5; iii++) {
					$(this).find('li:not(.hide)').eq(0).addClass('hide');
					if (loopLen > iii) {
						hideLi.eq(iii).removeClass('hide');
					}
				}
			} 
			else {
				
				$(this).parent().find('button.next').addClass('active');
				
				var hideLi = $(this).find('li:not(.hide)').first().prevAll();
				var loopLen = 5;
				if (hideLi.length <= loopLen) {
					loopLen = hideLi.length;
					$(this).parent().find('button.prev').removeClass('active');
				}
				for (var iii = 0; iii < 5; iii++) {
					$(this).find('li:not(.hide)').eq(iii).addClass('hide');
					if (loopLen > iii) {
						hideLi.eq(iii).removeClass('hide');
					}
				}
			}
		});
	});
	*/

	

