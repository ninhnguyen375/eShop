import React, { useState, useEffect } from 'react';
import '../styles/ProductCartItem.scss';
import {
  Select,
  Input,
  Dropdown,
  Button,
  message,
  Popconfirm,
  notification,
} from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { priceParser } from '../../../common/utils/stringConvert';
import {
  getDefaultImageUrl,
  getValueByPath,
} from '../../../common/utils/objectUtils';
import { updateCart } from '../actions';
import { updateCartItem, deleteCartItem } from '../services';
import { MODULE_NAME as MODULE_USER } from '../../user/models';
import { MODULE_NAME as MODULE_CART } from '../models';
import handleError from '../../../common/utils/handleError';

const ProductCartItem = ({ specificProduct, sizes, onError }) => {
  const [count, setCount] = useState(specificProduct.count);
  const user = useSelector((store) => store[MODULE_USER].user);
  const cart = useSelector((store) => store[MODULE_CART].cart);
  const dispatch = useDispatch();

  useEffect(() => {
    setCount(specificProduct.count);
  }, [specificProduct.count]);

  const handleUpdateSize = (s) => {
    if (s.sizeValue === specificProduct.size) {
      return;
    }

    const update = {
      specificProductId: specificProduct.id,
      newSpecificProductId: s.specificProductId,
      newSize: s.sizeValue,
    };

    const newCart = updateCartItem(cart, update);

    dispatch(updateCart({ newCart, user }));
  };

  const handleUpdateCount = (e) => {
    const quantity = parseInt(e.target.value, 10);

    if (quantity === specificProduct.count) {
      return;
    }

    if (quantity > 0 && quantity <= 5) {
      const update = {
        specificProductId: specificProduct.id,
        newCount: quantity,
      };

      const newCart = updateCartItem(cart, update);

      dispatch(updateCart({ newCart, user }));
    } else {
      setCount(specificProduct.count);
    }
  };

  return (
    <div>
      <div
        className={`container product-cart-item ${onError ? ' on-error' : ''}`}
      >
        <div className="row">
          <div className="col-lg-3 product-cart-item--left">
            <Link style={{ width: 'inherit' }} to={`/product/${specificProduct.id}`}>
              <img
                style={{ width: 'inherit' }}
                src={getDefaultImageUrl(specificProduct.images)}
                alt="img"
              />
            </Link>
          </div>
          <div className="col-lg-5 product-cart-item--center">
            <div className="product-cart-item--name">
              {getValueByPath(specificProduct, 'product.name')}
            </div>
            <div className="product-cart-item--price">
              <b>Price:</b>
              {' '}
              {priceParser(getValueByPath(specificProduct, 'product.price'))}
              {' '}
              VND
            </div>
            <div className="row">
              <div className="col-lg-6 product-cart-item--size">
                <div>Size</div>
                <div>
                  <Dropdown
                    trigger="click"
                    overlay={(
                      <div className="size--list-btn--wrapper">
                        <div className="size--list-btn">
                          {sizes && sizes[0]
                            ? sizes.map((s) => (
                              <Button
                                type={
                                    s.id === specificProduct.sizeId
                                      ? 'primary'
                                      : 'default'
                                  }
                                key={s.id}
                                onClick={() => handleUpdateSize(s)}
                              >
                                {s.sizeValue}
                              </Button>
                            ))
                            : undefined}
                        </div>
                      </div>
                    )}
                  >
                    <Select
                      notFoundContent=""
                      value={specificProduct.sizeId}
                      placeholder="Select Size"
                      style={{ width: '100%' }}
                    />
                  </Dropdown>
                </div>
              </div>
              <div className="col-lg-6 product-cart-item--count">
                <div>Count</div>
                <div>
                  <Input
                    type="number"
                    onBlur={handleUpdateCount}
                    value={count}
                    onChange={(e) => {
                      if (e.target.value > 5) {
                        message.warning('You can only buy 1-5 product');
                      } else {
                        setCount(e.target.value);
                      }
                    }}
                    placeholder="Input count"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 product-cart-item--right">
            <div className="product-cart-item--total-price">
              {priceParser(
                parseFloat(specificProduct.price)
                  * parseInt(specificProduct.count, 10),
              )}
              {' '}
              VND
            </div>
            <div className="product-cart-item--status">
              {specificProduct.stock > 0 ? 'In stock' : 'Out of stock!'}
            </div>
            <div>
              <button type="button" className="product-cart-item--love-btn">
                <i className="far fa-heart" />
              </button>
            </div>
            <div>
              <Popconfirm
                onConfirm={() => {
                  try {
                    const newCart = deleteCartItem(cart, specificProduct.id);
                    dispatch(updateCart({ newCart, user }));
                  } catch (err) {
                    handleError(err, null, notification);
                  }
                }}
                title="Are you sure?"
              >
                <button type="button" className="product-cart-item--delete-btn">
                  <i className="fas fa-trash-alt" />
                </button>
              </Popconfirm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductCartItem.propTypes = {
  // specificProduct mapped with cart
  specificProduct: PropTypes.objectOf(PropTypes.any).isRequired,
  sizes: PropTypes.arrayOf(PropTypes.any).isRequired,
  onError: PropTypes.bool,
};

ProductCartItem.defaultProps = {
  onError: false,
};

export default ProductCartItem;
