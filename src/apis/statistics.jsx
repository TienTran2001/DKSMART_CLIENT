import axios from '~/axios';

export const apiGetStatisticsCenters = () => {
  return axios({
    url: `statistics/centers`,
    method: 'get',
  });
};

export const apiGetStatisticsUsers = () => {
  return axios({
    url: `statistics/users`,
    method: 'get',
  });
};

export const apiGetStatisticsAppointments = () => {
  return axios({
    url: `statistics/appointments`,
    method: 'get',
  });
};
export const apiGetStatisticsAppointmentsOfMonth = (month, year) => {
  return axios({
    url: `statistics/appointments-of-month?month=${month}&year=${year}`,
    method: 'get',
  });
};
