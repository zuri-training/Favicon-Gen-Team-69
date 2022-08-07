from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.contrib.auth import login, logout

from rest_framework import generics
from rest_framework.response import Response

from knox.models import AuthToken
from .serializers import LoginSerializer, UpdateUserSerializer, UserSerializer, RegisterSerializer, CustomUser


from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from knox.views import LogoutView as KnoxLogoutView
from django.contrib.auth.decorators import login_required
# Create your views here.

# Register API


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# Login API


class LoginAPI(KnoxLoginView):
    queryset = CustomUser.objects.all()
    serializer_class = LoginSerializer
    permission_classes = ()

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginAPI, self).post(request, format=None)


class LogoutAPI(KnoxLogoutView):
    permission_classes = ()

    def post(self, request, format=None):
        logout(request)
        request.user.auth_token.delete()
        return Response('User Logged out successfully')


class UpdateUserProfileView(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    permissions_classes = (IsAuthenticated,)
    serializer_class = UpdateUserSerializer
