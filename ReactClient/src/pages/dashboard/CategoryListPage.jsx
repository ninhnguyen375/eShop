import React from 'react';
import MainLayoutAdmin from '../../common/hocs/MainLayoutAdmin';
import CustomBreadcrumb from '../../common/components/widgets/CustomBreadcrum';
import CategoryList from '../../modules/category/components/CategoryList';

const CategoryListPage = () => (
  <MainLayoutAdmin>
    <CustomBreadcrumb
      items={[
        {
          url: '/admin/dashboard',
          title: 'Dashboard',
          icon: 'fas fa-home',
        },
        {
          url: '/admin/category',
          title: 'Category',
          icon: 'far fa-list-alt',
        },
      ]}
    />
    <CategoryList />
  </MainLayoutAdmin>
);

export default CategoryListPage;
