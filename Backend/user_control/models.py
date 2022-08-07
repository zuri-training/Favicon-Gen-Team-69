from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class CustomUser(User):
    email = models.EmailField(unique=True)
    phone = models.BigIntegerField(blank=True, null=True)