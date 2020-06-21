import { ENDPOINTS, LIMIT } from './models';
import { fetchAuthLoading, fetchLoading } from '../../common/effects';
import { mapPayloadToForm } from '../../common/utils/mapping';

export const getProductColorListService = (opt = {}) => fetchLoading({
  url: ENDPOINTS.getProductColorList,
  method: 'GET',
  params: { pageSize: LIMIT, ...opt },
});

export const createProductColorService = (productColor) => fetchAuthLoading({
  url: ENDPOINTS.createProductColor,
  method: 'POST',
  data: mapPayloadToForm({ hexCode: productColor }),
});

export const updateProductColorService = (id, productColor) => fetchAuthLoading({
  url: ENDPOINTS.updateProductColor(id),
  method: 'PUT',
  data: mapPayloadToForm({ hexCode: productColor }),
});

export default null;
