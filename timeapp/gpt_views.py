from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import openai
from time_budget.keys import API_KEY
from rest_framework.permissions import IsAuthenticated


class ChatWithOpenAIView(APIView):
    # Uncomment the line below to require authentication for this view
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        Receives a POST request with user input and returns OpenAI's response.
        """
        # Initialize OpenAI client
        client = openai.OpenAI(api_key=API_KEY)

        # Get the 'content' from the POST request body
        user_input = request.data.get("content", "")

        # Create the chat completion
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "Give the user a summerization of their goal in a single clear sentence. Then give one sentance feedback as to how they can make their goal more SMART?",
                },
                {"role": "user", "content": user_input},
            ],
            temperature=0,
        )

        # Extract the response content
        response_content = completion.choices[0].message.content

        # Return the response content as JSON
        return Response({"response": response_content}, status=status.HTTP_200_OK)
