from django.db import models
from django.contrib.auth.models import User

# Make email filed required
User._meta.get_field('email')._unique = True
User._meta.get_field('email').blank = False
User._meta.get_field('email').null = False

class CustomUser(User):
    phone = models.BigIntegerField(blank=True, null=True)
