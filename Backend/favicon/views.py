from django.http import Http404, FileResponse
from rest_framework import generics, status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from .serializers import FaviconSerializer, TextPreviewSerializer, EmojiPreviewSerializer, Favicon, CreateFaviconSerializer
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication

from .helpers import generate_favicon, text_to_image, emoji_to_image, favicons_to_zip


class FaviconListView(generics.GenericAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)  

    def get(self, request, format=None):
        favicons = request.user.favicons.all()
        serializer = FaviconSerializer(favicons, many=True)
        return Response(serializer.data)


class CreateFaviconView(generics.GenericAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        request.data["author"] = request.user.id
        serializer = CreateFaviconSerializer(data=request.data)
        favicon_sizes = [(16, 16),  (24, 24), (32, 32),
                         (48, 48), 'favicon', (128, 128)]

        if serializer.is_valid():
            favicon_type = request.data.get('type')
            if favicon_type is None:
                return Response({'details':'please pass in a file type'}, 400)
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
            generate_favicon(image, favicon_sizes, favicon)
            favicons_to_zip(favicon)
            favicon.save()
            return Response(FaviconSerializer(favicon).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FaviconViewSet(ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    http_method_name = ("get", "put", "delete")

    queryset = Favicon.objects.all()
    serializer_class = FaviconSerializer

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