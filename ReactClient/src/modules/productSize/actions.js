import { createAction } from 'redux-actions';
import { MODULE_NAME } from './models';

export const getProductSizeListAction = createAction(`${MODULE_NAME}_GET_PRODUCT_SIZE_LIST`);
export const getProductSizeListSuccessAction = createAction(`${MODULE_NAME}_GET_PRODUCT_SIZE_LIST_SUCCESS`);
