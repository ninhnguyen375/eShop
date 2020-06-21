import React, { useEffect } from 'react';
import {
  Form, notification, Input, Checkbox, Button,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { LockOutlined } from '@ant-design/icons';
// import { login } from '../actions';
import { MODULE_NAME as MODULE_USER } from '../models';
import '../styles/LoginForm.scss';
import handleError from '../../../common/utils/handleError';
import animationShoes from '../../../assets/animations/shoes.json';

const LoginForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state[MODULE_USER].isLoggedIn);
  const error = useSelector((state) => state.appError.error);
  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn, history]);

  useEffect(() => {
    if (error) {
      handleError(error, null, notification, dispatch);
    }
  }, [error, dispatch]);

  const onFinish = async (values) => {
    // dispatch(login(values));
  };

  return (
    <div className="login-form-wrapper">
      <div className="login-form-content">
        <lottie-player
          class="login-form-left-img"
          src={JSON.stringify(animationShoes)}
          background="transparent"
          speed="1"
          loop
          autoplay
        />
        <Form
          className="login-form"
          initialValues={{ remember: true, email: 'admin@admin.com', password: '12345678' }}
          onFinish={onFinish}
          form={form}
        >
          <div className="login-form-title">LOGIN NOW</div>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input
              prefix={<i className="far fa-envelope" />}
              size="large"
              autoComplete="current-email"
              className="login-form-email"
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              size="large"
              type="password"
              autoComplete="current-password"
              className="login-form-password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link className="login-form-forgot" to="/login">
              Forgot password
            </Link>
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              LOGIN
            </Button>
            Or
            {' '}
            <Link to="/signup">register now!</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
