$(document).ready(function() {
    'use strict';

    // Select all things
    var pop = Popcorn('#thevideo');
    var video = $('#thevideo');
    var elm_gallery = $('#gallery');
    var elm_strip = $('#gallery-strip');
    var elm_back = $('#video-back');
    var elm_detailsSource = $('#details-source');
    var elm_detailsInfo = $('#details-info');

    // Catch pause event and send over the current position
    pop.on('pause', function() {
        console.log(this.currentTime());
        elm_gallery.slideDown();
        elm_strip.slideDown();
    });

    // Hide elements on play
    pop.on('play', function() {
        elm_gallery.slideUp();
        elm_strip.slideUp();
        elm_detailsSource.text('');
        elm_detailsInfo.text('');
        elm_back.slideUp();
    });

    // Start the video
    pop.play();
});
