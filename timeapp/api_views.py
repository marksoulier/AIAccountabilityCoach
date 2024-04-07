from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import (
    GoalsDreamsSerializer,
    ActivityTrackerSerializer,
    UserProfileSerializer,
)
from .models import GoalsDreams, ActivityTracking
from rest_framework.permissions import IsAuthenticated


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
        try:
            # Assuming the goal ID is passed in the URL as a query parameter.
            goal_id = request.query_params.get("id")
            goal_object = GoalsDreams.objects.get(id=goal_id, user=request.user)
        except GoalsDreams.DoesNotExist:
            return Response({"message": "Goal not found"}, status=404)

        serializer = GoalsDreamsSerializer(
            goal_object, data=request.data, partial=True
        )  # partial=True allows partial update
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


# get and change user profile
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        # Fetch the user profile
        user = request.user
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)

    def put(self, request, format=None):
        user = request.user
        serializer = UserProfileSerializer(
            user, data=request.data, partial=True
        )  # Allow partial update
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


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
