import { identityUrl, rootApi } from '../../configs';

export const MODULE_NAME = 'PAYMENT';
export const ENDPOINTS = {
  createPaymentIntent: (id) => `${identityUrl}/api/payment/${id}`,
  createOrder: `${rootApi}/api/order/orders`,
};
