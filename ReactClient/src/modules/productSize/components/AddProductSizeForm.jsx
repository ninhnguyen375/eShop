import React, { useState } from 'react';
import {
  Form, Input, Button, notification,
} from 'antd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { createProductSizeService } from '../services';
import handleError from '../../../common/utils/handleError';
import { getProductSizeListAction } from '../actions';

const AddProductSizeForm = ({ query }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleFormSubmit = async (value) => {
    setIsLoading(true);
    try {
      await createProductSizeService(value);
      notification.success({ message: 'Create ProductSize', description: 'Success!' });
      dispatch(getProductSizeListAction(query));
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
          label="ProductSize name:"
          name="sizeValue"
          rules={[{ required: true, message: 'Please input productSize name' }]}
        >
          <Input placeholder="ProductSize" />
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

AddProductSizeForm.propTypes = {
  query: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AddProductSizeForm;
