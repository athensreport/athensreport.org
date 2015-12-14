from django.contrib import admin

from athensreport.gallery.models import Item


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'video_timestamp')
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
