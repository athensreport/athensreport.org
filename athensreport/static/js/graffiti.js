$(document).ready(function() {
    'use strict';

    var pop = document.getElementById("thevideo");
    pop.volume = 0.4;
    var g_target = null;
    var g_scroll = false;

    // Fetch item detals
    var items = {
        getItem: function(data) {
            var url = '/item/' + data.id + '/';
            var opts = {
                url: url,
                data: data
            };
            return $.ajax(opts, function() {}, function(error) {
                console.error('Error fetching', error);
            });
        },
    };

    $('.lightbox_trigger').click(function(event) {
        event.preventDefault();
        var id = $(this).data('id');
        var image_href = $(this).attr("href");
        items.getItem({
            id: id
        }).done(function(item) {
            var lightbox = `

                    <div class="content">
                    <div id="lightbox-close"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></div>
                        <div class="lightbox-img">
                            <img src="${image_href}" class="img-responsive">
                        </div>
                `;
            var created = '';
            if (item.fields.created) {
                created = moment(item.fields.created).format('YYYY');
            }
            if (item.fields.title) {
                lightbox += `
                        <div class="lightbox-info">
                            <div class="pull-left">${item.fields.title}</div>
                            <div class="pull-right">${created}</div>
                        </div>
                `;
            }
            if (item.fields.comment) {
                lightbox += `
                        <div class="lightbox-comment">${item.fields.comment}</div>
                `;
            }
            lightbox +=`
                    </div>

            `;
            $('#lightbox').html(lightbox);
            $('#lightbox').show();

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
            $('body, html').animate({
                scrollTop: 0
            }, 800);
            g_target = '#g-' + item.pk;
        });
    });

    $(document).on('click', '#lightbox-close', function() {
        $('#lightbox').hide();
        pop.play();
        g_scroll = true;
    });

    $(document).scroll(function() {
        if (g_scroll) {
            $('html, body').animate({
                show: g_target,
                scrollTop: $(g_target).offset().top - 220
            }, 1000);
            g_scroll = false;
        }
    });
});
