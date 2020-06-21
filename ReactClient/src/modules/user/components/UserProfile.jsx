import React, { useEffect, useCallback, useState } from 'react';
import {
  Card,
  Avatar,
  Tag,
  Form,
  Input,
  DatePicker,
  Radio,
  Select,
  Divider,
  Button,
  notification,
} from 'antd';
import '../styles/UserProfile.scss';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import moment from 'moment';
import userImg from '../../../assets/images/user.svg';
import { MODULE_NAME as MODULE_USER, GENDERS, ROLE } from '../models';
import bgImg from '../../../assets/images/bg-black.webp';
import handleError from '../../../common/utils/handleError';
import { getStaffDetail, updateStaff } from '../services';
import ChangePasswordForm from './ChangePasswordForm';

const UserProfile = () => {
  const user = useSelector((state) => state[MODULE_USER].user);
  const profile = user ? user.profile || {} : {};
  const [form] = Form.useForm();
  const history = useHistory();
  const [staff, setStaff] = useState({});

  const getProfileDetail = useCallback(async () => {
    try {
      const res = await getStaffDetail(profile.sub);
      setStaff(res.data);
    } catch (error) {
      handleError(error, null, notification);
    }
  }, [profile.sub]);

  const handleUpdateProfile = async (values) => {
    try {
      if (profile.role === ROLE.customer) {
        throw new Error('Not supported for customer');
      }
      await updateStaff(profile.sub, values);
      notification.success({
        message: 'Update Profile',
        description: 'Success!',
      });
      getProfileDetail();
      // clear change password form
      window.Modal.clear();
    } catch (err) {
      handleError(err, form, notification);
    }
  };

  const handleChangePassword = () => {
    window.Modal.show(
      <ChangePasswordForm
        handleUpdateProfile={handleUpdateProfile}
      />,
      { title: <b>CHANGE PASSWORD</b> },
    );
  };

  useEffect(() => {
    getProfileDetail();
  }, [getProfileDetail]);

  useEffect(() => {
    form.setFieldsValue({
      ...staff,
      birthday:
        staff && staff.birthday ? moment(staff.birthday, 'DD/MM/YYYY') : '',
    });
  }, [staff, form]);

  const rules = {
    name: [
      {
        required: true,
        message: 'Please enter a name',
      },
    ],
    email: [
      {
        required: true,
        message: 'Please enter an email address',
      },
    ],
    address: [
      {
        required: true,
        message: 'Please enter address',
      },
    ],
    phoneNumber: [
      {
        required: true,
        message: 'Please enter a phone number',
      },
    ],
    identifier: [
      {
        required: true,
        message: 'Please enter an identifier',
      },
    ],
    birthday: [
      {
        required: true,
        message: 'Please enter a birthday',
      },
    ],
    gender: [
      {
        required: true,
        message: 'Please select gender',
      },
    ],
    role: [
      {
        required: true,
        message: 'Please select a role',
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
          <Avatar className="profile--avatar" src={userImg} />
          <div className="profile--name">
            {staff && staff.name
              ? staff.name
              : (staff && staff.email ? staff.email : '').split('@')[0]}
          </div>
        </div>
        <div className="profile--detail">
          <Form form={form} onFinish={handleUpdateProfile} layout="vertical">
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
                  <Form.Item
                    editable="false"
                    name="email"
                    label="Email:"
                    rules={rules.email}
                  >
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
                    name="address"
                    label="Address:"
                    rules={rules.address}
                  >
                    <Input
                      prefix={(
                        <div>
                          <i className="fa fa-home" />
                        </div>
                      )}
                      placeholder="Enter address"
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="row">
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
                <div className="col-lg-4">
                  <Form.Item
                    name="identifier"
                    label="Identifier:"
                    rules={rules.identifier}
                  >
                    <Input
                      prefix={(
                        <div>
                          <i className="far fa-id-card" />
                        </div>
                      )}
                      placeholder="Enter identifier"
                    />
                  </Form.Item>
                </div>
                <div className="col-lg-4">
                  <Form.Item
                    name="birthday"
                    label="Birthday:"
                    rules={rules.birthday}
                  >
                    <DatePicker
                      format="DD/MM/YYYY"
                      className="w100p"
                      placeholder="Enter birthday"
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="row">
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
                <div className="col-lg-4">
                  <Form.Item name="role" label="Role:" rules={rules.role}>
                    <Select
                      disabled
                      prefix={(
                        <div>
                          <i className="far fa-id-card" />
                        </div>
                      )}
                      placeholder="Choose staff role"
                    >
                      {Object.keys(ROLE).map((role) => (
                        <Select.Option key={role} value={role}>
                          <Tag className="w96p" color="blue">
                            <i className="fas fa-key mr5" />
                            {role.toUpperCase()}
                          </Tag>
                        </Select.Option>
                      ))}
                    </Select>
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

export default UserProfile;
