import React, { useEffect, useState } from 'react';
import {
  Card, Button, Table, Input, Tooltip,
} from 'antd';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { MODULE_NAME as MODULE_PRODUCT_COLOR, LIMIT } from '../models';
import { getProductColorListAction } from '../actions';
import AddProductColorForm from './AddProductColorForm';
import EditProductColorForm from './EditProductColorForm';

const ProductColorList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [search, setSearch] = useState({});
  const productColorList = useSelector(
    (state) => state[MODULE_PRODUCT_COLOR].productColorList,
  );
  const pagination = {
    current: productColorList ? productColorList.currentPage : 1,
    pageSize: productColorList ? productColorList.pageSize : LIMIT,
    total: productColorList ? productColorList.totalCount : 0,
  };
  const productColors = productColorList ? productColorList.data || [] : [];

  useEffect(() => {
    dispatch(getProductColorListAction());
  }, [dispatch]);

  const handleClickAddProductColor = () => {
    window.Modal.show(
      <AddProductColorForm
        query={{ ...search, pageNumber: pagination.current }}
      />,
      {
        title: <b>ADD NEW PRODUCT COLOR</b>,
      },
    );
  };

  const handleClickUpdateProductColor = (productColor) => {
    window.Modal.show(
      <EditProductColorForm
        query={{ ...search, pageNumber: pagination.current }}
        productColor={productColor}
      />,
      {
        title: <b>UPDATE PRODUCT COLOR</b>,
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

    dispatch(getProductColorListAction({ ...data, ...search }));
  };

  const handleSearchByName = (value) => {
    setSearch({ ...search, name: value });
    if (!value) {
      dispatch(getProductColorListAction());
      return;
    }
    dispatch(getProductColorListAction({ name: value }));
  };

  const columns = [
    {
      key: 'color',
      title: 'Product Color',
      width: 200,
      render: (r) => (
        <div className="w70 p5" style={{ boxShadow: '0 0 10px #dfdfdf' }}>
          <div
            style={{
              width: '50px',
              height: '30px',
              borderRadius: '2px',
              background: r.hexCode,
              border: '1px solid lightgrey',
            }}
          />
        </div>
      ),
    },
    {
      key: 'hexCode',
      title: 'Hex Code',
      render: (r) => (
        <Tooltip title="Hex Code">
          <b style={{ color: '#1890ff', cursor: 'pointer' }}>{r.hexCode}</b>
        </Tooltip>
      ),
    },
    {
      key: 'action',
      title: 'Action',
      align: 'right',
      render: (record) => (
        <Button
          onClick={() => handleClickUpdateProductColor(record)}
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
            <span>PRODUCT COLOR</span>
          </b>
        )}
      >
        <div className="d-flex justify-content-between">
          <Input.Search
            style={{ width: 300 }}
            onSearch={handleSearchByName}
            placeholder="Search productColor"
          />
          <div>
            <Button onClick={handleClickAddProductColor} type="primary">
              <i className="fas fa-plus" style={{ marginRight: 5 }} />
              ADD NEW PRODUCT COLOR
            </Button>
          </div>
        </div>
        <div style={{ margin: '10px 0' }} />
        <Table
          rowKey={(r) => r.id}
          columns={columns}
          dataSource={productColors}
          pagination="none"
          onChange={handleTableChange}
        />
      </Card>
    </div>
  );
};

export default ProductColorList;
