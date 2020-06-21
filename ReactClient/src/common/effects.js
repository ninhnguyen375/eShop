import axios from 'axios';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { MODULE_NAME as MODULE_USER } from '../modules/user/models';
import { store } from './store';
import authService from './services/AuthService';

const TIMEOUT = 50000;
export async function loading(fetchingProcess, done = undefined) {
  nprogress.start();
  window.PageLoading.show();
  try {
    const ret = await fetchingProcess();
    if (done) {
      await done();
    }
    window.PageLoading.hide();
    nprogress.done();
    return ret;
  } catch (error) {
    window.PageLoading.hide();
    nprogress.done();
    throw error;
  }
}

export async function fetchLoading({ url, headers, ...options }) {
  try {
    nprogress.start();
    const response = await axios({
      method: 'GET',
      timeout: TIMEOUT,
      url,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...options,
    });
    nprogress.done();
    return response;
  } catch (error) {
    nprogress.done();
    throw error;
  }
}

export async function fetchAuthLoading({ url, headers, ...options }) {
  try {
    nprogress.start();
    const { user } = store.getState()[MODULE_USER];
    const isLoggedIn = !!user;
    const { access_token: assessToken } = user;

    if (!isLoggedIn) {
      authService.logout();
      throw new Error('User is not logged in');
    }
    if (!assessToken) {
      authService.logout();
      throw new Error('Missing assessToken');
    }
    const response = await axios({
      method: 'GET',
      timeout: TIMEOUT,
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${assessToken}`,
        ...headers,
      },
      ...options,
    });
    nprogress.done();
    return response;
  } catch (err) {
    nprogress.done();
    if (err && err.response && err.response.status === 401) {
      authService.logout();
      throw new Error('Session expired.');
    }
    throw err;
  }
}
