import React from 'react';
import ProductDetail from '../modules/product/components/ProductDetail';
import MainLayout from '../common/hocs/MainLayout';

const ProductDetailPage = () => (
  <MainLayout>
    <ProductDetail />
    <div className="mb100" />
  </MainLayout>
);

export default ProductDetailPage;
