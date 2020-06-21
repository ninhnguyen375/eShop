import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Information from '../components/Information';

const stripePromise = loadStripe('pk_test_25fBselmjnqzBxKDhq0l992X00fOA6uHVe');

const InformationContainer = () => (
  <Elements stripe={stripePromise}>
    <Information />
  </Elements>
);

export default InformationContainer;
