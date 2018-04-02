from django.conf.urls import include, url, patterns
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

from athensreport.base.urls import base_urlpatterns
from athensreport.gallery.urls import gallery_urlpatterns
from athensreport.interviews.urls import interviews_urlpatterns

urlpatterns = [
    url(r'^', include(base_urlpatterns)),
    url(r'^', include(gallery_urlpatterns)),
    url(r'^', include(interviews_urlpatterns)),

    url(r'^admin/', admin.site.urls),

    url(r'^markdownx/', include('markdownx.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
