# your_project_path/adapters.py
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from rest_framework_simplejwt.tokens import RefreshToken


class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):
    def save_user(self, request, sociallogin, form=None):
        user = super().save_user(request, sociallogin, form)
        # Generate JWT token for the user
        refresh = RefreshToken.for_user(user)
        # Here, you might want to send the tokens back via a redirect to a URL that your frontend can handle,
        # or store it in your session or a cookie temporarily.
        request.session["jwt_access_token"] = str(refresh.access_token)
        request.session["jwt_refresh_token"] = str(refresh)
        return user
