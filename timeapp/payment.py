from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
import stripe
from time_budget.keys import STRIPE_SECRET_KEY

stripe.api_key = STRIPE_SECRET_KEY


class PaymentConfirmationAPIView(APIView):
    permission_classes = [IsAuthenticated]  # Ensures the user is logged in

    def post(self, request, *args, **kwargs):
        payment_method_id = request.data.get(
            "paymentId"
        )  # Extract the payment method ID from the request

        if not payment_method_id:
            return Response(
                {"success": False, "message": "Payment method ID is missing."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            # Create a PaymentIntent with the order amount, currency, and payment method
            intent = stripe.PaymentIntent.create(
                amount=500,  # Amount is in cents, so 500 cents = $5
                currency="usd",
                payment_method=payment_method_id,
                # confirmation_method="manual",
                confirm=True,  # Automatically confirm the intent
                automatic_payment_methods={
                    "enabled": True,
                    "allow_redirects": "never",
                },
                return_url="http://127.0.0.1:8000/index",  # Specify the return URL
            )
            return Response(
                {
                    "success": True,
                    "message": "Payment processed successfully.",
                    "intent_id": intent.id,
                }
            )
        except stripe.error.CardError as e:
            # Since it's a decline, stripe.error.CardError will be caught
            body = e.json_body
            err = body.get("error", {})
            return Response(
                {"success": False, "message": f"Card error: {err.get('message')}"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {"success": False, "message": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def get(self, request, *args, **kwargs):
        # Handle GET request if needed or remove this method
        return Response(
            {"message": "GET method not supported"},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )
