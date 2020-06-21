import React, { useEffect } from 'react';
import MainLayoutAdmin from '../../common/hocs/MainLayoutAdmin';
import CustomerDetail from '../../modules/user/components/CustomerDetail';

const CustomerDetailPage = () => {
  useEffect(() => () => {

  }, []);
  return (
    <MainLayoutAdmin>
      <CustomerDetail />
    </MainLayoutAdmin>
  );
};

export default CustomerDetailPage;
