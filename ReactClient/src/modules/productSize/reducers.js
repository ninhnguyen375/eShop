import { handleActions } from 'redux-actions';

import { clearAll } from '../../common/actions/common';
import { getProductSizeListSuccessAction } from './actions';

export const defaultState = {
  productSizeList: {},
};

const reducerMap = {
  [clearAll]: () => ({ ...defaultState }),
  [getProductSizeListSuccessAction]: (state, action) => ({
    ...state,
    productSizeList: action.payload,
  }),
};

export default handleActions(reducerMap, defaultState);
