from rest_framework import serializers
from .models import ActivityTracking, GoalsDreams


class ActivityTrackerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityTracking
        fields = "__all__"


class GoalsDreamsSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = GoalsDreams
        fields = "__all__"
