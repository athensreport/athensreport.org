from django.contrib import admin
from django.contrib.flatpages.admin import FlatPageAdmin, FlatpageForm
from django.contrib.flatpages.models import FlatPage
from django.db.models import TextField

from markdownx.fields import MarkdownxFormField
from markdownx.widgets import AdminMarkdownxWidget

from athensreport.gallery.models import Item, UploadedItem


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'video_timestamp', 'thumbnail')
    list_filter = ('category', 'timestamp')
    search_fields = ('title', )

    def name(self, obj):
        if obj.title:
            return obj.title
        else:
            return obj.id

    def video_timestamp(self, obj):
        try:
            return obj.timestamp.strftime('%H:%M:%S')
        except:
            return ''


@admin.register(UploadedItem)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'surname', 'uploaded', 'has_source', 'has_source_url', 'processed')
    list_filter = ('processed', )
    search_fields = ('video_title', )


class MyFlatPageAdmin(FlatPageAdmin):
    form = FlatpageForm
    formfield_overrides = {
        TextField: {'widget': AdminMarkdownxWidget},
    }

admin.site.unregister(FlatPage)
admin.site.register(FlatPage, MyFlatPageAdmin)
