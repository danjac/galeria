from django.contrib import admin

from imagekit.admin import AdminThumbnail

from .models import Image


class ImageAdmin(admin.ModelAdmin):
    raw_id_fields = ('user', )
    list_display = ('title', 'admin_thumbnail', )
    admin_thumbnail = AdminThumbnail(image_field='thumbnail')


admin.site.register(Image, ImageAdmin)
