/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import '../../assets/css/Mainlayout.scss';
import { Link, useHistory, useLocation } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { useSelector, useDispatch } from 'react-redux';
import {
  Select, Button, BackTop, Dropdown, Menu, Badge,
} from 'antd';
import { setLanguage } from '../actions/common';
import { GET_FLAG_COUNTRIES_URL } from '../utils/language';
import userIcon from '../../assets/images/user.svg';
import { ROLE, MODULE_NAME as MODULE_USER } from '../../modules/user/models';
import { MODULE_NAME as MODULE_CATEGORY } from '../../modules/category/models';
import logoImg from '../../assets/images/Logo.svg';
import authService from '../services/AuthService';
import { getCategoryListAction } from '../../modules/category/actions';
import { MODULE_NAME as MODULE_CART } from '../../modules/cart/models';
import { mapSearchStringToObj } from '../utils/objectUtils';

const MainLayout = ({ children }) => {
  const language = useSelector((state) => state.common.language);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const user = useSelector((state) => state[MODULE_USER].user);
  const cart = useSelector((state) => state[MODULE_CART].cart);
  const categoryList = useSelector(
    (state) => state[MODULE_CATEGORY].categoryList,
  );
  const categories = categoryList ? categoryList.data || [] : [];
  const isLoggedIn = !!user;
  const history = useHistory();
  const profile = user ? user.profile || {} : {};
  const isShowDashboardButton = profile.role === ROLE.manager
    || profile.role === ROLE.seller
    || profile.role === ROLE.shipper;
  const [ignoreTopBottom, setIgnoreTopBottom] = useState('300px');
  const location = useLocation();

  useEffect(() => {
    const header = document.getElementById('main-layout--header');
    const footer = document.getElementById('main-layout--footer');
    const marginFooter = getComputedStyle(footer).marginTop;
    const value = header.offsetHeight + footer.offsetHeight + parseInt(marginFooter, 10);
    setIgnoreTopBottom(`${value}px`);
  }, []);

  useEffect(() => {
    if (location.search) {
      const queries = mapSearchStringToObj(location.search);
      if (queries && queries.name) {
        setSearchValue(queries.name);
      }
    }
  }, [location]);

  useEffect(() => {
    dispatch(getCategoryListAction({ pageSize: 999 }));
  }, [dispatch]);

  const handleSelectLanguage = (value) => {
    dispatch(setLanguage(value));
  };

  const handleSearch = () => {
    history.push(`/search-product?name=${searchValue}`);
  };

  const onClickLogin = () => authService.login();

  const onClickLogout = () => {
    authService.logout();
  };

  return (
    <div className="wrapper">
      <ReactTooltip place="bottom" />
      <div className="header" id="main-layout--header">
        <label id="toggleMenuLabel" htmlFor="toggleMenuInput" />
        <input type="checkbox" id="toggleMenuInput" />
        <nav className="menu">
          <ul>
            <li>
              <Link to="/">
                <i className="fas fa-home mr5" />
                Home
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="fas fa-heart mr5" />
                Love
              </Link>
            </li>

            <li>
              <Link to="/cart">
                <i className="fas fa-shopping-basket mr5" />
                Cart
                {cart && cart.length > 0 ? (
                  <Badge
                    style={{
                      background: '#ff7951',
                      position: 'relative',
                      top: '-10px',
                      left: '5px',
                    }}
                    count={cart ? cart.length || 0 : 0}
                  />
                ) : undefined}
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Dropdown
                    trigger="click"
                    overlay={(
                      <Menu>
                        <Menu.Item>
                          <div className="d-flex mb5">
                            <img
                              src={userIcon}
                              alt="avatar"
                              width={35}
                              className="mr10"
                            />
                            <div className="d-flex align-items-center">
                              <span
                                style={{
                                  fontWeight: 'bold',
                                  fontSize: '1.3em',
                                }}
                              >
                                {!profile.name
                                  ? profile.email.split('@')[0]
                                  : profile.name}
                              </span>
                            </div>
                          </div>
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item
                          onClick={() => {
                            history.push(
                              profile.role === ROLE.customer
                                ? '/profile'
                                : '/admin/profile',
                            );
                          }}
                        >
                          <i className="fas fa-user mr5" />
                          My profile
                        </Menu.Item>
                        <Menu.Divider />
                        {profile.role === ROLE.customer ? (
                          <Menu.Item
                            onClick={() => {
                              history.push('/order');
                            }}
                          >
                            <i className="fas fa-list-alt mr5" />
                            My order
                          </Menu.Item>
                        ) : undefined}
                        {profile.role === ROLE.customer ? (
                          <Menu.Divider />
                        ) : undefined}
                        <Menu.Item>
                          <div
                            onClick={onClickLogout}
                            onKeyPress={onClickLogout}
                            role="presentation"
                          >
                            <i className="fas fa-sign-out-alt mr5" />
                            Logout
                          </div>
                        </Menu.Item>
                      </Menu>
                    )}
                  >
                    <div>
                      <i className="fas fa-user mr5" />
                      Hi,
                      {' '}
                      {!profile.name
                        ? profile.email.split('@')[0]
                        : profile.name}
                    </div>
                  </Dropdown>
                </li>
                <li>
                  <div
                    onClick={onClickLogout}
                    onKeyPress={onClickLogout}
                    role="presentation"
                  >
                    <i className="fas fa-sign-out-alt mr5" />
                    Logout
                  </div>
                </li>
                {isShowDashboardButton ? (
                  <li>
                    <Link to="/admin/dashboard">
                      <Button type="primary">
                        <i className="fas fa-home mr5" />
                        <span>Dashboard</span>
                      </Button>
                    </Link>
                  </li>
                ) : (
                  ''
                )}
              </>
            ) : (
              <li>
                <div
                  onClick={onClickLogin}
                  onKeyPress={onClickLogin}
                  role="presentation"
                >
                  <i className="fas fa-user mr5" />
                  Login
                </div>
              </li>
            )}
            <li>
              <Select
                id="languageSelector"
                className="language-selector"
                defaultValue={language}
                name="language"
                onChange={handleSelectLanguage}
                size="small"
              >
                {['us', 'vn'].map((item) => (
                  <Select.Option key={item} value={item}>
                    <img
                      width="20"
                      src={GET_FLAG_COUNTRIES_URL(item)}
                      alt="country-flags"
                    />
                    {' '}
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </li>
          </ul>
        </nav>
        <div className="navbar">
          <Link to="/">
            <div className="brand">
              <img src={logoImg} alt="img" />
            </div>
          </Link>
          <div className="center">
            {categories.slice(0, 4).map((c) => (
              <div
                onClick={() => {
                  history.push(`/search-product?categoryId=${c.id}`);
                }}
                role="presentation"
                key={c.id}
              >
                <i className="fas fa-braille mr5" />
                {c.name}
              </div>
            ))}
          </div>
          <div className="search-bar">
            <button type="button" onClick={handleSearch}>
              <i className="fas fa-search" />
            </button>
            <input
              value={searchValue}
              type="text"
              onKeyUp={({ keyCode }) => keyCode === 13 && handleSearch()}
              placeholder="Search"
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div
        id="main-layout--content"
        style={{ minHeight: `calc(100vh - ${ignoreTopBottom})` }}
      >
        {children}
      </div>

      {/* Footer */}
      <div id="main-layout--footer" className="main-layout--footer">
        <div className="footer--content">
          <div className="d-flex align-items-center flex-column">
            <img src={logoImg} alt="brand" />
            <div className="footer--brand">eShop</div>
          </div>
          <div>
            <div className="footer--title">
              <b>Title</b>
            </div>
            <div>child 1</div>
            <div>child 2</div>
            <div>child 3</div>
          </div>
          <div>
            <div className="footer--title">
              <b>Title</b>
            </div>
            <div>child 1</div>
            <div>child 2</div>
            <div>child 3</div>
          </div>
          <div>
            <div className="footer--title">
              <b>Title</b>
            </div>
            <div>child 1</div>
            <div>child 2</div>
            <div>child 3</div>
          </div>
        </div>
        <div className="footer--copyright">
          Copyright © 2020 eShop. All rights reserved.
        </div>
      </div>

      <BackTop />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
