import { put, takeEvery, call } from 'redux-saga/effects';
import { notification } from 'antd';
// import * as services from './services';
import * as actions from './actions';
import handleError from '../../common/utils/handleError';
import { updateCartAsync } from './services';
import { getValueByPath } from '../../common/utils/objectUtils';

function* clearAllCart({ payload }) {
  try {
    const userId = getValueByPath(payload, 'user.profile.sub');

    if (userId) {
      yield call(updateCartAsync, userId, []);
    }

    yield put(actions.clearAllCartSuccess());
  } catch (err) {
    handleError(err, null, notification);
  }
}

function* updateCart({ payload }) {
  try {
    const userId = getValueByPath(payload, 'user.profile.sub');

    if (userId) {
      yield call(updateCartAsync, userId, payload.newCart);
    }

    yield put(actions.updateCartSuccess(payload.newCart));
  } catch (err) {
    handleError(err, null, notification);
  }
}

export default function* cartSagas() {
  yield takeEvery(actions.clearAllCart, clearAllCart);
  yield takeEvery(actions.updateCart, updateCart);
}
