import React from 'react';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';

const ChangePasswordForm = ({ handleUpdateProfile }) => {
  const [form] = Form.useForm();

  const handleUpdatePassword = (values) => {
    handleUpdateProfile(values);
  };

  return (
    <div className="p20">
      <Form form={form} onFinish={handleUpdatePassword} layout="vertical">
        <Form.Item
          name="currentPassword"
          label="Current Password"
          rules={[{ required: true, message: 'Please input current password' }]}
        >
          <Input.Password autoFocus placeholder="Current Password" />
        </Form.Item>
        <Form.Item
          name="password"
          label="New Password"
          rules={[{ required: true, message: 'Please input new password' }]}
        >
          <Input.Password placeholder="New Password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          rules={[
            { required: true },
            (formInstance) => ({
              validator(rule, value) {
                if (formInstance.getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!'),
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="New Password" />
        </Form.Item>
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => {
              window.Modal.hide();
            }}
            className="mr5"
          >
            CANCEL
          </Button>
          <Button htmlType="submit" type="primary">
            CHANGE
          </Button>
        </div>
      </Form>
    </div>
  );
};

ChangePasswordForm.propTypes = {
  handleUpdateProfile: PropTypes.func.isRequired,
};

export default ChangePasswordForm;
