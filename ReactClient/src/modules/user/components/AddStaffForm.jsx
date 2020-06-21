import React, { useState } from 'react';
import {
  Input,
  DatePicker,
  Radio,
  Button,
  Form,
  Popconfirm,
  Tag,
  notification,
  Select,
  Divider,
  Tooltip,
  message,
} from 'antd';
import { useDispatch } from 'react-redux';
import { GENDERS, ROLE } from '../models';
import { addStaff } from '../services';
import handleError from '../../../common/utils/handleError';
import { getStaffList } from '../actions';

const AddStaffForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddStaff = async (values) => {
    setIsLoading(true);
    try {
      await addStaff(values);
      notification.success({ message: 'Add Staff', description: 'Success!' });
      window.Modal.clear();
      dispatch(getStaffList());
    } catch (error) {
      handleError(error, form, notification);
    }
    setIsLoading(false);
  };

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
    <div>
      <Form form={form} onFinish={handleAddStaff} layout="vertical">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4">
              <Form.Item name="name" label="Name:" rules={rules.name}>
                <Input
                  prefix={(
                    <div>
                      <i className="fa fa-user text-blue" />
                    </div>
                  )}
                  placeholder="Enter name"
                />
              </Form.Item>
            </div>
            <div className="col-lg-4">
              <Form.Item name="email" label="Email:" rules={rules.email}>
                <Input
                  prefix={(
                    <div>
                      <i className="fa fa-envelope text-blue" />
                    </div>
                  )}
                  placeholder="Enter email"
                />
              </Form.Item>
            </div>
            <div className="col-lg-4">
              <Form.Item name="role" label="Role:" rules={rules.role}>
                <Select
                  prefix={(
                    <div>
                      <i className="far fa-id-card" />
                    </div>
                      )}
                  placeholder="Choose staff role"
                >
                  {Object.keys(ROLE).map((role) => (
                    <Select.Option key={role} value={role}>
                      <Tag className="w95p" color="blue">
                        <i className="fas fa-key mr5" />
                        {role.toUpperCase()}
                      </Tag>
                    </Select.Option>
                  ))}
                </Select>
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
                      <i className="fas fa-phone text-blue" />
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
                      <i className="far fa-id-card text-blue" />
                    </div>
                  )}
                  placeholder="Enter identifier"
                />
              </Form.Item>
            </div>
            <div className="col-lg-4">
              <Form.Item
                name="birthday"
                label="Birthday (DD/MM/YYYY):"
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
          <Divider />
          <Form.Item>
            <div className="d-flex justify-content-between">
              <div>
                <Button
                  onClick={() => {
                    form.resetFields();
                    message.success('Reset success');
                  }}
                >
                  <i className="fas fa-sync mr5" />
                  RESET FORM
                </Button>
              </div>
              <div>
                <Tooltip title="Minimize, Keep your input data">
                  <Button
                    onClick={() => {
                      window.Modal.hide();
                    }}
                    style={{ marginRight: 10 }}
                    type="link"
                  >
                    <i className="fas fa-chevron-down" />
                  </Button>
                </Tooltip>
                <Tooltip title="Clean form and close">
                  <Popconfirm
                    title="Data you made may not be saved."
                    onConfirm={() => {
                      window.Modal.clear();
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button style={{ marginRight: 10 }} danger>
                      <i className="far fa-times-circle mr5" />
                      CANCEL
                    </Button>
                  </Popconfirm>
                </Tooltip>
                <Button loading={isLoading} htmlType="submit" type="primary">
                  {isLoading ? undefined : <i className="fas fa-plus mr5" />}
                  ADD
                </Button>
              </div>
            </div>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AddStaffForm;
