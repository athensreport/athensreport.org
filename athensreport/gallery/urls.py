from django.conf.urls import url, patterns

from athensreport.gallery import views

gallery_urlpatterns = ([
    url(r'^theproject/$', views.theproject, name='theproject'),
    url(r'^graffiti/$', views.graffiti, name='graffiti'),
    url(r'^items/(?P<category>[\w]+)/$', views.items, name='items'),
    url(r'^item/(?P<pk>\d+)/$', views.item, name='item'),
], 'gallery')
