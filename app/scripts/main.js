

'use strict';

var SEMICOLON = SEMICOLON || {};

(function($){
    
  //               //
 //  FUNCTIONS    //
//               //
SEMICOLON.documentOnReady = {
    init: function(){

	  if(!isMobDevice){ // CHECK FOR MODERNIZR VARIABLE

            // add html 5 video
            $("#videoContainer").html(
                            '<video id="videoObj" poster="images/no-more-backgrounds.jpg" preload="auto" loop autoplay muted>' +
                                // '<source src="images/video/Greenfinch Video Background_6.webm" type="video/webm"></source>' +
                                '<source src="images/no-more-backgrounds3.mp4" type="video/mp4"></source>' +
                                // '<source src="images/video/Greenfinch Video Background_6.ogg" type="video/ogg"></source>' +
                            '</video>' +
                            '<div class="video-overlay" style="background-color: rgba(173, 173, 173, 0.0);"></div>');
            $("#videoContainer").fadeIn();


            var videoObj = document.getElementById('videoObj');
            videoObj.ontimeupdate = SEMICOLON.functions.checkVideoTime;
        }

    },
    
    windowscroll: function() {
        

    }

};

SEMICOLON.functions = {
    
    functionName: function(){
        
  },

  checkVideoTime: function(){
        if(this.currentTime > 14){
            // back to ink
            $('.social-icon').removeClass('white-icon').addClass('red-icon');
        }else if(this.currentTime > 12){
            // jellyfish
            $('.social-icon').addClass('white-icon');
        }else if(this.currentTime > 6){
            for (var i = 3; i >= 0; i--) {
                $('.icon-' + i + ' .social-icon').addClass('white-icon');
            };
        }
        
  },

  updateSVGs: function(){


  }
};

var increment = 1;

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

