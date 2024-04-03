# your_app/tests/test_api.py
from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse


class OpenAITests(TestCase):
    def setUp(self):
        # The APIClient instance will be used to make requests to the API
        self.client = APIClient()

    def test_chat_with_openai(self):
        """
        Ensure we can send a request to the OpenAI chat API and get a response.
        """
        # Define the URL for your chat_with_openai endpoint
        url = reverse("chat_with_openai")

        # Simulate a POST request with test content
        data = {"content": "Hello, how are you?"}
        response = self.client.post(url, data, format="json")

        # Check that the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Optional: Check if the response content is not empty or has expected content
        self.assertTrue("response" in response.data)
        # This check can be more specific based on known output for given input
