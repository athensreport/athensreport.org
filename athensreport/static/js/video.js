$(document).ready(function() {
    'use strict';

    // Select the video
    var pop = Popcorn('#thevideo');
    var video = $('#thevideo');

    // Catch pause event and send over the current position
    pop.on('pause', function() {
        console.log(this.currentTime());
        
    });

    // Start the video
    pop.play();
});
