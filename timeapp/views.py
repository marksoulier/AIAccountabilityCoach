# views.py
from django.shortcuts import render, redirect
from .forms import SignUpForm, LoginForm
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required

from django.core.mail import send_mail
from django.http import HttpResponse


def send_test_email(request):
    subject = "Hello from Django"
    message = "This is a test email from Django."
    email_from = "marksoulkid@gmail.com"  # Replace with your sender email address
    recipient_list = [
        "marksoulkid@gmail.com",
    ]  # Replace with your recipient email address
    send_mail(subject, message, email_from, recipient_list, fail_silently=False)
    return HttpResponse("Test email sent!")


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


# @login_required
def serve_react(request, document_root=None):
    if not document_root or not os.path.isdir(document_root):
        # Log the error for debugging
        # logger.error(f"Invalid document_root: {document_root}")
        # Return a server error response or redirect to a custom error page
        return HttpResponseServerError("Server configuration error.")
    path = "index.html"
    path = posixpath.normpath(path).lstrip("/")
    fullpath = Path(safe_join(document_root, path))
    # Check if the requested path is a file and exists
    if fullpath.is_file():
        return static_serve(request, path, document_root=document_root)
    else:
        # Fallback to index.html, but first check if it exists
        index_path = Path(safe_join(document_root, "index.html"))
        if not index_path.is_file():
            # Log the error for debugging
            # logger.error(f"Missing index.html in document_root: {document_root}")
            # Return a 404 response or redirect to a custom error page
            return Http404("index.html not found.")
    return static_serve(request, "index.html", document_root=document_root)
