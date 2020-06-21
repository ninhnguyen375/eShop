import React, { useState } from 'react';
import {
  Form, Button, notification,
} from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateProductColorService } from '../services';
import handleError from '../../../common/utils/handleError';
import { getProductColorListAction } from '../actions';
import ColorPicker from '../../../common/components/widgets/ColorPicker';

const EditProductColorForm = ({ productColor, query }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [hexCode, setHexCode] = useState(productColor.hexCode);

  const handleFormSubmit = async () => {
    setIsLoading(true);
    try {
      await updateProductColorService(productColor.id, hexCode);
      notification.success({
        message: 'Update ProductColor',
        description: 'Success!',
      });
      dispatch(getProductColorListAction(query));
    } catch (err) {
      handleError(err, form, notification);
    }
    setIsLoading(false);
  };

  return (
    <div className="container">
      <Form layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item
          label="Choose color:"
        >
          <ColorPicker onSelect={(c) => setHexCode(c)} initialValues={hexCode} />
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

EditProductColorForm.propTypes = {
  productColor: PropTypes.objectOf(PropTypes.any).isRequired,
  query: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EditProductColorForm;
