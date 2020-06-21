import { handleActions } from 'redux-actions';

import { clearAll } from '../../common/actions/common';
import * as actions from './actions';

export const defaultState = {
  productList: null,
  productDetailList: null,
};

const reducerMap = {
  [clearAll]: () => ({ ...defaultState }),
  [actions.getProductListSuccess]: (state, action) => ({
    ...state,
    productList: action.payload,
  }),
  [actions.getProductDetailListSuccess]: (state, action) => ({
    ...state,
    productDetailList: action.payload,
  }),
};

export default handleActions(reducerMap, defaultState);
