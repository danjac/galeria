from rest_framework import viewsets, permissions, status
from rest_framework.decorators import list_route
from rest_framework.response import Response


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

    @list_route()
    def search(self, request):
        """
        You could also include a 'q' param and just
        check in get_queryset(), negating requirement for the
        custom endpoint.
        """
        q = request.GET.get('q', None)
        if not q:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        qs = self.get_queryset().filter(
            title__icontains=q
        )

        page = self.paginate_queryset(qs)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)
