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
