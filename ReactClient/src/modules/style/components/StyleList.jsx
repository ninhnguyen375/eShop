import React, { useEffect, useState } from 'react';
import {
  Card, Button, Table, Input, Tooltip,
} from 'antd';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { MODULE_NAME as MODULE_STYLE, LIMIT } from '../models';
import { getStyleListAction } from '../actions';
import stylesIcon from '../../../assets/images/categories.png';
import AddStyleForm from './AddStyleForm';
import EditStyleForm from './EditStyleForm';

const StyleList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [search, setSearch] = useState({});
  const styleList = useSelector(
    (state) => state[MODULE_STYLE].styleList,
  );
  const pagination = {
    current: styleList ? styleList.currentPage : 1,
    pageSize: styleList ? styleList.pageSize : LIMIT,
    total: styleList ? styleList.totalCount : 0,
  };
  const styles = styleList ? styleList.data || [] : [];

  useEffect(() => {
    dispatch(getStyleListAction());
  }, [dispatch]);

  const handleClickAddStyle = () => {
    window.Modal.show(
      <AddStyleForm query={{ ...search, pageNumber: pagination.current }} />,
      {
        title: <b>ADD NEW STYLE</b>,
      },
    );
  };

  const handleClickUpdateStyle = (style) => {
    window.Modal.show(
      <EditStyleForm
        query={{ ...search, pageNumber: pagination.current }}
        style={style}
      />,
      {
        title: <b>UPDATE STYLE</b>,
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

    dispatch(getStyleListAction({ ...data, ...search }));
  };

  const handleSearchByName = (value) => {
    setSearch({ ...search, name: value });
    if (!value) {
      dispatch(getStyleListAction());
      return;
    }
    dispatch(getStyleListAction({ name: value }));
  };

  const columns = [
    {
      key: 'avatar',
      width: 100,
      align: 'right',
      render: () => <img width={30} src={stylesIcon} alt="avatar" />,
    },
    {
      key: 'name',
      title: 'Name',
      align: 'left',
      render: (r) => (
        <Tooltip title="Style Name">
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
          onClick={() => handleClickUpdateStyle(record)}
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
            <span>STYLE</span>
          </b>
        )}
      >
        <div className="d-flex justify-content-between">
          <Input.Search
            style={{ width: 300 }}
            onSearch={handleSearchByName}
            placeholder="Search style"
          />
          <div>
            <Button onClick={handleClickAddStyle} type="primary">
              <i className="fas fa-plus" style={{ marginRight: 5 }} />
              ADD NEW STYLE
            </Button>
          </div>
        </div>
        <div style={{ margin: '10px 0' }} />
        <Table
          rowKey={(r) => r.id}
          columns={columns}
          dataSource={styles}
          pagination="none"
          onChange={handleTableChange}
        />
      </Card>
    </div>
  );
};

export default StyleList;
