$(document).ready(function() {
    'use strict';

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
                var script = $('#details-script');
                var source_html = `
                    <img src="/media/${item.fields.photo1}" alt="${item.fields.name}" class="img-responsive">
                `;
                var year = item.fields.created.substr(0, 4);
                var info_html = `
                    <div class="gallery-details-text">
                    <div class="gallery-title">${item.fields.name}</div>
                    <div class="gallery-year">
                      ${year}
                    </div>
                    <div>
                      ${item.fields.location}
                    </div>
                    <div>
                      ${item.fields.age}
                    </div>
                    <div><audio src="/media/${item.fields.mp3_en}" controls></div>
                    <div><audio src="/media/${item.fields.mp3_gr}" controls></div>
                    </div>
                `;
                var social_html = `
                    <div class="social-share details-social">
                      <img src="/static/img/facebook.png" alf="facebook">
                      <img src="/static/img/twitter.png" alf="twitter">
                      <img src="/static/img/email.png" alf="email">
                    </div>
                `;
                var script_html = `
                    <div class="script">${item.fields.script}</div>
                `;
                source.html(source_html);
                info.html(info_html + social_html);
                script.html(script_html);
                $('#details-script-reveal').show();
                var target = $('#details');
                $('html, body').animate({
                    show: target,
                    scrollTop: $(target).offset().top - 130
                }, 1000);
            });
            $(this).trigger('detailsloaded');
        });
    });

    $('.details').on('detailsloaded', function() {
        $('#details-script-reveal').on('click', function(event) {
            event.preventDefault();
            $('#details-script').show();
        });
    });

    // Render gallery
    var render = function(params) {
        var elements = '';

        params.forEach(function(item) {
            var element = `
              <div class="col-md-4 gallery-item graffiti-item">
                <a href="fdsfdsf" class="details" data-id="${item.pk}">
                  <img src="/media/${item.fields.source_thumb}" alt="${item.fields.name}" class="gallery-thumb">
                </a>
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
