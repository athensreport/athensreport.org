# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-04-26 12:57
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gallery', '0009_auto_20160411_1521'),
    ]

    operations = [
        migrations.CreateModel(
            name='UploadedItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('surname', models.CharField(max_length=100)),
                ('nickname', models.CharField(blank=True, max_length=100)),
                ('email', models.EmailField(max_length=100)),
                ('url', models.URLField(blank=True, max_length=100)),
                ('source', models.FileField(blank=True, null=True, upload_to=b'uploaded_items')),
                ('video_title', models.CharField(max_length=100)),
                ('location', models.CharField(max_length=100)),
                ('event_date', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True)),
                ('uploaded', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
