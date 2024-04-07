// PaymentComponent.js (or wherever it's defined)
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

// Assuming you have your publishable key in .env or some other configuration
// const stripePromise = loadStripe("pk_live_51P243k090vGdQrrLVETQaN5bP3Xbd0hgC9lUrxakZDRJ65nTBVJouqewuXXxxgBsy1mrHTrR3yuJsT0EZFElLJ9G00DxNMBDvd");

//Testing these are public keys
const stripePromise = loadStripe("pk_test_51P243k090vGdQrrLgmCOqBOJirEjX3H8pl7NCPtfm7fzubkyW1PkhNkGElLdBxvUD3aFUMAF1Om2SGpw8KlFezZR00PMuuxglU");


const PaymentComponent = () => (
    <Elements stripe={stripePromise}>
        <PaymentForm />
    </Elements>
);

export default PaymentComponent;
