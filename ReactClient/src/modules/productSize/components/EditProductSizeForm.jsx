import React, { useEffect, useState } from 'react';
import {
  Form, Input, Button, notification,
} from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateProductSizeService } from '../services';
import handleError from '../../../common/utils/handleError';
import { getProductSizeListAction } from '../actions';

const EditProductSizeForm = ({ productSize, query }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue(productSize);
  }, [form, productSize]);

  const handleFormSubmit = async (value) => {
    setIsLoading(true);
    try {
      await updateProductSizeService(productSize.id, value);
      notification.success({
        message: 'Update ProductSize',
        description: 'Success!',
      });
      dispatch(getProductSizeListAction(query));
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
          name="name"
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
            <i className="fas fa-edit mr5" />
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

EditProductSizeForm.propTypes = {
  productSize: PropTypes.objectOf(PropTypes.any).isRequired,
  query: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EditProductSizeForm;
