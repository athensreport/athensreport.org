# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gallery', '0002_auto_20151205_1247'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='creator_url',
            field=models.URLField(blank=True),
        ),
        migrations.AddField(
            model_name='item',
            name='social_graph',
            field=models.BooleanField(default=False),
        ),
    ]
