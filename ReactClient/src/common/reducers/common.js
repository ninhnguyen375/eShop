import { handleActions } from 'redux-actions';
import { clearAll, setLanguage } from '../actions/common';

const defaultState = {
  language: 'vn',
  locations: 'vn',
};

const reducerMap = {
  [clearAll]: () => defaultState,
  [setLanguage]: (state, action) => ({
    ...state,
    language: action.payload,
  }),
};

export default handleActions(reducerMap, defaultState);
