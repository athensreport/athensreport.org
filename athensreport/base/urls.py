from django.conf.urls import url, patterns

from athensreport.base import views

base_urlpatterns = ([
    url(r'^$', views.index, name='home'),
], 'base')
