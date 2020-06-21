import React, { useState, useCallback, useEffect } from 'react';
import '../styles/Information.scss';
import {
  Form, notification, Card, Input, Radio,
} from 'antd';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { priceParser } from '../../../common/utils/stringConvert';
import OrderProductItem from './OrderProductItem';
import { createOrder } from '../services';
import handleError from '../../../common/utils/handleError';
import { MODULE_NAME } from '../../user/models';
import { MODULE_NAME as MODULE_CART } from '../../cart/models';
import PlaceOrderSuccess from './PlaceOrderSuccess';
import { getCustomerDetail } from '../../user/services';
import { clearAllCart } from '../../cart/actions';
import { PaymentTypes } from '../../order/models';

const Information = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [form] = Form.useForm();
  const user = useSelector((state) => state[MODULE_NAME].user);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOnlinePayment, setIsOnlinePayment] = useState(false);
  const [isPayOrderSuccess, setIsPayOrderSuccess] = useState(false);
  const cart = useSelector((store) => store[MODULE_CART].cart);
  const [userOrderDetail, setUserOrderDetail] = useState({});
  const [createdOrder, setCreatedOrder] = useState({});
  const dispatch = useDispatch();

  const getUserProfile = useCallback(async () => {
    try {
      const { data } = await getCustomerDetail(user.profile.sub);
      form.setFieldsValue(data);
      setUserOrderDetail(data);
    } catch (err) {
      handleError(err, null, notification);
    }
  }, [user.profile.sub, form]);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  const rules = {
    name: [
      {
        required: true,
        message: 'Please enter your name',
      },
    ],
    phoneNumber: [
      {
        required: true,
        message: 'Please enter your phone number',
      },
    ],
    email: [
      {
        required: true,
        message: 'Please enter your email',
        type: 'email',
      },
    ],
    address: [
      {
        required: true,
        message: 'Please enter your address',
      },
    ],
  };

  const getTotalOrderPrice = (arr = []) => {
    if (!arr || !arr[0]) return 0;
    const reduced = arr.reduce(
      (prev, curr) => parseFloat(curr.price) * parseInt(curr.count, 10) + prev,
      0,
    );

    return reduced;
  };

  const payOrder = async () => {
    setIsProcessing(true);
    window.PageLoading.show();

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      handleError(error, null, notification);
      setIsProcessing(false);
      window.PageLoading.hide();
      return;
    }

    if (!cart || !cart[0]) {
      notification.error({ message: 'Cart is Empty' });
      setIsProcessing(false);
      window.PageLoading.hide();
      return;
    }

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
          notification.error({
            message: `Product ${cartItem.productName}`,
            description: 'Out of stock',
          });
        }
      }
    }
    if (!isValidStock) return;

    try {
      const formValues = await form.validateFields();
      setUserOrderDetail(formValues);

      // create payment intent
      const { data } = await createOrder({
        ...formValues,
        userId: user.profile.sub,
        cartItems: cart,
        paymentType: PaymentTypes.online_payment.code,
      });

      const { clientSecret, order } = data;
      setCreatedOrder(order);

      if (error) {
        window.PageLoading.hide();
        setIsProcessing(false);
        handleError(error, null, notification);
        return;
      }

      const confirmCard = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      const { paymentIntent } = confirmCard;

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        notification.success({ message: 'Pay order', description: 'Success!' });
        dispatch(clearAllCart({ user }));
        setIsPayOrderSuccess(true);
      } else if (confirmCard.error && confirmCard.error.message) {
        notification.error({
          message: 'Pay order Error',
          description: confirmCard.error.message,
        });
      }
    } catch (err) {
      handleError(err, form, notification);
    }
    window.PageLoading.hide();
    setIsProcessing(false);
  };

  const placeOrder = async () => {
    setIsProcessing(true);
    window.PageLoading.show();

    if (!cart || !cart[0]) {
      notification.error({ message: 'Cart is Empty' });
      setIsProcessing(false);
      window.PageLoading.hide();
      return;
    }

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
          notification.error({
            message: `Product ${cartItem.productName}`,
            description: 'Out of stock',
          });
        }
      }
    }
    if (!isValidStock) {
      setIsProcessing(false);
      window.PageLoading.hide();
      return;
    }

    // Validate form
    let formValues;
    try {
      formValues = await form.validateFields();
    } catch (err) {
      setIsProcessing(false);
      window.PageLoading.hide();
      return;
    }

    try {
      setUserOrderDetail(formValues);

      const { data } = await createOrder({
        ...formValues,
        userId: user.profile.sub,
        cartItems: cart,
        paymentType: PaymentTypes.cash_on_delivery.code,
      });

      setCreatedOrder(data.order);

      notification.success({ message: 'Pay order', description: 'Success!' });
      dispatch(clearAllCart({ user }));
      setIsPayOrderSuccess(true);
    } catch (err) {
      handleError(err, form, notification);
    }
    window.PageLoading.hide();
    setIsProcessing(false);
  };

  const handlePlaceOrder = () => {
    if (isOnlinePayment) {
      payOrder();
    } else {
      placeOrder();
    }
  };

  if (isPayOrderSuccess) {
    return (
      <PlaceOrderSuccess
        order={createdOrder}
        userOrderDetail={userOrderDetail}
      />
    );
  }

  return (
    <div>
      <div className="container payment-information">
        <div className="row">
          <div className="col-lg-7">
            <div className="payment-information--title">INFORMATION</div>
            <br />
            <div className="payment-information--content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-9">
                    <Form form={form} layout="vertical">
                      <Form.Item label="Name:" name="name" rules={rules.name}>
                        <Input size="large" placeholder="Your name" />
                      </Form.Item>
                      <Form.Item
                        label="Phone: Number"
                        name="phoneNumber"
                        rules={rules.phoneNumber}
                      >
                        <Input size="large" placeholder="Your phone number" />
                      </Form.Item>
                      <Form.Item
                        label="Email:"
                        name="email"
                        rules={rules.email}
                      >
                        <Input
                          disabled
                          type="email"
                          size="large"
                          placeholder="Your phone email"
                        />
                      </Form.Item>
                      <Form.Item
                        label="Address:"
                        name="address"
                        rules={rules.address}
                      >
                        <Input.TextArea
                          size="large"
                          placeholder="Your phone address"
                        />
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            </div>

            <div className="payment-information--title">PAYMENT TYPES</div>
            <br />
            <div className="payment-information--content">
              <div className="container-fluid">
                <Radio.Group
                  defaultValue={false}
                  onChange={(e) => setIsOnlinePayment(e.target.value)}
                  name="isOnlinePayment"
                >
                  <Radio className="d-flex align-items-center" value={false}>
                    <div className="d-flex align-items-center">
                      <div>
                        <b>CASH ON DELIVERY.</b>
                      </div>
                      <i
                        style={{
                          fontSize: '1.7em',
                        }}
                        className="fas fa-truck ml10"
                      />
                    </div>
                  </Radio>
                  <br />
                  <br />
                  <Radio className="d-flex align-items-center" value>
                    <div className="d-flex align-items-center">
                      <div>
                        <b>PAY BY CREDIT CARD.</b>
                      </div>
                      <i
                        style={{
                          fontSize: '1.7em',
                        }}
                        className="fab fa-cc-visa ml10"
                      />
                    </div>
                  </Radio>
                </Radio.Group>
                {isOnlinePayment ? (
                  <div className="row mt20">
                    <div className="col-lg-9">
                      <Card bodyStyle={{ padding: '12px' }}>
                        <CardElement />
                      </Card>
                      <div>Card demo: 4000 0000 0000 3220</div>
                    </div>
                  </div>
                ) : undefined}
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="order">
              <div className="order--title">ORDER</div>
              <div className="order--divider" />
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    {cart && cart[0]
                      ? cart.map((item) => (
                        <OrderProductItem
                          key={item}
                          name={item.productName}
                          price={item.price}
                          size={item.size}
                          count={item.count}
                        />
                      ))
                      : undefined}
                  </div>
                </div>
              </div>
              <div className="order--divider2" />

              <div className="d-flex justify-content-between">
                <div>Order</div>
                <div>
                  {priceParser(getTotalOrderPrice(cart))}
                  <span className="ml5">VND</span>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>Discount</div>
                <div>
                  {priceParser(null)}
                  <span className="ml5">VND</span>
                </div>
              </div>

              <div className="order--divider2" />

              <div className="d-flex justify-content-between order--total-price">
                <div>Total Price</div>
                <div>
                  {priceParser(getTotalOrderPrice(cart))}
                  <span className="ml5">VND</span>
                </div>
              </div>

              {isProcessing ? (
                <div className="order--pay-btn processing">PROCESSING...</div>
              ) : (
                <div
                  onClick={handlePlaceOrder}
                  type="button"
                  role="presentation"
                  className="order--pay-btn"
                >
                  CONTINUE
                  <i className="fas fa-chevron-right ml10" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
