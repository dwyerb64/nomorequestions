

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
            setTimeout(SEMICOLON.functions.redrawFrame, 1000/25);

            video.ontimeupdate = SEMICOLON.functions.checkVideoTime;

            SEMICOLON.functions.addMouseOvers();


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

    redrawFrame: function(){

        canvas.getContext('2d').drawImage(video,0,0, video.clientWidth,video.clientHeight);

        var ctx = canvas.getContext('2d');
        var imgd = ctx.getImageData(0, 0, canvas.width, canvas.width);

        imgd = SEMICOLON.filters.selectedFilter(imgd);

        ctx.putImageData(imgd, 0, 0);
        
        setTimeout(SEMICOLON.functions.redrawFrame, 1000/25);
        
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
            };
    },

    addMouseOvers: function(){
        $( "#icon-youtube" ).mouseover(function() {
            SEMICOLON.filters.selectedFilter = SEMICOLON.filters.redFilter;
            SEMICOLON.filters.fadeInVar = 1;

        });
        
        $( "#icon-twitter" ).mouseover(function() {
            SEMICOLON.filters.selectedFilter = SEMICOLON.filters.blueFilter;
            SEMICOLON.filters.fadeInVar = 1;
        });

        $( "#icon-facebook" ).mouseover(function() {
            SEMICOLON.filters.selectedFilter = SEMICOLON.filters.navyFilter;
            SEMICOLON.filters.fadeInVar = 1;
        });

        $( "#icon-soundcloud" ).mouseover(function() {
            SEMICOLON.filters.selectedFilter = SEMICOLON.filters.orangeFilter;
            SEMICOLON.filters.fadeInVar = 1;
        });

        $( "#icon-youtube").mouseout(function() {
          SEMICOLON.filters.selectedFilter = SEMICOLON.filters.defaultFilter;
        });

        $( "#icon-twitter").mouseout(function() {
          SEMICOLON.filters.selectedFilter = SEMICOLON.filters.defaultFilter;
        });

        $( "#icon-facebook").mouseout(function() {
          SEMICOLON.filters.selectedFilter = SEMICOLON.filters.defaultFilter;
        });      

        $( "#icon-soundcloud").mouseout(function() {
          SEMICOLON.filters.selectedFilter = SEMICOLON.filters.defaultFilter;
        });
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

        if(SEMICOLON.filters.fadeInVar < 26){
            SEMICOLON.filters.fadeInVar++;
        }

        var pix = imgd.data;
        
        for (var i=0; i<pix.length; i+=4) {
            pix[i] = (pix[i] + SEMICOLON.filters.fadeInVar) * 10;
          }

        return imgd;
    },

    navyFilter: function(imgd) {

        if(SEMICOLON.filters.fadeInVar < 26){
            SEMICOLON.filters.fadeInVar++;
        }

        var pix = imgd.data;
        
        for (var i=0; i<pix.length; i+=4) {
            pix[i+1] = (pix[i+1] + SEMICOLON.filters.fadeInVar) * 2.5;
            pix[i+2] = (pix[i+2] + SEMICOLON.filters.fadeInVar) * 10.5;
          }

        return imgd;
    },

    blueFilter: function(imgd) {

        if(SEMICOLON.filters.fadeInVar < 26){
            SEMICOLON.filters.fadeInVar++;
        }

        var pix = imgd.data;
        
        for (var i=0; i<pix.length; i+=4) {
            pix[i] = (pix[i] + SEMICOLON.filters.fadeInVar) * 3.5;
            pix[i+1] = (pix[i+1] + SEMICOLON.filters.fadeInVar) * 15.5;
            pix[i+2] = (pix[i+2] + SEMICOLON.filters.fadeInVar) * 20.5;
          }

        return imgd;
    },

    orangeFilter: function(imgd) {

        if(SEMICOLON.filters.fadeInVar < 26){
            SEMICOLON.filters.fadeInVar++;
        }

        var pix = imgd.data;
        
        for (var i=0; i<pix.length; i+=4) {
            pix[i] = (pix[i] + SEMICOLON.filters.fadeInVar) * 13.5;
            pix[i+1] = (pix[i+1] + SEMICOLON.filters.fadeInVar) * 7.5;
            pix[i+2] = (pix[i+2] + SEMICOLON.filters.fadeInVar) * 1.25;
          }

        return imgd;
    },

    fadeInVar: 1
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

