from django.urls import path, include
from rest_framework.routers import DefaultRouter
from favicon import views

router = DefaultRouter()
router.register("favicon", views.FaviconViewSet, "favicon")

urlpatterns = [
    path('favicons/', views.FaviconListView.as_view(), name='favicon_list'),
    path('', include(router.urls), name='favicon'),
    path('generate_favicon/', views.CreateFaviconView.as_view(), name='favicon_generate'),
    path('text_preview/', views.TextFaviPreview.as_view(), name='text_preview'),
    path('emoji_preview/', views.EmojiFaviPreview.as_view(), name='emoji_preview'),

]