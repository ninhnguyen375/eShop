import 'react-app-polyfill/ie11';

import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Root from './common/hocs/Root';
import './assets/css/bootstrap-grid.css'
import 'antd/dist/antd.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './assets/css/custom-antd.css';
import './assets/css/style.scss';

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
