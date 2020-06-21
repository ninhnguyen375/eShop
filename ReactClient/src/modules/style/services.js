import { ENDPOINTS, LIMIT } from './models';
import { fetchAuthLoading, fetchLoading } from '../../common/effects';
import { mapPayloadToForm } from '../../common/utils/mapping';

export const getStyleListService = (opt = {}) => fetchLoading({
  url: ENDPOINTS.getStyleList,
  method: 'GET',
  params: { pageSize: LIMIT, ...opt },
});

export const createStyleService = (style) => fetchAuthLoading({
  url: ENDPOINTS.createStyle,
  method: 'POST',
  data: mapPayloadToForm(style),
});

export const updateStyleService = (id, style) => fetchAuthLoading({
  url: ENDPOINTS.updateStyle(id),
  method: 'PUT',
  data: mapPayloadToForm(style),
});

export default null;
