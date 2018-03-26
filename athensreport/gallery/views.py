# -*- coding: utf-8 -*-
import json

from django.db.models import Q
from django.contrib import messages
from django.core.mail import send_mail
from django.core.urlresolvers import reverse
from django.core import serializers
from django.http import Http404, JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.template.loader import render_to_string


from athensreport.gallery.models import Item
from athensreport.gallery.forms import UploadForm


def _send_upload(form):
    name = unicode(form.cleaned_data['name'])
    surname = unicode(form.cleaned_data['surname'])
    email = unicode(form.cleaned_data['email'])
    video_title = unicode(form.cleaned_data['video_title'])

    data = {
        'nickname': unicode(form.cleaned_data['nickname']),
        'url': unicode(form.cleaned_data['url']),
        'video_title': unicode(form.cleaned_data['video_title']),
        'location': unicode(form.cleaned_data['location']),
        'event_date': unicode(form.cleaned_data['event_date']),
        'description': unicode(form.cleaned_data['description']),
        'video_title': video_title
    }

    subject = u'[upload] {0}'.format(video_title)
    message = render_to_string('gallery/upload.txt', {'data': data})
    sender = u'{0} {1} <{2}>'.format(name, surname, email)
    recipients = ['upload@athensreport.org']
    send_mail(subject, message, sender, recipients)


def items(request, category, timestamp, year):
    gallery = Item.objects.all()
    category = category[0].upper() + category[1:]
    timestamp = int(timestamp.split('.')[0]) / 60
    data = []
    if category == 'Project':
        items = gallery.filter(Q(category='Video') | Q(category='Photo')).filter(created__year=year)
        for item in items:
            minute = item.timestamp.minute
            if item.timestamp.hour > 0:
                minute = minute + 60
            low = minute - 2
            high = minute + 2
            if low <= timestamp <= high:
                data.append(item)
        response = serializers.serialize('json', data)
    else:
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
    items = Item.objects.filter(category='Video')
    return render(request, 'gallery/theproject.html',
                  {'items': items, 'category': 'project'})


def graffiti(request):
    """View to render the graffiti page."""
    items = Item.objects.filter(category='Graffiti').order_by('timestamp')
    return render(request, 'gallery/graffiti.html',
                  {'items': items, 'category': 'graffiti'})


def upload(request):
    """View to render upload form"""
    if request.method == 'POST':
        form = UploadForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            _send_upload(form)
            messages.info(request, 'Thank you. Your submussion has been sent.')
            return redirect(reverse('gallery:upload'))
        messages.error(request, 'Please fix the errors on the submission form.')
    else:
        form = UploadForm()
    return render(request, 'gallery/upload.html', {'form': form})


def upload_gr(request):
    """View to render upload form in Greek"""
    if request.method == 'POST':
        form = UploadForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            _send_upload(form)
            messages.info(request, 'Ευχαριστούμε. Η πρόταση σου εστάλη.')
            return redirect(reverse('gallery:upload_gr'))
        messages.error(request, 'Υπάρχουν κάποια λάθη στη φόρμα.')
    else:
        form = UploadForm()
    return render(request, 'gallery/upload_gr.html', {'form': form})
