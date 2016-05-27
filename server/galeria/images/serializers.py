from rest_framework import serializers

from .models import Image


class ImageSerializer(serializers.ModelSerializer):

    thumbnail = serializers.SerializerMethodField('get_thumbnail_data')

    class Meta:
        model = Image
        fields = (
            'id',
            'user',
            'image',
            'title',
            'description',
            'created_at',
            'thumbnail',
        )

        read_only_fields = ('user', 'created_at')

    def get_thumbnail_data(self, obj):

        url = obj.thumbnail.url

        request = self.context.get('request', None)
        if request is not None:
            url = request.build_absolute_uri(url)

        return {
            'url': url,
            'width': obj.thumbnail.width,
            'height': obj.thumbnail.height,
        }

    def create(self, validated_data):

        image = Image(**validated_data)

        request = self.context.get('request', None)
        if request is None:
            return image

        image.user = request.user
        image.save()
        return image
