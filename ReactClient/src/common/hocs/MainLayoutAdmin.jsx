import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  Layout, Menu, Dropdown, Tag,
} from 'antd';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { MODULE_NAME as MODULE_USER } from '../../modules/user/models';
import userIcon from '../../assets/images/user.svg';
import authService from '../services/AuthService';
import '../../assets/css/MainLayoutAdmin.scss';
import logoImg from '../../assets/images/Logo.svg';
import siderMenu from '../constants/siderMenu';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

export const renderMenu = (menus = []) => menus.map((item) => {
  if (item.itemGroup) {
    return (
      <Menu.ItemGroup key={item.itemGroup} title={item.itemGroup}>
        {item.items.map((i) => (i.children ? (
          <SubMenu
            key={i.key}
            title={i.title}
            icon={<i className={i.iconClass} />}
          >
            {i.children.map((child) => (
              <Menu.Item key={child.key}>{child.title}</Menu.Item>
            ))}
          </SubMenu>
        ) : (
          <Menu.Item key={i.key}>
            <div className="main-layout-admin--menu-item">
              <span>{i.title}</span>
              <i className={i.iconClass} />
            </div>
          </Menu.Item>
        )))}
      </Menu.ItemGroup>
    );
  }
  return item.items.map((i) => (i.children ? (
    <SubMenu
      key={i.key}
      title={i.title}
      icon={<i className={i.iconClass} />}
    >
      {i.children.map((child) => (
        <Menu.Item key={child.key}>{child.title}</Menu.Item>
      ))}
    </SubMenu>
  ) : (
    <Menu.Item key={i.key}>
      <div className="main-layout-admin--menu-item">
        <span>{i.title}</span>
        <i className={i.iconClass} />
      </div>
    </Menu.Item>
  )));
});

const MainLayoutAdmin = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const { children } = props;
  const history = useHistory();
  const user = useSelector((state) => state[MODULE_USER].user);
  const profile = user ? user.profile || {} : {};
  const userRole = profile.role;
  const userName = profile.email ? profile.email.split('@')[0] : 'user';

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    authService.logout();
  };

  const handleClick = (value) => {
    history.push(`/${value.key}`);
  };

  return (
    <Layout className="main-layout-admin">
      <Sider
        breakpoint="md"
        collapsedWidth="0"
        onCollapse={handleToggle}
        collapsed={collapsed}
        theme="light"
        className="main-layout-admin--sider"
        width={255}
      >
        <div
          style={{
            height: 55,
            padding: '0px 15px',
            display: 'flex',
            alignItems: 'center',
            borderRight: '1px solid #f0f0f0',
          }}
        >
          {!collapsed ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                width: '100%',
              }}
            >
              <Link
                to="/"
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <img alt="logo" src={logoImg} height={35} />
                <span
                  style={{
                    marginLeft: 20,
                    display: 'block',
                    marginTop: '2px',
                    fontSize: '1.33rem',
                    fontWeight: '700',
                    color: 'rgb(241, 102, 58)',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    maxWidth: '90%',
                  }}
                >
                  eShop
                </span>
              </Link>
              <span
                style={{
                  marginLeft: '.86rem',
                  paddingLeft: '.86rem',
                  height: '2rem',
                  lineHeight: '2rem',
                  borderLeft: '1px solid #e4e9f0',
                  fontSize: '.8rem',
                  color: '#595c97',
                }}
              >
                <i style={{ fontSize: '.7rem' }} className="fas fa-key" />
                {' '}
                {userRole || 'role'}
              </span>
            </div>
          ) : null}
        </div>
        <Menu
          onClick={handleClick}
          defaultSelectedKeys={['admin/dashboard']}
          selectedKeys={[`admin/${history.location.pathname.split('/')[2]}`]}
          theme="light"
          mode="inline"
          style={{
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingTop: 10,
          }}
        >
          {renderMenu(siderMenu[userRole])}
        </Menu>
      </Sider>
      <Layout>
        <Header className="main-layout-admin--header">
          <Dropdown
            trigger={['click']}
            overlay={(
              <Menu style={{ width: 200 }}>
                <Menu.Item>
                  <div className="d-flex" style={{ paddingBottom: 5 }}>
                    <img
                      src={userIcon}
                      alt="avatar"
                      width={35}
                      style={{ marginRight: 10, paddingTop: 10 }}
                    />

                    <div>
                      <span>{userName || ''}</span>
                      <br />
                      <Tag color="blue">{userRole}</Tag>
                    </div>
                  </div>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item onClick={() => history.push('/admin/profile')}>
                  <i className="fas fa-user" />
                  {' '}
                  My Profile
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt" />
                  {' '}
                  Logout
                </Menu.Item>
              </Menu>
            )}
          >
            <div className="main-layout-admin--dropdown-profile">
              <img src={userIcon} alt="avatar" width={35} />
              <i className="fas fa-caret-down" />
            </div>
          </Dropdown>
        </Header>
        <Content
          style={{
            overflow: 'auto',
            minWidth: '260px',
          }}
        >
          <div className="main-layout-admin--content">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

MainLayoutAdmin.propTypes = () => ({
  childen: PropTypes.node.isRequired,
});

export default MainLayoutAdmin;
