import { MdCheckCircle } from 'react-icons/md';
import { SlCalender } from 'react-icons/sl';
import ButtonDefault from './ButtonDefault';
import { AiOutlineClose } from 'react-icons/ai';
import { GoogleMapsLink } from '~/utils/contants';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const CardCenter = ({ center }) => {
  // eslint-disable-next-line react/prop-types
  const { name, address, phone, status, operatingHours } = center;
  return (
    <div className="bg-main-gray border border-[#067d8b] text-sm md:text-base rounded-md px-4 py-3 flex flex-col gap-y-5">
      <div className="uppercase font-semibold text-gray-700">{name}</div>
      <div className="border-t-2"></div>
      <div>
        Địa chỉ:{' '}
        <span className="text-main cursor-pointer">
          <GoogleMapsLink address={address}>{address}</GoogleMapsLink>
        </span>
      </div>

      <div className="">
        Thời gian làm việc: <span className="text-main">{operatingHours}</span>
      </div>
      <div className="">
        Số điện thoại: <span className="text-main">{phone}</span>
      </div>
      <div className="flex justify-between flex-col md:flex-row gap-y-2 md:gap-y-0">
        {status == 'đang nhận lịch' && (
          <ButtonDefault className="bg-green-600 flex items-center gap-x-2">
            <MdCheckCircle className="text-lg" />
            <span>{status}</span>
          </ButtonDefault>
        )}
        {status == 'ngưng nhận lịch' && (
          <ButtonDefault className="bg-red-400 flex items-center gap-x-2">
            <AiOutlineClose className="text-lg" />
            <span>{status}</span>
          </ButtonDefault>
        )}

        <Link to="/booking">
          <ButtonDefault className="bg-main w-full  flex items-center gap-x-2">
            <SlCalender className="text-lg -translate-y-[1px]" />
            <span>Đặt lịch ngay</span>
          </ButtonDefault>
        </Link>
      </div>
    </div>
  );
};

export default CardCenter;
