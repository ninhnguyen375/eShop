import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { notification } from 'antd';
import MainPage from './MainPage';
import { store, persistor } from '../store';

notification.config({
  placement: 'topRight',
});

const Root = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <MainPage />
    </PersistGate>
  </Provider>
);

export default Root;
