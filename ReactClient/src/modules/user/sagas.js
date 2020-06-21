import { put, takeEvery, call } from 'redux-saga/effects';
import { notification } from 'antd';
import * as userActions from './actions';
import * as services from './services';
import handleError from '../../common/utils/handleError';

function* getCustomerList(data) {
  try {
    const res = yield call(services.getCustomerList, data.payload);

    yield put(userActions.getCustomerListSuccess(res.data));
  } catch (err) {
    handleError(err, null, notification);
  }
}

function* getStaffList(data) {
  try {
    const res = yield call(services.getStaffList, data.payload);

    yield put(userActions.getStaffListSuccess(res.data));
  } catch (err) {
    handleError(err, null, notification);
  }
}

export default function* userSagas() {
  yield takeEvery(userActions.getCustomerList, getCustomerList);
  yield takeEvery(userActions.getStaffList, getStaffList);
}
