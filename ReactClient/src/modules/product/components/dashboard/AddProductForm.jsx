import React, { useState, useEffect, useCallback } from 'react';
import {
  Form, Input, Select, notification, Button, InputNumber,
} from 'antd';
import { useDispatch } from 'react-redux';
import { getStyleListService } from '../../../style/services';
import handleError from '../../../../common/utils/handleError';
import { getCategoryListService } from '../../../category/services';
import { addProductService } from '../../services';
import { getProductList } from '../../actions';

const AddProductForm = () => {
  const [form] = Form.useForm();
  const [styles, setStyles] = useState([]);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  const rules = {
    name: [{ required: true, message: 'Please input product name' }],
    styleId: [{ required: true, message: 'Please select product style' }],
    categoryId: [{ required: true, message: 'Please select product category' }],
    description: [{ required: true, message: 'Please select description' }],
  };

  const getStyles = useCallback(async () => {
    try {
      const { data } = await getStyleListService();
      setStyles(data.data);
    } catch (err) {
      handleError(err, null, notification);
    }
  }, []);

  const getCategories = useCallback(async () => {
    try {
      const { data } = await getCategoryListService({ pageSize: 50 });
      setCategories(data.data);
    } catch (err) {
      handleError(err, null, notification);
    }
  }, []);

  useEffect(() => {
    getStyles();
    getCategories();
  }, [getStyles, getCategories]);

  const handleSubmit = async (values) => {
    try {
      await addProductService(values);
      notification.success({ message: 'Add new Product', description: 'Success!' });
      dispatch(getProductList());
      window.Modal.clear();
    } catch (err) {
      handleError(err, form, notification);
    }
  };

  return (
    <div className="container">
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <div className="row">
          <div className="col-lg-6">
            <Form.Item name="name" label="Product Name" rules={rules.name}>
              <Input placeholder="Input product name" />
            </Form.Item>
          </div>
          <div className="col-lg-6">
            <Form.Item
              name="styleId"
              label="Product Style"
              rules={rules.styleId}
            >
              <Select placeholder="Select product style">
                {styles[0]
                  ? styles.map((s) => (
                    <Select.Option key={s.id} value={s.id}>
                      {s.name}
                    </Select.Option>
                  ))
                  : undefined}
              </Select>
            </Form.Item>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <Form.Item
              name="categoryId"
              label="Product Category"
              rules={rules.categoryId}
            >
              <Select placeholder="Select Product Category">
                {categories[0]
                  ? categories.map((s) => (
                    <Select.Option key={s.id} value={s.id}>
                      {s.name}
                    </Select.Option>
                  ))
                  : undefined}
              </Select>
            </Form.Item>
          </div>
          <div className="col-lg-6">

            <Form.Item
              hasFeedback
              label="Price (VND):"
              name="price"
              rules={[
                { required: true, message: 'Please input product Price!' },
                { type: 'number', message: 'Please enter a number' },
              ]}
            >
              <InputNumber
                className="w100p"
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                parser={(value) => value.replace(/(\.*)/g, '')}
                placeholder="Input product price"
                min={1}
              />
            </Form.Item>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <Form.Item
              name="description"
              label="Description"
              rules={rules.description}
            >
              <Input.TextArea />
            </Form.Item>
          </div>
        </div>

        <div className="row">
          <div className="col d-flex justify-content-end">
            <Button className="mr5" onClick={() => window.Modal.clear()}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              <i className="fas fa-plus mr5" />
              Add
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddProductForm;
