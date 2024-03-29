import axios from '~/axios';

export const apiAddBooking = (data) => {
  return axios({
    url: `/appointments`,
    method: 'post',
    data,
  });
};

export const apiGetAllBooking = ({
  search = '',
  limit = 6,
  page = 0,
  status = '',
}) =>
  axios({
    url: `/appointments?limit=${limit}&page=${page}&search=${search}&status=${status}`,
    method: 'get',
  });
