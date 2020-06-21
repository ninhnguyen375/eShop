import React, { useEffect, useState } from 'react';
import {
  Form, Input, Button, notification,
} from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateCategoryService } from '../services';
import handleError from '../../../common/utils/handleError';
import { getCategoryListAction } from '../actions';

const EditCategoryForm = ({ category, query }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue(category);
  }, [form, category]);

  const handleFormSubmit = async (value) => {
    setIsLoading(true);
    try {
      await updateCategoryService(category.id, value);
      notification.success({
        message: 'Update Category',
        description: 'Success!',
      });
      dispatch(getCategoryListAction(query));
    } catch (err) {
      handleError(err, form, notification);
    }
    setIsLoading(false);
  };

  return (
    <div className="container">
      <Form layout="vertical" onFinish={handleFormSubmit} form={form}>
        <Form.Item
          label="Category name:"
          name="name"
          rules={[{ required: true, message: 'Please input category name' }]}
        >
          <Input placeholder="Category" />
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

EditCategoryForm.propTypes = {
  category: PropTypes.objectOf(PropTypes.any).isRequired,
  query: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EditCategoryForm;
