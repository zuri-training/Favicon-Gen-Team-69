from django.contrib import admin
from .models import Favicon, Icon

# Register your models here.
admin.site.register((Favicon, Icon))