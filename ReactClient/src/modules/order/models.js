import { rootApi } from '../../configs';

export const MODULE_NAME = 'ORDER';
export const ENDPOINTS = {
  getOrderList: `${rootApi}/api/order/orders`,
  acceptOrder: (id) => `${rootApi}/api/order/orders/${id}/accept`,
  rejectOrder: (id) => `${rootApi}/api/order/orders/${id}/reject`,
  deliveredOrder: (id) => `${rootApi}/api/order/orders/${id}/delivered`,
  addDeliveryTask: `${rootApi}/api/order/orders/applyShipper`,
};

export const LIMIT = 10;
export const emptyString = '---';

export const STATUS = {
  new: { code: 'new', color: '' },
  paid: { code: 'paid', color: 'orange' },
  accepted: { code: 'accepted', color: 'blue' },
  rejected: { code: 'rejected', color: 'red' },
  delivering: { code: 'delivering', color: 'purple' },
  done: { code: 'done', color: 'green' },
};

export const PaymentTypes = {
  cash_on_delivery: { code: 'cash_on_delivery', displayText: 'Cash on delivery' },
  online_payment: { code: 'online_payment', displayText: 'Online Payment' },
};
