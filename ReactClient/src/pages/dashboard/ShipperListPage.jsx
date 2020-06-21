import React from 'react';
import MainLayoutAdmin from '../../common/hocs/MainLayoutAdmin';
import CustomBreadcrumb from '../../common/components/widgets/CustomBreadcrum';
import StaffList from '../../modules/user/components/StaffList';

const ShipperListPage = () => (
  <MainLayoutAdmin>
    <CustomBreadcrumb
      items={[
        {
          url: '/admin/dashboard',
          title: 'Dashboard',
          icon: 'fas fa-home',
        },
        {
          url: '/admin/shipper',
          title: 'Shipper',
          icon: 'fas fa-user-ninja',
        },
      ]}
    />
    <StaffList />
  </MainLayoutAdmin>
);

export default ShipperListPage;
