import React, { useEffect } from 'react';
import UserProfile from '../../modules/user/components/UserProfile';
import MainLayoutAdmin from '../../common/hocs/MainLayoutAdmin';

const ProfilePage = () => {
  useEffect(() => () => {

  }, []);
  return (
    <MainLayoutAdmin>
      <UserProfile />
    </MainLayoutAdmin>
  );
};

export default ProfilePage;
