// MODULE NAMES
import { MODULE_NAME as MODULE_USER } from './user/models';
import { MODULE_NAME as MODULE_CATEGORY } from './category/models';
import { MODULE_NAME as MODULE_PRODUCT } from './product/models';
import { MODULE_NAME as MODULE_STYLE } from './style/models';
import { MODULE_NAME as MODULE_PRODUCT_COLOR } from './productColor/models';
import { MODULE_NAME as MODULE_PRODUCT_SIZE } from './productSize/models';
import { MODULE_NAME as MODULE_CART } from './cart/models';
import { MODULE_NAME as MODULE_ORDER } from './order/models';
// MODULE REDUCERS
import userReducers from './user/reducers';
import categoryReducers from './category/reducers';
import productReducers from './product/reducers';
import styleReducers from './style/reducers';
import productColorReducers from './productColor/reducers';
import productSizeReducers from './productSize/reducers';
import cartReducers from './cart/reducers';
import orderReducers from './order/reducers';

const MODULE_REDUCERS = {
  [MODULE_USER]: userReducers,
  [MODULE_CATEGORY]: categoryReducers,
  [MODULE_PRODUCT]: productReducers,
  [MODULE_STYLE]: styleReducers,
  [MODULE_PRODUCT_COLOR]: productColorReducers,
  [MODULE_PRODUCT_SIZE]: productSizeReducers,
  [MODULE_CART]: cartReducers,
  [MODULE_ORDER]: orderReducers,
};

export default MODULE_REDUCERS;
