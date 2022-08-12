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
        user = CustomUser.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        
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
class UpdateUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'first_name', 'last_name', 'email')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }
    
    def validate_email(self, value):
        user = self.context['request'].user
        if CustomUser.objects.exclude(pk=user.pk).filter(email=value).exists():
            raise serializers.ValidationError({'email': 'This email already exists.'})
        return value    

    # 
    def validate_username(self, value):
        user = self.context['request'].user
        if CustomUser.objects.exclude(pk=user.pk).filter(username=value).exists():
            raise serializers.ValidationError({'username': 'This username already exists.'})
        return value    

    def update(self, instance, validated_data):
        user = self.context['request'].user

        # makes sure the user logged in is same as the user updating the profile
        if user.pk != instance.pk:
            raise serializers.ValidationError({'authorize': 'you dont have permission to perform this function.'})


        instance.first_name = validated_data['first_name'] 
        instance.last_name = validated_data['last_name'] 
        instance.username = validated_data['username'] 
        instance.email = validated_data['email'] 

        instance.save()

        return instance