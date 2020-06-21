import React from 'react';
import PropTypes from 'prop-types';
import { catalogApi } from '../../../configs';
import { priceParser } from '../../../common/utils/stringConvert';

const SmallSpecificProductItem = ({
  imageUrl,
  productName,
  size,
  productPrice,
  count,
  specificProductId,
}) => (
  <div>
    <div className="container">
      <div className="row">
        <div className="col-lg-4 d-flex align-items-center">
          <img
            style={{
              width: 'inherit',
              borderRadius: '5px',
              boxShadow: 'lightgrey 1px 1px 5px',
            }}
            src={catalogApi + imageUrl}
            alt="img"
          />
        </div>

        <div className="col-lg-8">
          <div className="row">
            <b>{productName}</b>
          </div>
          <div className="row">
            ID:
            {' '}
            {specificProductId}
          </div>
          <div className="row">
            Price:
            {' '}
            {priceParser(productPrice)}
            {' '}
            VND
          </div>
          <div className="row justify-content-between">
            <div>
              Size:
              {' '}
              {size}
            </div>
            <div>
              Count:
              {' '}
              {count}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

SmallSpecificProductItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  specificProductId: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
};

export default SmallSpecificProductItem;
