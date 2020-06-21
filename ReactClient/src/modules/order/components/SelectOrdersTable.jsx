import React, { useEffect, useState, useCallback } from 'react';
import {
  Button, Table, Input, Tag, Tooltip,
} from 'antd';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import {
  MODULE_NAME as MODULE_ORDER,
  LIMIT,
  emptyString,
  STATUS,
} from '../models';
import { getOrderList } from '../actions';
import { priceParser } from '../../../common/utils/stringConvert';

const SelectOrdersTable = ({ onFinish }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const orderList = useSelector((state) => state[MODULE_ORDER].orderList);
  const pagination = {
    current: orderList ? orderList.currentPage : 1,
    pageSize: orderList ? orderList.pageSize : LIMIT,
    total: orderList ? orderList.totalCount : 0,
  };
  const orders = orderList ? orderList.data || [] : [];

  const getOrders = useCallback(
    async (params) => {
      const data = {
        sortDesc: 'CreatedAt',
        selectStatus: [STATUS.accepted.code, STATUS.paid.code],
        shipperId: 'isNullOrEmpty',
        ...params,
      };
      Object.keys(data).forEach((key) => {
        if (data[key] === '' || data[key] === null) {
          delete data[key];
        }
      });

      dispatch(getOrderList({ ...data }));
    },
    [dispatch],
  );

  const handleFinish = () => {
    onFinish(selectedRowKeys);
  };

  const handleRowSelection = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  };

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const handleTableChange = (page, filter, sorter) => {
    const { field, order } = sorter;
    const data = { pageNumber: page.current };

    if (order === 'ascend') {
      data.sortAsc = field;
    }
    if (order === 'descend') {
      data.sortDesc = field;
    }

    getOrders({ ...search, ...data });
  };

  const columns = [
    {
      key: 'id',
      title: 'ID',
      align: 'left',
      render: (r) => <span className="text-blue">{r.id}</span>,
    },
    {
      key: 'user-info',
      title: 'User Info',
      render: (r) => (
        <div>
          <div className="pt2 nowrap pb2 text-blue">
            <i className="fas fa-user mr5" style={{ fontSize: '0.8em' }} />
            {r.userName}
          </div>
          <div className="pt2 nowrap pb2 text-blue">
            <i className="fas fa-envelope mr5" style={{ fontSize: '0.8em' }} />
            {r.email}
          </div>
          <div className="pt2 nowrap pb2 text-blue">
            <i className="fas fa-phone mr5" style={{ fontSize: '0.8em' }} />
            {r.phoneNumber}
          </div>
        </div>
      ),
    },
    {
      key: 'address',
      title: 'Address',
      render: (r) => <span className="text-blue">{r.address}</span>,
    },
    {
      key: 'price',
      title: 'Total Price',
      render: (r) => (
        <b className="text-orange nowrap" style={{ cursor: 'pointer' }}>
          {priceParser(r.totalPrice) || emptyString}
          {' '}
          VND
        </b>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      render: (r) => {
        const status = STATUS[r.status];

        if (r.status === STATUS.rejected.code) {
          return (
            <Tooltip title="Click to show Reject Reason">
              <Tag
                onClick={() => {
                  window.Modal.show(
                    <div>
                      <div className="p20">{r.rejectReason}</div>
                      <div className="d-flex justify-content-end">
                        <Button onClick={() => window.Modal.clear()}>
                          Close
                        </Button>
                      </div>
                    </div>,
                    {
                      title: <b>REJECT REASON</b>,
                    },
                  );
                }}
                className="uppercase"
                color={status.color}
              >
                {status.code}
              </Tag>
            </Tooltip>
          );
        }
        return (
          <Tag color={status.color} className="uppercase">
            {status.code}
          </Tag>
        );
      },
    },
    {
      key: 'createdAt',
      title: 'Order At',
      render: (r) => (
        <span className="text-blue">
          {moment(r.createdAt).format('HH:mm DD/MM/YYYY')}
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-start">
        <Input.Search
          className="mr10"
          style={{ width: 250 }}
          onSearch={() => {
            getOrders(search);
          }}
          onChange={({ target }) => {
            setSearch({ ...search, id: target.value });
          }}
          placeholder="Search by id"
          value={search.id || ''}
        />
        <Input.Search
          style={{ width: 250 }}
          onSearch={() => {
            getOrders(search);
          }}
          onChange={({ target }) => {
            setSearch({ ...search, email: target.value });
          }}
          placeholder="Search by email"
          value={search.email || ''}
        />
        <Button
          onClick={() => {
            setSearch({});
            getOrders();
          }}
          className="ml10"
        >
          Refresh
        </Button>
      </div>
      <div style={{ margin: '10px 0' }} />
      <Table
        rowSelection={{ onChange: handleRowSelection }}
        rowKey={(r) => r.id}
        columns={columns}
        dataSource={orders}
        pagination={pagination}
        onChange={handleTableChange}
        size="small"
      />
      <div className="d-flex justify-content-end mt20">
        <Button className="mr5" onClick={() => window.Modal.clear()}>
          Cancel
        </Button>
        <Button type="primary" onClick={handleFinish}>
          Apply
        </Button>
      </div>
    </div>
  );
};

SelectOrdersTable.propTypes = {
  onFinish: PropTypes.func.isRequired,
};

export default SelectOrdersTable;
