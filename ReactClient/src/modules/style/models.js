import { rootApi } from '../../configs';

export const MODULE_NAME = 'STYLE';

export const ENDPOINTS = {
  getStyleList: `${rootApi}/api/catalog/styles`,
  createStyle: `${rootApi}/api/catalog/styles`,
  updateStyle: (id) => `${rootApi}/api/catalog/styles/${id}`,
};

export const LIMIT = 10;
export const emptyString = '---';
