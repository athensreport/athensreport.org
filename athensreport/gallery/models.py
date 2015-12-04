from django.db import models


ITEM_TYPE = ['Video', 'Photo', 'Graffiti']


class Item(models.Model):
    title = models.CharField(max_length=200, default='')
    category = models.CharField(choices=zip(ITEM_TYPE, ITEM_TYPE),
                                max_length=10, default='Video')
    timestamp = models.TimeField(null=True, blank=True)
    source = models.FileField(upload_to='items', blank=True, null=True)
    source_large = models.FileField(upload_to='items_large', blank=True, null=True)
    source_thumb = models.FileField(upload_to='items_thumb', blank=True, null=True)

    def __unicode__(self):
        return self.title

    class Meta:
        ordering = ["timestamp", "title"]
