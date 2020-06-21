import { rootApi } from '../../configs';

export const MODULE_NAME = 'CART';

export const ENDPOINTS = {
  updateCart: `${rootApi}/api/cart/carts`,
  getCart: (id) => `${rootApi}/api/cart/carts/${id}`,
};

export const emptyString = '---';
