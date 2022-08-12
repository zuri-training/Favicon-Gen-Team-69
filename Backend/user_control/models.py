from django.db import models
from django.contrib.auth.models import User


class CustomUser(User):
    phone = models.BigIntegerField(blank=True, null=True)
