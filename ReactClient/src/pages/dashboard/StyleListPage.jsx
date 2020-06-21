import React from 'react';
import MainLayoutAdmin from '../../common/hocs/MainLayoutAdmin';
import CustomBreadcrumb from '../../common/components/widgets/CustomBreadcrum';
import StyleList from '../../modules/style/components/StyleList';

const StyleListPage = () => (
  <MainLayoutAdmin>
    <CustomBreadcrumb
      items={[
        {
          url: '/admin/dashboard',
          title: 'Dashboard',
          icon: 'fas fa-home',
        },
        {
          url: '/admin/style',
          title: 'Category',
          icon: 'fas fa-stream',
        },
      ]}
    />
    <StyleList />
  </MainLayoutAdmin>
);

export default StyleListPage;
