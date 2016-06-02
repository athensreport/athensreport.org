$(document).ready(function() {
    'use strict';

    var pop = document.getElementById("thevideo");
    pop.volume = 0.4;

    var siteurl = $('.video-social').data('siteurl');

    // Fetch items
    var items = {
        getItems: function(data) {
            var url = '/interviews/';
            var opts = {
                url: url,
                data: data
            };
            return $.ajax(opts, function() {}, function(error) {
                console.error('Error fetching', error);
            });
        },
        getItem: function(data) {
            var url = '/interview/' + data.id + '/';
            var opts = {
                url: url,
                data: data
            };
            return $.ajax(opts, function() {}, function(error) {
                console.error('Error fetching', error);
            });
        },
    };

    function detail_load(id) {
        items.getItem({
            id: id
        }).done(function(item) {
            var source = $('#details-source');
            var info = $('#details-info');
            var script = $('#details-script');
            var source_html = `
                <div id="carousel-interviews" class="carousel slide" data-ride="carousel">
                    <!-- Wrapper for slides -->
                    <div class="carousel-inner" role="listbox">
                    <div class="item active"><img src="/media/${item.fields.photo1}" alt="${item.fields.name}"></div>
            `;
            if (item.fields.photo2) {
                source_html += `<div class="item"><img src="/media/${item.fields.photo2}" alt="${item.fields.name}"></div>`;
            }
            if (item.fields.photo3) {
                source_html += `<div class="item"><img src="/media/${item.fields.photo3}" alt="${item.fields.name}"></div>`;
            }
            if (item.fields.photo4) {
                source_html += `<div class="item"><img src="/media/${item.fields.photo4}" alt="${item.fields.name}"></div>`;
            }
            if (item.fields.photo5) {
                source_html += `<div class="item"><img src="/media/${item.fields.photo5}" alt="${item.fields.name}"></div>`;
            }
            if (item.fields.photo6) {
                source_html += `<div class="item"><img src="/media/${item.fields.photo6}" alt="${item.fields.name}"></div>`;
            }
            if (item.fields.photo7) {
                source_html += `<div class="item"><img src="/media/${item.fields.photo7}" alt="${item.fields.name}"></div>`;
            }
            if (item.fields.photo8) {
                source_html += `<div class="item"><img src="/media/${item.fields.photo8}" alt="${item.fields.name}"></div>`;
            }
            if (item.fields.photo9) {
                source_html += `<div class="item"><img src="/media/${item.fields.photo9}" alt="${item.fields.name}"></div>`;
            }
            if (item.fields.photo10) {
                source_html += `<div class="item"><img src="/media/${item.fields.photo10}" alt="${item.fields.name}"></div>`;
            }

            source_html += `
                    </div>

                    <!-- Controls -->
                    <a class="left carousel-control" href="#carousel-interviews" role="button" data-slide="prev">
                        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="right carousel-control" href="#carousel-interviews" role="button" data-slide="next">
                        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>

                <div class="interviews-mobile-social">
                    <div class="interviews-audio visible-sm"><span class="interviews-lang yellow-dark">GREEK</span><audio src="/media/${item.fields.mp3_gr}" controls></div>
                    <div class="interviews-audio visible-sm"><span class="interviews-lang yellow-dark">ENGLISH</span><audio src="/media/${item.fields.mp3_gr}" controls></div>
                </div>
            `;
            var year = item.fields.created.substr(0, 4);
            var info_html = `
                <div class="gallery-details-text interviews-details-text">
                    <div class="gallery-cat">
                      <img src="/static/img/bus.png" alt="online11">
                    </div>
                    <div class="gallery-title interviews-title">
                        <span class="interviews-details=location">${item.fields.location}</span>
                        <span class="bus-color">${year}</span>
                    </div>
                    <div class="interviews-name">
                        ${item.fields.name}
                    </div>
                `;
            info_html += `
                <div>
                    <label>Years in the area:</label> ${item.fields.years}<br>
                    <label>Age:</label> ${item.fields.age}
                </div>
            `;
            info_html += `
                <div>
                    <label>Nationality:</label> ${item.fields.nationality}<br>
                    <label>Sex:</label> ${item.fields.sex}
                </div>
            `;
            var social_html = `
                <div class="social-share details-social interviews-social">
                    <div class="interviews-audio hidden-sm"><span class="interviews-lang yellow-dark">GREEK</span><audio src="/media/${item.fields.mp3_gr}" controls></div>
                    <div class="interviews-audio hidden-sm"><span class="interviews-lang yellow-dark">ENGLISH</span><audio src="/media/${item.fields.mp3_gr}" controls></div>
                      <a href="https://www.facebook.com/sharer.php?u=${siteurl}#${item.pk}&amp;t=Athens Report: ${item.fields.name}" target="_blank"><img src="/static/img/facebook.png" alf="facebook"></a>
                      <a href="https://twitter.com/share?text=Athens Report: ${item.fields.name}&amp;url=${siteurl}#${item.pk}" target="_blank"><img src="/static/img/twitter.png" alf="twitter"></a>
                      <a href="mailto:?subject=Athens Report: ${item.fields.name}&amp;body=${siteurl}#${item.pk}"><img src="/static/img/email.png" alf="email"></a>
                </div>
            `;
            var script_html = `
                <div class="script">${item.fields.script}</div>
                <div class="pull-right script-options">
                    <a href="#" id="script-top"><span class="glyphicon glyphicon-menu-up" aria-hidden="true"></span></a>
                    <a href="#" id="script-close">close</a>
                </div>
            `;
            source.html(source_html);
            info.html(info_html + social_html);
            script.html(script_html);
            $('.interviews-script').css('margin-top', '20px');
            $('.script-reveal').css('margin-bottom', '20px');
            $('#details-script-reveal').show();
            var target = $('#details');
            $('html, body').animate({
                show: target,
                scrollTop: $(target).offset().top - 130
            }, 1000);
            $('.carousel').carousel({
                interval: 3000
            });

            // Seek video
            var point = new Date('01/01/2016 ' + item.fields.timestamp);
            var h = parseInt(moment(point).format('h'));
            var m = parseInt(moment(point).format('m'));
            var s = parseInt(moment(point).format('s'));
            if (h == 1) {
                m += 60;
            }
            var ctime = (m * 60) + s;
            pop.pause();
            pop.currentTime = ctime;

            $('audio').mediaelementplayer({
                audioWidth: 150,
                // height of audio player
                audioHeight: 30,
                // initial volume when the player starts
                startVolume: 0.7,
                // useful for <audio> player loops
                loop: false,
                // enables Flash and Silverlight to resize to content size
                enableAutosize: true,
                // the order of controls you want on the control bar (and other plugins below)
                features: ['playpause','progress','tracks'],
                // Hide controls when playing and mouse is not over the video
                alwaysShowControls: false,
                // force iPad's native controls
                iPadUseNativeControls: false,
                // force iPhone's native controls
                iPhoneUseNativeControls: false,
                // force Android's native controls
                AndroidUseNativeControls: false,
                // forces the hour marker (##:00:00)
                alwaysShowHours: false,
                // show framecount in timecode (##:00:00:00)
                showTimecodeFrameCount: false,
                // used when showTimecodeFrameCount is set to true
                framesPerSecond: 25,
                // turns keyboard support on and off for this instance
                enableKeyboard: true,
                // when this player starts, it will pause other players
                pauseOtherPlayers: true,
                // array of keyboard commands
                keyActions: []
            });
        });
    }

    // Initiate Item details
    $('body').on('itemsloaded', function() {
        var uri = URI(location.href);
        var item_pick = uri.hash().split('#')[1];
        if (item_pick) {
            detail_load(item_pick);
        }

        $('.details').on('click', function(event) {
            event.preventDefault();
            var id = $(this).data('id');
            var loc = window.location.href;
            window.location.hash = id;
            detail_load(id);
        });


    });

    $(document).on('click', '#details-script-reveal', function(event) {
        event.preventDefault();
        $('#details-script').slideToggle();
    });

    $(document).on('click', '#script-close', function(event) {
        event.preventDefault();
        $('#details-script').hide();
        var target = $('#details');
        $('html, body').animate({
            show: target,
            scrollTop: $(target).offset().top - 130
        }, 1000);
    });

    $(document).on('click', '#script-top', function(event) {
        event.preventDefault();
        var target = $('#details');
        $('html, body').animate({
            show: target,
            scrollTop: $(target).offset().top - 130
        }, 1000);
    });

    // Render gallery
    var render = function(params) {
        var elements = '';

        params.forEach(function(item) {
            var element = `
              <div class="col-sm-4 gallery-item graffiti-item interview-item">
                <a href="#" class="details" data-id="${item.pk}">
                  <img src="/media/${item.fields.source_thumb}" alt="${item.fields.name}" class="gallery-thumb">
                </a>
                <div class="details-title">${item.fields.location_minor}</div>
              </div>
            `;
            elements += element;
        });

        var rendered = `${elements}`;

        return rendered;
    };

    var gallery = $('#gallery-items');

    items.getItems({
    }).done(function(data) {
        gallery.html(render(data));
        $('body').trigger('itemsloaded');
    });
});
