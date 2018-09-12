from django.conf.urls import url

from athensreport.base import views

base_urlpatterns = ([
    url(r'^$', views.index, name='home'),
], 'base')
