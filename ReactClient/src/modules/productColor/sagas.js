import { put, takeEvery, call } from 'redux-saga/effects';
import { notification } from 'antd';
import handleError from '../../common/utils/handleError';
import { getProductColorListService } from './services';
import { getProductColorListSuccessAction, getProductColorListAction } from './actions';

function* getProductColorList({ payload }) {
  try {
    const { data } = yield call(getProductColorListService, payload);

    yield put(getProductColorListSuccessAction(data));
  } catch (err) {
    handleError(err, null, notification);
  }
}

export default function* productColorSagas() {
  yield takeEvery(getProductColorListAction, getProductColorList);
}
