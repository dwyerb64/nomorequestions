

'use strict';

var SEMICOLON = SEMICOLON || {};

(function($){
    
  //               //
 //  FUNCTIONS    //
//               //
SEMICOLON.documentOnReady = {
    init: function(){

	  var canvas = document.getElementById('landingCanvas');
      var context = canvas.getContext('2d');
      var imageObj = new Image();

      imageObj.onload = function() {
        imageObj.width = canvas.width;
        imageObj.height = canvas.height;
        context.globalAlpha = 0.7;
        context.drawImage(imageObj, 30, 0);
        context.globalAlpha = 1.0;
        context.fillStyle="#000000";
      };
      imageObj.src = '/images/no_more.png';

      canvas.width = $window.width();
	  canvas.height = $window.height();
    },
    
    windowscroll: function() {
        

    }

};

SEMICOLON.functions = {
    
    functionName: function(){
        
  }
};



  //               //
 //  DOM objects  //
//               //
var $htmlBody = $('body,html'),
    $window = $(window),
    isMobDevice = (/iphone|ipad|Android|webOS|iPod|BlackBerry|Windows Phone|ZuneWP7/gi).test(navigator.appVersion);


  //          //
 //  Events  //
//          //
$(document).ready( SEMICOLON.documentOnReady.init );

$(document).scroll( SEMICOLON.documentOnReady.windowscroll );
        
        
})(jQuery);

