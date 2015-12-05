from django.db import models


ITEM_TYPE = ['Video', 'Photo', 'Graffiti']


class Item(models.Model):
    title = models.CharField(max_length=200, blank=True)
    category = models.CharField(choices=zip(ITEM_TYPE, ITEM_TYPE),
                                max_length=10, default='Video')
    timestamp = models.TimeField(null=True, blank=True)
    credit = models.CharField(max_length=200, blank=True)
    year = models.PositiveSmallIntegerField(null=True, blank=True)
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
