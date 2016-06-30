from django.conf import settings
from django.contrib.sites.models import Site
from django.template.loader import render_to_string


def current_site_url(request):
    current_site = Site.objects.get_current()
    url = '{0}{1}'.format(current_site.domain, request.path)
    return {'current_url': url}

def analytics(request):
    """Returns analytics code."""
    if settings.ENVIRONMENT == 'production':
        return {'analytics_code': render_to_string('includes/analytics.html',
                {'google_analytics_key': settings.GOOGLE_ANALYTICS_KEY})}
    else:
        return {'analytics_code': ''}
