from rest_framework import serializers
from .models import ActivityTracking, GoalsDreams, UserProfile
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # Adjust this to your UserProfile model if using a custom one
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "username",
        ]  # change user model to include subscription status


class ActivityTrackerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityTracking
        fields = "__all__"


class GoalsDreamsSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = GoalsDreams
        fields = "__all__"


class UserPreferencesSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = "__all__"
