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
                var source_html = `
                    <img src="/media/${item.fields.source}" alt="${item.fields.title}" class="img-responsive">

                `;
                var info_html = `
                    <div class="gallery-title">${item.fields.title}</div>
                    <div class="gallery-year">
                      ${item.fields.year}
                    </div>
                    <div class="gallery-comment">
                      <strong>Description:</strong>
                      ${item.fields.comment}
                    </div>
                `;
                source.html(source_html);
                info.html(info_html);
                var target = $('#details');
                $('html, body').animate({
                    show: target,
                    scrollTop: $(target).offset().top - 100
                }, 1000);
            });
        });
    });

    // Render gallery
    var render = function(params) {
        var elements = '';

        params.forEach(function(item) {
            var element = `
              <div class="col-md-4 gallery-item">
                <a href="#" class="details" data-id="${item.pk}">
                  <img src="/media/${item.fields.source_thumb}" alt="${item.fields.title}" class="gallery-thumb">
                </a>
              </div>
            `;
            elements += element;
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
