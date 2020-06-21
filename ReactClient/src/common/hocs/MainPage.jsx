import React from 'react';
import { HashRouter } from 'react-router-dom';
import Routes from '../routes';
import PageLoading from '../components/widgets/PageLoading';
import CustomModal from '../components/widgets/CustomModal';
import GotoTop from '../components/widgets/GotoTop';
import CustomDrawer from '../components/widgets/CustomDrawer';


const MainPage = () => (
  <HashRouter>
    <Routes />
    <PageLoading ref={(ref) => { window.PageLoading = ref; }} />
    <CustomModal ref={(ref) => { window.Modal = ref; }} />
    <CustomDrawer ref={(ref) => { window.Drawer = ref; }} />
    <GotoTop />
  </HashRouter>
);

export default MainPage;
