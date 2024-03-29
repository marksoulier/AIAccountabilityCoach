import openai
from django.http import JsonResponse
from time_budget.keys import API_KEY


@csrf_exempt
def chat_with_openai(request):
    # Initialize OpenAI client
    client = openai.OpenAI(api_key=API_KEY)

    # Get user input from request (handle GET or POST as needed)
    user_input = request.GET.get("input", "")  # or request.POST.get('input')

    # Create the completion
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You are ATA Mentor (All things Aviation Mentor) and you are here to help students with their aviation related questions.",
            },
            {"role": "user", "content": user_input},
        ],
    )

    # Extract the response
    response_content = completion.choices[0].message.content

    # Return the response as JSON
    return JsonResponse({"response": response_content})
