/* eslint-disable react/prop-types */
import { MdCheckCircle } from 'react-icons/md';
import ButtonDefault from './ButtonDefault';
import { IoPencilSharp } from 'react-icons/io5';
import { AiFillDelete } from 'react-icons/ai';
import { Tooltip } from '@material-tailwind/react';
import clsx from 'clsx';

import { AiOutlineClose } from 'react-icons/ai';
import { formatDate } from '~/utils/contants';

// eslint-disable-next-line react/prop-types
const CardVehicle = ({ vehicle, onHandleDelete, navigate }) => {
  const {
    licensePlate,
    vehicleType,
    brand,
    modelNumber,
    expiryDate,
    plateColor,
  } = vehicle;

  const handleUpdateVehicle = (vehicleId) => {
    navigate(`/update-vehicle/${vehicleId}`);
  };

  return (
    <div className="bg-main-gray border border-[#067d8b] rounded-md px-4 py-3 flex flex-col gap-y-5">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="md:w-1/6">Biển số xe:</div>
        <div
          className={clsx(
            'uppercase md:w-5/6 text-center border-2 font-bold text-xl px-8 py-3 rounded-md',
            plateColor === 'Trắng' && 'bg-white',
            plateColor === 'Vàng' && 'bg-yellow-700',
            plateColor === 'Xanh' && 'bg-blue-700'
          )}
        >
          {licensePlate}
        </div>
      </div>
      <div className="border-t-2"></div>
      <div className="flex flex-col md:flex-row gap-y-4 md:items-center">
        <div className="md:w-1/2">
          Loại phương tiện:{' '}
          <span className="hover:text-main  text-main">{vehicleType}</span>
        </div>
        <div className="md:w-1/2">
          Nhãn hiệu: <span className="text-main">{brand}</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-y-4 md:items-center">
        <div className="md:w-1/2">
          Số loại:{' '}
          <span className="hover:text-main text-main">{modelNumber}</span>
        </div>
        <div className="md:w-1/2">
          Ngày hết hạn:{' '}
          <span className="text-main">{formatDate(expiryDate)}</span>
        </div>
      </div>

      <div className="flex justify-between">
        {0 == 'đang nhận lịch' && (
          <ButtonDefault className="bg-green-600 flex items-center gap-x-2">
            <MdCheckCircle className="text-lg" />
            <span>st</span>
          </ButtonDefault>
        )}
        {0 == 'ngưng nhận lịch' && (
          <ButtonDefault className="bg-red-400 flex items-center gap-x-2">
            <AiOutlineClose className="text-lg" />
            <span>0</span>
          </ButtonDefault>
        )}
        <div className="flex items-center gap-x-5">
          <Tooltip content="Sửa">
            <div>
              <ButtonDefault
                className="bg-gray-900 flex items-center gap-x-2"
                onClick={() => handleUpdateVehicle(vehicle.vehicleId)}
              >
                <IoPencilSharp className="text-lg" />
              </ButtonDefault>
            </div>
          </Tooltip>
          <Tooltip content="Xóa">
            <div>
              <ButtonDefault
                className="bg-gray-900  flex items-center gap-x-2"
                onClick={() => onHandleDelete(vehicle.vehicleId)}
              >
                <AiFillDelete className="text-lg" />
              </ButtonDefault>
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default CardVehicle;
