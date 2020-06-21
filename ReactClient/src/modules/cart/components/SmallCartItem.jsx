import React from 'react';
import PropTypes from 'prop-types';
import { getDefaultImageUrl, getValueByPath } from '../../../common/utils/objectUtils';
import { priceParser } from '../../../common/utils/stringConvert';

const SmallCartItem = ({ specificProduct, count }) => (
  <div>
    <div className="container">
      <div className="row">
        <div className="col-lg-3 d-flex align-items-center">
          <img
            style={{
              width: 'inherit',
              borderRadius: '5px',
              boxShadow: 'lightgrey 1px 1px 5px',
            }}
            src={getDefaultImageUrl(specificProduct.images)}
            alt="img"
          />
        </div>

        <div className="col-lg-9">
          <div className="row"><b>{getValueByPath(specificProduct, 'product.name')}</b></div>
          <div className="row">
            Price:
            {' '}
            {priceParser(getValueByPath(specificProduct, 'product.price'))}
          </div>
          <div className="row justify-content-between">
            <div>
              Size:
              {' '}
              {getValueByPath(specificProduct, 'size.sizeValue')}
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

SmallCartItem.propTypes = {
  specificProduct: PropTypes.objectOf(PropTypes.any).isRequired,
  count: PropTypes.number.isRequired,
};

export default SmallCartItem;
