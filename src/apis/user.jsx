import axios from '~/axios';
export const apiGetCurrent = () =>
  axios({
    url: '/users/current',
    method: 'get',
  });

export const apiGetUserById = (userId) =>
  axios({
    url: `/users/${userId}`,
    method: 'get',
  });

export const apiAddUser = (data) =>
  axios({
    url: '/users',
    method: 'post',
    data,
  });

export const apiGetAllUser = (phone = '', limit = 6, page = 0) =>
  axios({
    url: `/users?phone=${phone}&limit=${limit}&page=${page}`,
    method: 'get',
  });
export const apiDeleteUser = (userId) =>
  axios({
    url: `/users/${userId}`,
    method: 'delete',
  });

export const apiUpdateUser = (userId, data) =>
  axios({
    url: `/users/${userId}`,
    method: 'put',
    data,
  });

export const apiUpdateCurrent = (data) =>
  axios({
    url: `/users/current`,
    method: 'put',
    data,
  });
