import axios from '~/axios';

export const apiGetAllCenter = (limit, page) => {
  return axios({
    url: `/centers?limit=${limit}&page=${page}`,
    method: 'get',
  });
};

export const apiGetCenters = () => {
  return axios({
    url: `/centers`,
    method: 'get',
  });
};

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
export const apiUpdateCenterByManagerCenter = (data) =>
  axios({
    url: `/centers/update`,
    method: 'put',
    data,
  });

export const apiDeleteCenter = (centerId) =>
  axios({
    url: `/centers/${centerId}`,
    method: 'delete',
  });
