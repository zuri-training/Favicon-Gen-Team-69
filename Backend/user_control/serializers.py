from dataclasses import field
import email
from pyexpat import model
from requests import Response
from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email')

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id','username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(username=validated_data['username'], email=validated_data['email'], password=validated_data['password'])
        
        return user 

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        print(data)
        if not CustomUser.objects.filter(username=data).exists():
            return Response('username not correct')
        
        user = authenticate(**data)
        if user and user.is_active:
                return user
            # else:
            #     return Response('Username does not exists')
                # raise serializers.ValidationError('Username does not exists') 
        raise serializers.ValidationError('Incorrect Credentials Passed.')
    

# Update Users informatiion
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"
        extra_kwargs = {
            'password': {'required': False, 'write_only': True},
            'email': {'required': False},
            'username': {'required': False},
        }