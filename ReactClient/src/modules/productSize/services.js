import { ENDPOINTS, LIMIT } from './models';
import { fetchAuthLoading, fetchLoading } from '../../common/effects';
import { mapPayloadToForm } from '../../common/utils/mapping';

export const getProductSizeListService = (opt = {}) => fetchLoading({
  url: ENDPOINTS.getProductSizeList,
  method: 'GET',
  params: { pageSize: LIMIT, ...opt },
});

export const createProductSizeService = (productSize) => fetchAuthLoading({
  url: ENDPOINTS.createProductSize,
  method: 'POST',
  data: mapPayloadToForm(productSize),
});

export const updateProductSizeService = (id, productSize) => fetchAuthLoading({
  url: ENDPOINTS.updateProductSize(id),
  method: 'PUT',
  data: mapPayloadToForm(productSize),
});

export default null;
