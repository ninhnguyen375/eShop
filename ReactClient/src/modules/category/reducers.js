import { handleActions } from 'redux-actions';

import { clearAll } from '../../common/actions/common';
import { getCategoryListSuccessAction } from './actions';

export const defaultState = {
  categoryList: {},
};

const reducerMap = {
  [clearAll]: () => ({ ...defaultState }),
  [getCategoryListSuccessAction]: (state, action) => ({
    ...state,
    categoryList: action.payload,
  }),
};

export default handleActions(reducerMap, defaultState);
