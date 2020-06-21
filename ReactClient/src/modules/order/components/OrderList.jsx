import React, { useEffect, useState, useCallback } from 'react';
import {
  Card,
  Button,
  Table,
  Input,
  Divider,
  Tag,
  notification,
  Tooltip,
  Form,
  Select,
} from 'antd';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'antd/lib/form/util';
import moment from 'moment';
import {
  MODULE_NAME as MODULE_ORDER,
  LIMIT,
  emptyString,
  STATUS,
  PaymentTypes,
} from '../models';
import { getOrderList } from '../actions';
import ordersIcon from '../../../assets/images/categories.png';
import { MODULE_NAME as MODULE_USER, ROLE } from '../../user/models';
import { priceParser } from '../../../common/utils/stringConvert';
import SmallSpecificProductItem from '../../product/components/SmallSpecificProductItem';
import handleError from '../../../common/utils/handleError';
import {
  acceptOrderAsync,
  rejectOrderAsync,
  deliveredOrderAsync,
} from '../services';
import { getValueByPath } from '../../../common/utils/objectUtils';

const OrderList = ({ isCustomer }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state[MODULE_USER].user);
  const userId = user.profile.sub;
  const [search, setSearch] = useState({});
  const orderList = useSelector((state) => state[MODULE_ORDER].orderList);
  const [form] = useForm();
  const pagination = {
    current: orderList ? orderList.currentPage : 1,
    pageSize: orderList ? orderList.pageSize : LIMIT,
    total: orderList ? orderList.totalCount : 0,
  };
  const orders = orderList ? orderList.data || [] : [];

  const getOrders = useCallback(
    async (params) => {
      const data = { sortDesc: 'CreatedAt', ...params };
      Object.keys(data).forEach((key) => {
        if (data[key] === '' || data[key] === null) {
          delete data[key];
        }
      });

      if (isCustomer) {
        data.userId = userId;
      }

      dispatch(getOrderList({ ...data }));
    },
    [dispatch, isCustomer, userId],
  );

  const handleAcceptOrder = async (id) => {
    if (!id) return;

    try {
      await acceptOrderAsync(id);
      notification.success({
        message: 'Accept order',
        description: 'Success!',
      });
      await getOrders();
    } catch (error) {
      handleError(error, null, notification);
    }
  };

  const handleClickDeliveredOrder = async (id) => {
    if (!id) return;

    try {
      await deliveredOrderAsync(id);
      notification.success({
        message: 'Success!',
      });
      await getOrders();
    } catch (error) {
      handleError(error, null, notification);
    }
  };

  const rejectOrder = async (id, rejectReason) => {
    try {
      await rejectOrderAsync(id, rejectReason);
      notification.success({
        message: 'Reject order',
        description: 'Success!',
      });
      window.Modal.clear();
      await getOrders();
    } catch (error) {
      handleError(error, null, notification);
    }
  };

  const handleRejectOrder = async (id) => {
    if (!id) return;
    window.Modal.show(
      <div className="p10">
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => rejectOrder(id, values.rejectReason)}
        >
          <Form.Item
            name="rejectReason"
            label="Reject reason:"
            rules={[{ required: true }]}
          >
            <Input.TextArea placeholder="Reject reason" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <Button className="mr5" onClick={() => window.Modal.clear()}>
              Cancel
            </Button>
            <Button htmlType="submit" danger type="primary">
              Reject
            </Button>
          </div>
        </Form>
      </div>,
      { title: <b>REJECT REASON</b> },
    );
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

  const handleShowDetails = (order) => {
    if (!order || !order.orderItems || !order.orderItems[0]) {
      return;
    }

    window.Drawer.show(
      <div>
        {order.orderItems.map((item) => (
          <div key={item.productId}>
            <SmallSpecificProductItem
              key={item.id}
              count={item.count}
              imageUrl={item.imageUrl}
              productName={item.productName}
              productPrice={item.productPrice}
              size={item.productSize}
              specificProductId={item.productId}
            />
            <Divider dashed />
          </div>
        ))}
      </div>,
      {
        width: 330,
        title: <b>ORDER DETAIL</b>,
      },
    );
  };

  const columns = [
    {
      key: 'avatar',
      width: 100,
      align: 'right',
      render: () => <img width={30} src={ordersIcon} alt="avatar" />,
    },
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
      key: 'payment-type',
      title: 'Payment Type',
      render: (r) => (
        <span className="text-blue">{getValueByPath(PaymentTypes[r.paymentType], 'displayText')}</span>
      ),
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
    {
      key: 'action',
      title: 'Actions',
      align: 'right',
      render: (record) => (
        <div className="d-flex justify-content-end">
          {record.status === STATUS.new.code && !isCustomer ? (
            <>
              {' '}
              <Tooltip title="Accept Order">
                <Button
                  type="primary"
                  size="small"
                  onClick={() => handleAcceptOrder(record.id)}
                  className="mr5 to-right-btn"
                >
                  <i className="fas fa-check mr5" />
                  Accept
                </Button>
              </Tooltip>
              <Tooltip title="Reject Order">
                <Button
                  type="primary"
                  danger
                  size="small"
                  onClick={() => handleRejectOrder(record.id)}
                  className="mr5 to-right-btn"
                >
                  <i className="fas fa-times mr5" />
                  Reject
                </Button>
              </Tooltip>
            </>
          ) : undefined}
          {getValueByPath(user, 'profile.role') === ROLE.shipper
          && record.status !== STATUS.done.code ? (
            <>
              <Tooltip title="Delivered Order">
                <Button
                  type="primary"
                  size="small"
                  onClick={() => handleClickDeliveredOrder(record.id)}
                  className="mr5 to-right-btn"
                >
                  <i className="fas fa-check mr5" />
                  Delivered
                </Button>
              </Tooltip>
              <Tooltip title="Reject Order">
                <Button
                  type="primary"
                  danger
                  size="small"
                  onClick={() => handleRejectOrder(record.id)}
                  className="mr5 to-right-btn"
                >
                  <i className="fas fa-times mr5" />
                  Reject
                </Button>
              </Tooltip>
            </>
            ) : undefined}
          <Tooltip title="Show Detail">
            <Button
              type="primary"
              size="small"
              onClick={() => handleShowDetails(record)}
              className="mr5"
              icon={<i className="fas fa-info-circle" />}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  if (isCustomer) {
    columns.splice(
      columns.findIndex((c) => c.key === 'action' || c.key === 'user-info'),
      1,
    );
    columns.splice(
      columns.findIndex((c) => c.key === 'avatar'),
      1,
    );
    columns.splice(
      columns.findIndex((c) => c.key === 'address'),
      1,
    );
  }

  return (
    <div>
      <Card
        title={
          isCustomer ? (
            ''
          ) : (
            <b>
              <Button
                type="link"
                title="Go back"
                style={{ color: '#000' }}
                onClick={() => history.goBack()}
              >
                <i className="fas fa-arrow-left" />
              </Button>
              <span>ORDER</span>
            </b>
          )
        }
      >
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
          {isCustomer ? undefined : (
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
          )}

          <Select
            className="ml10"
            style={{ width: 150 }}
            onChange={(value) => {
              setSearch({ ...search, status: value });
              getOrders({ ...search, status: value });
            }}
            defaultValue=""
            value={search.status || ''}
          >
            <Select.Option value="" key="all">
              <Tag className="uppercase w92p">all</Tag>
            </Select.Option>
            {Object.values(STATUS).map((status) => (
              <Select.Option value={status.code} key={status.code}>
                <Tag color={status.color} className="uppercase w92p">
                  {status.code}
                </Tag>
              </Select.Option>
            ))}
          </Select>
          <Button
            onClick={() => {
              setSearch({});
              getOrders();
            }}
            className="ml10"
          >
            Reset
          </Button>
        </div>
        <div style={{ margin: '10px 0' }} />
        <Table
          rowKey={(r) => r.id}
          columns={columns}
          dataSource={orders}
          pagination={pagination}
          size={isCustomer ? 'small' : 'large'}
          onChange={handleTableChange}
        />
      </Card>
    </div>
  );
};
OrderList.propTypes = {
  isCustomer: PropTypes.bool,
};

OrderList.defaultProps = {
  isCustomer: false,
};

export default OrderList;
