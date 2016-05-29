from rest_framework import viewsets, permissions


from .serializers import ImageSerializer
from .permissions import IsOwnerOrReadOnly
from .models import Image


class ImageViewSet(viewsets.ModelViewSet):

    queryset = Image.objects.order_by('-created_at')
    serializer_class = ImageSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly,
    ]
