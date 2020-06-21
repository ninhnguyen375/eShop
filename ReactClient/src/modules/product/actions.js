import { createAction } from 'redux-actions';
import { MODULE_NAME as MODULE_PRODUCT } from './models';

export const getProductList = createAction(`${MODULE_PRODUCT}_GET_PRODUCT_LIST`);
export const getProductListSuccess = createAction(`${MODULE_PRODUCT}_GET_PRODUCT_LIST_SUCCESS`);
export const getProductDetailList = createAction(`${MODULE_PRODUCT}_GET_PRODUCT_DETAIL_LIST`);
export const getProductDetailListSuccess = createAction(`${MODULE_PRODUCT}_GET_PRODUCT_DETAIL_LIST_SUCCESS`);
export default null;
