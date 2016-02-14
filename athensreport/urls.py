from django.conf.urls import include, url, patterns
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

from athensreport.base.urls import base_urlpatterns
from athensreport.gallery.urls import gallery_urlpatterns

urlpatterns = [
    url(r'^', include(base_urlpatterns)),
    url(r'^', include(gallery_urlpatterns)),

    url(r'^admin/', admin.site.urls),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
