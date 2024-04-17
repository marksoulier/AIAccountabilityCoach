# views.py
from django.shortcuts import render, redirect
from .forms import SignUpForm, LoginForm
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required

from django.core.mail import send_mail
from django.http import HttpResponse


from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.http import HttpResponse
from time_budget import settings


def send_test_email(
    user_name, user_goal, goal_url, unsubscribe_url, recipient_list=None
):
    subject = user_name + " has shared a goal with you!"
    email_from = "no-reply@timebudget.co"

    # Populate context with the variables you want to use in the email template
    context = {
        "user_name": user_name,
        "goal_url": goal_url,
        "unsubscribe_url": unsubscribe_url,
        "user_goal": user_goal,
    }

    # Load and render the HTML template with context
    html_message = render_to_string("email/email_friend.html", context)

    # Create email
    email = EmailMessage(subject, html_message, email_from, recipient_list)
    email.content_subtype = "html"  # This is required to send HTML email

    # Send email
    email.send(fail_silently=False)

    return HttpResponse("HTML test email sent!")


def send_personal_email(request, recipient_list, user_goal, user_name):
    goal_url = "http://example.com/your-goal"  # Replace with the actual URL
    unsubscribe_url = "http://example.com/unsubscribe"  # Replace with the actual URL

    # Call your email function
    send_test_email(user_name, user_goal, goal_url, unsubscribe_url, recipient_list)

    # Return a simple HTTP response
    return HttpResponse("Email sent successfully!")


# landing page
def home(request):
    return render(request, "timeapp/home.html")


# page for creating an account
def signup(request):
    if request.method == "POST":
        form = SignUpForm(request.POST)
        if form.is_valid():
            # save the user
            form.save()
            # get the username and password
            username = form.cleaned_data.get("username")
            raw_password = form.cleaned_data.get("password1")
            # authenticate user then login
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            # redirect to index page
            return redirect("index")
    else:
        form = SignUpForm()
    return render(request, "timeapp/signup.html", {"form": form})


# for logging in
def login_view(request):
    if request.method == "POST":
        form = LoginForm(request, data=request.POST)
        if form.is_valid():
            login(request, form.get_user())
            return redirect("index")  # Redirect to home page after login
    else:
        form = LoginForm()
    return render(request, "timeapp/login.html", {"form": form})


# actual application, login is required to get in
@login_required
def index(request):
    return render(request, "timeapp/index.html")


# page for logging out
def signout(request):
    return render(request, "timeapp/home.html")


def test(request):
    # just make a tst HTTP response
    return HttpResponse("Test page")


import os
import posixpath
from pathlib import Path
from django.http import Http404, HttpResponseServerError
from django.views.static import serve as static_serve
from django.utils._os import safe_join


@login_required
def serve_react(request, document_root=None):
    if not document_root or not os.path.isdir(document_root):
        # Log the error for debugging
        # logger.error(f"Invalid document_root: {document_root}")
        return HttpResponseServerError("Server configuration error.")

    path = "index.html"
    path = posixpath.normpath(path).lstrip("/")
    fullpath = Path(safe_join(document_root, path))

    # Check if the requested path is a file and exists
    if fullpath.is_file():
        response = static_serve(request, path, document_root=document_root)
    else:
        # Fallback to index.html, but first check if it exists
        index_path = Path(safe_join(document_root, "index.html"))
        if not index_path.is_file():
            # Log the error for debugging
            # logger.error(f"Missing index.html in document_root: {document_root}")
            return Http404("index.html not found.")
        response = static_serve(request, "index.html", document_root=document_root)

    # get access_token and refresh_token from session
    access_token = request.session.get("jwt_access_token")
    refresh_token = request.session.get("jwt_refresh_token")

    print("Access Token:", access_token)
    print("Refresh Token:", refresh_token)

    # If tokens exist, set them as cookies in the response
    if access_token and refresh_token:
        response.set_cookie("jwt_access_token", access_token, httponly=False)
        response.set_cookie("jwt_refresh_token", refresh_token, httponly=False)
        # Consider setting 'secure=True' and 'samesite' attributes for production for added security

    return response
