var ss = $;

(function ($) {
	ss.PlaceholderInPopup = function( $container ){
		var inputs = $container.find( "[placeholder]" );
		inputs.each( function( index, ele ){
			var $ele = $( ele );
			var placeholder = $ele.attr( "placeholder" );
			$ele
			.val( placeholder )
			.off()
			.on( "focus", function(){
				if( $ele.val() == placeholder ){
					$ele.val( "" ); 
				}
			})
			.on( "blur", function(){
				if( $ele.val() == '' ){
					$ele.val( placeholder );
				}
				
				if( $ele.val() == placeholder ){
					$ele.removeClass( 'validate' )
				}else{
					$ele.addClass( 'validate' )
				}
			})
		})
		
	}
}(jQuery));

