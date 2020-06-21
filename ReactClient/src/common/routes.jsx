import React from 'react';
import { Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';
import Home from '../pages/Home';
import PageNotFound from '../pages/PageNotFound';
import { ROLE, MODULE_NAME as MODULE_USER } from '../modules/user/models';
import Dashboard from '../pages/dashboard/Dashboard';
import ProductListPage from '../pages/dashboard/ProductListPage';
import UnderConstruct from '../pages/dashboard/UnderConstruct';
import Logout from '../pages/Logout';
import Signin from '../pages/Signin';
import ProfilePage from '../pages/dashboard/ProfilePage';
import CustomerListPage from '../pages/dashboard/CustomerListPage';
import CustomerDetailPage from '../pages/dashboard/CustomerDetailPage';
import SearchProductPage from '../pages/SearchProductPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CartListPage from '../pages/CartListPage';
import StyleListPage from '../pages/dashboard/StyleListPage';
import StaffListPage from '../pages/dashboard/StaffListPage';
import StaffDetailPage from '../pages/dashboard/StaffDetailPage';
import CustomerProfilePage from '../pages/CustomerProfilePage';
import CustomerOrderPage from '../pages/CustomerOrderPage';
import CheckoutPage from '../pages/CheckoutPage';
import CategoryListPage from '../pages/dashboard/CategoryListPage';
import ProductColorListPage from '../pages/dashboard/ProductColorListPage';
import ProductSizeListPage from '../pages/dashboard/ProductSizeListPage';
import OrderListPage from '../pages/dashboard/OrderListPage';
import ShipperListPage from '../pages/dashboard/ShipperListPage';

const Routes = () => {
  const user = useSelector((state) => state[MODULE_USER].user);
  const isLoggedIn = !!user;
  const profile = user ? user.profile || {} : {};
  const userRole = profile.role;

  if (!isLoggedIn) {
    return (
      <Switch>
        <Route key="home" path="/" exact component={Home} />
        <Route key="search-product" path="/search-product" exact component={SearchProductPage} />
        <Route key="product-detail" path="/product/:id" exact component={ProductDetailPage} />
        <Route key="cart-list" path="/cart" exact component={CartListPage} />
        <Route key="checkout" path="/checkout" exact component={CheckoutPage} />
        <Route key="signin-oidc" path="/signin-oidc" exact component={Signin} />
        <Route key="logout" path="/logout" exact component={Logout} />
        <Route key="page-not-found" path="*" component={PageNotFound} />
      </Switch>
    );
  }

  if (userRole === ROLE.manager) {
    return (
      <Switch>
        <Route key="home" path="/" exact component={Home} />
        <Route key="dashboard" path="/admin/dashboard" exact component={Dashboard} />
        <Route key="product" path="/admin/product" exact component={ProductListPage} />
        <Route key="logout" path="/logout" exact component={Logout} />
        <Route key="profile" path="/admin/profile" exact component={ProfilePage} />
        <Route key="customer" path="/admin/customer" exact component={CustomerListPage} />
        <Route key="customer-detail" path="/admin/customer/:id" exact component={CustomerDetailPage} />
        <Route key="staff" path="/admin/staff" exact component={StaffListPage} />
        <Route key="staff-detail" path="/admin/staff/:id" exact component={StaffDetailPage} />
        <Route key="search-product" path="/search-product" exact component={SearchProductPage} />
        <Route key="product-detail" path="/product/:id" exact component={ProductDetailPage} />
        <Route key="cart-list" path="/cart" exact component={CartListPage} />
        <Route key="checkout" path="/checkout" exact component={CheckoutPage} />
        <Route key="category" path="/admin/category" exact component={CategoryListPage} />
        <Route key="style" path="/admin/style" exact component={StyleListPage} />
        <Route key="product-color" path="/admin/product-color" exact component={ProductColorListPage} />
        <Route key="product-size" path="/admin/product-size" exact component={ProductSizeListPage} />
        <Route key="order-manager" path="/admin/order" exact component={OrderListPage} />

        <Route key="no-construct" path="/admin/*" component={UnderConstruct} />
        <Route key="page-not-found" path="*" component={PageNotFound} />
      </Switch>
    );
  }

  if (userRole === ROLE.seller) {
    return (
      <Switch>
        <Route key="dashboard" path="/admin/dashboard" exact component={Dashboard} />
        <Route key="product" path="/admin/product" exact component={ProductListPage} />
        <Route key="profile" path="/admin/profile" exact component={ProfilePage} />

        <Route key="category" path="/admin/category" exact component={CategoryListPage} />
        <Route key="shipper" path="/admin/shipper" exact component={ShipperListPage} />
        <Route key="style" path="/admin/style" exact component={StyleListPage} />
        <Route key="product-color" path="/admin/product-color" exact component={ProductColorListPage} />
        <Route key="product-size" path="/admin/product-size" exact component={ProductSizeListPage} />
        <Route key="order-manager" path="/admin/order" exact component={OrderListPage} />

        <Route key="no-construct" path="/admin/*" component={UnderConstruct} />

        <Route key="home" path="/" exact component={Home} />
        <Route key="search-product" path="/search-product" exact component={SearchProductPage} />
        <Route key="product-detail" path="/product/:id" exact component={ProductDetailPage} />
        <Route key="cart-list" path="/cart" exact component={CartListPage} />
        <Route key="checkout" path="/checkout" exact component={CheckoutPage} />
        <Route key="signin-oidc" path="/signin-oidc" exact component={Signin} />
        <Route key="logout" path="/logout" exact component={Logout} />
        <Route key="page-not-found" path="*" component={PageNotFound} />
      </Switch>
    );
  }

  if (userRole === ROLE.shipper) {
    return (
      <Switch>
        <Route key="dashboard" path="/admin/dashboard" exact component={Dashboard} />
        <Route key="product" path="/admin/product" exact component={ProductListPage} />
        <Route key="profile" path="/admin/profile" exact component={ProfilePage} />

        <Route key="order-manager" path="/admin/order" exact component={OrderListPage} />

        <Route key="no-construct" path="/admin/*" component={UnderConstruct} />

        <Route key="home" path="/" exact component={Home} />
        <Route key="search-product" path="/search-product" exact component={SearchProductPage} />
        <Route key="product-detail" path="/product/:id" exact component={ProductDetailPage} />
        <Route key="cart-list" path="/cart" exact component={CartListPage} />
        <Route key="checkout" path="/checkout" exact component={CheckoutPage} />
        <Route key="signin-oidc" path="/signin-oidc" exact component={Signin} />
        <Route key="logout" path="/logout" exact component={Logout} />
        <Route key="page-not-found" path="*" component={PageNotFound} />
      </Switch>
    );
  }

  if (userRole === ROLE.customer) {
    return (
      <Switch>
        <Route key="home" path="/" exact component={Home} />
        <Route key="logout" path="/logout" exact component={Logout} />
        <Route key="profile" path="/profile" exact component={CustomerProfilePage} />
        <Route key="search-product" path="/search-product" exact component={SearchProductPage} />
        <Route key="product-detail" path="/product/:id" exact component={ProductDetailPage} />
        <Route key="cart-list" path="/cart" exact component={CartListPage} />
        <Route key="order" path="/order" exact component={CustomerOrderPage} />
        <Route key="checkout" path="/checkout" exact component={CheckoutPage} />

        <Route key="page-not-found" path="*" component={PageNotFound} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route key="home" path="/" exact component={Home} />
      <Route key="logout" path="/logout" exact component={Logout} />
      <Route key="search-product" path="/search-product" exact component={SearchProductPage} />
      <Route key="product-detail" path="/product/:id" exact component={ProductDetailPage} />
      <Route key="cart-list" path="/cart" exact component={CartListPage} />

      <Route key="page-not-found" path="*" component={PageNotFound} />
    </Switch>
  );
};

export default Routes;
