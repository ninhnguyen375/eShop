import React, { useState } from 'react';
import { Form, Button, notification } from 'antd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { createProductColorService } from '../services';
import handleError from '../../../common/utils/handleError';
import { getProductColorListAction } from '../actions';
import ColorPicker from '../../../common/components/widgets/ColorPicker';

const AddProductColorForm = ({ query, minimal }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [hexCode, setHexCode] = useState('');

  const handleFormSubmit = async () => {
    setIsLoading(true);
    try {
      await createProductColorService(hexCode);
      notification.success({
        message: 'Create ProductColor',
        description: 'Success!',
      });
      dispatch(getProductColorListAction(query));
      if (!minimal) {
        window.Modal.hide();
      }
    } catch (err) {
      handleError(err, form, notification);
    }
    setIsLoading(false);
  };

  return (
    <div className={minimal ? '' : 'container'}>
      <Form
        className={minimal ? 'd-flex' : ''}
        layout="vertical"
        onFinish={handleFormSubmit}
        name="add-product-color-form"
      >
        <Form.Item label={minimal ? '' : 'Choose color:'}>
          <ColorPicker onSelect={(c) => setHexCode(c)} height={minimal ? 22 : 30} />
        </Form.Item>
        <div className="d-flex justify-content-end">
          {minimal ? undefined : (
            <Button
              className="mr10"
              onClick={() => {
                window.Modal.hide();
              }}
            >
              Cancel
            </Button>
          )}
          <Button
            className={minimal ? 'ml10' : ''}
            loading={isLoading}
            type="primary"
            htmlType="submit"
            formTarget="add-product-color-form"
          >
            <i className="fas fa-plus mr5" />
            Add
          </Button>
        </div>
      </Form>
      {minimal ? (
        <div style={{ marginTop: '-20px' }}>
          <b>Hex Code:</b>
          {' '}
          {hexCode}
        </div>
      ) : undefined}
    </div>
  );
};

AddProductColorForm.propTypes = {
  query: PropTypes.objectOf(PropTypes.any),
  minimal: PropTypes.bool,
};

AddProductColorForm.defaultProps = {
  query: {},
  minimal: false,
};

export default AddProductColorForm;
