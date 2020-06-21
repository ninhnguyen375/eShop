import React from 'react';
import { Menu } from 'antd';
import { useHistory } from 'react-router';
import MainLayout from '../common/hocs/MainLayout';
import { renderMenu } from '../common/hocs/MainLayoutAdmin';
import siderMenu from '../common/constants/siderMenu';
import { ROLE } from '../modules/user/models';
import OrderList from '../modules/order/components/OrderList';

const CustomerOrderPage = () => {
  const history = useHistory();

  return (
    <MainLayout>
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <Menu
              style={{ position: 'sticky', top: 10 }}
              defaultSelectedKeys={['/profile']}
              onClick={(item) => history.push(item.key)}
              selectedKeys={[`/${history.location.pathname.split('/')[1]}`]}
            >
              {renderMenu(siderMenu[ROLE.customer])}
            </Menu>
          </div>
          <div className="col-lg-9">
            <OrderList isCustomer />
          </div>
        </div>
      </div>
      <div className="pt100" />
    </MainLayout>
  );
};

export default CustomerOrderPage;
