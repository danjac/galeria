from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        print("CHECKING IF OBJ PERMISSION", obj, request.user, request.method)
        if request.method in permissions.SAFE_METHODS:
            return True
        return (request.user.is_authenticated() and
                obj.user_id == request.user.id)
