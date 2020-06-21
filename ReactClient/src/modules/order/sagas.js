import { put, takeEvery, call } from 'redux-saga/effects';
import { notification } from 'antd';
import handleError from '../../common/utils/handleError';
import * as services from './services';
import * as actions from './actions';

function* getOrderList({ payload }) {
  try {
    const { data } = yield call(services.getOrderList, payload);

    yield put(actions.getOrderListSuccess(data));
  } catch (err) {
    handleError(err, null, notification);
  }
}

export default function* categorySagas() {
  yield takeEvery(actions.getOrderList, getOrderList);
}
