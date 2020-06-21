import { ENDPOINTS, LIMIT } from './models';
import { fetchAuthLoading, fetchLoading } from '../../common/effects';
import { mapPayloadToForm } from '../../common/utils/mapping';

export const getCategoryListService = (opt = {}) => fetchLoading({
  url: ENDPOINTS.getCategoryList,
  method: 'GET',
  params: { pageSize: LIMIT, ...opt },
});

export const createCategoryService = (category) => fetchAuthLoading({
  url: ENDPOINTS.createCategory,
  method: 'POST',
  data: mapPayloadToForm(category),
});

export const updateCategoryService = (id, category) => fetchAuthLoading({
  url: ENDPOINTS.updateCategory(id),
  method: 'PUT',
  data: mapPayloadToForm(category),
});

export default null;
