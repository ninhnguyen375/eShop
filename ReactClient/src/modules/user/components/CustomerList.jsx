import React, { useEffect, useState } from 'react';
import {
  Card, Button, Table, Input, Tooltip, Tag,
} from 'antd';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MODULE_NAME as MODULE_USER, emptyString, GENDERS } from '../models';
import { getCustomerList } from '../actions';
import avatar from '../../../assets/images/user.svg';

const CustomerList = () => {
  useEffect(() => () => {}, []);
  const history = useHistory();
  const dispatch = useDispatch();
  const [search, setSearch] = useState({});
  const customerList = useSelector((state) => state[MODULE_USER].customerList);
  const pagination = customerList;
  const customers = customerList ? customerList.data || [] : [];

  useEffect(() => {
    dispatch(getCustomerList());
  }, [dispatch]);

  const handleSearchEmail = (value) => {
    setSearch({ ...search, email: value });
    if (!value) {
      dispatch(getCustomerList());
      return;
    }
    dispatch(getCustomerList({ email: value }));
  };

  const handleTableChange = (page, filter, sorter) => {
    const { field, order } = sorter;
    const data = { current: page.current };

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

    dispatch(getCustomerList({ ...data, ...search }));
  };

  const columns = [
    {
      key: 'avatar',
      align: 'center',
      render: () => <img width={30} src={avatar} alt="avatar" />,
    },
    {
      key: 'name',
      title: 'Name',
      render: (r) => (
        <Tooltip title="Click to view profile">
          <Link to={`/admin/customer/${r.id}`}>
            <b>{r.name ? r.name : r.email.split('@')[0]}</b>
          </Link>
        </Tooltip>
      ),
    },
    {
      key: 'phone',
      title: 'Phone',
      dataIndex: 'phoneNumber',
      render: (r) => (r ? (
        <div>
          <i className="fas fa-phone mr5" />
          {r}
        </div>
      ) : <Tag>{emptyString}</Tag>),
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
      sorter: true,
      render: (r) => (r ? (
        <a href={`mailto:${r}`}>
          <Tooltip title="Click to send email">
            <i className="far fa-envelope mr5" />
            {r}
          </Tooltip>
        </a>
      ) : <Tag>{emptyString}</Tag>),
    },
    {
      key: 'gender',
      title: 'Gender',
      dataIndex: 'gender',
      render: (r) => {
        if (!r) {
          return <Tag>{emptyString}</Tag>;
        }
        const gender = GENDERS.find((g) => g.code === r.toLowerCase());
        return (
          <Tag color={gender.tagColor}>
            <i className={gender.iconClass} />
            {' '}
            {gender.code.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      key: 'action',
      title: 'Action',
      render: () => <Button>action</Button>,
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
            <span>CUSTOMER</span>
          </b>
        )}
      >
        <div className="d-flex">
          <Input.Search
            onSearch={handleSearchEmail}
            style={{ width: 300 }}
            placeholder="Search by Email"
          />
        </div>
        <div style={{ margin: '10px 0' }} />
        <Table
          rowKey={(r) => r.id}
          columns={columns}
          dataSource={customers}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </Card>
    </div>
  );
};

export default CustomerList;
