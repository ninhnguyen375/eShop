import React, { useEffect, useState } from 'react';
import {
  Card, Button, Table, Input, Tooltip, Tabs, Tag,
} from 'antd';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {
  MODULE_NAME as MODULE_PRODUCT,
  LIMIT,
  emptyString,
  STATUS,
} from '../../models';
import { getProductList, getProductDetailList } from '../../actions';
import {
  getValueByPath,
} from '../../../../common/utils/objectUtils';
import AddProductForm from './AddProductForm';
import ProductDetailList from './ProductDetailList';
import AddProductDetailForm from './AddProductDetailForm';
import { priceParser } from '../../../../common/utils/stringConvert';
import EditProductForm from './EditProductForm';

const ProductList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [search, setSearch] = useState({});
  const productList = useSelector((state) => state[MODULE_PRODUCT].productList);
  const paginationProductList = {
    current: productList ? productList.currentPage : 1,
    pageSize: productList ? productList.pageSize : LIMIT,
    total: productList ? productList.totalCount : 0,
  };
  const products = productList ? productList.data || [] : [];

  useEffect(() => {
    dispatch(getProductList());
    dispatch(getProductDetailList());
  }, [dispatch]);

  const handleClickAddProduct = () => {
    window.Modal.show(<AddProductForm />, {
      title: <b>Add Product</b>,
      style: { top: 10 },
    });
  };

  const handleTableChange = (page, filter, sorter) => {
    const { field, order } = sorter;
    const data = { pageNumber: page.current };

    if (order === 'ascend') {
      data.sortAsc = field;
    }
    if (order === 'descend') {
      data.sortDesc = field;
    }

    // remove all null or empty search values
    Object.keys(search).forEach((key) => {
      if (search[key] === '' || search[key] === null) {
        delete search[key];
      }
    });

    dispatch(getProductList({ ...data, ...search }));
  };

  const handleSearchByName = (value) => {
    setSearch({ ...search, name: value });
    if (!value) {
      dispatch(getProductList());
      return;
    }
    dispatch(getProductList({ name: value }));
  };

  const handleAddProductDetail = (id, product) => {
    if (!id) return;

    window.Modal.show(
      <AddProductDetailForm id={id} product={product} />,
      {
        title: <b>Add New Specific Product</b>,
        style: { top: 10 },
      },
    );
  };

  const handleClickEdit = (productId) => {
    if (!productId) return;

    window.Modal.show(
      <EditProductForm productId={productId} />,
      {
        title: <b>EDIT PRODUCT</b>,
        style: { top: 10 },
      },
    );
  };

  const columnsProduct = [
    {
      key: 'name',
      title: 'Name',
      width: 215,
      render: (r) => (
        <Tooltip title="Product Name">
          <b style={{ color: '#1890ff', cursor: 'pointer' }}>
            {r.name || emptyString}
          </b>
        </Tooltip>
      ),
    },
    {
      key: 'category',
      title: 'Category',
      render: (r) => (
        <Tooltip title="Product Category">
          <b style={{ color: '#1890ff', cursor: 'pointer' }}>
            {getValueByPath(r, 'category.name') || emptyString}
          </b>
        </Tooltip>
      ),
    },
    {
      key: 'style',
      title: 'Style',
      render: (r) => (
        <Tooltip title="Product Style">
          <b style={{ color: '#1890ff', cursor: 'pointer' }}>
            {getValueByPath(r, 'style.name') || emptyString}
          </b>
        </Tooltip>
      ),
    },
    {
      key: 'price',
      title: 'Price',
      render: (r) => (
        <b className="text-orange" style={{ cursor: 'pointer' }}>
          {priceParser(r.price) || emptyString}
          {' '}
          VND
        </b>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      render: (r) => (
        <Tag color={STATUS[r].color}>
          <span className="uppercase">
            <b>{STATUS[r].code}</b>
          </span>
        </Tag>
      ),
    },
    {
      key: 'action',
      title: 'Action',
      align: 'right',
      render: (r) => (
        <div>
          <Button className="mr10" onClick={() => handleAddProductDetail(r.id, r)}>
            <i className="fas fa-plus mr5" />
            Add specific products
          </Button>
          <Button onClick={() => handleClickEdit(r.id)} type="primary">
            <i className="fas fa-edit mr5" />
            Edit
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Card
        title={(
          <b>
            <Button
              type="link"
              title="Go back"
              style={{ color: '#000' }}
              onClick={() => history.goBack()}
            >
              <i className="fas fa-arrow-left" />
            </Button>
            <span>PRODUCT</span>
          </b>
        )}
      >
        <Tabs>
          <Tabs.TabPane tab="Product List" key="product">
            <div>
              <div className="d-flex justify-content-between">
                <Input.Search
                  style={{ width: 300 }}
                  onSearch={handleSearchByName}
                  placeholder="Search product"
                />
                <div>
                  <Button type="primary" onClick={handleClickAddProduct}>
                    <i className="fas fa-plus" style={{ marginRight: 5 }} />
                    <b>ADD NEW PRODUCT</b>
                  </Button>
                </div>
              </div>
              <div style={{ margin: '10px 0' }} />
              <Table
                rowKey={(r) => r.id}
                columns={columnsProduct}
                dataSource={products}
                pagination={paginationProductList}
                onChange={handleTableChange}
              />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Specific Product List" key="product-detail">
            <ProductDetailList />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default ProductList;
