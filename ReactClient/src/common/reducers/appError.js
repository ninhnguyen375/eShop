import { handleActions } from 'redux-actions';
import { setError, clearError } from '../actions/appError';

const defaultState = {
  error: null,
};

const reducerMap = {
  [setError]: (state, action) => ({ ...state, error: action.payload }),
  [clearError]: () => defaultState,
};

export default handleActions(reducerMap, defaultState);
