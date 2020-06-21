import { handleActions } from 'redux-actions';

import { clearAll } from '../../common/actions/common';
import { getStyleListSuccessAction } from './actions';

export const defaultState = {
  styleList: {},
};

const reducerMap = {
  [clearAll]: () => ({ ...defaultState }),
  [getStyleListSuccessAction]: (state, action) => ({
    ...state,
    styleList: action.payload,
  }),
};

export default handleActions(reducerMap, defaultState);
