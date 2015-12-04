# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(default=b'', max_length=200)),
                ('category', models.CharField(default=b'Video', max_length=10, choices=[(b'Video', b'Video'), (b'Photo', b'Photo'), (b'Graffiti', b'Graffiti')])),
                ('timestamp', models.TimeField(null=True, blank=True)),
                ('source', models.FileField(null=True, upload_to=b'items', blank=True)),
                ('source_large', models.FileField(null=True, upload_to=b'items_large', blank=True)),
                ('source_thumb', models.FileField(null=True, upload_to=b'items_thumb', blank=True)),
            ],
            options={
                'ordering': ['timestamp', 'title'],
            },
        ),
    ]
