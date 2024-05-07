import axios from '~/axios';

export const apiGetAllWorkDaysAfterOrEqualToTodayAsync = (centerId) =>
  axios({
    url: `work-days/center/${centerId}`,
    method: 'get',
  });

export const apiGetAllWorkDay = (centerId, date = '', limit = 6, page = 0) =>
  axios({
    url: `work-days/center/${centerId}?date=${date}&limit=${limit}&page=${page}`,
    method: 'get',
  });

// export const apiGetAllShiftsAfterOrEqualToTodayAsync = (centerId) =>
//   axios({
//     url: `center/shifts/${centerId}`,
//     method: 'get',
//   });

export const apiGetWorkDayById = (workDayId) =>
  axios({
    url: `/work-days/${workDayId}`,
    method: 'get',
  });

// export const apiGetShiftDetailById = (shiftDetailId) =>
//   axios({
//     url: `/center/shift-detail/${shiftDetailId}`,
//     method: 'get',
//   });

export const apiAddWorkDay = (data) =>
  axios({
    url: '/work-days',
    method: 'post',
    data,
  });
// export const apiAddShiftDetail = (shiftId, data) =>
//   axios({
//     url: `/center/shift-details/${shiftId}`,
//     method: 'post',
//     data,
//   });

export const apiUpdateWorkDay = (workDayId, data) =>
  axios({
    url: `/work-days/${workDayId}`,
    method: 'put',
    data,
  });

// export const apiUpdateShiftDetail = (shiftDetailId, data) =>
//   axios({
//     url: `/center/shift-details/${shiftDetailId}`,
//     method: 'put',
//     data,
//   });

export const apiDeleteWorkDay = (workDayId) =>
  axios({
    url: `/work-days/${workDayId}`,
    method: 'delete',
  });

// export const apiDeleteShiftDetail = (shiftDetailId) =>
//   axios({
//     url: `/center/shift-details/${shiftDetailId}`,
//     method: 'delete',
//   });
