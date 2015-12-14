from django.conf.urls import url, patterns


urlpatterns = patterns(
    'athensreport.gallery.views',
    url(r'^theproject/$', 'theproject', name='theproject'),
    url(r'^graffiti/$', 'graffiti', name='graffiti'),
)
