import { handleActions } from 'redux-actions';

import { clearAll } from '../../common/actions/common';
import { getOrderListSuccess } from './actions';

export const defaultState = {
  orderList: {},
};

const reducerMap = {
  [clearAll]: () => ({ ...defaultState }),
  [getOrderListSuccess]: (state, action) => ({
    ...state,
    orderList: action.payload,
  }),
};

export default handleActions(reducerMap, defaultState);
