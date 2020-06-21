import { put, takeEvery, call } from 'redux-saga/effects';
import { notification } from 'antd';
import handleError from '../../common/utils/handleError';
import { getProductSizeListService } from './services';
import { getProductSizeListSuccessAction, getProductSizeListAction } from './actions';

function* getProductSizeList({ payload }) {
  try {
    const { data } = yield call(getProductSizeListService, payload);

    yield put(getProductSizeListSuccessAction(data));
  } catch (err) {
    handleError(err, null, notification);
  }
}

export default function* productSizeSagas() {
  yield takeEvery(getProductSizeListAction, getProductSizeList);
}
