import imp
from django.urls import path
from favicon import views

urlpatterns = [
    path('favicon/', views.FaviconListView.as_view(), name='favicon_list'),
    path('favicon_update/<int:pk>/', views.UpdateFaviconView.as_view(), name='favicon_update'),

]