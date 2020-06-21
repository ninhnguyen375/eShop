import React from 'react';
import MainLayoutAdmin from '../../common/hocs/MainLayoutAdmin';
import CustomBreadcrumb from '../../common/components/widgets/CustomBreadcrum';
import ProductList from '../../modules/product/components/dashboard/ProductList';

const ProductListPage = () => (
  <MainLayoutAdmin>
    <CustomBreadcrumb
      items={[
        {
          url: '/admin/dashboard',
          title: 'Dashboard',
          icon: 'fas fa-home',
        },
        {
          url: '/admin/product',
          title: 'Product',
          icon: 'fas fa-cubes',
        },
      ]}
    />
    <ProductList />
  </MainLayoutAdmin>
);

export default ProductListPage;
