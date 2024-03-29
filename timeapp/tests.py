from django.contrib.auth.models import User
from .models import GoalsDreams
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from .models import GoalsDreams


class GoalsDreamsAPITests(APITestCase):
    def test_create_goal(self):
        """
        Ensure we can create a new goal/dream object associated with a user.
        """

        # Create a user
        test_user = User.objects.create_user(username="testuser", password="12345")

        # Log in the test client as the created user
        self.client.login(username="testuser", password="12345")

        # Generate the URL for the 'goals-dreams-list' view
        url = reverse("goals-dreams-list")

        # Define the data for the new goal/dream to be created
        data = {"goal": "Complete a Django project", "user": test_user.id}

        # Use the test client to send a POST request to the view
        response = self.client.post(url, data, format="json")

        # Perform assertions to verify the outcome of the request
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(GoalsDreams.objects.count(), 1)
        self.assertEqual(GoalsDreams.objects.get().goal, "Complete a Django project")
        self.assertEqual(GoalsDreams.objects.get().user, test_user)
