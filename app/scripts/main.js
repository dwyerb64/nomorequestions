

'use strict';

var SEMICOLON = SEMICOLON || {};

(function($){
    
  //               //
 //  FUNCTIONS    //
//               //
SEMICOLON.documentOnReady = {
    init: function(){

        if(!isMobDevice || !Modernizr.touch){ 

            video = SEMICOLON.functions.setUpVideo();

            $('#landing #videoContainerDiv').append(video);
            // landingSection.appendChild(video);

            canvas.width = $window.width();
            canvas.height = $window.height();

            video.play();
            // video.ontimeupdate = SEMICOLON.functions.checkVideoTime;
            setTimeout(SEMICOLON.functions.checkVideoTime, 1000/25)

            $( "#icon-youtube" ).mouseover(function() {
                SEMICOLON.filters.selectedFilter = 
                      SEMICOLON.filters.redFilter;
            });


            $( "#icon-youtube" ).mouseout(function() {
              SEMICOLON.filters.selectedFilter = SEMICOLON.filters.defaultFilter;
            });


        }

        $('#landing').addClass('js-loaded').fadeIn(800);

    },
    
    windowscroll: function() {
        

    }

};

SEMICOLON.functions = {
    
    setUpVideo: function(){
        video = document.createElement('video');
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

        canvas.getContext('2d').drawImage(video,0,0, video.clientWidth,video.clientHeight);

        var ctx = canvas.getContext('2d');
        var imgd = ctx.getImageData(0, 0, canvas.width, canvas.width);


        imgd = SEMICOLON.filters.selectedFilter(imgd);

        ctx.putImageData(imgd, 0, 0);
        
        setTimeout(SEMICOLON.functions.checkVideoTime, 1000/25);
        
  }
  
};

SEMICOLON.filters = {
     defaultFilter: function(imgd){ 
        return imgd;
    },

    selectedFilter: function(imgd){ 
        return imgd;
    },

    redFilter: function(imgd) {

        var pix = imgd.data;
        
        for (var i=0; i<pix.length; i+=4) {
            pix[i] = (pix[i] + 10) * 10.5;
          }

        return imgd;
    }
}


  //               //
 //  DOM objects  //
//               //
var $htmlBody = $('body,html'),
    $window = $(window),
    isMobDevice = (/iphone|ipad|Android|webOS|iPod|BlackBerry|Windows Phone|ZuneWP7/gi).test(navigator.appVersion),
    canvas = document.getElementById('videoCanvas'),
    video = null;


  //          //
 //  Events  //
//          //
$(document).ready( SEMICOLON.documentOnReady.init );

$(document).scroll( SEMICOLON.documentOnReady.windowscroll );
        
        
})(jQuery);

