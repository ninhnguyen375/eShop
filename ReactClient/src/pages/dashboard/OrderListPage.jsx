import React from 'react';
import MainLayoutAdmin from '../../common/hocs/MainLayoutAdmin';
import CustomBreadcrumb from '../../common/components/widgets/CustomBreadcrum';
import OrderList from '../../modules/order/components/OrderList';

const OrderListPage = () => (
  <MainLayoutAdmin>
    <CustomBreadcrumb
      items={[
        {
          url: '/admin/dashboard',
          title: 'Dashboard',
          icon: 'fas fa-home',
        },
        {
          url: '/admin/order',
          title: 'Order',
          icon: 'far fa-list-alt',
        },
      ]}
    />
    <OrderList />
  </MainLayoutAdmin>
);

export default OrderListPage;
