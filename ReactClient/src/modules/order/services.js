import { ENDPOINTS, LIMIT } from './models';
import { fetchAuthLoading } from '../../common/effects';
import { mapPayloadToForm, mapParamsToUrl } from '../../common/utils/mapping';

export const getOrderList = (opt = {}) => fetchAuthLoading({
  url: ENDPOINTS.getOrderList + mapParamsToUrl({ pageSize: LIMIT, ...opt }),
  method: 'GET',
});

export const acceptOrderAsync = (id) => fetchAuthLoading({
  url: ENDPOINTS.acceptOrder(id),
  method: 'PUT',
});

export const deliveredOrderAsync = (id) => fetchAuthLoading({
  url: ENDPOINTS.deliveredOrder(id),
  method: 'PUT',
});

export const rejectOrderAsync = (id, rejectReason) => {
  const data = mapPayloadToForm({ rejectReason });

  return fetchAuthLoading({
    url: ENDPOINTS.rejectOrder(id),
    method: 'PUT',
    data,
  });
};

export const addDeliveryTaskAsync = (id, orderIds) => {
  const data = mapPayloadToForm({ shipperId: id, orderIds });

  return fetchAuthLoading({
    url: ENDPOINTS.addDeliveryTask,
    method: 'POST',
    data,
  });
};


export default null;
