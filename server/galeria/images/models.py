from django.conf import settings
from django.db import models

from imagekit import processors
from imagekit.models import ImageSpecField


class Image(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL)

    title = models.CharField(max_length=200, blank=True)
    description = models.TextField(blank=True)

    image = models.ImageField(upload_to='images')

    thumbnail = ImageSpecField(
        source='image',
        processors=[
            processors.ResizeToFill(350, 350, upscale=True),
        ],
        format='JPEG',
        options={'quality': 80},
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title or self.image
