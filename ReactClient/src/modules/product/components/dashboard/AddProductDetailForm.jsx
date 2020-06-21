import React, { useEffect, useState } from 'react';
import {
  Form, Upload, Button, notification, Select, message, Input,
} from 'antd';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { addProductDetailService } from '../../services';
import handleError from '../../../../common/utils/handleError';
import { MODULE_NAME as MODULE_PRODUCT_COLOR } from '../../../productColor/models';
import { getProductColorListAction } from '../../../productColor/actions';
import AddProductColorForm from '../../../productColor/components/AddProductColorForm';
import { getProductSizeListAction } from '../../../productSize/actions';
import { MODULE_NAME as MODULE_SIZE } from '../../../productSize/models';
import { getProductDetailList } from '../../actions';
import { getValueByPath } from '../../../../common/utils/objectUtils';

const AddProductDetailForm = ({ id, product }) => {
  const [form] = Form.useForm();
  const [isShowAddColor, setIsShowAddColor] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const productColorList = useSelector(
    (state) => state[MODULE_PRODUCT_COLOR].productColorList,
  );
  const productSizeList = useSelector(
    (state) => state[MODULE_SIZE].productSizeList,
  );
  const productColors = productColorList ? productColorList.data || [] : [];
  const productSizes = productSizeList ? productSizeList.data || [] : [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductColorListAction());
    dispatch(getProductSizeListAction());
  }, [dispatch]);

  const handleSubmit = async (values) => {
    setIsFetching(true);
    try {
      await addProductDetailService(id, values);
      notification.success({
        message: 'Add Specific Product',
        description: 'Success!',
      });

      dispatch(getProductDetailList());
      window.Modal.clear();
    } catch (err) {
      handleError(err, form, notification);
    }
    setIsFetching(false);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }

    return isJpgOrPng && isLt2M;
  };

  return (
    <div className="container">
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <div className="row">
          <div className="col-lg-6">
            <div>Product Name:</div>
            <Input value={product.name} disabled />
          </div>
          <div className="col-lg-6">
            <div>Product Category:</div>
            <Input value={getValueByPath(product, 'category.name')} disabled />
          </div>
        </div>
        <div className="row mt10">
          <div className="col-lg-6">
            <Form.Item
              label="Product Color:"
              name="colorId"
              rules={[
                { required: true, message: 'Please select product Color!' },
              ]}
            >
              <Select
                placeholder="Select Product Color"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) => {
                  const hexCodeText = option.children.props.children[1].props.children;
                  return hexCodeText.indexOf(input) >= 0;
                }}
              >
                {productColors[0]
                  ? productColors.map((color) => (
                    <Select.Option key={color.id} value={color.id}>
                      <div className="d-flex align-items-center">
                        <div
                          className="mr10 w20p h100p"
                          style={{
                            padding: 1,
                            border: '1px solid lightgrey',
                            borderRadius: 3,
                          }}
                        >
                          <div
                            style={{
                              border: '1px solid lightgrey',
                              borderRadius: 3,
                              background: `${color.hexCode}`,
                              height: 20,
                            }}
                          />
                        </div>
                        <div>{color.hexCode}</div>
                      </div>
                    </Select.Option>
                  ))
                  : undefined}
              </Select>
            </Form.Item>
            <Button
              onClick={() => setIsShowAddColor(!isShowAddColor)}
              className="p0"
              type="link"
            >
              {isShowAddColor ? (
                <div>
                  <i className="fas fa-chevron-up mr5" />
                  Close
                </div>
              ) : (
                <div>
                  <i className="fas fa-chevron-down mr5" />
                  Add new Color
                </div>
              )}
            </Button>
            <div className={isShowAddColor ? '' : 'd-none'}>
              <AddProductColorForm minimal />
            </div>
          </div>
          <div className="col-lg-6">
            <Form.Item hasFeedback label="Product Style:">
              <Input value={getValueByPath(product, 'style.name')} disabled />
            </Form.Item>
          </div>
        </div>
        <div className="row mt10">
          <div className="col">
            <Form.Item
              name="sizeIds"
              label="Choose product sizes:"
              rules={[
                { required: true, message: 'Please select product sizes' },
              ]}
            >
              <Select
                placeholder="Select Product Sizes"
                showSearch
                mode="multiple"
                optionFilterProp="children"
                filterOption={(input, option) => {
                  const sizeValue = option.children.toString();
                  return sizeValue.indexOf(input.toString());
                }}
              >
                {productSizes[0]
                  ? productSizes.map((size) => (
                    <Select.Option key={size.id} value={size.id}>
                      {size.sizeValue}
                    </Select.Option>
                  ))
                  : undefined}
              </Select>
            </Form.Item>
          </div>
        </div>
        <div className="row mt10">
          <div className="col-lg-12">
            <Form.Item
              label="Product Images:"
              name="images"
              rules={[
                { required: true, message: 'Please upload product images' },
              ]}
            >
              <Upload
                beforeUpload={beforeUpload}
                listType="picture-card"
                customRequest={({ onSuccess }) => {
                  setTimeout(() => onSuccess('ok'), 0);
                }}
                onPreview={() => {}}
                multiple
              >
                <div>
                  <i className="fas fa-plus" />
                  <div>Upload</div>
                </div>
              </Upload>
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col d-flex justify-content-end">
            <Button className="mr5" onClick={() => window.Modal.clear()}>
              Cancel
            </Button>
            <Button loading={isFetching} type="primary" htmlType="submit">
              <i className="fas fa-plus mr5" />
              Add
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

AddProductDetailForm.propTypes = {
  id: PropTypes.number.isRequired,
  product: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AddProductDetailForm;
