# urls.py
from django.urls import path
from .views import (
    signup,
    home,
    signout,
    login_view,
    send_test_email,
    serve_react,
)
from django.conf import settings
from django.urls import re_path, include
from timeapp.api_views import GoalsDreamsList, ActivityTrackingList
from django.contrib.auth import views as auth_views
from timeapp.gpt_views import ChatWithOpenAIView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

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
    path("send-test-email/", send_test_email, name="send_test_email"),
    # api views
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
]
