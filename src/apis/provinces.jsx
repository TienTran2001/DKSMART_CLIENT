import axios from '~/axios';

export const apiGetAllProvince = () =>
  axios({
    url: '/provinces',
    method: 'get',
  });

export const apiAddProvince = (data) =>
  axios({
    url: '/provinces',
    method: 'post',
    data,
  });
