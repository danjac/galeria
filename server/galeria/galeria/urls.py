from django.conf.urls import url
from django.contrib import admin

from rest_framework.routers import DefaultRouter
from rest_framework_jwt.views import obtain_jwt_token

from account.views import current_user

router = DefaultRouter()


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^api/auth-user/', current_user),
    url(r'^api/', router),
]
