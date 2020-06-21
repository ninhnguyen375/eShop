import React, { useState } from 'react';
import {
  Form, Input, Button, notification,
} from 'antd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { createStyleService } from '../services';
import handleError from '../../../common/utils/handleError';
import { getStyleListAction } from '../actions';

const AddStyleForm = ({ query }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleFormSubmit = async (value) => {
    setIsLoading(true);
    try {
      await createStyleService(value);
      notification.success({ message: 'Create Style', description: 'Success!' });
      dispatch(getStyleListAction(query));
      window.Modal.hide();
    } catch (err) {
      handleError(err, form, notification);
    }
    setIsLoading(false);
  };

  return (
    <div className="container">
      <Form layout="vertical" onFinish={handleFormSubmit} form={form}>
        <Form.Item
          label="Style name:"
          name="name"
          rules={[{ required: true, message: 'Please input style name' }]}
        >
          <Input placeholder="Style" />
        </Form.Item>
        <div className="d-flex justify-content-end">
          <Button
            className="mr10"
            onClick={() => {
              window.Modal.hide();
            }}
          >
            Cancel
          </Button>
          <Button loading={isLoading} type="primary" htmlType="submit">
            <i className="fas fa-plus mr5" />
            Add
          </Button>
        </div>
      </Form>
    </div>
  );
};

AddStyleForm.propTypes = {
  query: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AddStyleForm;
