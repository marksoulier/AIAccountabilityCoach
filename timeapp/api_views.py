from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import GoalsDreamsSerializer, ActivityTrackerSerializer
from .models import GoalsDreams, ActivityTracking

class GoalsDreamsList(APIView):
    def get(self, request, format=None):
        goals_dreams = GoalsDreams.objects.all()
        serializer = GoalsDreamsSerializer(goals_dreams, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = GoalsDreamsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class ActivityTrackingList(APIView):
    def get(self, request, format=None):
        activities = ActivityTracking.objects.all()
        serializer = ActivityTrackerSerializer(activities, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ActivityTrackerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
