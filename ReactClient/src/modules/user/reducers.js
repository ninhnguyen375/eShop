import { handleActions } from 'redux-actions';

import { clearAll } from '../../common/actions/common';
import * as actions from './actions';

export const defaultState = {
  user: null,
  customerList: null,
  staffList: null,
};

const reducerMap = {
  [clearAll]: () => ({ ...defaultState }),
  [actions.getCustomerListSuccess]: (state, action) => ({
    ...state,
    customerList: action.payload,
  }),
  [actions.getStaffListSuccess]: (state, action) => ({
    ...state,
    staffList: action.payload,
  }),
  [actions.setUser]: (state, action) => ({
    ...state,
    user: action.payload,
  }),
};

export default handleActions(reducerMap, defaultState);
