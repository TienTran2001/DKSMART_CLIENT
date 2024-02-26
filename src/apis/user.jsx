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

export const apiGetAllUser = () =>
  axios({
    url: '/users',
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
