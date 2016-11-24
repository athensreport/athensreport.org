$(document).ready(function() {
    'use strict';

    var plus = false;
    var src_height = 380;

    var siteurl = $('.video-social').data('siteurl');

    // Fetch items
    var items = {
        getItems: function(data) {
            var url = '/items/' + data.category + '/' + data.timestamp + '/' + data.year + '/';
            var opts = {
                url: url
            };
            return $.ajax(opts, function() {}, function(error) {
                console.error('Error fetching', error);
            });
        },
        getItem: function(data) {
            var url = '/item/' + data.id + '/';
            var opts = {
                url: url
            };
            return $.ajax(opts, function() {}, function(error) {
                console.error('Error fetching', error);
            });
        },
    };

    function detail_load(id) {
        plus = false;
        var source = $('#details-source');
        var info = $('#details-info');
        source.html('<div class="empty-details" id="load">LOADING...</div>');
        info.html('');
        items.getItem({
            id: id
        }).done(function(item) {
            var source_html = ``;
            var info_html = ``;
            if (item.fields.category == 'Photo') {
                source_html = `
                    <img id="details-src" src="/media/${item.fields.source}" alt="${item.fields.title}" class="img-responsive">

                    <div class="video-back" id="video-back">
                        <a href="#"><img src="/static/img/back.png" alt="Back to the Project"></a>
                    </div>
                `;
            } else {
                source_html = `
                    <video id="details-src" controls class="img-responsive">
                      <source src="/media/${item.fields.source}">
                    </video>

                    <div class="video-back" id="video-back">
                        <a href="#"><img src="/static/img/back.png" alt="Back to the Project"></a>
                    </div>
                `;
            }
            source.html(source_html);

            source.ready(function() {
                var target = $('#details');
                $('html, body').animate({
                    show: target,
                    scrollTop: $(target).offset().top - 220
                }, 1000);
                info_html += `<div class="gallery-details-text" id="detail-${item.pk}" data-timestamp="${item.fields.timestamp}">`;
                if (item.fields.social_graph) {
                    info_html += `
                        <div class="gallery-cat">
                          <img src="/static/img/social.png" alt="${item.fields.title}">
                        </div>
                    `;
                } else {
                    info_html += `
                        <div class="gallery-cat">
                          <img src="/static/img/riots.png" alt="${item.fields.title}">
                        </div>
                    `;
                }
                var created = moment(item.fields.created).format('MMMM D, YYYY');
                if (item.fields.pick_date == 'Year') {
                    created = moment(item.fields.created).format('YYYY');
                }
                if (item.fields.pick_date == 'YearMonth') {
                    created = moment(item.fields.created).format('MMMM, YYYY');
                }
                if (item.fields.social_graph) {
                    info_html += `
                        <div class="gallery-title">${item.fields.title}</div>
                        <div class="gallery-year green">
                          ${created}
                        </div>
                    `;
                } else {
                    info_html += `
                        <div class="gallery-title">${item.fields.title}</div>
                        <div class="gallery-year yellow-dark">
                          ${created}
                        </div>
                    `;
                }
                if (item.fields.location) {
                    info_html += `
                        <div class="gallery-location">
                          <strong>Location:</strong>
                          ${item.fields.location}
                        </div>
                    `;
                }
                if (item.fields.credit) {
                    info_html += `
                        <div class="gallery-creator">
                          <strong>Creator:</strong>
                          ${item.fields.credit}
                    `;
                    if (item.fields.creator_url) {
                        info_html += `
                              <a href="${item.fields.creator_url}" target="_blank" style="color:black;">
                                <span class="glyphicon glyphicon-link" aria-hidden="true"></span>
                              </a>
                        `;
                    }
                    info_html += `</div>`;
                }
                if (item.fields.comment) {
                    comment = item.fields.comment;
                    info_html += `
                        <div class="gallery-comment">
                          <strong>Description:</strong>
                          <span id="comment">${comment}</span>
                        </div>
                    `;

                }
                info_html += `</div>`;
                var bottom_html = `<div class="details-bottom">`;
                bottom_html += `
                    <div class="col-xs-4">
                        <a href="#" id="comment-plus"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></a>
                    </div>
                `;
                var item_title = item.fields.title.replace(/["']/g, "");
                bottom_html += `
                    <div class="col-xs-8 social-share details-social">
                      <a href="https://www.facebook.com/sharer.php?u=${siteurl}#${item.pk}&amp;t=Athens Report: ${item_title}" target="_blank"><img src="/static/img/facebook.png" alf="facebook"></a>
                      <a href="https://twitter.com/share?text=Athens Report: ${item_title}&amp;url=${siteurl}#${item.pk} #athensreport" target="_blank"><img src="/static/img/twitter.png" alf="twitter"></a>
                      <a href="mailto:?subject=Athens Report: ${item_title}&amp;body=${siteurl}#${item.pk}"><img src="/static/img/email.png" alf="email"></a>
                    </div></div>
                `;
                bottom_html += `</div>`;
                info.html('<div class="empty-details"><img src="/static/img/loader.gif" alt="loading..."></div>');
                function details_content() {
                    info.html(info_html + bottom_html);
                    src_height = $('#details-src').height();
                    var width = $('.gallery-cat').width();
                    $('.details-bottom').css('width', width);
                    $('#details-info').css('height', src_height);
                    $('.gallery-details-text').css('height', src_height - 30);
                    $('.gallery-details-text').css('overflow', 'hidden');
                }
                var refreshId = setInterval(function() {
                    var check_height = 300;
                    if (screen.width < 950) {
                        check_height = 220;
                    }
                    if ($('#details-src').height() > check_height) {
                        clearInterval(refreshId);
                        details_content();
                    }
                }, 1000);
            });
        });
    }

    // Initiate Item details
    $('body').on('itemsloaded', function() {
        $('.details').on('click', function(event) {
            event.preventDefault();
            var id = $(this).data('id');
            var loc = window.location.href;
            window.location.hash = id;
            detail_load(id);
        });
    });

    // Render gallery
    var render = function(params) {
        var elements = '';

        if (params.length) {
            params.forEach(function(item) {
                var element = `
                  <div class="col-sm-6 gallery-item">
                    <a href="#" class="details" data-id="${item.pk}">
                      <img src="/media/${item.fields.source_thumb}" alt="${item.fields.title}" class="gallery-thumb">
                    </a>
                    <p class="details-title">${item.fields.title}</p>
                `;
                var pubdate = ``;
                var created = moment(item.fields.created).format('MMMM D, YYYY');
                if (item.fields.pick_date == 'Year') {
                    created = moment(item.fields.created).format('YYYY');
                }
                if (item.fields.pick_date == 'YearMonth') {
                    created = moment(item.fields.created).format('MMMM, YYYY');
                }
                if (item.fields.social_graph) {
                    pubdate = `
                        <p class="details-created social-graph-date yellow-dark">${created}</p>
                    `;
                } else {
                    pubdate = `
                        <p class="details-created yellow-dark">${created}</p>
                    `;
                }
                if (item.fields.category == 'Photo') {
                    var cat_icon = `
                          <div class="details-cat-icon">
                            <img src="/static/img/photo.png" alt="photo">
                          </div>
                        </div>
                    `;
                } else {
                    var cat_icon = `
                          <div class="details-cat-icon">
                            <img src="/static/img/video.png" alt="video">
                          </div>
                        </div>
                    `;
                }
                elements += (element + pubdate + cat_icon);
            });
        } else {
            elements = `<p class="empty-gallery">
                No Gallery items on this location or year yet.<br>
                <a href="/upload/" class="yellow-dark">Upload</a> your archives.
            </p>`;
        }

        var rendered = `${elements}`;

        return rendered;
    };

    var gallery = $('#gallery-items');
    var category = $(gallery).data('category');
    var comment = '';
    var short_comment = '';

    // Filter by year
    $('.year-pick').on('click', function(event) {
        event.preventDefault();
        gallery.html('<div class="empty-gallery" id="load">LOADING...</div>');
        currentYear = $(this).data('year');
        $('#years > img').attr('src', '/static/img/years_' + currentYear + '.png');
        items.getItems({
            category: category,
            timestamp: currentTime,
            year: currentYear
        }).done(function(data) {
            gallery.html(render(data));
            $('body').trigger('itemsloaded');
        });
    });

    function show_full_comment() {
        $('#details-info').css('height', 'auto');
        $('.gallery-details-text').css('height', 'auto');
        $('.gallery-details-text').css('overflow', 'show');
        $('.details-bottom').css('position', 'relative');
        plus = true;
    }

    function hide_full_comment() {
        $('#details-info').css('height', src_height);
        $('.gallery-details-text').css('height', src_height - 30);
        $('.gallery-details-text').css('overflow', 'hidden');
        $('.details-bottom').css('position', 'absolute');
        plus = false;
    }

    // Show full comment
    $(document).on('click', '#comment-plus', function(event) {
        event.preventDefault();
        var plus_pos = $('.details-bottom').position().top;
        console.log(plus_pos);
        if (plus) {
            hide_full_comment();
        } else {
            show_full_comment();
            var new_plus_pos = $('.details-bottom').position().top;
            console.log(new_plus_pos);
            if (new_plus_pos < plus_pos) {
                hide_full_comment();
                plus = false;
            }
        }
    });

    // Select all things
    var pop = document.getElementById("thevideo");
    var route = $('.route');
    var route_title = $('.route-title');
    var elm_gallery = $('#gallery');
    var elm_strip = $('#gallery-strip');
    var elm_back = $('#video-back');
    var elm_detailsSource = $('#details-source');
    var elm_detailsInfo = $('#details-info');

    // Keep the moments
    var currentTime;
    var currentYear = 2008;

    // Back to video
    $(document).on('click', '#video-back', function () {
        $('body, html').animate({
            scrollTop: 0
        }, 800);
        pop.play();
        return false;
    });

    // Catch pause event and send over the current position
    pop.onpause = function() {
        currentTime = this.currentTime;
        elm_gallery.slideDown();
        elm_strip.slideDown();
        route.hide();
        route_title.hide();
        $('#years > img').attr('src', '/static/img/years_' + currentYear + '.png');
        items.getItems({
            category: category,
            timestamp: currentTime,
            year: currentYear
        }).done(function(data) {
            if (Modernizr.templatestrings) {
                gallery.html(render(data));
                $('body').trigger('itemsloaded');
            } else {
                gallery.html('<div class="empty-details" id="load">Please update your browser to the latest version, or use a more modern one like <a href="https://www.mozilla.org/firefox/" target="_blank">Firefox</a></div>');
            }
        });
        var help = `<a href="#" id="help-play">Play to go to map</a>`;
        $('.video-help').html(help);
    };

    // Hide elements on play
    pop.onplay = function() {
        route.show();
        route_title.show();
        elm_gallery.slideUp();
        elm_strip.slideUp();
        elm_detailsSource.text('');
        elm_detailsInfo.text('');
        elm_back.slideUp();
        $('#details-info').css('height', 'auto');
        $('.gallery-details-text').css('height', 'auto');
        var help = `Click on the map to go to riot zones and pause to go to galleries`;
        $('.video-help').html(help);
    };

    // Start the video
    pop.volume = 0.4;

    // Jump on map
    $('.route-pick').on('click', function(event) {
        event.preventDefault();
        var point = $(this).data('point');
        pop.currentTime = point;
        var help = `<a href="#" id="help-pause">Pause video to go to galleries</a>`;
        $('.video-help').html(help);
        $('body, html').animate({
            scrollTop: 0
        }, 800);
    });

    $(document).on('click', '#help-pause', function(event) {
        event.preventDefault();
        pop.pause();
    });

    $(document).on('click', '#help-play', function(event) {
        event.preventDefault();
        pop.play();
    });

    // Responsive map
    $('img[usemap]').rwdImageMaps();

    var uri = URI(location.href);
    var item_pick = uri.hash().split('#')[1];
    if (item_pick) {
        detail_load(item_pick);
        pop.pause();
    }
});
