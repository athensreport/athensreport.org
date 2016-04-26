from django.forms import ModelForm
from athensreport.gallery.models import UploadedItem


class UploadForm(ModelForm):
    class Meta:
        model = UploadedItem
        exclude = ['processed']
