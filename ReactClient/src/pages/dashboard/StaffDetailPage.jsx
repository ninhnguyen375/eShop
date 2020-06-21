import React, { useEffect } from 'react';
import MainLayoutAdmin from '../../common/hocs/MainLayoutAdmin';
import StaffDetail from '../../modules/user/components/StaffDetail';

const StaffDetailPage = () => {
  useEffect(() => () => {

  }, []);
  return (
    <MainLayoutAdmin>
      <StaffDetail />
    </MainLayoutAdmin>
  );
};

export default StaffDetailPage;
