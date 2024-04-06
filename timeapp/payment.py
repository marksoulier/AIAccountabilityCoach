from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import stripe
from time_budget.keys import STRIPE_SECRET_KEY


# Payment confirmation endpoint
@csrf_exempt
@login_required
def payment_confirmation(request):
    if request.method == "POST":
        payment_id = request.POST.get("paymentId")

        # Verify the payment with Stripe
        stripe.api_key = STRIPE_SECRET_KEY
        try:
            payment_intent = stripe.PaymentIntent.retrieve(payment_id)
            if payment_intent.status == "succeeded":
                # Update user data based on payment confirmation
                # e.g., update subscription status
                return JsonResponse(
                    {
                        "success": True,
                        "message": "Payment verified and user data updated.",
                    }
                )
            else:
                return JsonResponse(
                    {"success": False, "message": "Payment verification failed."}
                )
        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)})
    return JsonResponse({"success": False, "message": "Invalid request"}, status=400)
