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
                `;
                var year = item.fields.created.substr(0, 4);
                var info_html = `
                    <div class="gallery-details-text">
                    <div class="gallery-title">${item.fields.name}</div>
                    <div class="gallery-year yellow-dark">
                      ${year}
                    </div>
                    `;
                if (item.fields.location) {
                    info_html += `
                    <div>
                      <label>Location:</label> ${item.fields.location}
                    </div>
                    `;
                }
                if (item.fields.age) {
                    info_html += `
                    <div>
                      <label>Age:</label> ${item.fields.age}
                    </div>
                    `;
                }
                if (item.fields.sex) {
                    info_html += `
                    <div>
                      <label>Sex:</label> ${item.fields.sex}
                    </div>
                    `;
                }
                info_html += `
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
        });
    });

    $(document).on('click', '#details-script-reveal', function(event) {
        event.preventDefault();
        $('.script').toggle();
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
