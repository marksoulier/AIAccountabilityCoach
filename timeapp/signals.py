from django.dispatch import receiver
from django.contrib.auth.signals import user_logged_in
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.db.models.signals import post_save

from .models import (
    UserProfile,
)


# Signal to create/update UserProfile upon user creation/update
# @receiver(post_save, sender=User)
# def create_or_update_user_profile(sender, instance, created, **kwargs):
#     if created:
#         UserProfile.objects.create(user=instance)
#     else:
#         # Ensure this block only runs if you need to initialize a new profile
#         UserProfile.objects.get_or_create(user=instance)


@receiver(user_logged_in)
def post_login(sender, user, request, **kwargs):
    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)
    refresh_token = str(refresh)

    # Set tokens in HttpOnly cookies or the session
    request.session["jwt_access_token"] = access_token
    request.session["jwt_refresh_token"] = refresh_token

    print("Access Token set:", access_token)
    print("Refresh Token set:", refresh_token)
