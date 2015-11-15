from django.shortcuts import render


def theproject(request):
    """View to render the project page."""
    return render(request, 'gallery/theproject.html')
