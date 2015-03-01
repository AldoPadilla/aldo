/* =================================
* jQuery bgvideo v1.4
*
* TERMS OF USE - jQuery bgvideo
* 
* Copyright © 2014 Spab Rice
* All rights reserved.
================================= */
function setProportion(e, t, n, r) {
    var i = getProportion(e, t, n, r);
    e.find(".vid-bg").width(i * t);
    e.find(".vid-bg").height(i * n);
    e.find(".vid-bg video").width(i * t);
    e.find(".vid-bg video").height(i * n);
    var s = (e.width() >> 1) - (e.find(".vid-bg video").width() >> 1) | 0;
    var o = (e.height() >> 1) - (e.find(".vid-bg video").height() >> 1) | 0;
    e.find(".vid-bg video").css({
        left: s,
        top: o
    })
}

function getProportion(e, t, n, r) {
    var i = jQuery(window).width();
    var s = jQuery(window).height();
    var o = i / s;
    var u = e.width();
    var a = e.height();
    var f = u / a;
    var l = t / n;
    var c = a / n;
    if (f >= l) {
        c = u / t
    } else if (r && a < jQuery(window).height()) {
        c = jQuery(window).height() / n
    }
    return c
}

function parallaxVideo(e) {
    var t = e.visible(true);
    if (t) {
        var n = parseInt(jQuery(e).offset().top);
        var r = n - jQuery(window).scrollTop();
        var i = -(r / 1.5);
        var s = i + "px";
        e.find(".vid-bg video").css({
            top: s
        })
    }
}(function(e) {
    e.fn.extend({
        bgVideo: function(e) {
            return this.each(function(e) {
                var t = jQuery(this);
                var n = {
                    videofile: t.data("videofile"),
                    videowidth: t.data("videowidth"),
                    videoheight: t.data("videoheight"),
                    videoposter: t.data("videoposter"),
                    videoparallax: t.data("videoparallax"),
                    videooverlaycolor: t.data("videooverlaycolor"),
                    videooverlayopacity: t.data("videooverlayopacity"),
                    videosound: t.data("sound")
                };
                if (t.css("position") !== "absolute") {
                    t.css({
                        position: "relative"
                    })
                }
                var r = "";
                if (n.videooverlaycolor) {
                    overlay = '<div class="vid-overlay" style="position:absolute;width:100%;height:100%;top:0;left:0;background:' + n.videooverlaycolor + ';z-index:-2;-webkit-backface-visibility: hidden;-webkit-transform: translateZ(0);" ></div>'
                }
                r += '<div class="vid-main" style="position:absolute;width:100%;height:100%;top:0;left:0;overflow:hidden">';
                r += '<div class="vid-bg" style="position:absolute;width:100%;height:100%;top:0;left:0;z-index:-10;background: url(' + n.videoposter + ') center center; background-size: cover;">';
                if (jQuery(window).width() > 1024) {
                    r += '<video id="video' + e + '" preload="auto" autoplay="autoplay" loop="loop"';
                    if (n.videosound) {} else {
                        r += ' muted="muted" '
                    }
                    if (n.videoposter) {
                        r += ' poster="' + n.videoposter + '" '
                    }
                    r += 'style="display:none;top:0;left:0;position: relative;z-index:-11;width:100%;height:100%;">';
                    r += '<source src="' + n.videofile + '.mp4" type="video/mp4" />';
                    r += '<source src="' + n.videofile + '.ogg" type="video/ogg" />';
                    r += '<source src="' + n.videofile + '.webm" type="video/webm" />';
                    r += "bgvideo</video>";
                    r += "</div></div>";
                    if (n.videosound) {
                        r += '<a href="#" class="mute-video" style="position: absolute;z-index:100050; bottom:20px;left:50%;margin-left: -10px;color:#ffffff;display:block;width: 20px;height: 20px;"><i class="fa fa-volume-up fa-fw"></i></a>'
                    } else {}
                }
                t.prepend(overlay);
                t.append(r);
                t.find(".vid-overlay").css({
                    opacity: n.videooverlayopacity
                });
                t.find(".vid-bg video").fadeIn(1e3);
                if (jQuery(window).width() > 1024) {
                    setProportion(t, n.videowidth, n.videoheight, n.videoparallax);
                    jQuery(window).resize(function() {
                        setProportion(t, n.videowidth, n.videoheight, n.videoparallax);
                        parallaxVideo(t)
                    })
                }
                if (n.videoparallax) {
                    parallaxVideo(t);
                    jQuery(window).scroll(function() {
                        parallaxVideo(t)
                    })
                }
            })
        }
    })
})(jQuery);
jQuery("body").on("click", ".mute-video", function() {
    var e = jQuery(this).siblings(".vid-bg").find("video").attr("id");
    var t = document.getElementById(e);
    if (t.muted == false) {
        t.muted = true;
        jQuery(this).find("i").removeClass("fa-volume-up");
        jQuery(this).find("i").addClass("fa-volume-off")
    } else {
        t.muted = false;
        jQuery(this).find("i").removeClass("fa-volume-off");
        jQuery(this).find("i").addClass("fa-volume-up")
    }
    return false
})
