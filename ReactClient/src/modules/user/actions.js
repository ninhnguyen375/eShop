import { createAction } from 'redux-actions';
import { MODULE_NAME as MODULE_USER } from './models';

export const getCustomerList = createAction(`${MODULE_USER}_GET_CUSTOMER_LIST`);
export const getCustomerListSuccess = createAction(`${MODULE_USER}_GET_CUSTOMER_LIST_SUCCESS`);
export const getCustomerDetail = createAction(`${MODULE_USER}_GET_CUSTOMER_DETAIL`);
export const getStaffList = createAction(`${MODULE_USER}_GET_STAFF_LIST`);
export const getStaffListSuccess = createAction(`${MODULE_USER}_GET_STAFF_LIST_SUCCESS`);
export const getStaffDetail = createAction(`${MODULE_USER}_GET_STAFF_DETAIL`);
export const setUser = createAction(`${MODULE_USER}_SET_USER`);
