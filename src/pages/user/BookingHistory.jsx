import { PublicLayout } from '../public';
import { Fragment, useEffect, useState } from 'react';

import { useUserStore } from '~/store/useUserStore';

import clsx from 'clsx';
import { IoArrowBackSharp } from 'react-icons/io5';
import { formatDate, formatTime } from '~/utils/contants';
import { apiCancelAppointment, apiGetAllBooking } from '~/apis/booking';
import { NavLink, useLocation } from 'react-router-dom';
import { Button, IconButton, Tooltip } from '@material-tailwind/react';
import { AiFillDelete, AiOutlineFileText } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const nav = [
  {
    id: 1,
    name: 'Tất cả',
    value: 'all',
    link: '/booking-history?status=all',
  },
  {
    id: 2,
    name: 'Chưa xác nhận',
    value: 'unconfirmed',
    link: '/booking-history?status=unconfirmed',
  },
  {
    id: 3,
    name: 'Đã xác nhận',
    value: 'confirmed',
    link: '/booking-history?status=confirmed',
  },
  {
    id: 4,
    name: 'Đã hoàn thành',
    value: 'closed',
    link: '/booking-history?status=closed',
  },
  {
    id: 5,
    name: 'Đã hủy',
    value: 'canceled',
    link: '/booking-history?status=canceled',
  },
];

// eslint-disable-next-line react/prop-types
const BookingHistory = ({ navigate }) => {
  const location = useLocation();

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [statusValue, setStatusValue] = useState('');
  // const [cancelValue, setCancelValue] = useState('');

  const limit = 2;

  const [bookingHistories, setBookingHistories] = useState([]);
  const { current } = useUserStore();

  if (!current) {
    navigate('/login');
  }

  useEffect(() => {
    loadBookingHistories(statusValue, limit, 0);
  }, []);

  const loadBookingHistories = async (status, limit, page) => {
    const response = await apiGetAllBooking({ status, limit, page });
    console.log(response);
    if (response.success) {
      const { appointments, totalPage } = response;
      setTotalPage(totalPage);
      setBookingHistories(appointments.rows);
    }
  };

  const handleChangeStatus = (status) => {
    if (status == 'Tất cả') status = '';
    setStatusValue(status);
    setPage(1);
    loadBookingHistories(status, limit, 0);
  };

  const handleCancelAppointment = async (appointmentId) => {
    console.log(appointmentId);
    Swal.fire({
      title: 'Lý do hủy lịch',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Hủy lịch',
      confirmContainer: '#3085d6',
      cancelButtonText: 'Thoát',
      cancelButtonColor: '#d33',
      showLoaderOnConfirm: true,
      preConfirm: async (data) => {
        // setCancelValue(data);
        const dt = { note: data };
        const response = await apiCancelAppointment(appointmentId, dt);
        console.log(response);
        if (response.success) {
          toast.success(response.message);
          loadBookingHistories(statusValue, limit, 0);
        } else toast.error(response.message);
      },
    });

    // Swal.fire({
    //   title: '',
    //   text: 'Bạn chắc chắn hủy lịch hẹn này',
    //   icon: '',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Xác nhận',
    //   cancelButtonText: 'Thoát!',
    // }).then(async (result) => {
    //   if (result.isConfirmed) {
    //     const response = await apiCancelAppointment(appointmentId);
    //     console.log(response);
    //     if (response.success) {
    //       toast.success(response.message);
    //       loadBookingHistories(statusValue, limit, 0);
    //     } else toast.error(response.message);
    //   }
    // });
  };

  return (
    <>
      <PublicLayout>
        <div className="min-h-screen max-w-[1200px] mx-auto">
          <div className="mt-[50px] md:w-2/3 mx-auto rounded-md bg-white py-[25px] px-[20px] ">
            <div className="relative">
              <button onClick={() => navigate('')}>
                <span className="absolute top-[25px] cursor-pointer">
                  <IoArrowBackSharp size={22} className="text-main  " />
                </span>
              </button>
              <h2 className="font-semibold uppercase text-center text-main">
                Lịch hẹn
              </h2>
            </div>
            <nav className="flex justify-between py-6">
              {nav.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.link}
                  onClick={() => handleChangeStatus(item.name)}
                  className={`text-${
                    location.search.includes(`status=${item.value}`)
                      ? 'main bg-gray-200'
                      : 'black'
                  } hover:bg-gray-200 text-[14px] md:text-base transition-all rounded-sm py-3 w-full text-center`}
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
            <div className="">
              {bookingHistories.length == 0 ? (
                <div className="flex items-center justify-center mb-5">
                  <div className="  flex items-center space-x-4  text-white px-10 py-7 bg-gray-400 rounded-md">
                    <AiOutlineFileText className="text-[70px]" />
                    <span className="text-lg">Không có dữ liệu!</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {bookingHistories.map((item) => (
                    <Fragment key={item.appointmentId}>
                      <div
                        className="cursor-pointer bg-main-gray border border-[#067d8b] rounded-md px-4 py-3 flex flex-col gap-y-5"
                        onClick={() =>
                          navigate(
                            `booking-history-detail/${item.appointmentId}`
                          )
                        }
                      >
                        <div className="flex items-center">
                          <div className="w-1/6">Biển số xe:</div>
                          <div
                            className={clsx(
                              'uppercase w-5/6 text-center border-2 font-bold text-xl px-8 py-3 rounded-md',
                              item?.Vehicle?.plateColor === 'Trắng' &&
                                'bg-white',
                              item?.Vehicle?.plateColor === 'Vàng' &&
                                'bg-yellow-700',
                              item?.Vehicle?.plateColor === 'Xanh' &&
                                'bg-blue-700'
                            )}
                          >
                            {item?.Vehicle?.licensePlate}
                          </div>
                        </div>
                        <div className="border-t-2"></div>
                        <div className="flex items-center">
                          <div className="">
                            Giờ hẹn:{' '}
                            {item?.WorkDayShift && (
                              <span className="hover:text-main  text-main">
                                {formatTime(
                                  item?.WorkDayShift?.Shift?.startTime
                                )}{' '}
                                đến{' '}
                                {formatTime(item?.WorkDayShift?.Shift?.endTime)}
                                {' - '}
                                {formatDate(item.appointmentDate)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="">
                          Địa điểm:{' '}
                          <span className="text-main">{item.Center.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="">
                            Trạng thái:{' '}
                            <span className="text-main">{item.status}</span>
                          </div>
                          <Tooltip content="Hủy lịch hẹn">
                            <IconButton
                              variant="text"
                              className={clsx(
                                item.status !== 'chưa xác nhận' &&
                                  'opacity-50 cursor-not-allowed'
                              )}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (item.status === 'chưa xác nhận') {
                                  handleCancelAppointment(item.appointmentId);
                                }
                              }}
                            >
                              <AiFillDelete className="text-xl" />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </div>
                    </Fragment>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              <div className="font-normal">
                {page} / {totalPage}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => {
                    const x = page - 1;
                    loadBookingHistories(statusValue, 2, x - 1);
                    setPage(page - 1);
                  }}
                >
                  Trước
                </Button>
                <Button
                  variant="outlined"
                  size="sm"
                  disabled={page >= totalPage ? true : false}
                  onClick={() => {
                    loadBookingHistories(statusValue, 2, page);
                    setPage(page + 1);
                  }}
                >
                  Tiếp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default BookingHistory;
