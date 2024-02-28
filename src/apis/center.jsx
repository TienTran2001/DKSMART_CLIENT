import axios from '~/axios';

export const apiGetAllCenter = () =>
  axios({
    url: '/centers',
    method: 'get',
  });

export const apiGetCenterById = (centerId) =>
  axios({
    url: `/centers/${centerId}`,
    method: 'get',
  });

export const apiAddCenter = (data) =>
  axios({
    url: '/centers',
    method: 'post',
    data,
  });

export const apiUpdateCenter = (centerId, data) =>
  axios({
    url: `/centers/${centerId}`,
    method: 'put',
    data,
  });

export const apiDeleteCenter = (centerId) =>
  axios({
    url: `/centers/${centerId}`,
    method: 'delete',
  });
