import React, { useEffect, useCallback } from 'react';
import { notification, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { userManager } from '../common/services/AuthService';
import handleError from '../common/utils/handleError';
import { setUser } from '../modules/user/actions';
import successImg from '../assets/animations/success.json';
import loadingImg from '../assets/animations/loading2.json';
import { getValueByPath } from '../common/utils/objectUtils';
import { ROLE } from '../modules/user/models';

const Signin = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const signin = useCallback(async () => {
    try {
      const user = await userManager.signinRedirectCallback();
      dispatch(setUser(user));
      const role = getValueByPath(user, 'profile.role');
      if (role === ROLE.shipper || role === ROLE.manager || role === ROLE.seller) {
        history.push('/admin/dashboard');
      } else {
        history.push('/');
      }
      message.success('Welcome to eShop', 1);
    } catch (err) {
      handleError(err, null, notification, dispatch);
    }
  }, [dispatch, history]);

  useEffect(() => {
    setTimeout(() => {
      signin();
    }, 2000);
  }, [signin]);


  return (
    <div>
      <div className="d-flex align-items-center flex-column">
        <lottie-player
          style={{ width: 200 }}
          src={JSON.stringify(successImg)}
          background="transparent"
          autoplay
        />
        <h2 className="text-center">Login Success</h2>
        <h3 className="text-center">Redirecting to home page</h3>
        <lottie-player
          style={{ width: 200 }}
          src={JSON.stringify(loadingImg)}
          background="transparent"
          loop
          autoplay
        />
      </div>
    </div>
  );
};

export default Signin;
