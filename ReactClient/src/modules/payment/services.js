import { ENDPOINTS } from './model';
import { fetchAuthLoading } from '../../common/effects';
import { mapPayloadToForm } from '../../common/utils/mapping';

export const createPaymentIntentAsync = (id, payload) => {
  const data = mapPayloadToForm(payload);

  return fetchAuthLoading({
    url: ENDPOINTS.createPaymentIntent(id),
    method: 'POST',
    data,
  });
};

export const createOrder = (payload) => {
  const order = {
    userId: payload.userId,
    userName: payload.name,
    phoneNumber: payload.phoneNumber,
    email: payload.email,
    address: payload.address,
    isOnlinePayment: payload.isOnlinePayment,
    paymentType: payload.paymentType,
    orderItems: payload.cartItems.map((x) => ({
      productId: x.specificProductId,
      count: x.count,
      productName: x.productName,
      productSize: x.size,
      imageUrl: x.imageUrl,
    })),
  };

  return fetchAuthLoading({
    url: ENDPOINTS.createOrder,
    method: 'POST',
    data: order,
  });
};

export default null;
