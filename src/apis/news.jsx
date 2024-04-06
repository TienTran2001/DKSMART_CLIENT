import axios from '~/axios';

export const apiGetAllNews = ({ status = '', limit = 6, page = 0 }) => {
  return axios({
    url: `/news?limit=${limit}&page=${page}&status=${status}`,
    method: 'get',
  });
};

export const apiAddNews = (data) => {
  return axios({
    url: `/news`,
    method: 'post',
    data,
  });
};

export const apiGetNews = (newsId) => {
  return axios({
    url: `/news/${newsId}`,
    method: 'get',
  });
};

export const apiIncreaseView = (newsId) => {
  return axios({
    url: `/news/views/${newsId}`,
    method: 'put',
  });
};

export const apiUpdateNews = (data, newsId) => {
  return axios({
    url: `/news/${newsId}`,
    method: 'put',
    data,
  });
};

export const apiDeleteNews = (newsId) => {
  return axios({
    url: `/news/${newsId}`,
    method: 'delete',
  });
};
