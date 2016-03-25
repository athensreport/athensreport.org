from django.conf.urls import url, patterns

from athensreport.interviews import views

interviews_urlpatterns = ([
    url(r'^online11/$', views.online11, name='online11'),
    url(r'^interviews/$', views.interviews, name='interviews'),
    url(r'^interview/(?P<pk>\d+)/$', views.interview, name='interview'),
], 'interviews')
