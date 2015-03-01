/* =================================
* jQuery bgvideo v1.4
*
* TERMS OF USE - jQuery bgvideo
* 
* Copyright © 2014 Spab Rice
* All rights reserved.
================================= */
function setProportion(i,e,o,d){var t=getProportion(i,e,o,d);i.find(".vid-bg").width(t*e),i.find(".vid-bg").height(t*o),i.find(".vid-bg video").width(t*e),i.find(".vid-bg video").height(t*o);var a=(i.width()>>1)-(i.find(".vid-bg video").width()>>1)|0,r=(i.height()>>1)-(i.find(".vid-bg video").height()>>1)|0;i.find(".vid-bg video").css({left:a,top:r})}function getProportion(i,e,o,d){var t=(jQuery(window).width(),jQuery(window).height(),i.width()),a=i.height(),r=t/a,v=e/o,l=a/o;return r>=v?l=t/e:d&&a<jQuery(window).height()&&(l=jQuery(window).height()/o),l}function parallaxVideo(i){var e=i.visible(!0);if(e){var o=parseInt(jQuery(i).offset().top),d=o-jQuery(window).scrollTop(),t=-(d/1.5),a=t+"px";i.find(".vid-bg video").css({top:a})}}!function(i){i.fn.extend({bgVideo:function(){return this.each(function(i){var e=jQuery(this),o={videofile:e.data("videofile"),videowidth:e.data("videowidth"),videoheight:e.data("videoheight"),videoposter:e.data("videoposter"),videoparallax:e.data("videoparallax"),videooverlaycolor:e.data("videooverlaycolor"),videooverlayopacity:e.data("videooverlayopacity"),videosound:e.data("sound")};"absolute"!==e.css("position")&&e.css({position:"relative"});var d="";o.videooverlaycolor&&(overlay='<div class="vid-overlay" style="position:absolute;width:100%;height:100%;top:0;left:0;background:'+o.videooverlaycolor+';z-index:-2;-webkit-backface-visibility: hidden;-webkit-transform: translateZ(0);" ></div>'),d+='<div class="vid-main" style="position:absolute;width:100%;height:100%;top:0;left:0;overflow:hidden">',d+='<div class="vid-bg" style="position:absolute;width:100%;height:100%;top:0;left:0;z-index:-10;background: url('+o.videoposter+') center center; background-size: cover;">',jQuery(window).width()>1024&&(d+='<video id="video'+i+'" preload="auto" autoplay="autoplay" loop="loop"',o.videosound||(d+=' muted="muted" '),o.videoposter&&(d+=' poster="'+o.videoposter+'" '),d+='style="display:none;top:0;left:0;position: relative;z-index:-11;width:100%;height:100%;">',d+='<source src="'+o.videofile+'.mp4" type="video/mp4" />',d+='<source src="'+o.videofile+'.ogg" type="video/ogg" />',d+='<source src="'+o.videofile+'.webm" type="video/webm" />',d+="bgvideo</video>",d+="</div></div>",o.videosound&&(d+='<a href="#" class="mute-video" style="position: absolute;z-index:500; bottom:20px;left:50%;margin-left: -10px;color:#ffffff;display:block;width: 20px;height: 20px;"><i class="fa fa-volume-up fa-fw"></i></a>')),e.prepend(overlay),e.append(d),e.find(".vid-overlay").css({opacity:o.videooverlayopacity}),e.find(".vid-bg video").fadeIn(1e3),jQuery(window).width()>1024&&(setProportion(e,o.videowidth,o.videoheight,o.videoparallax),jQuery(window).resize(function(){setProportion(e,o.videowidth,o.videoheight,o.videoparallax),parallaxVideo(e)})),o.videoparallax&&(parallaxVideo(e),jQuery(window).scroll(function(){parallaxVideo(e)}))})}})}(jQuery),jQuery("body").on("click",".mute-video",function(){var i=jQuery(this).siblings(".vid-main").find("video").attr("id"),e=document.getElementById(i);return 0==e.muted?(e.muted=!0,jQuery(this).find("i").removeClass("fa-volume-up"),jQuery(this).find("i").addClass("fa-volume-off")):(e.muted=!1,jQuery(this).find("i").removeClass("fa-volume-off"),jQuery(this).find("i").addClass("fa-volume-up")),!1});