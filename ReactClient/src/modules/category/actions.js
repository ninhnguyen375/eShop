import { createAction } from 'redux-actions';
import { MODULE_NAME } from './models';

export const getCategoryListAction = createAction(`${MODULE_NAME}_GET_CATEGORY_LIST`);
export const getCategoryListSuccessAction = createAction(`${MODULE_NAME}_GET_CATEGORY_LIST_SUCCESS`);
