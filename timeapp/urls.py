# urls.py
from django.urls import path
from .views import (
    signup,
    home,
    signout,
    login_view,
    send_test_email,
    serve_react,
    send_personal_email,
)
from django.conf import settings
from django.urls import re_path, include
from timeapp.api_views import (
    GoalsDreamsList,
    ActivityTrackingList,
    UserView,
    UserPreferencesView,
)
from django.contrib.auth import views as auth_views
from timeapp.gpt_views import ChatWithOpenAIView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from timeapp.payment import PaymentConfirmationAPIView

urlpatterns = [
    path("", home, name="home"),
    path("accounts/", include("allauth.urls")),
    path(
        "accounts/logout/",
        auth_views.LogoutView.as_view(next_page="/accounts/login/"),
        name="account_logout",
    ),
    path("signup/", signup, name="signup"),
    path("login/", login_view, name="login"),
    re_path(
        "index/",
        serve_react,
        {"document_root": settings.REACT_APP_BUILD_PATH},
        name="index",
    ),
    path("signout/", signout, name="signout"),
    # api views
    path("api/user/profile/", UserView.as_view(), name="user-profile"),
    path(
        "api/user/preferences/", UserPreferencesView.as_view(), name="user-preferences"
    ),
    path("api/goals-dreams/", GoalsDreamsList.as_view(), name="goals-dreams-list"),
    path(
        "api/activity-tracking/",
        ActivityTrackingList.as_view(),
        name="activity-tracking-list",
    ),
    path("api/chat/", ChatWithOpenAIView.as_view(), name="chat-with-openai"),
    # for token authentication
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    # testing
    path("send-email/", send_personal_email, name="send_personal_email"),
    path("send-test-email/", send_test_email, name="send_test_email"),
    # payment
    path(
        "api/payment/confirmation/",
        PaymentConfirmationAPIView.as_view(),
        name="payment_confirmation",
    ),
    # password reset
    # Password Reset URLs
    path(
        "password_reset/",
        auth_views.PasswordResetView.as_view(
            template_name="registration/password_reset_form.html",
            email_template_name="registration/password_reset_email.html",
            subject_template_name="registration/password_reset_subject.txt",
        ),
        name="password_reset",
    ),
    path(
        "password_reset/done/",
        auth_views.PasswordResetDoneView.as_view(
            template_name="registration/password_reset_done.html"
        ),
        name="password_reset_done",
    ),
    path(
        "reset/<uidb64>/<token>/",
        auth_views.PasswordResetConfirmView.as_view(
            template_name="registration/password_reset_confirm.html"
        ),
        name="password_reset_confirm",
    ),
    path(
        "reset/done/",
        auth_views.PasswordResetCompleteView.as_view(
            template_name="registration/password_reset_complete.html"
        ),
        name="password_reset_complete",
    ),
]
