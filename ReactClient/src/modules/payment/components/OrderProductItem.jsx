import React from 'react';
import PropTypes from 'prop-types';
import { priceParser } from '../../../common/utils/stringConvert';

const OrderProductItem = ({
  name, price, size, count,
}) => (
  <div className="mt20 order--product-item">
    <div className="row">
      <div className="order--product-item--name col-lg-6">
        {name}
      </div>
      <div className="order--product-item--price col-lg-6 text-right">
        {priceParser(price)}
        <span className="ml5">VND</span>
      </div>
    </div>
    <div className="row order--product-item--footer">
      <div className="col-lg-6">
        <span className="mr5">Size:</span>
        {size}
      </div>
      <div className="col-lg-6 text-right">
        <span className="mr5">Count:</span>
        {count}
      </div>
    </div>
  </div>
);

OrderProductItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

export default OrderProductItem;
