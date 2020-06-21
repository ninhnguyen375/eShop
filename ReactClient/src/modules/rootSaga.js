import { all } from 'redux-saga/effects';
import userSagas from './user/sagas';
import productSagas from './product/sagas';
import categorySagas from './category/sagas';
import styleSagas from './style/sagas';
import productColorSagas from './productColor/sagas';
import productSizeSagas from './productSize/sagas';
import cartSagas from './cart/sagas';
import orderSagas from './order/sagas';

export default function* rootSaga() {
  yield all([
    ...userSagas(),
    ...productSagas(),
    ...categorySagas(),
    ...styleSagas(),
    ...productColorSagas(),
    ...productSizeSagas(),
    ...cartSagas(),
    ...orderSagas(),
  ]);
}
