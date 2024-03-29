# urls.py
from django.urls import path
from .views import (
    signup,
    home,
    index,
    signout,
    login_view,
    send_test_email,
    test,
    serve_react,
)
from django.conf import settings
from django.urls import re_path, include
from timeapp.api_views import GoalsDreamsList, ActivityTrackingList
from django.contrib.auth import views as auth_views

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
    path("api/goals-dreams/", GoalsDreamsList.as_view(), name="goals-dreams-list"),
    path(
        "api/activity-tracking/",
        ActivityTrackingList.as_view(),
        name="activity-tracking-list",
    ),
]
