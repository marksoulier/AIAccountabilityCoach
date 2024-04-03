from django.dispatch import receiver
from django.contrib.auth.signals import user_logged_in
from rest_framework_simplejwt.tokens import RefreshToken


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
