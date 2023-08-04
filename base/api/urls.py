from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from .views import MyTokenObtainPairView

urlpatterns = [
    path("", view=views.getRoutes),
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("users", views.register, name="register"),
    path("users/<str:pk>", views.update_user, name="update"),
    path("matches", views.match, name="match"),
    path("matches/<str:pk>", views.messages, name="messages"),
]
