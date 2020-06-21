import React, { useEffect, useCallback, useState } from 'react';
import {
  Card, Avatar, notification, Form, Input, Radio, Button, Tag, Divider,
} from 'antd';
import '../styles/CustomerDetail.scss';
import '../styles/UserProfile.scss';
import { useRouteMatch, useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import userImg from '../../../assets/images/user.svg';
import bgImg from '../../../assets/images/bg-black.webp';
import * as services from '../services';
import handleError from '../../../common/utils/handleError';
import { GENDERS, MODULE_NAME } from '../models';
import ChangePasswordForm from './ChangePasswordForm';

const CustomerDetail = ({ profileMode }) => {
  const [customer, setCustomer] = useState({});
  const match = useRouteMatch();
  let { id } = match.params;
  const [form] = Form.useForm();
  const history = useHistory();
  const user = useSelector((state) => state[MODULE_NAME].user);

  if (profileMode) {
    const profile = user ? user.profile || {} : {};
    id = profile.sub;
  }

  useEffect(() => {
    form.setFieldsValue(customer);
  }, [customer, form]);

  const getCustomerDetail = useCallback(async () => {
    try {
      const res = await services.getCustomerDetail(id);
      setCustomer(res.data);
    } catch (error) {
      handleError(error, null, notification);
    }
  }, [id]);

  useEffect(() => {
    getCustomerDetail();
  }, [getCustomerDetail]);

  const handleUpdateCustomer = async (values) => {
    try {
      await services.updateCustomer(id, values);
      notification.success({ message: 'Update', description: 'Success!' });
      getCustomerDetail();
      // clear change password form
      window.Modal.clear();
    } catch (err) {
      handleError(err, form, notification);
    }
  };

  const handleChangePassword = () => {
    window.Modal.show(
      <ChangePasswordForm
        handleUpdateProfile={handleUpdateCustomer}
      />,
      { title: <b>CHANGE PASSWORD</b> },
    );
  };

  const rules = {
    name: [
      {
        required: true,
      },
    ],
    email: [
      {
        required: true,
      },
    ],
    address: [
      {
        required: true,
      },
    ],
    phoneNumber: [
      {
        required: true,
      },
    ],
    identifier: [
      {
        required: true,
      },
    ],
    birthday: [
      {
        required: true,
      },
    ],
    gender: [
      {
        required: true,
      },
    ],
    role: [
      {
        required: true,
      },
    ],
  };
  return (
    <div className="profile">
      <Card
        style={{
          background: `url(${bgImg}) center no-repeat`,
          backgroundSize: 'cover',
        }}
        className="profile--top-banner"
      />
      <div className="profile--info-wrapper">

        <div className="profile--info">
          <Avatar
            className="profile--avatar"
            src={userImg}
          />
          <div className="profile--name">
            {customer.name ? customer.name : (customer.email || '').split('@')[0]}
          </div>
        </div>
        <div className="profile--detail">
          <Form form={form} onFinish={handleUpdateCustomer} layout="vertical">
            <div className="container">
              <div className="row">
                <div className="col-lg-4">
                  <Form.Item name="name" label="Name:" rules={rules.name}>
                    <Input
                      prefix={(
                        <div>
                          <i className="fa fa-user" />
                        </div>
                      )}
                      placeholder="Enter name"
                    />
                  </Form.Item>
                </div>
                <div className="col-lg-4">
                  <Form.Item name="email" label="Email:" rules={rules.email}>
                    <Input
                      disabled
                      prefix={(
                        <div>
                          <i className="fa fa-envelope" />
                        </div>
                      )}
                      placeholder="Enter email"
                    />
                  </Form.Item>
                </div>
                <div className="col-lg-4">
                  <Form.Item
                    name="phoneNumber"
                    label="Phone number:"
                    rules={rules.phoneNumber}
                  >
                    <Input
                      prefix={(
                        <div>
                          <i className="fas fa-phone" />
                        </div>
                      )}
                      placeholder="Enter phone number"
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <Form.Item
                    name="address"
                    label="Address:"
                    rules={rules.address}
                  >
                    <Input.TextArea
                      prefix={(
                        <div>
                          <i className="fa fa-home" />
                        </div>
                      )}
                      placeholder="Enter address"
                    />
                  </Form.Item>
                </div>
                <div className="col-lg-8">
                  <Form.Item name="gender" label="Gender:" rules={rules.gender}>
                    <Radio.Group>
                      {GENDERS.map((gender) => (
                        <Radio value={gender.code} key={gender.code}>
                          <Tag color={gender.tagColor}>
                            <i className={gender.iconClass} />
                            {' '}
                            {gender.code.toUpperCase()}
                          </Tag>
                        </Radio>
                      ))}
                    </Radio.Group>
                  </Form.Item>
                </div>
              </div>
              <div className="row justify-content-end">
                <div className="col-lg-4">
                  <Button
                    onClick={handleChangePassword}
                    className="w100p"
                    type="primary"
                    danger
                  >
                    <i className="fas fa-key mr5" />
                    Change Password
                  </Button>
                </div>
              </div>
              <Divider />
              <Form.Item>
                <div className="d-flex justify-content-end">
                  <Button
                    onClick={() => {
                      history.goBack();
                    }}
                    style={{ marginRight: 10 }}
                  >
                    <i className="fas fa-chevron-left mr5" />
                    BACK
                  </Button>
                  <Button htmlType="submit" type="primary">
                    <i className="fas fa-edit mr5" />
                    UPDATE
                  </Button>
                </div>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

CustomerDetail.propTypes = {
  profileMode: PropTypes.bool,
};
CustomerDetail.defaultProps = {
  profileMode: false,
};

export default CustomerDetail;
