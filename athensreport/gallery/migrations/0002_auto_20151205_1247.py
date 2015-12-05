# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gallery', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='comment',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='item',
            name='credit',
            field=models.CharField(max_length=200, blank=True),
        ),
        migrations.AddField(
            model_name='item',
            name='year',
            field=models.PositiveSmallIntegerField(null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='item',
            name='title',
            field=models.CharField(max_length=200, blank=True),
        ),
    ]
