from django.db import models
from django.conf import settings


ITEM_TYPE = ['Video', 'Photo', 'Graffiti']
DATE_TYPE = ['Full', 'YearMonth', 'Year']


class Item(models.Model):
    title = models.CharField(max_length=200, blank=True)
    category = models.CharField(choices=zip(ITEM_TYPE, ITEM_TYPE),
                                max_length=10, default='Video')
    social_graph = models.BooleanField(default=False)
    timestamp = models.TimeField(null=True, blank=True)
    credit = models.CharField(max_length=200, blank=True)
    creator_url = models.URLField(max_length=200, blank=True)
    location = models.CharField(max_length=200, blank=True)
    created = models.DateField(null=True, blank=True)
    pick_date = models.CharField(choices=zip(DATE_TYPE, DATE_TYPE),
                                max_length=10, default='Full')
    source = models.FileField(upload_to='items', blank=True, null=True)
    source_large = models.FileField(upload_to='items_large', blank=True, null=True)
    source_thumb = models.FileField(upload_to='items_thumb', blank=True, null=True)
    comment = models.TextField(blank=True)

    def __unicode__(self):
        if self.title:
            return self.title
        else:
            return str(self.id)

    class Meta:
        ordering = ["timestamp", "title"]

    def thumbnail(self):
        return '<img src="{0}{1}" width="125" height="100">'.format(settings.MEDIA_URL,
                                                                    self.source_thumb)
    thumbnail.short_description = 'Thumbnail'
    thumbnail.allow_tags = True
