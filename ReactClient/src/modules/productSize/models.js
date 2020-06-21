import { rootApi } from '../../configs';

export const MODULE_NAME = 'PRODUCT_SIZE';

export const ENDPOINTS = {
  getProductSizeList: `${rootApi}/api/catalog/sizes`,
  createProductSize: `${rootApi}/api/catalog/sizes`,
  updateProductSize: (id) => `${rootApi}/api/catalog/sizes/${id}`,
};

export const LIMIT = 10;
export const emptyString = '---';
