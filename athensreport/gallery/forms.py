from django import forms


class UploadForm(forms.Form):
    name = forms.CharField(max_length=100)
    surname = forms.CharField(max_length=100)
    nickname = forms.CharField(max_length=100, required=False)
    email = forms.EmailField(max_length=100)
    url = forms.URLField(max_length=100, required=False)
    video_title = forms.CharField(max_length=100)
    location = forms.CharField(max_length=100)
    event_date = forms.CharField(max_length=100)
    description = forms.CharField(widget=forms.Textarea, required=False)
