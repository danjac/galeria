from django.contrib.auth import get_user_model

from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny

from .serializers import UserSerializer, CreateUserSerializer

User = get_user_model()


class CreateUserView(CreateAPIView):
    model = User
    permission_classes = [AllowAny]
    serializer_class = CreateUserSerializer


create_user = CreateUserView.as_view()


class CurrentUserView(RetrieveAPIView):
    model = User
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

current_user = CurrentUserView.as_view()
