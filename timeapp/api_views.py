from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from .serializer import (
    GoalsDreamsSerializer,
    ActivityTrackerSerializer,
    UserSerializer,
    UserPreferencesSerializer,
)
from .models import GoalsDreams, ActivityTracking, UserProfile
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .views import send_personal_email
from rest_framework.status import (
    HTTP_404_NOT_FOUND,
    HTTP_400_BAD_REQUEST,
    HTTP_200_OK,
)


class GoalsDreamsList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        goals_dreams = GoalsDreams.objects.filter(user=request.user)
        serializer = GoalsDreamsSerializer(goals_dreams, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = GoalsDreamsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def put(self, request, format=None):
        goal_id = request.data.get("goal_id")
        try:
            goal_object = GoalsDreams.objects.get(goal_id=goal_id, user=request.user)
        except GoalsDreams.DoesNotExist:
            return Response({"message": "Goal not found"}, status=HTTP_404_NOT_FOUND)

        serializer = GoalsDreamsSerializer(goal_object, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()

            if "connected_emails" in request.data and request.data["connected_emails"]:
                recipient_list = request.data["connected_emails"].split(",")
                print("Recipient list:", recipient_list)
                try:
                    send_personal_email(
                        request,
                        recipient_list=recipient_list,
                        user_goal=goal_object.description,
                        user_name=request.user.get_full_name() or request.user.username,
                    )
                    return Response(
                        {"message": "Email sent successfully!"}, status=HTTP_200_OK
                    )
                except Exception as e:
                    return Response({"error": str(e)}, status=HTTP_400_BAD_REQUEST)

            return Response(serializer.data)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class ActivityTrackingList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        activities = ActivityTracking.objects.filter(user=request.user)
        serializer = ActivityTrackerSerializer(activities, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ActivityTrackerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class UserPreferencesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        # Try to get the user profile, or create if not exists
        profile, created = UserProfile.objects.get_or_create(user=request.user)
        serializer = UserPreferencesSerializer(profile)
        return Response(serializer.data)

    def put(self, request, format=None):
        try:
            profile = UserProfile.objects.get(user=request.user)
        except UserProfile.DoesNotExist:
            return Response({"error": "UserProfile not found."}, status=404)

        serializer = UserPreferencesSerializer(
            profile, data=request.data, partial=True
        )  # Allow partial updates
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


from django.db import transaction


# get and change user profile
class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        # Fetch the user data
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, format=None):
        print("Request data:", request.data)
        user = request.user  # Directly use the authenticated user instance
        serializer = UserSerializer(
            user, data=request.data, partial=True
        )  # partial=True allows partial updates
        if serializer.is_valid():
            print(serializer.validated_data)
            transaction.commit()
            user.refresh_from_db()
            print("Updated data:", user.email, user.first_name, user.last_name)
            serializer.save()
            return Response(serializer.data)  # Return the updated user data
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate


class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)

        if user is not None:
            # User is authenticated; generate tokens
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                }
            )
        else:
            return Response(
                {"error": "Authentication failed"}, status=status.HTTP_401_UNAUTHORIZED
            )
