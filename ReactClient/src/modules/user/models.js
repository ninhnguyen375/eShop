import { identityUrl } from '../../configs';

export const MODULE_NAME = 'USER';

export const ENDPOINTS = {
  getCustomerList: `${identityUrl}/api/customers`,
  getCustomerDetail: (id) => `${identityUrl}/api/customers/${id}`,
  getStaffList: `${identityUrl}/api/staffs`,
  getStaffDetail: (id) => `${identityUrl}/api/staffs/${id}`,
  addStaff: `${identityUrl}/api/staffs`,
  updateStaff: (id) => `${identityUrl}/api/staffs/${id}`,
  updateCustomer: (id) => `${identityUrl}/api/customers/${id}`,
};

export const LIMIT = 10;
export const emptyString = '---';

export const ROLE = {
  manager: 'manager',
  seller: 'seller',
  shipper: 'shipper',
  customer: 'customer',
};

export const GENDERS = [
  { code: 'male', iconClass: 'fas fa-mars', tagColor: 'geekblue' },
  { code: 'female', iconClass: 'fas fa-venus', tagColor: 'magenta' },
  { code: 'unknown', iconClass: 'fas fa-genderless', tagColor: '' },
];
