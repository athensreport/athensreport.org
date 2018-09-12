from django.conf.urls import url

from athensreport.gallery import views

gallery_urlpatterns = ([
    url(r'^theproject/$', views.theproject, name='theproject'),
    url(r'^graffiti/$', views.graffiti, name='graffiti'),
    url(r'^items/(?P<category>[\w]+)/(?P<timestamp>[0-9.]+)/(?P<year>\d+)/$', views.items, name='items'),
    url(r'^item/(?P<pk>\d+)/$', views.item, name='item'),
    url(r'^upload/$', views.upload, name='upload'),
    url(r'^upload_gr/$', views.upload_gr, name='upload_gr'),
], 'gallery')
