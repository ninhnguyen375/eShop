import React from 'react';
import MainLayoutAdmin from '../../common/hocs/MainLayoutAdmin';
import CustomBreadcrumb from '../../common/components/widgets/CustomBreadcrum';
import StaffList from '../../modules/user/components/StaffList';

const StaffListPage = () => (
  <MainLayoutAdmin>
    <CustomBreadcrumb
      items={[
        {
          url: '/admin/dashboard',
          title: 'Dashboard',
          icon: 'fas fa-home',
        },
        {
          url: '/admin/staff',
          title: 'Staff',
          icon: 'fas fa-users',
        },
      ]}
    />
    <StaffList />
  </MainLayoutAdmin>
);

export default StaffListPage;
