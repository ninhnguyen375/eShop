import React, { useEffect, useState } from 'react';
import {
  Card, Button, Table, Input, Tooltip,
} from 'antd';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { MODULE_NAME as MODULE_PRODUCT_SIZE, LIMIT } from '../models';
import { getProductSizeListAction } from '../actions';
import productSizesIcon from '../../../assets/images/categories.png';
import AddProductSizeForm from './AddProductSizeForm';
import EditProductSizeForm from './EditProductSizeForm';
import { emptyString } from '../../product/models';

const ProductSizeList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [search, setSearch] = useState({});
  const productSizeList = useSelector(
    (state) => state[MODULE_PRODUCT_SIZE].productSizeList,
  );
  const pagination = {
    current: productSizeList ? productSizeList.currentPage : 1,
    pageSize: productSizeList ? productSizeList.pageSize : LIMIT,
    total: productSizeList ? productSizeList.totalCount : 0,
  };
  const productSizes = productSizeList ? productSizeList.data || [] : [];

  useEffect(() => {
    dispatch(getProductSizeListAction());
  }, [dispatch]);

  const handleClickAddProductSize = () => {
    window.Modal.show(
      <AddProductSizeForm query={{ ...search, pageNumber: pagination.current }} />,
      {
        title: <b>ADD NEW PRODUCT_SIZE</b>,
      },
    );
  };

  const handleClickUpdateProductSize = (productSize) => {
    window.Modal.show(
      <EditProductSizeForm
        query={{ ...search, pageNumber: pagination.current }}
        productSize={productSize}
      />,
      {
        title: <b>UPDATE PRODUCT_SIZE</b>,
      },
    );
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

    dispatch(getProductSizeListAction({ ...data, ...search }));
  };

  const handleSearchByName = (value) => {
    setSearch({ ...search, name: value });
    if (!value) {
      dispatch(getProductSizeListAction());
      return;
    }
    dispatch(getProductSizeListAction({ name: value }));
  };

  const columns = [
    {
      key: 'avatar',
      width: 100,
      align: 'right',
      render: () => <img width={30} src={productSizesIcon} alt="avatar" />,
    },
    {
      key: 'size-number',
      title: 'Product Size Number',
      align: 'left',
      render: (r) => (
        <Tooltip title="Product Size Number">
          <b style={{ color: '#1890ff', cursor: 'pointer' }}>{r.sizeValue || emptyString}</b>
        </Tooltip>
      ),
    },
    {
      key: 'action',
      title: 'Action',
      align: 'right',
      render: (record) => (
        <Button
          onClick={() => handleClickUpdateProductSize(record)}
          type="primary"
        >
          <i className="fas fa-edit mr5" />
          Edit
        </Button>
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
            <span>PRODUCT_SIZE</span>
          </b>
        )}
      >
        <div className="d-flex justify-content-between">
          <Input.Search
            style={{ width: 300 }}
            onSearch={handleSearchByName}
            placeholder="Search productSize"
          />
          <div>
            <Button onClick={handleClickAddProductSize} type="primary">
              <i className="fas fa-plus" style={{ marginRight: 5 }} />
              ADD NEW PRODUCT_SIZE
            </Button>
          </div>
        </div>
        <div style={{ margin: '10px 0' }} />
        <Table
          rowKey={(r) => r.id}
          columns={columns}
          dataSource={productSizes}
          pagination="none"
          onChange={handleTableChange}
        />
      </Card>
    </div>
  );
};

export default ProductSizeList;
