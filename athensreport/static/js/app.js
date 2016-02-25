$(document).ready(function() {
    'use strict';

    $('#video-back').click(function () {
        $('body, html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
});
