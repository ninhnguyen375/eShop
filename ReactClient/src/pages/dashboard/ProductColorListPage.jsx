import React from 'react';
import MainLayoutAdmin from '../../common/hocs/MainLayoutAdmin';
import CustomBreadcrumb from '../../common/components/widgets/CustomBreadcrum';
import ProductColorList from '../../modules/productColor/components/ProductColorList';

const ProductColorListPage = () => (
  <MainLayoutAdmin>
    <CustomBreadcrumb
      items={[
        {
          url: '/admin/dashboard',
          title: 'Dashboard',
          icon: 'fas fa-home',
        },
        {
          url: '/admin/product-color',
          title: 'Product Color',
          icon: 'fas fa-palette',
        },
      ]}
    />
    <ProductColorList />
  </MainLayoutAdmin>
);

export default ProductColorListPage;
