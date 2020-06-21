import { rootApi } from '../../configs';

export const MODULE_NAME = 'PRODUCT';

export const ENDPOINTS = {
  getProductList: `${rootApi}/api/catalog/products`,
  getProductDetailList: `${rootApi}/api/catalog/products/specificProducts`,
  addProduct: `${rootApi}/api/catalog/products`,
  getProductById: (id) => `${rootApi}/api/catalog/products/${id}`,
  updateProduct: (id) => `${rootApi}/api/catalog/products/${id}`,
  importSpecificProducts: `${rootApi}/api/catalog/products/importSpecificProducts`,
  addProductDetail: (id) => `${rootApi}/api/catalog/products/${id}/specificProducts`,
  getProductDetailById: (id) => `${rootApi}/api/catalog/products/specificProducts/${id}`,
};

export const LIMIT = 10;
export const emptyString = '---';
export const VIEW_MODE = {
  listView: 'listView',
  gridView: 'gridView',
};
export const STATUS_LIST = [
  { code: 'new', color: 'green' },
  { code: 'hot', color: 'orange' },
];

export const STATUS = {
  new: { code: 'new', color: 'green' },
  hot: { code: 'hot', color: 'orange' },
};
