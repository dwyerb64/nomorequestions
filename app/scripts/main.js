

'use strict';

var SEMICOLON = SEMICOLON || {};

(function($){
    
  //               //
 //  FUNCTIONS    //
//               //
SEMICOLON.documentOnReady = {
    init: function(){

	  if(!isMobDevice){ // CHECK FOR MODERNIZR VARIABLE

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

        // var landingSection = document.getElementById('landing');
        $('#landing #videoContainerDiv').append(video);
        // landingSection.appendChild(video);

        canvas.width = $window.width();
        canvas.height = $window.height();

        video.play();
        video.ontimeupdate = SEMICOLON.functions.checkVideoTime;


            // add html 5 video
            // $("#videoContainer").html(
            //                 '<video id="videoObj" poster="images/no-more-backgrounds.jpg" preload="auto" loop autoplay muted>' +
            //                     // '<source src="images/video/Greenfinch Video Background_6.webm" type="video/webm"></source>' +
            //                     '<source src="images/no-more-backgrounds3.mp4" type="video/mp4"></source>' +
            //                     // '<source src="images/video/Greenfinch Video Background_6.ogg" type="video/ogg"></source>' +
            //                 '</video>' +
            //                 '<div class="video-overlay" style="background-color: rgba(173, 173, 173, 0.0);"></div>');
            // $("#videoContainer").fadeIn();


            // var videoObj = document.getElementById('videoObj');

            // SEMICOLON.functions.addVideoToCanvas(video);


        }

    },
    
    windowscroll: function() {
        

    }

};

SEMICOLON.functions = {
    
    setUpVideo: function(video){
        // var videoElement = document.getElementById('v');
        
        // var context = canvas.getContext('2d');



        
        // this.addVideoToCanvas(video,context);
        

    },

    // addVideoToCanvas: function(video){  

        
    //     setTimeout(
    //         SEMICOLON.functions.addVideoToCanvas,1000/25,video
    //         );
    // }
    // ,

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

                    // pix[j+2] = 255; // blue

                    // i+3 is alpha (the fourth element)
                }
                // ctx.putImageData(imgd,iconPosition.left  + 50,iconPosition.top  - 50);

                if(black > white){
                    $('.icon-' + i + ' .social-icon').addClass('white-icon');
                }else{
                    $('.icon-' + i + ' .social-icon').removeClass('white-icon');
                }
            };


        // if(this.currentTime > 14){
        //     // back to ink
        //     $('.social-icon').removeClass('white-icon').addClass('red-icon');
        // }else if(this.currentTime > 12){
        //     // jellyfish
        //     $('.social-icon').addClass('white-icon');
        // }else if(this.currentTime > 6){
        //     for (var i = 3; i >= 0; i--) {
        //         $('.icon-' + i + ' .social-icon').addClass('white-icon');
        //     };
        // }
        
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

