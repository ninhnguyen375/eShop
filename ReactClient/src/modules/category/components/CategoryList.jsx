import React, { useEffect, useState } from 'react';
import {
  Card, Button, Table, Input, Tooltip,
} from 'antd';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { MODULE_NAME as MODULE_CATEGORY, LIMIT } from '../models';
import { getCategoryListAction } from '../actions';
import categoriesIcon from '../../../assets/images/categories.png';
import AddCategoryForm from './AddCategoryForm';
import EditCategoryForm from './EditCategoryForm';

const CategoryList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [search, setSearch] = useState({});
  const categoryList = useSelector(
    (state) => state[MODULE_CATEGORY].categoryList,
  );
  const pagination = {
    current: categoryList ? categoryList.currentPage : 1,
    pageSize: categoryList ? categoryList.pageSize : LIMIT,
    total: categoryList ? categoryList.totalCount : 0,
  };
  const categories = categoryList ? categoryList.data || [] : [];

  useEffect(() => {
    dispatch(getCategoryListAction());
  }, [dispatch]);

  const handleClickAddCategory = () => {
    window.Modal.show(
      <AddCategoryForm query={{ ...search, pageNumber: pagination.current }} />,
      {
        title: <b>ADD NEW CATEGORY</b>,
      },
    );
  };

  const handleClickUpdateCategory = (category) => {
    window.Modal.show(
      <EditCategoryForm
        query={{ ...search, pageNumber: pagination.current }}
        category={category}
      />,
      {
        title: <b>UPDATE CATEGORY</b>,
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

    dispatch(getCategoryListAction({ ...data, ...search }));
  };

  const handleSearchByName = (value) => {
    setSearch({ ...search, name: value });
    if (!value) {
      dispatch(getCategoryListAction());
      return;
    }
    dispatch(getCategoryListAction({ name: value }));
  };

  const columns = [
    {
      key: 'avatar',
      width: 100,
      align: 'right',
      render: () => <img width={30} src={categoriesIcon} alt="avatar" />,
    },
    {
      key: 'name',
      title: 'Name',
      align: 'left',
      render: (r) => (
        <Tooltip title="Category Name">
          <b style={{ color: '#1890ff', cursor: 'pointer' }}>{r.name}</b>
        </Tooltip>
      ),
    },
    {
      key: 'action',
      title: 'Action',
      align: 'right',
      render: (record) => (
        <Button
          onClick={() => handleClickUpdateCategory(record)}
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
            <span>CATEGORY</span>
          </b>
        )}
      >
        <div className="d-flex justify-content-between">
          <Input.Search
            style={{ width: 300 }}
            onSearch={handleSearchByName}
            placeholder="Search category"
          />
          <div>
            <Button onClick={handleClickAddCategory} type="primary">
              <i className="fas fa-plus" style={{ marginRight: 5 }} />
              ADD NEW CATEGORY
            </Button>
          </div>
        </div>
        <div style={{ margin: '10px 0' }} />
        <Table
          rowKey={(r) => r.id}
          columns={columns}
          dataSource={categories}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </Card>
    </div>
  );
};

export default CategoryList;
