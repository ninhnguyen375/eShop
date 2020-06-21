import React from 'react';
import { Card } from 'antd';
import MainLayoutAdmin from '../../common/hocs/MainLayoutAdmin';
import unConstruct from '../../assets/animations/under-construction.json';

function UnderConstruct() {
  return (
    <MainLayoutAdmin>
      <Card>
        <h1><b>UNDER CONSTRUCT NOW</b></h1>
        <lottie-player
          src={JSON.stringify(unConstruct)}
          autoplay
          style={{ maxWidth: 400, margin: '0 auto' }}
        />
      </Card>
    </MainLayoutAdmin>
  );
}

export default UnderConstruct;
