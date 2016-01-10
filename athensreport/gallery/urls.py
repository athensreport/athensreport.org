from django.conf.urls import url, patterns


urlpatterns = patterns(
    'athensreport.gallery.views',
    url(r'^theproject/$', 'theproject', name='theproject'),
    url(r'^graffiti/$', 'graffiti', name='graffiti'),
    url(r'^items/(?P<category>[\w]+)/$', 'items', name='items'),
    url(r'^item/(?P<pk>\d+)/$', 'item', name='item'),
)
