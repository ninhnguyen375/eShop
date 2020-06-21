import React from 'react';
import MainLayout from '../common/hocs/MainLayout';
import InformationContainer from '../modules/payment/containers/InformationContainer';

const CheckoutPage = () => (
  <MainLayout>
    <InformationContainer />
    <div className="mt100" />
  </MainLayout>
);

export default CheckoutPage;
