import { PublicLayout } from '../public';
import { useEffect, useState } from 'react';

import { useUserStore } from '~/store/useUserStore';
import ButtonDefault from '~/components/commons/ButtonDefault';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { InputForm } from '~/components';
import { useForm } from 'react-hook-form';

import clsx from 'clsx';
import { apiGetVehicleById, apiGetVehicles } from '~/apis/vehicle';
import { IoArrowBackSharp } from 'react-icons/io5';

import { apiGetAllProvince } from '~/apis/provinces';
import { apiGetCenterById, apiGetCentersOfProvince } from '~/apis/center';
import ModalContent from '~/components/commons/ModalContent';
import { formatDate, formatTime } from '~/utils/contants';
import { apiAddBooking, apiGetSendMail } from '~/apis/booking';
import { Chip } from '@material-tailwind/react';
import { AiOutlineFileText } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import {
  apiGetAllWorkDaysAfterOrEqualToTodayAsync,
  apiGetWorkDayById,
} from '~/apis/workDay';

// eslint-disable-next-line react/prop-types
const Booking = ({ navigate }) => {
  const [vehicles, setVehicles] = useState([]);

  const [plateColor, setPlateColor] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [isChooseVehicle, setIsChooseVehicle] = useState(false);
  const [isChooseProvince, setIsChooseProvince] = useState(false);
  const [isChooseCenter, setIsChooseCenter] = useState(false);
  const [isChooseShift, setIsChooseShift] = useState(false);

  const [provinces, setProvinces] = useState([]);
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(false);

  const [workDays, setWorkDays] = useState([]);
  const [shiftDetails, setShiftDetails] = useState([]);
  const [isOpenModelVehicle, setIsOpenModelVehicle] = useState(false);
  const [isOpenModelProvince, setIsOpenModelProvince] = useState(false);
  const [isOpenModelCenter, setIsOpenModelCenter] = useState(false);
  const [isOpenModelWorkDay, setIsOpenModelWorkDay] = useState(false);
  const [isOpenModelShiftDetail, setIsOpenModelShiftDetail] = useState(false);

  const [valuePayload, setValuePayload] = useState({});
  // console.log(valuePayload);
  const centerId = new URLSearchParams(location.search).get('center');

  const { current } = useUserStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  if (!current) {
    navigate('/login');
  }

  useEffect(() => {
    loadCenter(centerId);
    loadVehicles();
    loadProvinces();
  }, []);

  const loadCenter = async (centerId) => {
    const response = await apiGetCenterById(centerId);
    if (response.success) {
      const { center } = response;
      setValue('center', center.name);
      setValuePayload((prev) => {
        return {
          ...prev,
          centerId: centerId,
        };
      });
      setValue('province', center?.Province?.name);
      setIsChooseProvince(true);
      setIsChooseCenter(true);
      handleChangeProvince(center.provinceId);
      handleChangeCenter(centerId);
    }
  };

  const loadVehicles = async (search) => {
    const res = await apiGetVehicles(search);
    if (res.success) {
      const { vehicles } = res;
      setVehicles(vehicles);
    }
  };
  const loadProvinces = async () => {
    const response = await apiGetAllProvince();

    if (response.success) {
      const { provinces } = response;

      setProvinces(provinces);
    } else toast.error(response.message);
  };

  const handleChangeVehicle = async (value) => {
    if (value) {
      const response = await apiGetVehicleById(value);

      if (response.success) {
        const { vehicle } = response;

        setValue('vehicleType', vehicle.vehicleType);
        setValue('expiryDate', vehicle.expiryDate);
        setPlateColor(vehicle.plateColor);
        setLicensePlate(vehicle.licensePlate);
        setIsChooseVehicle(true);
      }
    }
  };

  const handleChangeProvince = async (value) => {
    if (value) {
      const response = await apiGetCentersOfProvince(value);

      if (response.success) {
        const { centers } = response;

        setCenters(centers);
        setIsChooseProvince(true);
      }
    }
  };
  const handleChangeCenter = async (value) => {
    if (value) {
      const response = await apiGetAllWorkDaysAfterOrEqualToTodayAsync(value);

      if (response.success) {
        const { workDays } = response;
        console.log(workDays);
        setWorkDays(workDays);
        setIsChooseCenter(true);
      }
    }
  };

  const handleChangeWorkDay = async (value) => {
    if (value) {
      const response = await apiGetWorkDayById(value);

      if (response.success) {
        const { workDay } = response;
        console.log(workDay.WorkDayShifts);
        setShiftDetails(workDay.WorkDayShifts);
        setIsChooseShift(true);
      }
    }
  };

  const handleBooking = async (data) => {
    const payload = {
      ...valuePayload,
      note: data.note,
      appointmentDate: data.shift,
    };

    setLoading(true);
    const response = await apiAddBooking(payload);

    setLoading(false);
    if (response.success) {
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: response.message,
        showConfirmButton: true,
        confirmButtonText: 'Thoát',
      }).then((isConfirm) => {
        if (isConfirm) {
          navigate('/booking-history?status=all');
        }
      });
      const { appointment } = response;

      const data = {
        email: `${appointment?.User?.email}`,
        subject: `Lịch hẹn đã được đặt cho phương tiện ${appointment?.Vehicle?.licensePlate}`,
        message: `
            <h3>Xin chào ${appointment?.User?.fullname}.</h3>
            <b>Lịch hẹn của bạn đã được đặt trên hệ thống DKSMART</b>
            <p>
              <b>Lịch hẹn chờ xác nhận</b>
            </p>
            <p>Thông tin lịch hẹn:</p>
            <p>Địa điểm: <b>${appointment?.Center?.name}</b></p>
            <p>Địa chỉ: ${appointment?.Center?.address}</p>
            <p>Phương tiện: <b>${appointment?.Vehicle?.licensePlate}</b></p>
            <p>Ngày hẹn: <b>${formatDate(appointment.appointmentDate)}</b></p>
            <p>Giờ hẹn: <b>${formatTime(
              appointment?.WorkDayShift?.Shift?.startTime
            )} - ${formatTime(
          appointment?.WorkDayShift?.Shift?.endTime
        )}</b></p>
           
            <p><i>Xin chân thành cảm ơn!</i></p>
        `,
      };

      const res = await apiGetSendMail(data);
      console.log(res);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <PublicLayout>
        <div className="min-h-screen max-w-[1200px] mx-auto">
          <div className="mt-[50px] w-full md:w-2/3 mx-auto rounded-md bg-white py-[25px] px-[20px] ">
            <div className="relative">
              <button onClick={() => navigate(-1)}>
                <span className="absolute top-[25px] cursor-pointer">
                  <IoArrowBackSharp size={22} className="text-main  " />
                </span>
              </button>
              <h2 className="font-semibold uppercase text-center text-main">
                Đặt lịch hẹn đăng kiểm
              </h2>
            </div>
            <div className="mt-[50px] space-y-8">
              <div className="">
                {/* model phương tiện */}
                <ModalContent
                  title="Danh sách phương tiện"
                  isOpen={isOpenModelVehicle}
                  onClose={() => setIsOpenModelVehicle(false)}
                >
                  <div className="">
                    {vehicles?.length == 0 && (
                      <Link to="/vehicles">
                        <div className="flex cursor-pointer items-center justify-center my-5">
                          <div className="  flex items-center space-x-4  text-white px-10 py-7 bg-gray-400 rounded-md">
                            <AiOutlineFileText className="text-[70px]" />
                            <div className="text-lg">
                              <span className="">Không có dữ liệu!</span>
                              <div className="mt-2">
                                Ấn vào đây để thêm phương tiện
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}
                    <ul>
                      {vehicles.map((vehicle) => (
                        <>
                          <li
                            className="text-center py-2 border-b cursor-pointer hover:bg-gray-100 
                            transition-all"
                            key={vehicle.vehicleId}
                            onClick={() => {
                              setValue('vehicle', vehicle.licensePlate);
                              setIsOpenModelVehicle(false);
                              handleChangeVehicle(vehicle.vehicleId);
                              setIsChooseVehicle(true);
                              setValuePayload((prev) => {
                                return {
                                  ...prev,
                                  vehicleId: vehicle.vehicleId,
                                };
                              });
                            }}
                          >
                            {vehicle.licensePlate}
                          </li>
                        </>
                      ))}
                    </ul>
                  </div>
                </ModalContent>
                <InputForm
                  label="*Chọn phương tiện kiểm định"
                  readOnly
                  type="text"
                  register={register}
                  containerClassName=""
                  id="vehicle"
                  placeholder="Vui lòng chọn xe"
                  onClick={() => setIsOpenModelVehicle(true)}
                  validate={{
                    required: 'Phương tiện không được bỏ trống.',
                  }}
                  errors={errors}
                />
              </div>
              {isChooseVehicle && (
                <div className="space-y-6">
                  <div className="w-full">
                    <div className=" text-sm mb-2">Biển số xe:</div>
                    <div
                      className={clsx(
                        'uppercase w-full text-center border-2 font-bold text-xl px-8 py-3 rounded-md',
                        plateColor === 'Trắng' && 'bg-white',
                        plateColor === 'Vàng' && 'bg-yellow-700',
                        plateColor === 'Xanh' && 'bg-blue-700'
                      )}
                    >
                      {licensePlate}
                    </div>
                  </div>
                </div>
              )}

              <InputForm
                label="*Loại phương tiện:"
                readOnly
                register={register}
                id="vehicleType"
                placeholder="Nhập loại phương tiện"
                containerClassName=""
                inputClassName="cursor-not-allowed"
                validate={{
                  required: 'Loại phương tiện không được bỏ trống.',
                }}
                errors={errors}
              />
              <InputForm
                label="*Ngày hết hạn:"
                type="date"
                readOnly
                register={register}
                containerClassName=""
                inputClassName="date-input cursor-not-allowed"
                id="expiryDate"
                placeholder="Nhập số loại"
                validate={{
                  required: 'Ngày hết hạn không được bỏ trống.',
                }}
                errors={errors}
              />
              <div className="">
                {/* model khu vực */}
                <ModalContent
                  title="Khu vực"
                  isOpen={isOpenModelProvince}
                  onClose={() => setIsOpenModelProvince(false)}
                >
                  <div className="">
                    <ul>
                      {provinces.map((province) => (
                        <>
                          <li
                            className="text-center py-2 border-b cursor-pointer hover:bg-gray-100 
                            transition-all"
                            key={province.provinceId}
                            onClick={() => {
                              setValue('province', province.name);
                              setIsOpenModelProvince(false);
                              handleChangeProvince(province.provinceId);
                            }}
                          >
                            {province.name}
                          </li>
                        </>
                      ))}
                    </ul>
                  </div>
                </ModalContent>
                <InputForm
                  label="Chọn khu vực"
                  readOnly
                  type="text"
                  register={register}
                  containerClassName=""
                  id="province"
                  placeholder="Vui lòng chọn khu vực"
                  onClick={() => setIsOpenModelProvince(true)}
                  validate={{}}
                  errors={errors}
                />
              </div>

              <div className="">
                {/* model trạm đăng kiểm */}
                <ModalContent
                  title="Trạm đăng kiểm"
                  isOpen={isOpenModelCenter}
                  onClose={() => setIsOpenModelCenter(false)}
                >
                  <div className="">
                    <ul>
                      {centers.map((center) => (
                        <>
                          <li
                            className={clsx(
                              'text-center py-2 border-b  hover:bg-gray-100 transition-all flex items-center justify-between px-4',
                              center.status == 'ngưng nhận lịch'
                                ? 'cursor-not-allowed'
                                : 'cursor-pointer'
                            )}
                            key={center.centerId}
                            onClick={() => {
                              if (center.status == 'đang nhận lịch') {
                                setValue('center', center.name);
                                setIsOpenModelCenter(false);
                                handleChangeCenter(center.centerId);
                                setValuePayload((prev) => {
                                  return { ...prev, centerId: center.centerId };
                                });
                              }
                            }}
                          >
                            <span className="text-sm md:text:md">
                              {center.name}
                            </span>
                            {center.status == 'ngưng nhận lịch' ? (
                              <Chip
                                size="sm"
                                variant="ghost"
                                value={center.status}
                                color={'red'}
                              />
                            ) : (
                              <Chip
                                size="sm"
                                variant="ghost"
                                value={center.status}
                                color={'green'}
                              />
                            )}
                          </li>
                        </>
                      ))}
                    </ul>
                  </div>
                </ModalContent>
                <InputForm
                  label="*Chọn trạm đăng kiểm"
                  readOnly
                  type="text"
                  register={register}
                  containerClassName=""
                  inputClassName={isChooseProvince ? '' : 'cursor-not-allowed'}
                  id="center"
                  placeholder="Vui lòng chọn trạm đăng kiểm"
                  onClick={() => {
                    if (isChooseProvince) setIsOpenModelCenter(true);
                  }}
                  validate={{
                    required: 'Trạm đăng kiểm không được bỏ trống.',
                  }}
                  errors={errors}
                />
              </div>
              <div className="">
                {/* model ngày hẹn */}
                <ModalContent
                  title="Ngày đăng kiểm"
                  isOpen={isOpenModelWorkDay}
                  onClose={() => setIsOpenModelWorkDay(false)}
                >
                  <div className="">
                    <ul>
                      {workDays.map((workDay) => {
                        const totalQuantity = workDay?.WorkDayShifts?.reduce(
                          (total, detail) =>
                            total + detail?.Appointments?.length,
                          0
                        );
                        const totalMaxQuantity = workDay?.WorkDayShifts?.reduce(
                          (total, detail) => {
                            if (detail.status != 'Ngưng nhận lịch')
                              return total + detail.maxQuantity;
                            return total;
                          },
                          0
                        );
                        return (
                          <>
                            <li
                              className="text-center py-2 border-b cursor-pointer hover:bg-gray-100 
                            transition-all flex items-center justify-between px-[30px]"
                              key={workDay.workDayId}
                              onClick={() => {
                                setValue('shift', workDay.inspectionDate);
                                setIsOpenModelWorkDay(false);
                                handleChangeWorkDay(workDay.workDayId);
                              }}
                            >
                              {formatDate(workDay.inspectionDate)}
                              <span>
                                <span className="text-main">
                                  {totalQuantity}
                                </span>
                                /{totalMaxQuantity}
                              </span>
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  </div>
                </ModalContent>
                <InputForm
                  label="*Ngày hẹn"
                  readOnly
                  type="date"
                  register={register}
                  containerClassName=""
                  inputClassName={isChooseCenter ? '' : 'cursor-not-allowed'}
                  id="shift"
                  placeholder="Vui lòng chọn ngày đăng kiểm"
                  onClick={() => {
                    if (isChooseCenter) setIsOpenModelWorkDay(true);
                  }}
                  validate={{
                    required: 'Ngày đăng kiểm không được bỏ trống.',
                  }}
                  errors={errors}
                />
              </div>
              <div className="">
                {/* model ca hẹn */}
                <ModalContent
                  title="Ca đăng kiểm"
                  isOpen={isOpenModelShiftDetail}
                  onClose={() => setIsOpenModelShiftDetail(false)}
                >
                  <div className="">
                    <ul>
                      {shiftDetails.map((shiftDetail) => (
                        <>
                          <li
                            // className="text-center py-2 border-b cursor-pointer hover:bg-gray-100
                            // transition-all flex items-center justify-between px-4"
                            className={clsx(
                              'text-center py-2 border-b  hover:bg-gray-100 transition-all flex items-center justify-between px-4',
                              shiftDetail?.Appointments?.length ==
                                shiftDetail.maxQuantity ||
                                shiftDetail.status == 'Ngưng nhận lịch'
                                ? 'opacity-95 text-red-700 cursor-not-allowed'
                                : 'cursor-pointer'
                            )}
                            key={shiftDetail.workDayShiftId}
                            onClick={() => {
                              if (
                                shiftDetail?.Appointments?.length ==
                                shiftDetail.maxQuantity
                              ) {
                                return;
                              }
                              setValue(
                                'shiftDetail',
                                `${formatTime(
                                  shiftDetail.Shift.startTime
                                )} đến ${formatTime(shiftDetail.Shift.endTime)}`
                              );
                              setIsOpenModelShiftDetail(false);
                              setValuePayload((prev) => {
                                return {
                                  ...prev,
                                  workDayShiftId: shiftDetail.workDayShiftId,
                                };
                              });
                            }}
                          >
                            <span>
                              {formatTime(shiftDetail.Shift.startTime)} đến{' '}
                              {formatTime(shiftDetail.Shift.endTime)}
                            </span>
                            {shiftDetail.status == 'Đã đầy' ? (
                              <Chip
                                size="sm"
                                variant="ghost"
                                value={shiftDetail.status}
                                color={'red'}
                              />
                            ) : shiftDetail.status == 'Ngưng nhận lịch' ? (
                              <Chip
                                size="sm"
                                variant="ghost"
                                value={shiftDetail.status}
                                color={'red'}
                              />
                            ) : (
                              <span>
                                <span className="text-main">
                                  {shiftDetail?.Appointments?.length}
                                </span>
                                /{shiftDetail.maxQuantity}
                              </span>
                            )}
                          </li>
                        </>
                      ))}
                    </ul>
                  </div>
                </ModalContent>
                <InputForm
                  label="*Ca hẹn"
                  readOnly
                  type="text"
                  register={register}
                  containerClassName=""
                  inputClassName={isChooseShift ? '' : 'cursor-not-allowed'}
                  id="shiftDetail"
                  placeholder="Vui lòng chọn ca hẹn"
                  onClick={() => {
                    if (isChooseShift) setIsOpenModelShiftDetail(true);
                  }}
                  validate={{
                    required: 'Ca đăng kiểm không được bỏ trống.',
                  }}
                  errors={errors}
                />
              </div>
              {/* note */}
              <InputForm
                label="Ghi chú"
                type="text"
                register={register}
                containerClassName=""
                inputClassName=""
                id="note"
                placeholder="Ghi chú"
                validate={{}}
                errors={errors}
              />

              <div className=""></div>
              <ButtonDefault
                disable={loading}
                className="bg-main w-full"
                onClick={handleSubmit(handleBooking)}
              >
                Đặt lịch
              </ButtonDefault>
            </div>
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default Booking;
