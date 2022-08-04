from django.http import Http404
from rest_framework import generics, status
from rest_framework.response import Response
from favicon.serializers import FaviconSerializer

from favicon.models import Favicon

# Create your views here.
class FaviconListView(generics.GenericAPIView):
    def get(self, request, format=None):
        favicon = Favicon.objects.all()
        serializer = FaviconSerializer(favicon, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = FaviconSerializer(data=request.data)
        if serializer.is_valid():
            favicon = serializer.save()
            favicon.title = 'my_title'
            favicon.save()
            print(favicon.title)
            return Response(FaviconSerializer(favicon).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateFaviconView(generics.GenericAPIView):
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