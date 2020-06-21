import { put, takeEvery, call } from 'redux-saga/effects';
import { notification } from 'antd';
import handleError from '../../common/utils/handleError';
import { getCategoryListService } from './services';
import { getCategoryListSuccessAction, getCategoryListAction } from './actions';

function* getCategoryList({ payload }) {
  try {
    const { data } = yield call(getCategoryListService, payload);

    yield put(getCategoryListSuccessAction(data));
  } catch (err) {
    handleError(err, null, notification);
  }
}

export default function* categorySagas() {
  yield takeEvery(getCategoryListAction, getCategoryList);
}
