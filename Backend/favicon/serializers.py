from msilib.schema import Icon
from pyexpat import model
from rest_framework import serializers
from django.contrib.auth.models import User

from favicon.models import Favicon 
from user_control.serializers import UserSerializer

class  FaviconSerializer(serializers.ModelSerializer):
    class Meta:
        model = Icon
        fields = ('id', 'image')


class FaviconSerializer(serializers.ModelSerializer):
    author_id = serializers.IntegerField(write_only=True)

    author = UserSerializer(read_only=True)

    class Meta:
        model = Favicon
        fields ='__all__'
 
    # def upload(self, validated_data):
    #     # image_data = self.context.get('view').request.FILES 
    #     favicon = favicon.object.upload(
    #     validated_data['image'])

    #     return favicon

        
        