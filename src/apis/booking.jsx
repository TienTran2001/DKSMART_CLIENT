import axios from '~/axios';

export const apiAddBooking = (data) => {
  return axios({
    url: `/appointments`,
    method: 'post',
    data,
  });
};
export const apiUpdateStatus = (appointmentId) => {
  return axios({
    url: `/appointments/${appointmentId}`,
    method: 'put',
  });
};

export const apiCancelAppointment = (appointmentId) => {
  return axios({
    url: `/appointments/cancel/${appointmentId}`,
    method: 'put',
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

export const apiGetBookingHistory = (appointmentId) =>
  axios({
    url: `/appointments/${appointmentId}`,
    method: 'get',
  });

export const apiGetAllAppointmentOfCenter = ({
  search = '',
  limit = 6,
  page = 0,
  status = '',
}) =>
  axios({
    url: `/appointments/center?limit=${limit}&page=${page}&search=${search}&status=${status}`,
    method: 'get',
  });
export const apiGetSendMail = (data) =>
  axios({
    url: `/appointments/send-mail`,
    method: 'post',
    data,
  });
