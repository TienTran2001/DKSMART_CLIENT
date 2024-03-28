import axios from '~/axios';

export const apiGetAllShift = (centerId, date = '', limit = 6, page = 0) =>
  axios({
    url: `center/shifts/${centerId}?date=${date}&limit=${limit}&page=${page}`,
    method: 'get',
  });
export const apiGetAllShiftsAfterOrEqualToTodayAsync = (centerId) =>
  axios({
    url: `center/shifts/${centerId}`,
    method: 'get',
  });

export const apiGetShiftById = (shiftId) =>
  axios({
    url: `/center/shift/${shiftId}`,
    method: 'get',
  });

export const apiGetShiftDetailById = (shiftDetailId) =>
  axios({
    url: `/center/shift-detail/${shiftDetailId}`,
    method: 'get',
  });

export const apiAddShift = (data) =>
  axios({
    url: '/center/shifts',
    method: 'post',
    data,
  });
export const apiAddShiftDetail = (shiftId, data) =>
  axios({
    url: `/center/shift-details/${shiftId}`,
    method: 'post',
    data,
  });

export const apiUpdateShift = (shiftId, data) =>
  axios({
    url: `/center/shifts/${shiftId}`,
    method: 'put',
    data,
  });
export const apiUpdateShiftDetail = (shiftDetailId, data) =>
  axios({
    url: `/center/shift-details/${shiftDetailId}`,
    method: 'put',
    data,
  });

export const apiDeleteShift = (shiftId) =>
  axios({
    url: `/center/shifts/${shiftId}`,
    method: 'delete',
  });

export const apiDeleteShiftDetail = (shiftDetailId) =>
  axios({
    url: `/center/shift-details/${shiftDetailId}`,
    method: 'delete',
  });
