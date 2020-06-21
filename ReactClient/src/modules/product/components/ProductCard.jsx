import React from 'react';
import { Card } from 'antd';
import '../styles/ProductCard.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { VIEW_MODE } from '../models';
import { priceParser } from '../../../common/utils/stringConvert';
import {
  getDefaultImageUrl,
  getValueByPath,
} from '../../../common/utils/objectUtils';

const ProductCard = ({ product, width, viewMode }) => {
  if (viewMode === VIEW_MODE.listView) {
    return (
      <Link to={`/product/${product.id || 1}`}>
        <Card
          bodyStyle={{ padding: '0 20px 0 0' }}
          style={{ '--global-width': width }}
          className="product-card--list-view"
        >
          {/* preload img2 */}
          <img
            src={getDefaultImageUrl(product.images, true)}
            alt="img"
            style={{ opacity: 0, position: 'fixed', top: '-9999px' }}
          />
          <div
            className="product-card--image"
            style={{
              '--product-image1': `url(${getDefaultImageUrl(product.images)})`,
              '--product-image2': `url(${getDefaultImageUrl(
                product.images,
                true,
              )})`,
            }}
          />
          <div className="product-card--caption">
            <div className="caption--name">
              {getValueByPath(product, 'product.name')}
            </div>
            <div className="caption--producer">
              {getValueByPath(product, 'product.style.name')}
            </div>
            <div className="caption--price">
              {priceParser(getValueByPath(product, 'product.price'))}
              {' '}
              VND
            </div>
          </div>
          <div className="product-card--button">
            <i className="far fa-heart product-card--heart" />
            <div className="by-now-btn">
              <i className="fas fa-shopping-cart" />
              BUY NOW
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/product/${product.id || 1}`}>
      <Card
        bodyStyle={{ padding: '0 0 20px 0' }}
        style={{ '--global-width': width }}
        className="product-card"
      >
        {/* preload img2 */}
        <img
          src={getDefaultImageUrl(product.images, true)}
          alt="img"
          style={{ opacity: 0, position: 'fixed', top: '-9999px' }}
        />
        <div
          className="product-card--image"
          style={{
            '--product-image1': `url(${getDefaultImageUrl(product.images)})`,
            '--product-image2': `url(${getDefaultImageUrl(
              product.images,
              true,
            )})`,
          }}
        >
          <i className="far fa-heart product-card--heart" />
        </div>
        <div className="product-card--button">
          <div className="by-now-btn">
            <i className="fas fa-shopping-cart" />
            BUY NOW
          </div>
        </div>
        <div className="product-card--caption">
          <div className="caption--name">
            {getValueByPath(product, 'product.name')}
            {' '}
            -
            {' '}
            {getValueByPath(product, 'product.category.name')}
          </div>
          <div className="caption--producer">
            {getValueByPath(product, 'product.style.name')}
          </div>
          <div className="caption--price">
            {priceParser(getValueByPath(product, 'product.price'))}
            {' '}
            VND
          </div>
        </div>
      </Card>
    </Link>
  );
};

ProductCard.propTypes = {
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  width: PropTypes.string,
  viewMode: PropTypes.string,
};
ProductCard.defaultProps = {
  width: '350px',
  viewMode: VIEW_MODE.gridView,
};
export default ProductCard;
