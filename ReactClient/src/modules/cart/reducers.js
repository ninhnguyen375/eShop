import { handleActions } from 'redux-actions';

import { clearAll } from '../../common/actions/common';
import * as actions from './actions';

export const defaultState = {
  cart: [],
};

const reducerMap = {
  [clearAll]: () => ({ ...defaultState }),
  [actions.clearAllCartSuccess]: (state) => ({
    ...state,
    cart: [],
  }),
  [actions.updateCartSuccess]: (state, action) => ({
    ...state,
    cart: [...action.payload],
  }),
};

export default handleActions(reducerMap, defaultState);
