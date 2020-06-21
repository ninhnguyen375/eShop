import { rootApi } from '../../configs';

export const MODULE_NAME = 'CATEGORY';

export const ENDPOINTS = {
  getCategoryList: `${rootApi}/api/catalog/categories`,
  createCategory: `${rootApi}/api/catalog/categories`,
  updateCategory: (id) => `${rootApi}/api/catalog/categories/${id}`,
};

export const LIMIT = 10;
export const emptyString = '---';
