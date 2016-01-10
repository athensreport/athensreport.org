import json

from django.shortcuts import render, get_object_or_404
from django.core import serializers
from django.http import Http404, JsonResponse

from athensreport.gallery.models import Item


def items(request, category):
    category = category[0].upper() + category[1:]
    items = Item.objects.filter(category=category)
    response = serializers.serialize('json', items)
    return JsonResponse(json.loads(response), safe=False)


def item(request, pk):
    item = get_object_or_404(Item, pk=pk)
    serialized = serializers.serialize('json', [item])
    response = serialized[1:-1]
    return JsonResponse(json.loads(response), safe=False)


def theproject(request):
    """View to render the project page."""
    return render(request, 'gallery/theproject.html')


def graffiti(request):
    """View to render the graffiti page."""
    items = Item.objects.filter(category='Graffiti')
    return render(request, 'gallery/graffiti.html',
                  {'items': items, 'category': 'graffiti'})
