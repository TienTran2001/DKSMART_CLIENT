import { PublicLayout } from '../public';
import { useEffect, useState } from 'react';

import { useUserStore } from '~/store/useUserStore';

import clsx from 'clsx';
import { IoArrowBackSharp } from 'react-icons/io5';
import { GoogleMapsLink, formatDate, formatTime } from '~/utils/contants';
import { apiGetBookingHistory } from '~/apis/booking';
import { useParams } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const BookingHistoryDetail = ({ navigate }) => {
  const { appointmentId } = useParams();
  const [bookingHistory, setBookingHistory] = useState();

  const { current } = useUserStore();

  if (!current) {
    navigate('/login');
  }

  useEffect(() => {
    loadBookingHistory();
  }, []);

  console.log(bookingHistory);
  const loadBookingHistory = async () => {
    const response = await apiGetBookingHistory(appointmentId);
    console.log(response);
    if (response.success) {
      const { appointment } = response;

      setBookingHistory(appointment);
    }
  };

  return (
    <>
      <PublicLayout>
        <div className="min-h-screen max-w-[1200px] mx-auto">
          <div className="mt-[50px] w-2/3 mx-auto rounded-md bg-white py-[25px] px-[20px] ">
            <div className="relative">
              <button onClick={() => navigate(-1)}>
                <span className="absolute top-[25px] cursor-pointer">
                  <IoArrowBackSharp size={22} className="text-main  " />
                </span>
              </button>
              <h2 className="font-semibold uppercase text-center text-main">
                Chi tiết lịch hẹn
              </h2>
            </div>
            {bookingHistory && (
              <div className="mt-6 rounded-md  px-6">
                <div className="py-2 bg-main  text-white text-lg font-semibold text-center rounded-t">
                  Thông tin lịch hẹn
                </div>
                <div className="space-y-8 border bg-gray-50 p-6">
                  <div className="">
                    Địa điểm:{' '}
                    <span className="text-main">
                      {bookingHistory?.Center?.name}
                    </span>
                  </div>
                  <div className="">
                    Địa chỉ:{' '}
                    <span className="text-main">
                      <GoogleMapsLink address={bookingHistory?.Center?.address}>
                        {bookingHistory?.Center?.address}
                      </GoogleMapsLink>
                    </span>
                  </div>
                  <div className="border-t-2"></div>
                  <div className="flex items-center justify-between">
                    <div className="">
                      Họ và tên:{' '}
                      <span className="text-main">
                        {bookingHistory?.User?.fullname}
                      </span>
                    </div>
                    <div className="">
                      Số điện thoại:{' '}
                      <span className="text-main">
                        {bookingHistory?.User?.phone}
                      </span>
                    </div>
                  </div>
                  <div className="border-t-2"></div>
                  <div className="flex  justify-between">
                    <div className="flex w-1/2 gap-x-2">
                      Biển số xe:{' '}
                      <div
                        className={clsx(
                          'uppercase text-center border-2 font-bold text-xl px-8 py-3 rounded-md',
                          bookingHistory?.Vehicle?.plateColor === 'Trắng' &&
                            'bg-white',
                          bookingHistory?.Vehicle?.plateColor === 'Vàng' &&
                            'bg-yellow-700',
                          bookingHistory?.Vehicle?.plateColor === 'Xanh' &&
                            'bg-blue-700'
                        )}
                      >
                        {bookingHistory?.Vehicle?.licensePlate}
                      </div>
                    </div>
                    <div className="">
                      Loại phương tiện:{' '}
                      <span className="text-main">
                        {bookingHistory?.Vehicle?.vehicleType}
                      </span>
                    </div>
                  </div>
                  <div className="border-t-2"></div>
                  <div className="flex items-center justify-between">
                    <div className="">
                      Ngày:{' '}
                      <span className="text-main">
                        {formatDate(bookingHistory.appointmentDate)}
                      </span>
                    </div>
                    <div className="">
                      Giờ:{' '}
                      {bookingHistory?.ShiftDetail && (
                        <span className="text-main">
                          {formatTime(bookingHistory?.ShiftDetail?.startTime)}{' '}
                          đến {formatTime(bookingHistory?.ShiftDetail?.endTime)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="border-t-2"></div>
                  <div className="">
                    Trạng thái:{' '}
                    <span className="text-main">{bookingHistory.status}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default BookingHistoryDetail;
