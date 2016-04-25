

'use strict';

var SEMICOLON = SEMICOLON || {};

(function($){
    
  //               //
 //  FUNCTIONS    //
//               //
SEMICOLON.documentOnReady = {
    init: function(){

        if(!isMobDevice || !Modernizr.touch){ 

            var video = SEMICOLON.functions.setUpVideo();

            $('#landing #videoContainerDiv').append(video);
            // landingSection.appendChild(video);

            canvas.width = $window.width();
            canvas.height = $window.height();

            video.play();
            video.ontimeupdate = SEMICOLON.functions.checkVideoTime;

        }

        $('#landing').addClass('js-loaded').fadeIn(500);

    },
    
    windowscroll: function() {
        

    }

};

SEMICOLON.functions = {
    
    setUpVideo: function(){
        var video = document.createElement('video');
        video.poster = "images/no-more-backgrounds.jpg";
        video.preload = "auto";
        video.id = "videoObj";
        video.autoPlay = true;
        video.loop = true;

        video.src = 'images/no-more-backgrounds3.mp4';
        
        if (video.canPlayType('video/mp4').length > 0) {
            /* set some video source */
            video.src = 'images/no-more-backgrounds3.mp4';
        }

        return video;  

    },

  checkVideoTime: function(){

        canvas.getContext('2d').drawImage(this,0,0, canvas.width,canvas.height);


        for (var i = 4; i >= 1; i--) {
                var iconPosition = $('.icon-' + i).offset();
                var ctx = canvas.getContext('2d');
                var imgd = ctx.getImageData(iconPosition.left + 50 , iconPosition.top - 50, 20, 20);
                var pix = imgd.data;

                var black = 0;
                var white = 0;
                // Loop over each pixel and invert the color.
                for (var j = 0, n = pix.length; j < n; j += 4) {

                    if(pix[j] > 127 && pix[j+1] > 127 && pix[j+2] > 127){
                        white++;
                    }else{
                        black++;
                    }

                }
                

                if(black > white){
                    $('.icon-' + i + ' .social-icon').addClass('white-icon');
                }else{
                    $('.icon-' + i + ' .social-icon').removeClass('white-icon');
                }
            };
        
  },

  updateSVGs: function(){


  }
};


  //               //
 //  DOM objects  //
//               //
var $htmlBody = $('body,html'),
    $window = $(window),
    isMobDevice = (/iphone|ipad|Android|webOS|iPod|BlackBerry|Windows Phone|ZuneWP7/gi).test(navigator.appVersion),
    canvas = document.getElementById('videoCanvas');;


  //          //
 //  Events  //
//          //
$(document).ready( SEMICOLON.documentOnReady.init );

$(document).scroll( SEMICOLON.documentOnReady.windowscroll );
        
        
})(jQuery);

