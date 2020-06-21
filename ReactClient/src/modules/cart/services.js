import { fetchAuthLoading } from '../../common/effects';
import { ENDPOINTS } from './models';

export default null;

export const addToCart = (cart, cartItem) => {
  if (!cart || !cart[0]) {
    return [cartItem];
  }

  const existing = cart.find(
    (c) => c.specificProductId === cartItem.specificProductId,
  );

  const tmpCart = [...cart];

  if (existing) {
    const index = tmpCart.findIndex(
      (c) => c.specificProductId === cartItem.specificProductId,
    );
    const count = parseInt(cartItem.count, 10) + parseInt(existing.count, 10);

    if (count > 5 || count < 1) {
      throw new Error('You can only buy 1-5 product');
    }

    tmpCart[index] = {
      ...existing,
      count,
    };

    return [...tmpCart];
  }

  return [...tmpCart, cartItem];
};

export const updateCartItem = (cart, update) => {
  const {
    specificProductId,
    newCount,
    newSpecificProductId,
    newSize,
  } = update;

  const existingIndex = cart.findIndex(
    (c) => c.specificProductId === specificProductId,
  );

  if (existingIndex === -1) {
    return cart;
  }

  const tmpCart = [...cart];

  if (newSpecificProductId) {
    const existingSpecificProductIdIndex = tmpCart.findIndex(
      (c) => c.specificProductId === newSpecificProductId,
    );

    if (existingSpecificProductIdIndex !== -1) {
      tmpCart[existingSpecificProductIdIndex].count += parseInt(
        tmpCart[existingIndex].count,
        10,
      );

      tmpCart[existingSpecificProductIdIndex].size = newSize;
      tmpCart.splice(existingIndex, 1);

      return [...tmpCart];
    }

    tmpCart[existingIndex].size = newSize;
    tmpCart[existingIndex].specificProductId = newSpecificProductId;
    return [...tmpCart];
  }

  if (newCount) {
    tmpCart[existingIndex].count = newCount;
    return [...tmpCart];
  }

  return cart;
};

export const deleteCartItem = (cart, specificProductId) => {
  const existingIndex = cart.findIndex(
    (c) => c.specificProductId === specificProductId,
  );
  if (existingIndex === -1) {
    throw new Error('AppError: Invalid cart item.');
  }

  const tmpCart = [...cart];
  tmpCart.splice(existingIndex, 1);
  return [...tmpCart];
};

export const updateCartAsync = (userId, cart) => {
  if (!userId) {
    throw new Error('AppError: Missing userId');
  }

  const data = {
    id: userId,
    cartItems: cart,
  };

  return fetchAuthLoading({
    url: ENDPOINTS.updateCart,
    method: 'PUT',
    data,
  });
};

export const getCartAsync = (userId) => {
  if (!userId) {
    throw new Error('AppError: Missing userId');
  }

  return fetchAuthLoading({
    url: ENDPOINTS.getCart(userId),
    method: 'GET',
  });
};
