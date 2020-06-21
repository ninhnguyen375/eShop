import React from 'react';
import SearchProduct from '../modules/product/components/SearchProduct';
import MainLayout from '../common/hocs/MainLayout';

const SearchProductPage = () => (
  <MainLayout>
    <SearchProduct />
    <div className="mb100" />
  </MainLayout>
);

export default SearchProductPage;
