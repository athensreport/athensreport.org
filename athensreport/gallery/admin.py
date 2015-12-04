from django.contrib import admin

from athensreport.gallery.models import Item


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'timestamp')
    list_filter = ('category', 'timestamp')
    search_fields = ('title', )
