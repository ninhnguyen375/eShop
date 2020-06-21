import React, { useEffect, useState } from 'react';
import {
  Card, Button, Table, Input, Tag, Tooltip, notification,
} from 'antd';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  MODULE_NAME as MODULE_USER, emptyString, GENDERS, ROLE,
} from '../models';
import { getStaffList } from '../actions';
import avatar from '../../../assets/images/user.svg';
import AddStaffForm from './AddStaffForm';
import { getValueByPath } from '../../../common/utils/objectUtils';
import SelectOrdersTable from '../../order/components/SelectOrdersTable';
import handleError from '../../../common/utils/handleError';
import { addDeliveryTaskAsync } from '../../order/services';

const StaffList = ({ searchParams }) => {
  useEffect(() => () => {}, []);
  const history = useHistory();
  const dispatch = useDispatch();
  const [search, setSearch] = useState(searchParams);
  const staffList = useSelector((state) => state[MODULE_USER].staffList);
  const user = useSelector((state) => state[MODULE_USER].user);
  const pagination = staffList;
  const staffs = staffList ? staffList.data || [] : [];

  const handleClickAddStaff = () => {
    window.Modal.show(<AddStaffForm />, {
      style: { top: 10, maxWidth: '800px' },
      width: '95vw',
      title: <b>ADD NEW STAFF</b>,
    });
  };

  const handleFinishSelectOrders = (id) => async (selectedIds) => {
    if (!id || !selectedIds || !selectedIds[0]) { return; }
    try {
      await addDeliveryTaskAsync(id, selectedIds);
      notification.success({ message: 'Success!' });
      window.Modal.clear();
    } catch (err) {
      handleError(err, null, notification);
    }
  };

  const handleClickAddDeliveryTask = (id) => {
    if (!id) return;

    window.Modal.show(
      <SelectOrdersTable onFinish={handleFinishSelectOrders(id)} />,
      {
        title: <b>SELECT ORDERS</b>,
        style: { top: 10, maxWidth: 1000 },
        width: '95vw',
      },
    );
  };

  useEffect(() => {
    dispatch(getStaffList());
  }, [dispatch]);

  const handleSearchEmail = (value) => {
    setSearch({ ...search, email: value });
    if (!value) {
      dispatch(getStaffList());
      return;
    }
    dispatch(getStaffList({ email: value }));
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

    dispatch(getStaffList({ ...data, ...search }));
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
          <Link to={`/admin/staff/${r.id}`}>
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
      key: 'role',
      title: 'Role',
      dataIndex: 'role',
      render: (r) => (r ? (
        <Tag color="blue">
          <i className="fas fa-key mr5" />
          {r.toUpperCase()}
        </Tag>
      ) : <Tag>{emptyString}</Tag>),
    },
    {
      key: 'action',
      title: 'Action',
      align: 'right',
      render: (r) => {
        const isShipper = r.role === ROLE.shipper;

        if (isShipper) {
          return (
            <Button onClick={() => handleClickAddDeliveryTask(r.id)}>
              <i className="fas fa-plus mr5" />
              Add Delivery Task
            </Button>
          );
        }

        return undefined;
      },
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
            <span>STAFF</span>
          </b>
        )}
      >
        <div className="d-flex justify-content-between">
          <div>
            <Input.Search
              onSearch={handleSearchEmail}
              style={{ width: 300 }}
              placeholder="Search by Email"
            />
          </div>
          {getValueByPath(user, 'profile.role') === ROLE.manager ? (
            <div>
              <Button onClick={handleClickAddStaff} type="primary">
                <i className="fas fa-plus" style={{ marginRight: 5 }} />
                {' '}
                ADD STAFF
              </Button>
            </div>
          ) : undefined}
        </div>
        <div style={{ margin: '10px 0' }} />
        <Table
          rowKey={(r) => r.id}
          columns={columns}
          dataSource={staffs}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </Card>
    </div>
  );
};

StaffList.propTypes = {
  searchParams: PropTypes.objectOf(PropTypes.any),
};

StaffList.defaultProps = {
  searchParams: {},
};

export default StaffList;
