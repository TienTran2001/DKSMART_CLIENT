/* eslint-disable react/prop-types */
import { MdCheckCircle } from 'react-icons/md';
import { SlCalender } from 'react-icons/sl';
import ButtonDefault from './ButtonDefault';
import { AiOutlineClose } from 'react-icons/ai';
import { GoogleMapsLink } from '~/utils/contants';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { Tooltip } from '@material-tailwind/react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// eslint-disable-next-line react/prop-types
const CardCenter = ({ center, isLoading }) => {
  const { centerId, name, address, phone, status, operatingHours } = center;
  const navigate = useNavigate();
  return (
    <div className="bg-main-gray border border-[#067d8b] text-sm md:text-base rounded-md px-4 py-3 flex flex-col gap-y-5">
      <div className="uppercase font-semibold text-gray-700">
        {isLoading ? <Skeleton width={200} /> : name}
      </div>
      <div className="border-t-2"></div>
      <div>
        Địa chỉ:{' '}
        <Tooltip content="Xem trên Google map">
          <span className="text-main cursor-pointer">
            <GoogleMapsLink address={address}>{address}</GoogleMapsLink>
          </span>
        </Tooltip>
      </div>

      <div className="">
        Thời gian làm việc: <span className="text-main">{operatingHours}</span>
      </div>
      <div className="">
        Số điện thoại: <span className="text-main">{phone}</span>
      </div>
      <div className="flex justify-between flex-col md:flex-row gap-y-2 md:gap-y-0">
        {status == 'đang nhận lịch' && (
          <ButtonDefault className="bg-green-600 flex items-center gap-x-2 cursor-default ">
            <MdCheckCircle className="text-lg" />
            <span>{status}</span>
          </ButtonDefault>
        )}
        {status == 'ngưng nhận lịch' && (
          <ButtonDefault className="bg-red-400 flex items-center gap-x-2 ">
            <AiOutlineClose className="text-lg" />
            <span>{status}</span>
          </ButtonDefault>
        )}

        <ButtonDefault
          className={clsx(
            'bg-main w-full md:w-1/3  flex items-center gap-x-2',
            status == 'ngưng nhận lịch' && 'cursor-not-allowed opacity-40'
          )}
          onClick={() => {
            if (status == 'đang nhận lịch')
              navigate(`/booking?center=${centerId}`);
          }}
        >
          <SlCalender className="text-lg -translate-y-[1px]" />
          <span>Đặt lịch ngay</span>
        </ButtonDefault>
      </div>
    </div>
  );
};

export default CardCenter;
