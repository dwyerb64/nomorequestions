

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

            canvas.width = $window.width();
            canvas.height = $window.height();

            video.oncanplay = SEMICOLON.functions.playVideo;

            timer = setTimeout(SEMICOLON.functions.redrawFrame, 1000/25);

            video.ontimeupdate = SEMICOLON.functions.checkVideoTime;

            SEMICOLON.functions.addMouseOvers();


        }else{
            $('#spinner-overlay').hide();
            $('#landing').fadeIn(1000);
        }

        

    },
    
    // windowscroll: function() {
        

    // },

    browserResize: function(){
        canvas.width = $window.width();
        canvas.height = $window.height();
    }

};

SEMICOLON.functions = {
    playVideo: function(){
        video.play();
        $('#spinner-overlay').hide();
        $('#landing').fadeIn(1000).addClass('js-loaded');
    },
    
    setUpVideo: function(){
        video = document.createElement('video');
        video.poster = '/images/js-images/no-more-backgrounds.jpg';
        video.preload = 'auto';
        video.id = 'videoObj';
        video.autoPlay = true;
        video.loop = true;

        // video.src = 'images/no-more-backgrounds31.mp4';
        
        if (video.canPlayType('video/mp4').length > 0) {
            /* set some video source */
            video.src = '/images/js-images/no-more-backgrounds.mp4';
        }else if (video.canPlayType('video/webm').length > 0) {
            /* set some video source */
            video.src = '/images/js-images/no-more-backgrounds.webm';
        }else if (video.canPlayType('video/ogg').length > 0) {
            /* set some video source */
            video.src = '/images/js-images/no-more-backgrounds.ogv';
        }

        return video;  

    },

    redrawFrame: function(){

        canvas.getContext('2d').drawImage(video,0,0, video.clientWidth,video.clientHeight);

        var ctx = canvas.getContext('2d');
        var imgd = ctx.getImageData(0, 0, canvas.width, canvas.width);

        imgd = SEMICOLON.filters.selectedFilter(imgd);

        ctx.putImageData(imgd, 0, 0);

        clearTimeout(timer);
        
        timer = setTimeout(SEMICOLON.functions.redrawFrame, 1000/25);
        
    },

    checkVideoTime: function(){

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
            }
    },

    addMouseOvers: function(){

        $( '.js-icon-mouse-event' ).mouseover(function() {

            var colourSelected = $(this).attr('colour');
            SEMICOLON.filters.selectedFilter = function(imgd) {
                return SEMICOLON.filters.colourFilter(imgd, SEMICOLON.filters[colourSelected], true);
            };
        });

        $( '.js-icon-mouse-event').mouseout(function() {
            var colourSelected = $(this).attr('colour');
            SEMICOLON.filters.selectedFilter = function(imgd) {
                return SEMICOLON.filters.colourFilter(imgd, SEMICOLON.filters[colourSelected], false);
            };
        });

    }


  
};

SEMICOLON.filters = {

    selectedFilter: function(imgd){ 
        return imgd;
    },

    red: [255,0,0],
    navy: [0,0,255],
    blue: [0, 255, 255],
    orange: [255, 165, 0],
    pink: [211,42,143],

    colourFilter: function(imgd, colourParams, on) {

        if(!on){
            if(SEMICOLON.filters.fadeInVar > 0){
                SEMICOLON.filters.fadeInVar--;
                return SEMICOLON.filters.colourChange(imgd, colourParams);
            }else{
                return imgd;
            }
        }

        if(SEMICOLON.filters.fadeInVar < 26){
            SEMICOLON.filters.fadeInVar++;
        }

        return SEMICOLON.filters.colourChange(imgd, colourParams);
    },

    colourChange: function(imgd, colourParams){
        var pix = imgd.data;
        var fadeInFraction = SEMICOLON.filters.fadeInVar / 25;
        for (var i=0; i<pix.length; i+=4) {
            pix[i] = pix[i] + ( colourParams[0] * fadeInFraction);
            pix[i + 1] = pix[i + 1] + ( colourParams[1] * fadeInFraction);
            pix[i + 2] = pix[i + 2] + ( colourParams[2] * fadeInFraction);     
        }

        return imgd;
    },

    fadeInVar: 1
}


  //               //
 //  DOM objects  //
//               //
var $window = $(window),
    isMobDevice = (/iphone|ipad|Android|webOS|iPod|BlackBerry|Windows Phone|ZuneWP7/gi).test(navigator.appVersion),
    canvas = document.getElementById('videoCanvas'),
    video = null,
    timer;


  //          //
 //  Events  //
//          //
$(document).ready( SEMICOLON.documentOnReady.init );

// $(document).scroll( SEMICOLON.documentOnReady.windowscroll );

$(window).resize( SEMICOLON.documentOnReady.browserResize );
        
        
})(jQuery);

