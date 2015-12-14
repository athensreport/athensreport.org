from django.shortcuts import render

from athensreport.gallery.models import Item

def theproject(request):
    """View to render the project page."""
    return render(request, 'gallery/theproject.html')


def graffiti(request):
    """View to render the graffiti page."""
    items = Item.objects.filter(category='Graffiti')
    return render(request, 'gallery/theproject.html', {'items': items})
