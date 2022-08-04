from user_control.views import RegisterAPI, LoginAPI, UpdateUserProfileView
from django.urls import path
from knox import views as knox_views

urlpatterns = [
    path('register', RegisterAPI.as_view(), name= 'register'),
    path('login', LoginAPI.as_view(), name='login'),
    path('logout', knox_views.LogoutView.as_view(), name='logout'),
    path('logoutall', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('update_profile/<int:pk>/', UpdateUserProfileView.as_view(), name='auth_update_user_profile'),
]