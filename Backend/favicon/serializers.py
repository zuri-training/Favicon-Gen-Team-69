from rest_framework import serializers

from favicon.models import Favicon, Icon
from user_control.serializers import UserSerializer

class  IconSerializer(serializers.ModelSerializer):
    class Meta:
        model = Icon
        fields = ("icon", "favicon")
        extra_kwargs = {'favicon': {'write_only': True}}


class FaviconSerializer(serializers.ModelSerializer):
    author_id = serializers.IntegerField(write_only=True)

    author = UserSerializer(read_only=True)

    icons = IconSerializer(many=True, read_only=True)

    class Meta:
        model = Favicon
        fields ='__all__'
 
    # def upload(self, validated_data):
    #     # image_data = self.context.get('view').request.FILES 
    #     favicon = favicon.object.upload(
    #     validated_data['image'])

    #     return favicon

        
        