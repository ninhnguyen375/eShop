import { ROLE } from '../../modules/user/models';

export default {
  [ROLE.manager]: [
    {
      itemGroup: 'Dashboards',
      items: [
        {
          key: 'admin/dashboard',
          iconClass: 'fas fa-home',
          title: 'Dashboard',
        },
      ],
    },
    {
      itemGroup: 'Profile',
      items: [
        {
          key: 'admin/profile',
          iconClass: 'fas fa-user',
          title: 'Profile',
        },
      ],
    },
    {
      itemGroup: 'Manager',
      items: [
        {
          key: 'admin/customer',
          iconClass: 'fas fa-users',
          title: 'Customer',
        },
        {
          key: 'admin/staff',
          iconClass: 'fas fa-user-tie',
          title: 'Staff',
        },
        {
          key: 'admin/order',
          iconClass: 'far fa-list-alt',
          title: 'Order',
        },
        {
          key: 'admin/product',
          iconClass: 'fas fa-cubes',
          title: 'Product',
        },
        {
          key: 'admin/category',
          iconClass: 'far fa-list-alt',
          title: 'Category',
        },
        {
          key: 'admin/style',
          iconClass: 'fas fa-stream',
          title: 'Product Style',
        },
        {
          key: 'admin/product-color',
          iconClass: 'fas fa-palette',
          title: 'Product Color',
        },
        {
          key: 'admin/product-size',
          iconClass: 'fas fa-expand-alt',
          title: 'Product Size',
        },
      ],
    },
  ],
  [ROLE.seller]: [
    {
      itemGroup: 'Dashboards',
      items: [
        {
          key: 'admin/dashboard',
          iconClass: 'fas fa-home',
          title: 'Dashboard',
        },
      ],
    },
    {
      itemGroup: 'Profile',
      items: [
        {
          key: 'admin/profile',
          iconClass: 'fas fa-user',
          title: 'Profile',
        },
      ],
    },
    {
      itemGroup: 'Manager',
      items: [
        {
          key: 'admin/order',
          iconClass: 'far fa-list-alt',
          title: 'Order',
        },
        {
          key: 'admin/shipper',
          iconClass: 'fas fa-user-ninja',
          title: 'Shipper',
        },
        {
          key: 'admin/product',
          iconClass: 'fas fa-cubes',
          title: 'Product',
        },
        {
          key: 'admin/category',
          iconClass: 'far fa-list-alt',
          title: 'Category',
        },
        {
          key: 'admin/style',
          iconClass: 'fas fa-stream',
          title: 'Product Style',
        },
        {
          key: 'admin/product-color',
          iconClass: 'fas fa-palette',
          title: 'Product Color',
        },
        {
          key: 'admin/product-size',
          iconClass: 'fas fa-expand-alt',
          title: 'Product Size',
        },
      ],
    },
  ],
  [ROLE.shipper]: [
    {
      itemGroup: 'Dashboards',
      items: [
        {
          key: 'admin/dashboard',
          iconClass: 'fas fa-home',
          title: 'Dashboard',
        },
      ],
    },
    {
      itemGroup: 'Profile',
      items: [
        {
          key: 'admin/profile',
          iconClass: 'fas fa-user',
          title: 'Profile',
        },
      ],
    },
    {
      itemGroup: 'Manager',
      items: [
        {
          key: 'admin/order',
          iconClass: 'far fa-list-alt',
          title: 'Order',
        },
      ],
    },
  ],
  [ROLE.customer]: [
    {
      itemGroup: 'Profile',
      items: [
        {
          key: '/profile',
          iconClass: 'fas fa-user',
          title: 'Profile',
        },
      ],
    },
    {
      itemGroup: 'Manager',
      items: [
        {
          key: '/order',
          iconClass: 'fas fa-list-alt',
          title: 'My order',
        },
      ],
    },
  ],
  default: [
    {
      itemGroup: 'Dashboards',
      items: [
        {
          key: 'admin/dashboard',
          iconClass: 'fas fa-home',
          title: 'Dashboard',
        },
      ],
    },
  ],
};
