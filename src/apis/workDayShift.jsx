import axios from '~/axios';

export const apiGetWorkDayShiftById = (workDayShift) =>
  axios({
    url: `work-day-shift/${workDayShift}`,
    method: 'get',
  });

export const apiUpdateWorkDayShift = (workDayShiftId, data) =>
  axios({
    url: `/work-day-shift/${workDayShiftId}`,
    method: 'put',
    data,
  });
