import { put, takeEvery, call } from 'redux-saga/effects';
import { notification } from 'antd';
import handleError from '../../common/utils/handleError';
import { getStyleListService } from './services';
import { getStyleListSuccessAction, getStyleListAction } from './actions';

function* getStyleList({ payload }) {
  try {
    const { data } = yield call(getStyleListService, payload);

    yield put(getStyleListSuccessAction(data));
  } catch (err) {
    handleError(err, null, notification);
  }
}

export default function* styleSagas() {
  yield takeEvery(getStyleListAction, getStyleList);
}
