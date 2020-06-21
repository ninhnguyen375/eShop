import { createAction } from 'redux-actions';
import { MODULE_NAME as MODULE_CART } from './models';

export const clearAllCart = createAction(`${MODULE_CART}_CLEAR_ALL_CART`);
export const clearAllCartSuccess = createAction(`${MODULE_CART}_CLEAR_ALL_CART_SUCCESS`);

export const updateCart = createAction(`${MODULE_CART}_UPDATE_CART`);
export const updateCartSuccess = createAction(`${MODULE_CART}_UPDATE_CART_SUCCESS`);

export default null;
