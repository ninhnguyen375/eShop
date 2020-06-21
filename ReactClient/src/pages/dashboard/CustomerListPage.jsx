import React from 'react';
import MainLayoutAdmin from '../../common/hocs/MainLayoutAdmin';
import CustomBreadcrumb from '../../common/components/widgets/CustomBreadcrum';
import CustomerList from '../../modules/user/components/CustomerList';

const CustomerListPage = () => (
  <MainLayoutAdmin>
    <CustomBreadcrumb
      items={[
        {
          url: '/admin/dashboard',
          title: 'Dashboard',
          icon: 'fas fa-home',
        },
        {
          url: '/admin/customer',
          title: 'Customer',
          icon: 'fas fa-users',
        },
      ]}
    />
    <CustomerList />
  </MainLayoutAdmin>
);

export default CustomerListPage;
