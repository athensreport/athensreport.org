from django.conf.urls import url, patterns


urlpatterns = patterns(
    'athensreport.gallery.views',
    url(r'^theproject/$', 'theproject', name='theproject'),
)
