from django.conf.urls import url, patterns


urlpatterns = patterns(
    'athensreport.base.views',
    url(r'^$', 'index', name='home'),
)
