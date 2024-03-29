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
import { apiGetCentersOfProvince } from '~/apis/center';
import ModalContent from '~/components/commons/ModalContent';
import {
  apiGetAllShiftsAfterOrEqualToTodayAsync,
  apiGetShiftById,
} from '~/apis/shift';
import { formatDate, formatTime } from '~/utils/contants';
import { apiAddBooking } from '~/apis/booking';
import { Chip } from '@material-tailwind/react';

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

  const [shifts, setShifts] = useState([]);
  const [shiftDetails, setShiftDetails] = useState([]);
  const [isOpenModelVehicle, setIsOpenModelVehicle] = useState(false);
  const [isOpenModelProvince, setIsOpenModelProvince] = useState(false);
  const [isOpenModelCenter, setIsOpenModelCenter] = useState(false);
  const [isOpenModelShift, setIsOpenModelShift] = useState(false);
  const [isOpenModelShiftDetail, setIsOpenModelShiftDetail] = useState(false);

  const [valuePayload, setValuePayload] = useState({});
  // console.log(valuePayload);

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
    loadVehicles();
    loadProvinces();
  }, []);

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
        console.log(centers);
        setCenters(centers);
        setIsChooseProvince(true);
      }
    }
  };
  const handleChangeCenter = async (value) => {
    if (value) {
      const response = await apiGetAllShiftsAfterOrEqualToTodayAsync(value);

      if (response.success) {
        const { shifts } = response;

        setShifts(shifts);
        setIsChooseCenter(true);
      }
    }
  };

  const handleChangeShift = async (value) => {
    if (value) {
      const response = await apiGetShiftById(value);

      if (response.success) {
        const { shift } = response;

        setShiftDetails(shift.ShiftDetails);
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
    console.log(payload);
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
          // navigate('/vehicles');
        }
      });
    } else {
      toast.error(response.message);
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
                    <div className="w-1/6 text-sm mb-2">Biển số xe:</div>
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
                            className="text-center py-2 border-b cursor-pointer hover:bg-gray-100 
                            transition-all"
                            key={center.centerId}
                            onClick={() => {
                              setValue('center', center.name);
                              setIsOpenModelCenter(false);
                              handleChangeCenter(center.centerId);
                              setValuePayload((prev) => {
                                return { ...prev, centerId: center.centerId };
                              });
                            }}
                          >
                            {center.name}
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
                  isOpen={isOpenModelShift}
                  onClose={() => setIsOpenModelShift(false)}
                >
                  <div className="">
                    <ul>
                      {shifts.map((shift) => {
                        const totalQuantity = shift.ShiftDetails.reduce(
                          (total, detail) => total + detail.quantity,
                          0
                        );
                        const totalMaxQuantity = shift.ShiftDetails.reduce(
                          (total, detail) => total + detail.maxQuantity,
                          0
                        );
                        return (
                          <>
                            <li
                              className="text-center py-2 border-b cursor-pointer hover:bg-gray-100 
                            transition-all flex items-center justify-between px-[30px]"
                              key={shift.shiftId}
                              onClick={() => {
                                setValue('shift', shift.registrationDate);
                                setIsOpenModelShift(false);
                                handleChangeShift(shift.shiftId);
                              }}
                            >
                              {formatDate(shift.registrationDate)}
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
                    if (isChooseCenter) setIsOpenModelShift(true);
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
                            className="text-center py-2 border-b cursor-pointer hover:bg-gray-100 
                            transition-all flex items-center justify-between px-4"
                            key={shiftDetail.shiftDetailId}
                            onClick={() => {
                              setValue(
                                'shiftDetail',
                                `${formatTime(
                                  shiftDetail.startTime
                                )} đến ${formatTime(shiftDetail.endTime)}`
                              );
                              setIsOpenModelShiftDetail(false);
                              setValuePayload((prev) => {
                                return {
                                  ...prev,
                                  shiftDetailId: shiftDetail.shiftDetailId,
                                };
                              });
                            }}
                          >
                            <span>
                              {formatTime(shiftDetail.startTime)} đến{' '}
                              {formatTime(shiftDetail.endTime)}
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
                                  {shiftDetail.quantity}
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
