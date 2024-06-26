import axios from '~/axios';

export const apiGetAllCenter = ({
  province = '',
  name = '',
  limit = 6,
  page = 0,
}) => {
  return axios({
    url: `/centers?name=${name}&limit=${limit}&page=${page}&province=${province}`,
    method: 'get',
  });
};

export const apiGetCentersOfProvince = (provinceId) => {
  return axios({
    url: `/centers?province=${provinceId}`,
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
