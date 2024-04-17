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
                    "content": "Give the user a summarization of their goal in a single clear sentence. If their goal needs improvement, kindly offer them suggestions on how they could edit it to make it more SMART. Give specific instructions for the relevant SMART element. Once the goal is good enough, or if it is good enough at the start, congradulate the user on their goal and get them excited to start their goal accountability process. Make sure to keep the entire response under 3-4 sentences total.",
                },
                {"role": "user", "content": user_input},
            ],
            temperature=0,
        )

        # Extract the response content
        response_content = completion.choices[0].message.content

        # Return the response content as JSON
        return Response({"response": response_content}, status=status.HTTP_200_OK)
