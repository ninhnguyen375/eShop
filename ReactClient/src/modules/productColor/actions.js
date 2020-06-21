import { createAction } from 'redux-actions';
import { MODULE_NAME } from './models';

export const getProductColorListAction = createAction(`${MODULE_NAME}_GET_PRODUCT_COLOR_LIST`);
export const getProductColorListSuccessAction = createAction(`${MODULE_NAME}_GET_PRODUCT_COLOR_LIST_SUCCESS`);
