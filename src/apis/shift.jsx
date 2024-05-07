import axios from '~/axios';

export const apiGetAllShift = () =>
  axios({
    url: `center/shifts`,
    method: 'get',
  });

export const apiGetShift = (shiftId) =>
  axios({
    url: `center/shift/${shiftId}`,
    method: 'get',
  });

export const apiGetShiftById = (shiftId) =>
  axios({
    url: `/center/shift/${shiftId}`,
    method: 'get',
  });

export const apiAddShift = (data) =>
  axios({
    url: '/center/shifts',
    method: 'post',
    data,
  });

export const apiUpdateShift = (shiftId, data) =>
  axios({
    url: `/center/shifts/${shiftId}`,
    method: 'put',
    data,
  });

export const apiDeleteShift = (shiftId) =>
  axios({
    url: `/center/shifts/${shiftId}`,
    method: 'delete',
  });
