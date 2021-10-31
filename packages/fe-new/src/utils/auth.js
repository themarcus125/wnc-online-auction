import { navigate } from '../hooks/useNavigate';

import { getAPIWithToken } from './api';
const CURRENT_USER = 'currentUser';

export const setUser = (user) =>
  window.localStorage.setItem(CURRENT_USER, JSON.stringify(user));

export const getUser = () =>
  typeof window !== 'undefined' && window.localStorage.getItem(CURRENT_USER)
    ? JSON.parse(window.localStorage.getItem(CURRENT_USER))
    : {};

export const setTokenToLocalStorage = async (token) => {
  const user = await getUser();
  setUser({ ...user, token });
};

export const checkToken = async (token) => {
  let isTokenValid = true;

  if (token) {
    const response = await getAPIWithToken('/api/user', token);
    if (response.error) {
      isTokenValid = false;
    }
  }

  return isTokenValid;
};

export const refreshToken = async (token, shouldRedirect) => {
  const response = await getAPIWithToken('/api/auth/re-sign', token);

  if (!response.error) {
    return response.accessToken;
  }

  if (response.error && response.message === 'EXPIRED_RESIGN_TOKEN') {
    logout(() => {
      if (shouldRedirect) {
        navigate('/login', {
          toastMsg: 'Hãy đăng nhập lại để tiếp tục',
          toastType: 'error',
        });
      }
    });
    return;
  }

  return token;
};

export const getToken = async (shouldRedirect = true, setLoginStatus) => {
  let token = '';
  const user = getUser();
  if (user.token) {
    const check = await checkToken(user.token);
    token = check ? user.token : await refreshToken(user.token, shouldRedirect);

    if (token !== user.token) {
      setTokenToLocalStorage(token);
    }
    setLoginStatus && setLoginStatus(true);
  }

  return token;
};

export const logout = (cb) => {
  setUser({});
  cb && cb();
};
