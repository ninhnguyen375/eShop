import React, { useEffect, useCallback } from 'react';
import { notification } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { userManager } from '../common/services/AuthService';
import handleError from '../common/utils/handleError';
import { clearAll } from '../common/actions/common';

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = useCallback(async () => {
    try {
      await userManager.signoutCallback();
    } catch (err) {
      handleError(err, null, notification, dispatch);
    }
    dispatch(clearAll());
    history.push('/');
  }, [dispatch, history]);

  useEffect(() => {
    logout();
  }, [logout]);


  return (
    <div>
      Logout...
    </div>
  );
};

export default Logout;
