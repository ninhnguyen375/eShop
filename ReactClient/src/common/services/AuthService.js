import { Log, UserManager, WebStorageStateStore } from 'oidc-client';
import {
  identityUrl, clientId, clientRoot,
} from '../../configs';
import { store } from '../store';
import { clearAll } from '../actions/common';

const settings = {
  authority: identityUrl,
  client_id: clientId,
  redirect_uri: `${clientRoot}/#/signin-oidc`,
  silent_redirect_uri: `${clientRoot}/silent-renew.html`,
  post_logout_redirect_uri: `${clientRoot}/#/logout`,
  response_type: 'code',
  scope: 'openid profile IdentityServerApi CatalogApi OrderApi PaymentApi CartApi',
  userStore: new WebStorageStateStore({ store: localStorage }),
};

export const userManager = new UserManager(settings);

Log.logger = console;
Log.level = Log.INFO;

function getUser() {
  return userManager.getUser();
}

function login() {
  return userManager.signinRedirect();
}

function renewToken() {
  return userManager.signinSilent();
}

function logout() {
  store.dispatch(clearAll());
  return userManager.signoutRedirect();
}

const authService = {
  getUser,
  login,
  renewToken,
  logout,
};

export default authService;
