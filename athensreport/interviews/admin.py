from django.contrib import admin

from athensreport.interviews.models import Item


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', )
    search_fields = ('name', )
