import React from 'react';
import CartList from '../modules/cart/components/CartList';
import MainLayout from '../common/hocs/MainLayout';

const CartListPage = () => (
  <MainLayout>
    <CartList />
    <div className="mb100" />
  </MainLayout>
);

export default CartListPage;
