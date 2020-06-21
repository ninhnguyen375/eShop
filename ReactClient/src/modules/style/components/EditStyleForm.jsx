import React, { useEffect, useState } from 'react';
import {
  Form, Input, Button, notification,
} from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateStyleService } from '../services';
import handleError from '../../../common/utils/handleError';
import { getStyleListAction } from '../actions';

const EditStyleForm = ({ style, query }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue(style);
  }, [form, style]);

  const handleFormSubmit = async (value) => {
    setIsLoading(true);
    try {
      await updateStyleService(style.id, value);
      notification.success({
        message: 'Update Style',
        description: 'Success!',
      });
      dispatch(getStyleListAction(query));
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
            <i className="fas fa-edit mr5" />
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

EditStyleForm.propTypes = {
  style: PropTypes.objectOf(PropTypes.any).isRequired,
  query: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EditStyleForm;
