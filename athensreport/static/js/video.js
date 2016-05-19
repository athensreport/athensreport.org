$(document).ready(function() {
    'use strict';

    function checksize() {
        var video_width = $('.project-video-strip').width() + 10;
        $('#thevideo').attr('width', video_width);
        console.log(video_width);
    }

    // Show all settings on mobile
    checksize();
    $(window).resize(checksize);
});
