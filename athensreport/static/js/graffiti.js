$(document).ready(function() {
    'use strict';

    var pop = Popcorn('#thevideo');
    pop.play();

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
            console.log(item.fields.title);
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
            var point = $(this).data('point');
            pop.currentTime(point);
        });
    });

    $(document).on('click', '#lightbox-close', function() {
        $('#lightbox').hide();
    });
});
