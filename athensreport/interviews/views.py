import json

from django.shortcuts import render, get_object_or_404
from django.core import serializers
from django.http import Http404, JsonResponse

from athensreport.interviews.models import Item


def interviews(request):
    items = Item.objects.all()
    response = serializers.serialize('json', items)
    return JsonResponse(json.loads(response), safe=False)


def interview(request, pk):
    item = get_object_or_404(Item, pk=pk)
    serialized = serializers.serialize('json', [item])
    response = serialized[1:-1]
    return JsonResponse(json.loads(response), safe=False)


def online11(request):
    items = Item.objects.all()
    return render(request, 'interviews/interviews.html', {'items': items})
