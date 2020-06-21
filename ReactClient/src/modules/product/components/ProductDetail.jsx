import React, { useEffect, useState, useCallback } from 'react';
import {
  Divider,
  Select,
  Input,
  Dropdown,
  Button,
  notification,
  Row,
  message,
} from 'antd';
import '../styles/ProductDetail.scss';
import { useParams, useHistory } from 'react-router';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { getProductDetailById } from '../services';
import handleError from '../../../common/utils/handleError';
import outOfStockImg from '../../../assets/images/out-of-stock.png';
import {
  getValueByPath,
  getDefaultImageUrl,
} from '../../../common/utils/objectUtils';
import { priceParser } from '../../../common/utils/stringConvert';
import { catalogApi } from '../../../configs';
import { MODULE_NAME as MODULE_USER } from '../../user/models';
import { MODULE_NAME as MODULE_CART } from '../../cart/models';
import { addToCart } from '../../cart/services';
import { updateCart } from '../../cart/actions';
import SmallCartItem from '../../cart/components/SmallCartItem';

const ProductDetail = () => {
  const [activeColor, setActiveColor] = useState('');
  const params = useParams();
  const [specificProduct, setProductDetail] = useState({});
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [previewImage, setPreviewImage] = useState('');
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const cart = useSelector((store) => store[MODULE_CART].cart);
  const user = useSelector((state) => state[MODULE_USER].user);
  const history = useHistory();

  const getProductDetail = useCallback(async (id) => {
    if (!id) return;
    try {
      const { data } = await getProductDetailById(id);
      setProductDetail(data.specificProduct);
      setColors(data.colors);
      setSizes(data.sizes);
      setPreviewImage(getDefaultImageUrl(data.specificProduct.images));
    } catch (err) {
      handleError(err, null, notification);
    }
  }, []);

  useEffect(() => {
    getProductDetail(params.id);
  }, [getProductDetail, params.id]);

  const handleAddToCart = (isRedirect) => () => {
    if (!specificProduct.id || !count || count < 1) {
      notification.warning({ message: 'Please choose size/count valid' });
      return;
    }

    if (specificProduct.stock < 1 || specificProduct.stock < count) {
      notification.warning({ message: 'Product is out of stock' });
      return;
    }

    const cartItem = {
      specificProductId: specificProduct.id,
      productName: getValueByPath(specificProduct, 'product.name'),
      price: getValueByPath(specificProduct, 'product.price'),
      size: getValueByPath(specificProduct, 'size.sizeValue'),
      count: parseInt(count, 10),
      stock: parseInt(specificProduct.stock, 10),
      imageUrl: getDefaultImageUrl(specificProduct.images, false, false),
    };

    try {
      const newCart = addToCart(cart, cartItem);
      dispatch(updateCart({ newCart, user }));
      notification.success({
        key: 'add-to-cart-success',
        message: 'Added your cart',
      });
      setTimeout(() => {
        notification.open({
          key: 'add-to-cart-success',
          description: (
            <div>
              <SmallCartItem count={count} specificProduct={specificProduct} />
              <div className="d-flex justify-content-center">
                <Button
                  className="p0"
                  type="link"
                  onClick={() => {
                    history.push('/cart');
                    notification.close('add-to-cart-success');
                  }}
                >
                  View cart
                </Button>
              </div>
            </div>
          ),
        });
      }, 700);

      if (isRedirect) history.push('/cart');
    } catch (err) {
      handleError(err, null, notification);
    }
  };

  return (
    <div className="product-detail">
      <div className="container">
        <Divider
          style={{
            margin: '30px 0',
            borderColor: '#d7d7d7',
          }}
        />
        <div className="row">
          <div className="col-lg-7">
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                <div
                  style={{
                    width: 525,
                    height: 525,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '5px',
                    position: 'relative',
                    boxShadow: 'lightgrey 1px 1px 5px',
                    backgroundImage: `url(${
                      previewImage || getDefaultImageUrl(specificProduct.images)
                    })`,
                  }}
                  alt="img"
                >
                  {specificProduct && specificProduct.stock > 0 ? undefined : (
                    <img
                      src={outOfStockImg}
                      alt="out-of-stock"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: 170,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="row mt10">
              <div
                className="col-lg-10 offset-lg-1 d-flex pb20"
                style={{ overflowX: 'auto', minHeight: 130 }}
              >
                {specificProduct.images && specificProduct.images[0]
                  ? specificProduct.images.map((image) => (
                    <Row
                      key={image.id}
                      onClick={() => {
                        setPreviewImage(catalogApi + image.url);
                      }}
                    >
                      <img
                        className="mt10 mr5"
                        style={{
                          borderRadius: 5,
                          boxShadow:
                              catalogApi + image.url === previewImage
                                ? '#535353 0 0 5px'
                                : '',
                        }}
                        width={100}
                        src={catalogApi + image.url}
                        alt="img"
                      />
                    </Row>
                  ))
                  : undefined}
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="product-detail--name">
              {getValueByPath(specificProduct, 'product.name')}
            </div>
            <div className="product-detail--price">
              {priceParser(getValueByPath(specificProduct, 'product.price'))}
              {' '}
              VND
            </div>
            <Divider style={{ borderColor: '#3c3c3c' }} dashed />
            <div className="product-detail--desc">
              {getValueByPath(specificProduct, 'product.description')}
            </div>
            <Divider style={{ borderColor: '#3c3c3c' }} dashed />
            <div className="product-detail--colors d-flex">
              {!colors[0]
                ? undefined
                : colors.map((c) => {
                  const isActive = c.id === activeColor || specificProduct.colorId === c.id;
                  return (
                    <Link key={c.id} to={`/product/${c.specificProductId}`}>
                      <div
                        type="button"
                        role="presentation"
                        onClick={() => {
                          setActiveColor(isActive ? '' : c.id);
                        }}
                        className={`colors--square ${
                          isActive ? 'active' : ''
                        }`}
                        style={{ '--backgroundColor': c.hexCode }}
                      />
                    </Link>
                  );
                })}
            </div>
            <Divider style={{ borderColor: '#3c3c3c' }} dashed />
            <div className="product-detail--size row">
              <div className="col-lg-6">
                <div className="size--title">SIZE</div>
                <Dropdown
                  trigger="click"
                  overlay={(
                    <div className="size--list-btn--wrapper">
                      <div className="size--list-btn">
                        {sizes[0]
                          ? sizes.map((s) => (
                            <Button
                              onClick={() => {
                                history.push(
                                  `/product/${s.specificProductId}`,
                                );
                              }}
                              type={
                                  s.id === specificProduct.sizeId
                                    ? 'primary'
                                    : 'default'
                                }
                              key={s.id}
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
                    size="large"
                    value={specificProduct.sizeId}
                    placeholder="Select Size"
                    style={{ width: '100%' }}
                  />
                </Dropdown>
                <div
                  role="presentation"
                  onClick={handleAddToCart(false)}
                  className={classNames('product-detail--add-to-cart-btn', {
                    disabled: specificProduct.stock <= 0,
                  })}
                >
                  <i className="fas fa-shopping-cart" />
                  <span>ADD TO CART</span>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="size--title">COUNT</div>
                <Input
                  size="large"
                  type="number"
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
                <div
                  role="presentation"
                  onClick={handleAddToCart(true)}
                  className={classNames('product-detail--order-btn', {
                    disabled: specificProduct.stock <= 0,
                  })}
                >
                  <i className="fas fa-dollar-sign" />
                  <span>BUY NOW</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider
          style={{
            margin: '30px 0',
          }}
        />
      </div>

      {/* <SuggestProduct /> */}
    </div>
  );
};

export default ProductDetail;
