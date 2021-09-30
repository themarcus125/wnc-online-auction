const API_URL = process.env.API_URL;

export const getAPI = (endpoint, options = {}) =>
  fetch(`${API_URL}${endpoint}`, options);

export const putAPI = (endpoint, options = {}) =>
  fetch(`${API_URL}${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  }).then((response) => response.json());

export const postAPI = (endpoint, data, options = {}) =>
  fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : null,
    ...options,
  }).then((response) => response.json());

export const deleteAPI = (endpoint, options = {}) =>
  fetch(`${API_URL}${endpoint}`, {
    method: 'DELETE',
    ...options,
  });

// With token
export const getAPIWithToken = (endpoint, token, options = {}) =>
  fetch(`${API_URL}${endpoint}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    ...options,
  }).then((response) => response.json());

export const putAPIWithToken = (endpoint, data, token, options = {}) =>
  fetch(`${API_URL}${endpoint}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: data ? JSON.stringify(data) : null,
    ...options,
  });

export const postAPIWithToken = (endpoint, data, token, options = {}) =>
  fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: data ? JSON.stringify(data) : null,
    ...options,
  }).then((response) => response.json());

export const postAPIFormWithToken = (endpoint, data, token, options = {}) =>
  fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
    },
    body: data ? new URLSearchParams(data) : null,
    ...options,
  });

export const postAPIForm = (endpoint, data, options = {}) =>
  fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: data ? new URLSearchParams(data) : null,
    ...options,
  }).then((response) => response.json());

export const postFileAPIWithToken = (endpoint, formData, token, options = {}) =>
  fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
    ...options,
  });

export const deleteAPIWithToken = (endpoint, token, options = {}) =>
  fetch(`${API_URL}${endpoint}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    ...options,
  });

export const patchAPIWithToken = (endpoint, data, token, options = {}) =>
  fetch(`${API_URL}${endpoint}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: data ? JSON.stringify(data) : null,
    ...options,
  }).then((response) => response.json());
