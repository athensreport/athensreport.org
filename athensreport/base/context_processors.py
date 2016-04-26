from django.conf import settings
from django.contrib.sites.models import Site


def current_site_url(request):
    current_site = Site.objects.get_current()
    url = '{0}{1}'.format(current_site.domain, request.path)
    return {'current_url': url}
