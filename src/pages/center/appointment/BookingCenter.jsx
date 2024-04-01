/* eslint-disable no-unused-vars */
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from '@material-tailwind/react';
import { Fragment, useEffect, useState } from 'react';
import { IoPencilSharp } from 'react-icons/io5';
import { AiFillDelete, AiOutlineFileText } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { apiDeleteProvince, apiGetAllProvince } from '~/apis/provinces';
import { apiDeleteShift, apiGetAllShift } from '~/apis/shift';
import { useUserStore } from '~/store/useUserStore';
import { GoogleMapsLink, formatDate, formatTime } from '~/utils/contants';
import { InputForm } from '~/components';
import { useForm } from 'react-hook-form';
import ButtonDefault from '~/components/commons/ButtonDefault';
import { IoMdClose, IoMdSearch } from 'react-icons/io';
import {
  apiCancelAppointment,
  apiGetAllAppointmentOfCenter,
  apiGetBookingHistory,
  apiGetSendMail,
  apiUpdateStatus,
} from '~/apis/booking';
import clsx from 'clsx';
import ModalContent from '~/components/commons/ModalContent';
import Modal from '~/components/commons/Model';
import { FaRegEye } from 'react-icons/fa';

const nav = [
  {
    id: 1,
    name: 'Tất cả',
    value: 'all',
    link: '/manage-center/booking?status=all',
  },
  {
    id: 2,
    name: 'Chưa xác nhận',
    value: 'unconfirmed',
    link: '/manage-center/booking?status=unconfirmed',
  },
  {
    id: 3,
    name: 'Đã xác nhận',
    value: 'confirmed',
    link: '/manage-center/booking?status=confirmed',
  },
  {
    id: 4,
    name: 'Đã hoàn thành',
    value: 'closed',
    link: '/manage-center/booking?status=closed',
  },
  {
    id: 5,
    name: 'Đã hủy',
    value: 'canceled',
    link: '/manage-center/booking?status=canceled',
  },
];

const TABLE_HEAD = [
  'Số thứ tự',
  'Người đặt',
  'Phương tiện',
  'Giờ hẹn',
  'Ngày hẹn',
  'Trạng thái',
  'Thao tác',
];

