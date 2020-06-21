import React, { useEffect, useCallback, useState } from 'react';
import '../styles/CartList.scss';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { notification, Divider, Popconfirm } from 'antd';
import ProductCartItem from './ProductCartItem';
import { priceParser } from '../../../common/utils/stringConvert';
import { clearAllCart, updateCart } from '../actions';
import { MODULE_NAME as MODULE_CART } from '../models';
import { MODULE_NAME as MODULE_USER } from '../../user/models';
import { getProductDetailById } from '../../product/services';
import handleError from '../../../common/utils/handleError';
import { getValueByPath } from '../../../common/utils/objectUtils';
import authService from '../../../common/services/AuthService';
import { getCartAsync, addToCart } from '../services';

const CartList = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store[MODULE_USER].user);
  const cart = useSelector((store) => store[MODULE_CART].cart);
  const [errorItems, setErrorItems] = useState([]);
  const [initialCart] = useState(cart);
  const [productDetails, setProductDetails] = useState([]);
  const isLoggedIn = !!user;
  const history = useHistory();

  const handlePlaceOrder = () => {
    // Validate stock
    let isValidStock = true;
    for (let i = 0; i < cart.length; i += 1) {
      const cartItem = cart[i];
      if (!cartItem) {
        throw new Error('Invalid cart item');
      }
      if (cartItem) {
        if (cartItem.stock < 1 || cartItem.stock < cartItem.count) {
          isValidStock = false;
          notification.warning({
            message: `Product ${cartItem.productName}`,
            description: 'IS OUT OF STOCK',
          });
          setErrorItems([...errorItems, cartItem.specificProductId]);
        }
      }
    }
    // Validate login
    if (!isLoggedIn) {
      notification.warning({
        message: 'You must to login first',
        description: (
          <div
            className="link"
            role="presentation"
            onClick={() => {
              authService.login();
            }}
          >
            Login now
          </div>
        ),
      });
      isValidStock = false;
    }

    if (!isValidStock) return;

    history.push('/checkout');
  };

  const getProductDetail = useCallback(async (id) => {
    try {
      const { data } = await getProductDetailById(id);
      const { specificProduct, sizes } = data;
      return { specificProduct, sizes };
    } catch (err) {
      handleError(err, null, notification);
    }
    return null;
  }, []);

  const getProductInCart = useCallback(async (cartParams) => {
    if (!cartParams || !cartParams[0]) return;

    window.PageLoading.show();

    const promises = [];

    cartParams.forEach((c) => {
      promises.push(getProductDetail(c.specificProductId));
    });

    const res = await Promise.all(promises);

    const data = cartParams.map((c) => {
      const found = res.find(
        (r) => c.specificProductId === getValueByPath(r, 'specificProduct.id'),
      );

      if (!found) {
        window.PageLoading.hide();
        return undefined;
      }

      return {
        ...found.specificProduct,
        ...c,
        sizes: found.sizes,
        count: c.count,
      };
    });

    setProductDetails(data);

    window.PageLoading.hide();
  }, [getProductDetail]);

  const combineCartFromServer = useCallback(async () => {
    try {
      const userId = getValueByPath(user, 'profile.sub');

      if (!userId) return;

      const { data } = await getCartAsync(userId);
      const { cartItems } = data;

      if (JSON.stringify(cartItems) === JSON.stringify(cart)) {
        return;
      }

      let tmpCart = [...cart];

      if (!cartItems) {
        dispatch(updateCart({ newCart: tmpCart, user }));
      } else {
        cartItems.forEach((item) => {
          try {
            tmpCart = addToCart(tmpCart, item);
          } catch (error) {
            // ignore count error
          }
        });

        dispatch(updateCart({ newCart: tmpCart, user }));
        getProductInCart(tmpCart);
      }
    } catch (err) {
      handleError(err, null, notification);
    }
  }, [user, cart, dispatch, getProductInCart]);

  const getTotalOrderPrice = (arr = []) => {
    if (!arr || !arr[0]) return 0;
    const reduced = arr.reduce(
      (prev, curr) => parseFloat(curr.price) * parseInt(curr.count, 10) + prev,
      0,
    );

    return reduced;
  };

  useEffect(() => {
    getProductInCart(initialCart);
  }, [getProductInCart, initialCart]);

  useEffect(() => {
    combineCartFromServer();
  }, [combineCartFromServer]);

  if (!cart || !cart[0]) {
    return (
      <div className="container cart-list">
        <div className="cart-list-empty--title">YOUR CART</div>
        <Divider style={{ border: '1px solid #656565' }} />
        <div className="cart-list-empty--content">Your cart is empty!</div>
        <Link to="/">
          <div className="cart-list-empty--button">GO TO SHOPPING</div>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="container cart-list">
        <div className="row">
          <div className="col-lg-8">
            <div className="cart-list--title">CART</div>
            <br />
            <div className="cart-list--content">
              {productDetails && productDetails[0]
                ? productDetails.map((p) => (
                  <ProductCartItem
                    key={p.id}
                    specificProduct={p}
                    sizes={p.sizes}
                    onError={errorItems.indexOf(p.id) !== -1}
                  />
                ))
                : undefined}
            </div>
            <div className="cart-list--footer container">
              <Popconfirm
                title="Are you sure?"
                onConfirm={() => {
                  dispatch(clearAllCart({ user }));
                }}
              >
                <button type="button">DELETE ALL</button>
              </Popconfirm>
              <Link to="/">
                <button type="button">KEEP SHOPPING</button>
              </Link>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="order">
              <div className="order--title">ORDER</div>
              <div className="order--divider" />
              <div className="order--title1">Voucher Code</div>
              <div className="order--input">
                <input type="text" />
                <button type="button">APPLY</button>
              </div>
              {/* <div className="order--text">
              Please input voucher code
            </div> */}
              <div className="order--divider2" />

              <div className="d-flex justify-content-between">
                <div>Order</div>
                <div>
                  {priceParser(getTotalOrderPrice(cart))}
                  {' '}
                  VND
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>Discount</div>
                <div>
                  {priceParser(null)}
                  {' '}
                  VND
                </div>
              </div>

              <div className="order--divider2" />

              <div className="d-flex justify-content-between order--total-price">
                <div>Total Price</div>
                <div className="text-orange">
                  {priceParser(getTotalOrderPrice(cart))}
                  {' '}
                  VND
                </div>
              </div>
              <div role="presentation" onClick={handlePlaceOrder}>
                <div className="order--pay-btn">PLACE ORDER</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartList;
