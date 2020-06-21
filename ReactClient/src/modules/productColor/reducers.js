import { handleActions } from 'redux-actions';

import { clearAll } from '../../common/actions/common';
import { getProductColorListSuccessAction } from './actions';

export const defaultState = {
  productColorList: {},
};

const reducerMap = {
  [clearAll]: () => ({ ...defaultState }),
  [getProductColorListSuccessAction]: (state, action) => ({
    ...state,
    productColorList: action.payload,
  }),
};

export default handleActions(reducerMap, defaultState);
