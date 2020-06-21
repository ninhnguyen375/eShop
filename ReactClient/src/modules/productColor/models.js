import { rootApi } from '../../configs';

export const MODULE_NAME = 'PRODUCT_COLOR';

export const ENDPOINTS = {
  getProductColorList: `${rootApi}/api/catalog/colors`,
  createProductColor: `${rootApi}/api/catalog/colors`,
  updateProductColor: (id) => `${rootApi}/api/catalog/colors/${id}`,
};

export const LIMIT = 10;
export const emptyString = '---';
