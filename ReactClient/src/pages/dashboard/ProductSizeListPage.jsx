import React from 'react';
import MainLayoutAdmin from '../../common/hocs/MainLayoutAdmin';
import CustomBreadcrumb from '../../common/components/widgets/CustomBreadcrum';
import ProductSizeList from '../../modules/productSize/components/ProductSizeList';

const ProductSizeListPage = () => (
  <MainLayoutAdmin>
    <CustomBreadcrumb
      items={[
        {
          url: '/admin/dashboard',
          title: 'Dashboard',
          icon: 'fas fa-home',
        },
        {
          url: '/admin/product-size',
          title: 'Product Size',
          icon: 'fas fa-expand-alt',
        },
      ]}
    />
    <ProductSizeList />
  </MainLayoutAdmin>
);

export default ProductSizeListPage;
