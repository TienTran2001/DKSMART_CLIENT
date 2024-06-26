import axios from '~/axios';

export const apiGetAllProvince = () =>
  axios({
    url: '/provinces',
    method: 'get',
  });

export const apiGetAllProvincePaging = (limit = 6, page = 0, name = '') =>
  axios({
    url: `/provinces?limit=${limit}&page=${page}&name=${name}`,
    method: 'get',
  });

export const apiGetProvinceById = (provinceId) =>
  axios({
    url: `/provinces/${provinceId}`,
    method: 'get',
  });

export const apiAddProvince = (data) =>
  axios({
    url: '/provinces',
    method: 'post',
    data,
  });

export const apiUpdateProvince = (provinceId, data) =>
  axios({
    url: `/provinces/${provinceId}`,
    method: 'put',
    data,
  });

export const apiDeleteProvince = (provinceId) =>
  axios({
    url: `/provinces/${provinceId}`,
    method: 'delete',
  });
