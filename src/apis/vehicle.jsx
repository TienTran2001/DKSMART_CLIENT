import axios from '~/axios';

export const apiGetVehicles = (licensePlate = '') => {
  return axios({
    url: `vehicles?licensePlate=${licensePlate}`,
    method: 'get',
  });
};

export const apiAddVehicle = (data) =>
  axios({
    url: '/vehicles',
    method: 'post',
    data,
  });

export const apiDeleteVehicle = (vehicleId) =>
  axios({
    url: `/vehicles/${vehicleId}`,
    method: 'delete',
  });

export const apiGetVehicleById = (vehicleId) =>
  axios({
    url: `/vehicles/${vehicleId}`,
    method: 'get',
  });

export const apiUpdateVehicle = (vehicleId, data) =>
  axios({
    url: `/vehicles/${vehicleId}`,
    method: 'put',
    data,
  });
