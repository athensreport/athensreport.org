# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-04-07 11:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('interviews', '0005_auto_20160404_1307'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='location_minor',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
