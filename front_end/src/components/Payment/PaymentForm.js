import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import styles from './PaymentForm.module.css'; // adjust the import path as needed
import store from '../../store';

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4"
            }
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a"
        }
    }
};

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        if (!stripe || !elements) {
            setIsLoading(false);
            return;
        }

        const card = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: card,
        });

        if (error) {
            console.log('[error]', error);
            setIsLoading(false);
        } else {
            const accessToken = store.getState().auth.accessToken;
            // Setup headers with Authorization
            console.log('[PaymentMethod]', paymentMethod);
            fetch('/api/payment/confirmation/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ paymentId: paymentMethod.id, amount: 500 }), // Specifying amount here for backend to use
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setIsLoading(false);
                    // Display success message or handle redirection here
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setIsLoading(false);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.paymentForm}>
            <CardElement options={CARD_ELEMENT_OPTIONS} className={styles.paymentInput} />
            <button type="submit" disabled={!stripe || isLoading} className={styles.submitButton}>
                {isLoading ? 'Processing...' : 'Pay $5'}
            </button>
        </form>
    );
};

export default PaymentForm;
