import moment from 'moment';
import { ENDPOINTS, LIMIT } from './models';
import { fetchAuthLoading } from '../../common/effects';
import { mapPayloadToForm } from '../../common/utils/mapping';

export const getCustomerList = (opt = {}) => fetchAuthLoading({
  url: ENDPOINTS.getCustomerList,
  method: 'GET',
  params: { pageSize: LIMIT, ...opt },
});

export const getCustomerDetail = (id) => fetchAuthLoading({
  url: ENDPOINTS.getCustomerDetail(id),
  method: 'GET',
});

export const getStaffList = (opt = {}) => fetchAuthLoading({
  url: ENDPOINTS.getStaffList,
  method: 'GET',
  params: { pageSize: LIMIT, ...opt },
});

export const getStaffDetail = (id) => fetchAuthLoading({
  url: ENDPOINTS.getStaffDetail(id),
  method: 'GET',
});

export const addStaff = (payload = {}) => {
  const form = new FormData();
  const data = { ...payload };

  data.birthday = data.birthday
    ? moment(data.birthday).format('DD/MM/YYYY')
    : undefined;

  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (value !== undefined && value !== null && value !== '') {
      form.append(key, data[key]);
    }
  });

  return fetchAuthLoading({
    url: ENDPOINTS.addStaff,
    method: 'POST',
    data: form,
  });
};

export const updateStaff = (id, payload = {}) => {
  const form = new FormData();
  const data = { ...payload };

  data.birthday = data.birthday
    ? moment(data.birthday).format('DD/MM/YYYY')
    : undefined;

  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (value !== undefined && value !== null && value !== '') {
      form.append(key, data[key]);
    }
  });

  return fetchAuthLoading({
    url: ENDPOINTS.updateStaff(id),
    method: 'POST',
    data: form,
  });
};

export const updateCustomer = (id, payload = {}) => {
  const form = mapPayloadToForm(payload);

  return fetchAuthLoading({
    url: ENDPOINTS.updateCustomer(id),
    method: 'POST',
    data: form,
  });
};

export default null;
