from math import radians
from django.http import Http404, FileResponse
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import FaviconSerializer, TextPreviewSerializer, EmojiPreviewSerializer
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication

from favicon.models import Favicon
from .helpers import generate_favicon, text_to_image,emoji_to_image, favicons_to_zip


# Create your views here.


class FaviconListView(generics.GenericAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)  

    def get(self, request, format=None):
        favicons = Favicon.objects.all()
        serializer = FaviconSerializer(favicons, many=True)
        return Response(serializer.data)


class CreateFaviconView(generics.GenericAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):

        serializer = FaviconSerializer(data=request.data)
        favicon_sizes = [(16, 16),  (24, 24), (32, 32),
                         (48, 48), 'favicon', (128, 128)]

        if serializer.is_valid():
            favicon_type = request.data.get('type')
            if favicon_type is None:
                return Response({'details':'please pass in a file type'})
            if favicon_type == 'text':
                text_serializer = TextPreviewSerializer(data=request.data)
                text_serializer.is_valid(raise_exception=True)
                text_data = text_serializer.validated_data
                text_data["background_color"] =  tuple(text_data["background_color"])
                text_data["text_color"] =  tuple(text_data["text_color"])
                image = text_to_image(text_data)

            elif favicon_type == 'emoji':
                emoji_serializer = EmojiPreviewSerializer(data=request.data)
                emoji_serializer.is_valid(raise_exception=True)
                emoji_data = emoji_serializer.validated_data
                emoji_data["background_color"] =  tuple(emoji_data["background_color"])
                emoji_data["text_color"] =  tuple(emoji_data["text_color"])
                image = emoji_to_image(emoji_data)

            elif favicon_type == 'image':
                image = request.data.get('image')
                if image is None:
                    return Response({"details": "image field is required"})
            favicon = serializer.save()
            favicon.title = 'my_title'
            generate_favicon(image, favicon_sizes, favicon)
            favicons_to_zip(favicon)
            favicon.save()
            return Response(FaviconSerializer(favicon).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateFaviconView(generics.GenericAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    queryset = Favicon.objects.all()
    serializer_class = FaviconSerializer

    def get_object(self, pk):
        try:
            return Favicon.objects.get(pk=pk)
        except Favicon.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        favicon = self.get_object(pk)
        serializer = FaviconSerializer(favicon)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        favicon = self.get_object(pk)
        serializer = FaviconSerializer(favicon, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        favicon = self.get_object(pk)
        favicon.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class TextFaviPreview(generics.GenericAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = TextPreviewSerializer

    def post(self, request):
        serializer = TextPreviewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        text_data = serializer.validated_data
        text_data["background_color"] =  tuple(text_data["background_color"])
        text_data["text_color"] =  tuple(text_data["text_color"])

        txt_img = text_to_image(text_data)
        print(txt_img)
        return FileResponse(txt_img)

class EmojiFaviPreview(generics.GenericAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    serializer_class = EmojiPreviewSerializer

    def post(self, request):
        serializer = EmojiPreviewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        emoji_data = serializer.validated_data
        emoji_data["background_color"] =  tuple(emoji_data["background_color"])
        emoji_data["text_color"] =  tuple(emoji_data["text_color"])

        emoji_img = emoji_to_image(emoji_data)
        return FileResponse(emoji_img)        