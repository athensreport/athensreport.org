$(document).ready(function() {
    'use strict';

    // Fetch items
    var items = {
        getItems: function(data) {
            var url = '/items/' + data.category + '/';
            var opts = {
                url: url,
                data: data
            };
            return $.ajax(opts, function() {}, function(error) {
                console.error('Error fetching', error);
            });
        },
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

    // Initiate Item details
    $('body').on('itemsloaded', function() {
        $('.details').on('click', function(event) {
            event.preventDefault();
            var id = $(this).data('id');
            items.getItem({
                id: id
            }).done(function(item) {
                var source = $('#details-source');
                var info = $('#details-info');
                if (item.fields.category == 'Photo') {
                    var source_html = `
                        <img src="/media/${item.fields.source}" alt="${item.fields.title}" class="img-responsive">
                    `;
                } else {
                    var source_html = `
                        <video controls class="img-responsive">
                          <source src="/media/${item.fields.source}">
                        </video>
                    `;
                }
                var cat_img = `
                    <div class="gallery-cat">
                      <img src="/static/img/riots.png" alt="${item.fields.title}">
                    </div>
                `
                var info_html = `
                    <div class="gallery-title">${item.fields.title}</div>
                    <div class="gallery-year yellow-dark">
                      ${item.fields.created}
                    </div>
                `;
                if (item.fields.location) {
                    var location_html = `
                        <div class="gallery-location">
                          <strong>Location:</strong>
                          ${item.fields.location}
                        </div>
                    `;
                } else {
                    var location_html = ``;
                }
                if (item.fields.credit) {
                    var creator_html = `
                        <div class="gallery-creator">
                          <strong>Creator:</strong>
                          ${item.fields.credit}
                    `;
                } else {
                    var creator_html = ``;
                }
                if (item.fields.creator_url) {
                    var creatorurl_html = `
                          <a href="${item.fields.creator_url}" target="_blank" style="color:black;">
                            <span class="glyphicon glyphicon-link" aria-hidden="true"></span>
                          </a>
                        </div>
                    `;
                } else {
                    var creatorurl_html = `</div>`;
                }
                if (item.fields.comment) {
                    var comment_html = `
                        <div class="gallery-comment">
                          <strong>Description:</strong>
                          ${item.fields.comment}
                        </div>
                    `;

                } else {
                    var comment_html = ``;
                }
                var social_html = `
                    <div class="social-share">
                      <img src="/static/img/facebook.png" alf="facebook">
                      <img src="/static/img/twitter.png" alf="twitter">
                      <img src="/static/img/email.png" alf="email">
                    </div>
                `;
                source.html(source_html);
                info.html(cat_img + info_html + location_html + creator_html + creatorurl_html + comment_html + social_html);
                var target = $('#details');
                $('html, body').animate({
                    show: target,
                    scrollTop: $(target).offset().top - 220
                }, 1000);
                $('#video-back').slideDown();
            });
        });
    });

    // Render gallery
    var render = function(params) {
        var elements = '';

        params.forEach(function(item) {
            var element = `
              <div class="col-md-6 gallery-item">
                <a href="#" class="details" data-id="${item.pk}">
                  <img src="/media/${item.fields.source_thumb}" alt="${item.fields.title}" class="gallery-thumb">
                </a>
                <p class="details-title">${item.fields.title}</p>
            `;
            /*
            if (item.fields.social_graph) {

            }*/
            var pubdate = `
              <p class="details-created yellow-dark">${item.fields.created}</p></div>
            `;
            elements += (element + pubdate);
        });

        var rendered = `${elements}`;

        return rendered;
    };

    var gallery = $('#gallery-items');
    var category = $(gallery).data('category');

    items.getItems({
        category: category
    }).done(function(data) {
        gallery.html(render(data));
        $('body').trigger('itemsloaded');
    });
});
