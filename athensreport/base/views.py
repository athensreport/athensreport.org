from django.shortcuts import render


def index(request):
    """View to render index page."""
    return render(request, 'base/home.html')
