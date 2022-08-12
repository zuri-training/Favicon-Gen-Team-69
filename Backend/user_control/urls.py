from user_control.views import RegisterAPI, LoginAPI, UserViewSet
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from knox import views as knox_views

router = DefaultRouter()
router.register("user", UserViewSet, "user")

urlpatterns = [
    path('register/', RegisterAPI.as_view(), name= 'register'),
    path('login/', LoginAPI.as_view(), name='login'),
    path('logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path("", include(router.urls)),
]