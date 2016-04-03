from django.db import models
from django.conf import settings


SEX = (
    ('Male', 'Male'),
    ('Female', 'Female'),
)


class Item(models.Model):
    name = models.CharField(max_length=200, blank=True)
    timestamp = models.TimeField(null=True, blank=True)
    location = models.CharField(max_length=200, blank=True)
    nationality = models.CharField(max_length=100, blank=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    created = models.DateField(null=True, blank=True)
    script = models.TextField(blank=True)
    sex = models.CharField(choices=SEX, max_length=10, default='Male')
    years = models.PositiveIntegerField(null=True, blank=True, help_text='Years living in the area')
    mp3_en = models.FileField(upload_to='items', blank=True, null=True)
    mp3_gr = models.FileField(upload_to='items', blank=True, null=True)
    source_thumb = models.FileField(upload_to='items_thumb', blank=True, null=True)
    photo1 = models.FileField(upload_to='items', blank=True, null=True)
    photo2 = models.FileField(upload_to='items', blank=True, null=True)
    photo3 = models.FileField(upload_to='items', blank=True, null=True)
    photo4 = models.FileField(upload_to='items', blank=True, null=True)
    photo5 = models.FileField(upload_to='items', blank=True, null=True)
    photo6 = models.FileField(upload_to='items', blank=True, null=True)
    photo7 = models.FileField(upload_to='items', blank=True, null=True)
    photo8 = models.FileField(upload_to='items', blank=True, null=True)
    photo9 = models.FileField(upload_to='items', blank=True, null=True)
    photo10 = models.FileField(upload_to='items', blank=True, null=True)

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ["timestamp", "name"]

    def thumbnail(self):
        return '<img src="{0}{1}" width="125" height="100">'.format(settings.MEDIA_URL,
                                                                    self.source_thumb)
    thumbnail.short_description = 'Thumbnail'
    thumbnail.allow_tags = True
