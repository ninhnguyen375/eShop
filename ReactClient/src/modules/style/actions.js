import { createAction } from 'redux-actions';
import { MODULE_NAME } from './models';

export const getStyleListAction = createAction(`${MODULE_NAME}_GET_STYLE_LIST`);
export const getStyleListSuccessAction = createAction(`${MODULE_NAME}_GET_STYLE_LIST_SUCCESS`);
