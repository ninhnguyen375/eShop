import { put, takeEvery, call } from 'redux-saga/effects';
import { notification } from 'antd';
import * as productActions from './actions';
import * as services from './services';
import handleError from '../../common/utils/handleError';

function* getProductList({ payload }) {
  try {
    const { data } = yield call(services.getProductList, payload);

    yield put(productActions.getProductListSuccess(data));
  } catch (err) {
    handleError(err, null, notification);
  }
}

function* getProductDetailList({ payload }) {
  try {
    const { data } = yield call(services.getProductDetailList, payload);

    yield put(productActions.getProductDetailListSuccess(data));
  } catch (err) {
    handleError(err, null, notification);
  }
}

export default function* productSagas() {
  yield takeEvery(productActions.getProductList, getProductList);
  yield takeEvery(productActions.getProductDetailList, getProductDetailList);
}
