from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin

from rest_framework.routers import DefaultRouter
from rest_framework_jwt.views import obtain_jwt_token

from account.views import current_user
from images.views import ImageViewSet

router = DefaultRouter()
router.register('^images', ImageViewSet)


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^api/auth-user/', current_user),
    url(r'^api/', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )
