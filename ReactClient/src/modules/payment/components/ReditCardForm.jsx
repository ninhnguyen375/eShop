import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';

const ReditCardForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);

    setProcessing(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });
      console.log('Ninh Debug: CheckoutForm -> result', result);
    }

    setProcessing(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button
          className="btn btn-secondary mt-5"
          type="submit"
          disabled={!stripe}
        >
          Confirm
        </button>
      </form>
    </div>
  );
};

ReditCardForm.propTypes = {
  clientSecret: PropTypes.string.isRequired,
};

export default ReditCardForm;
