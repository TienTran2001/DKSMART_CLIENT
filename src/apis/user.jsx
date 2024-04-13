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

export const apiGetAllUserOfCenter = (phone = '', limit = 6, page = 0) =>
  axios({
    url: `users/of/center?phone=${phone}&limit=${limit}&page=${page}`,
    method: 'get',
  });

export const apiAddStaff = (data) =>
  axios({
    url: '/users/staff',
    method: 'post',
    data,
  });

export const apiGetUserCenterById = (userId) =>
  axios({
    url: `/users/center/${userId}`,
    method: 'get',
  });

export const apiUpdateUserOfCenter = (userId, data) =>
  axios({
    url: `/users/center/${userId}`,
    method: 'put',
    data,
  });

export const apiDeleteUserOfCenter = (userId) =>
  axios({
    url: `/users/center/${userId}`,
    method: 'delete',
  });
