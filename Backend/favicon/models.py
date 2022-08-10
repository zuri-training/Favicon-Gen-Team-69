from django.db import models
from user_control.models import CustomUser


class Favicon(models.Model):
    author = models.ForeignKey(CustomUser, related_name="favicons", on_delete=models.CASCADE)
    title = models.CharField(max_length=150, blank=True, null=True)
    zip_file = models.FileField(upload_to="zipfiles", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    
class Icon(models.Model):
    favicon = models.ForeignKey(Favicon, related_name="icons", on_delete=models.CASCADE)
    icon = models.ImageField(upload_to="icons")
    