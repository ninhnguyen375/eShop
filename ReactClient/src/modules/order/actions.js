import { createAction } from 'redux-actions';
import { MODULE_NAME } from './models';

export const getOrderList = createAction(`${MODULE_NAME}_GET_ORDER_LIST`);
export const getOrderListSuccess = createAction(`${MODULE_NAME}_GET_ORDER_LIST_SUCCESS`);
