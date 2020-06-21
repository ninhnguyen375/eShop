import React from 'react';
import { Card, Divider } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import successImg from '../../../assets/animations/order-success.json';
import GotoTop from '../../../common/components/widgets/GotoTop';
import { priceParser } from '../../../common/utils/stringConvert';

const PlaceOrderSuccess = ({ userOrderDetail, order }) => (
  <div className="container mt20">
    {console.log('[✔] Debug: order', order)}
    <div className="row">
      <div className="col-lg-4 d-flex justify-content-center align-items-center">
        <lottie-player src={JSON.stringify(successImg)} autoplay />
      </div>
      <Card className="col-lg-8">
        <h2 style={{ textAlign: 'center' }}>
          <b>PAY ORDER SUCCESSFULLY!</b>
        </h2>

        <div className="container">
          <Divider />
          <div className="row">
            <div className="col-lg-9">
              <div className="p10">
                Order ID:
                {' '}
                <b>{order.id || '---'}</b>
              </div>
              <div className="p10">
                Name:
                {' '}
                <b>{order.userName || '---'}</b>
              </div>
              <div className="p10">
                Email:
                {' '}
                <b>{order.email || '---'}</b>
              </div>
              <div className="p10">
                Phone Number:
                {' '}
                <b>{order.phoneNumber || '---'}</b>
              </div>
              <div className="p10">
                Address:
                {' '}
                <b>{order.address || '---'}</b>
              </div>
              <div className="p10">
                Create At:
                {' '}
                <b>
                  {moment(order.createdAt).format('HH:mm DD/MM/YYYY') || '---'}
                </b>
              </div>
              <div className="p10">
                Total Price:
                {' '}
                <b>
                  {priceParser(order.totalPrice)}
                  {' '}
                  VND
                </b>
              </div>
            </div>
            <div className="col-lg-3">
              <lottie-player
                src="https://assets2.lottiefiles.com/packages/lf20_v4t3yi.json"
                autoplay
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
    <GotoTop />
  </div>
);

PlaceOrderSuccess.propTypes = {
  userOrderDetail: PropTypes.objectOf(PropTypes.any).isRequired,
  order: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PlaceOrderSuccess;