export default function BookingCenter() {
  const [loading, setLoading] = useState(false);
  const [shifts, setShifts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [appointments, setAppointments] = useState([]);
  const [isOpenModelDetail, setIsOpenModelDetail] = useState(false);
  const [isOpenImage, setIsOpenImage] = useState(false);
  const [search, setSearch] = useState('');
  const limit = 6;

  const [bookingHistory, setBookingHistory] = useState();

  const [statusValue, setStatusValue] = useState('');

  const { current } = useUserStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm();

  let navigate = useNavigate();
  useEffect(() => {
    loadAppointments('', limit, 0);
  }, []);
  const loadBookingHistory = async (appointmentId) => {
    const response = await apiGetBookingHistory(appointmentId);

    if (response.success) {
      const { appointment } = response;

      setBookingHistory(appointment);
    }
  };

  const loadAppointments = async (status, limit, page, search) => {
    const response = await apiGetAllAppointmentOfCenter({
      status,
      limit,
      page,
      search,
    });

    if (response.success) {
      const { appointments, totalPage } = response;
      setTotalPage(totalPage);
      setAppointments(appointments.rows);
    }
  };

  const handleChangeStatus = (status) => {
    if (status == 'Tất cả') status = '';
    setStatusValue(status);
    setPage(1);
    loadAppointments(status, limit, 0, search);
  };

  const handleCancelAppointment = async (appointmentId, status) => {
    Swal.fire({
      title: '',
      text: 'Bạn chắc chắn hủy lịch hẹn này',
      icon: '',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Thoát!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiCancelAppointment(appointmentId);
        if (response.success) {
          toast.success(response.message);
          loadAppointments(status, limit, 0, search);
        } else toast.error(response.message);
      }
    });
  };

  const handleConfirm = async (appointmentId, status) => {
    Swal.fire({
      title: '',
      text: 'Đổi trạng thái lịch hẹn này',
      icon: '',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Thoát!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiUpdateStatus(appointmentId);

        if (response.success) {
          toast.success(response.message);
          setIsOpenModelDetail(false);
          loadAppointments(status, limit, 0, search);
          console.log(bookingHistory);
          const subject =
            bookingHistory.status == 'chưa xác nhận'
              ? 'đã được xác nhận'
              : 'đã hoàn thành';

          const data = {
            email: 'tienco201@gmail.com',
            subject: `Lịch hẹn ${subject}`,
            message: `
            <h3>Xin chào ${bookingHistory?.User?.fullname}.</h3>
            <b>Lịch hẹn của bạn ${subject} trên hệ thống DKSMART</b>
            <p>Thông tin lịch hẹn:</p>
            <p>Địa điểm: <b>${bookingHistory?.Center?.name}</b></p>
            <p>Địa chỉ: ${bookingHistory?.Center?.address}</p>
            <p>Phương tiện: <b>${bookingHistory?.Vehicle?.licensePlate}</b></p>
            <p>Ngày hẹn: <b>${formatDate(
              bookingHistory.appointmentDate
            )}</b></p>
            <p>Giờ hẹn: <b>${formatTime(
              bookingHistory?.ShiftDetail?.startTime
            )} - ${formatTime(bookingHistory?.ShiftDetail?.endTime)}</b></p>
            <b>Lưu ý:</b><br/>
            <i>- Vui lòng mang xe đến trước lịch hẹn 15 phút.<br/>
            - Tuân thủ theo sự sắp xếp của nhân viên trung tâm để tránh gây ùn tắc. <br/>
            - Mang đầy đủ các loại giấy tờ cho đăng kiểm.</i> <br/>
            <i>Xin chân thành cảm ơn!</i>
        `,
          };
          const res = await apiGetSendMail(data);
          console.log('res: ', res);
        } else toast.error(response.message);
      }
    });
  };

  const handleSearch = (data) => {
    setSearch(data.appointmentDate);
    loadAppointments(statusValue, limit, 0, data.appointmentDate);
  };

  return (
    <Card className="h-full w-full">
      <div className="rounded-none p-4 ">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Danh sách lịch hẹn
            </Typography>
          </div>
        </div>
        <form>
          <div className="md:flex items-center justify-between   space-y-[10px] md:space-y-0 ">
            {/* tìm kiếm */}

            <InputForm
              type="date"
              register={register}
              id="appointmentDate"
              placeholder="Chọn ngày làm việc"
              containerClassName="md:w-1/3"
              inputClassName="pl-[50px]"
              validate={{}}
              errors={errors}
            />
            <div className="absolute">
              <ButtonDefault
                disable={false}
                className="px-3 flex items-center"
                onClick={handleSubmit(handleSearch)}
                variant="text"
              >
                <IoMdSearch className="text-xl" />
              </ButtonDefault>
            </div>

            <ButtonDefault
              disable={false}
              className="px-4 py-3 flex items-center"
              onClick={() => {
                setSearch('');
                loadAppointments(statusValue, limit, 0, '');
                setValue('appointmentDate', '');
                setPage(1);
              }}
              variant="outlined"
            >
              Làm mới
            </ButtonDefault>
          </div>
        </form>
      </div>
      <nav className="flex justify-between mt-6">
        {/* menu */}
        {nav.map((item) => (
          <NavLink
            key={item.id}
            to={item.link}
            onClick={() => handleChangeStatus(item.name)}
            className={`text-${
              location.search.includes(`status=${item.value}`)
                ? 'main bg-gray-200'
                : 'black'
            } hover:bg-gray-200 transition-all rounded-sm py-3 w-full text-center`}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="p-0  overflow-scroll relative">
        <table className=" w-full min-w-max table-auto text-left">
          <thead className="sticky top-0 bg-black transition-all delay-500 z-10">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-y border-blue-gray-100  p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-white leading-none opacity-90"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          {appointments.length > 0 && (
            <tbody>
              {appointments.map((item, index) => {
                const classes = 'p-4 border-b border-blue-gray-50';

                return (
                  <tr key={item.id}>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {(index + 1) * limit * page}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Typography
                          variant="small"
                          color=""
                          className="font-normal text-black flex flex-col"
                        >
                          <span className="font-medium">
                            {item?.User?.fullname}
                          </span>
                          <span className="opacity-70 ">
                            {item?.User?.phone}
                          </span>
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <div
                          className={clsx(
                            'uppercase text-center border-2 font-bold text-base px-4 py-2 rounded-md',
                            item?.Vehicle?.plateColor === 'Trắng' && 'bg-white',
                            item?.Vehicle?.plateColor === 'Vàng' &&
                              'bg-yellow-700',
                            item?.Vehicle?.plateColor === 'Xanh' &&
                              'bg-blue-700'
                          )}
                        >
                          {item?.Vehicle?.licensePlate}
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        {item?.ShiftDetail && (
                          <span className="">
                            {formatTime(item?.ShiftDetail?.startTime)}
                            {' - '}
                            {formatTime(item?.ShiftDetail?.endTime)}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <span className="">
                          {formatDate(item.appointmentDate)}
                        </span>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={item.status}
                          color={
                            item.status == 'đã hùy'
                              ? 'red'
                              : status == 'Ngưng nhận lịch'
                              ? 'amber'
                              : 'green'
                          }
                        />
                      </div>
                    </td>

                    <td className={classes}>
                      <div className="flex space-x-2">
                        <ButtonDefault
                          size="sm"
                          className="bg-green-800 w-[70%]"
                          onClick={() => {
                            setIsOpenModelDetail(true);

                            loadBookingHistory(item.appointmentId);
                          }}
                        >
                          {item.status === 'chưa xác nhận' && 'Xác nhận'}
                          {item.status === 'đã xác nhận' && 'Hoàn thành'}
                          {item.status === 'đã hoàn thành' && 'Chi tiết'}
                          {item.status === 'đã hủy' && 'Chi tiết'}
                        </ButtonDefault>

                        <Tooltip content="Hủy lịch hẹn">
                          <IconButton
                            variant="text"
                            disabled={
                              item.status === 'đã hoàn thành'
                                ? true
                                : item.status === 'đã hủy'
                                ? true
                                : false
                            }
                            onClick={() =>
                              handleCancelAppointment(
                                item.appointmentId,
                                item.status
                              )
                            }
                          >
                            <AiFillDelete className="text-xl" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        {appointments.length == 0 && (
          <div className="flex items-center justify-center my-5">
            <div className="  flex items-center space-x-4  text-white px-10 py-7 bg-gray-400 rounded-md">
              <AiOutlineFileText className="text-[70px]" />
              <span className="text-lg">Không có dữ liệu!</span>
            </div>
          </div>
        )}
        {/* content */}
        <ModalContent
          title="Chi tiết lịch hẹn"
          isOpen={isOpenModelDetail}
          onClose={() => setIsOpenModelDetail(false)}
        >
          <div className="">
            {bookingHistory && (
              <div className="mt-6 rounded-md  px-6">
                <div className="py-2 bg-main  text-white text-lg font-semibold text-center rounded-t">
                  Thông tin lịch hẹn
                </div>
                <div className="space-y-8 border bg-gray-50 p-6">
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
                      {bookingHistory?.Vehicle && (
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
                      )}
                    </div>
                    <div className="">
                      Loại phương tiện:{' '}
                      <span className="text-main">
                        {bookingHistory?.Vehicle?.vehicleType}
                      </span>
                    </div>
                  </div>
                  <div className="flex  justify-between">
                    <div className="flex w-1/2 gap-x-2">
                      Nhãn hiệu:{' '}
                      <span className="text-main">
                        {bookingHistory?.Vehicle?.brand}
                      </span>
                    </div>
                    <div className="">
                      Ngày hết hạn:{' '}
                      <span className="text-main">
                        {bookingHistory?.Vehicle?.expiryDate &&
                          formatDate(bookingHistory?.Vehicle?.expiryDate)}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="">
                      <span>Giấy đăng kiểm:</span>
                      <div className="w-[200px] mt-3">
                        <span className="relative">
                          {/* Giấy đăng kiểm */}
                          <img
                            src={bookingHistory?.Vehicle?.registrationPaper}
                            alt=""
                            className="vehicle-image transition-all rounded-md"
                          />
                          <div
                            className="group absolute inset-0 flex items-center justify-center bg-black bg-opacity-0  hover:bg-opacity-50 transition-all cursor-pointer "
                            onClick={() => {
                              setIsOpenImage(true);
                            }}
                          >
                            <FaRegEye
                              size={40}
                              className="text-main-gray opacity-0 group-hover:opacity-100"
                            />
                          </div>
                        </span>
                        <Modal
                          isOpen={isOpenImage}
                          onClose={() => setIsOpenImage(false)}
                          img={bookingHistory?.Vehicle?.registrationPaper}
                        />
                      </div>
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
                  {bookingHistory.note && (
                    <div>
                      Ghi chú:{' '}
                      <span className="text-black">{bookingHistory.note}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div>
                      Trạng thái:{' '}
                      <span className="text-main">{bookingHistory.status}</span>
                    </div>
                    {bookingHistory.status !== 'đã hoàn thành' &&
                      bookingHistory.status !== 'đã hủy' && (
                        <ButtonDefault
                          className="bg-green-700"
                          size="sm"
                          onClick={() =>
                            handleConfirm(
                              bookingHistory.appointmentId,
                              bookingHistory.status
                            )
                          }
                        >
                          {bookingHistory.status === 'chưa xác nhận' &&
                            'Xác nhận'}
                          {bookingHistory.status === 'đã xác nhận' &&
                            'Hoàn thành'}
                        </ButtonDefault>
                      )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </ModalContent>
      </div>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {page} / {totalPage}
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="sm"
            disabled={page <= 1}
            onClick={() => {
              const x = page - 2;
              // loadShifts(date, 6, x - 1);
              loadAppointments(statusValue, limit, x, search);
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
              loadAppointments(statusValue, limit, page, search);
              setPage(page + 1);
            }}
          >
            Tiếp
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
