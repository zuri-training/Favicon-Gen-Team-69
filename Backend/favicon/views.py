from math import radians
from django.http import Http404
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import FaviconSerializer, TextPreviewSerializer
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication
from django.contrib.auth.mixins import LoginRequiredMixin


from favicon.models import Favicon
from .helpers import generate_favicon


# Create your views here.


class FaviconListView(LoginRequiredMixin, generics.GenericAPIView):
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
            image = request.data.get('image')
            if image is None:
                return Response({"details": "image field is required"})
            favicon = serializer.save()
            favicon.title = 'my_title'
            generate_favicon(image, favicon_sizes, favicon)
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
    serializer_class = TextPreviewSerializer

    def post(self, request):
        serializer = TextPreviewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        text_data = serializer.validated_data
        print(text_data)
        return Response('OK')