import { PublicLayout } from '../public';
import { useEffect, useState } from 'react';

import { useUserStore } from '~/store/useUserStore';
import ButtonDefault from '~/components/commons/ButtonDefault';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { InputForm } from '~/components';
import { useForm } from 'react-hook-form';
import { IoArrowBackSharp } from 'react-icons/io5';

import {
  Radio,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from '@material-tailwind/react';
import clsx from 'clsx';
import InputFile from '~/components/inputs/InputFile';
import { apiGetVehicleById, apiUpdateVehicle } from '~/apis/vehicle';
import { Link, useParams } from 'react-router-dom';

const plateColors = [
  {
    name: 'Trắng',
    id: 'plate-white',
    classColor: 'bg-white',
    value: 1,
  },
  {
    name: 'Vàng',
    id: 'plate-yellow',
    classColor: 'bg-yellow-700',
    value: 2,
  },
  {
    name: 'Xanh',
    id: 'plate-blue',
    classColor: 'bg-blue-700',
    value: 3,
  },
];
//eslint-disable-next-line react/prop-types
const UpdateVehicle = ({ navigate }) => {
  // const [vehicles, setVehicles] = useState([]);
  const [colorValue, setColorValue] = useState(1);
  const [colorList, setColorList] = useState(plateColors);
  const [loading, setLoading] = useState(false);
  const [path, setPath] = useState('');
  const { vehicleId } = useParams();

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
    getVehicle(vehicleId);
  }, []);

  const getVehicle = async (vehicleId) => {
    const response = await apiGetVehicleById(vehicleId);

    if (response.success) {
      const { vehicle } = response;
      // console.log(vehicle);
      setValue('licensePlate', vehicle.licensePlate);
      setValue('brand', vehicle.brand);

      setColorValue(() => {
        return vehicle.plateColor == 'Trắng'
          ? 1
          : vehicle.plateColor == 'Vàng'
          ? 2
          : 3;
      });
      setValue('modelNumber', vehicle.modelNumber);
      setValue('expiryDate', vehicle.expiryDate.split('T')[0]);
      const updatedColorList = colorList.map((color) => {
        return {
          ...color,
          defaultChecked: color.name === vehicle.plateColor ? true : false,
        };
      });
      setPath(vehicle.registrationPaper);
      setColorList(updatedColorList);
      setValue('vehicleType', vehicle.vehicleType);
    }
  };

  const handleRadioChange = (e) => {
    console.log(e.target.value);
    setColorValue(e.target.value);
  };

  const handleUpdateVehicle = async (data) => {
    const payload = {
      plateColor: colorValue,
      vehicleType: data.vehicleType,
      brand: data.brand,
      modelNumber: data.modelNumber,
      expiryDate: data.expiryDate,
      registrationPaper: data.images?.length > 0 ? data.images[0] : '',
    };
    console.log(payload);

    setLoading(true);
    const response = await apiUpdateVehicle(vehicleId, payload);
    setLoading(false);

    if (response.success) {
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: response.message,
        showConfirmButton: true,
        confirmButtonText: 'Thoát',
      }).then(() => {});
    } else {
      console.log('lỗi');
      toast.error(response.message);
    }
  };

  return (
    <>
      <PublicLayout>
        <div className="min-h-screen md:max-w-[1200px] mx-auto">
          <div className="mt-[50px] md:w-2/3 mx-auto rounded-md bg-white py-[25px] px-[20px]">
            <div className="">
              <Link to="/vehicles">
                <span className="absolute cursor-pointer">
                  <IoArrowBackSharp size={22} className="text-main  " />
                </span>
              </Link>

              <h2 className="font-semibold uppercase text-center text-main">
                Chỉnh sửa phương tiện
              </h2>
            </div>
            <div className="mt-[50px] space-y-8">
              <InputForm
                label="*Biển số xe:"
                register={register}
                id="licensePlate"
                placeholder="Nhập biển số xe"
                containerClassName=""
                readOnly
                validate={{
                  required: 'Biển số xe không được bỏ trống.',
                }}
                errors={errors}
              />
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  *Màu biển xe:
                </label>
                <List className=" flex-col md:flex-row">
                  {colorList?.map((item) => (
                    <ListItem key={item.value} className="p-0">
                      <label
                        htmlFor={item.id}
                        className="flex  w-full cursor-pointer items-center px-3 py-2"
                      >
                        <ListItemPrefix className="mr-3">
                          <Radio
                            name="plateColor"
                            id={item.id}
                            color="blue"
                            value={item.value}
                            ripple={false}
                            className="hover:before:opacity-0"
                            defaultChecked={item.defaultChecked}
                            onChange={handleRadioChange}
                            containerProps={{
                              className: 'p-0',
                            }}
                          />
                        </ListItemPrefix>
                        <Typography
                          color="blue-gray"
                          className={clsx(
                            'font-medium  border-2 rounded-md w-full text-center py-2',
                            item.classColor
                          )}
                        >
                          {item.name}
                        </Typography>
                      </label>
                    </ListItem>
                  ))}
                </List>
              </div>
              <div className="md:flex block space-y-[10px] md:space-y-0 md:space-x-6  justify-between">
                <InputForm
                  label="*Loại phương tiện:"
                  register={register}
                  id="vehicleType"
                  placeholder="Nhập loại phương tiện"
                  containerClassName="md:w-1/2"
                  validate={{
                    required: 'Loại phương tiện không được bỏ trống.',
                  }}
                  errors={errors}
                />
                <InputForm
                  label="Nhãn hiệu:"
                  type="text"
                  register={register}
                  containerClassName="md:w-1/2"
                  id="brand"
                  placeholder="Nhập nhãn hiệu"
                  validate={
                    {
                      // required: 'Địa chỉ không được bỏ trống.',
                    }
                  }
                  errors={errors}
                />
              </div>
              <div className="md:flex block space-y-[10px] md:space-y-0 md:space-x-6  justify-between">
                <InputForm
                  label="*Ngày hết hạn:"
                  type="date"
                  register={register}
                  containerClassName="md:w-1/2"
                  inputClassName="date-input"
                  id="expiryDate"
                  placeholder="Nhập số loại"
                  validate={{
                    required: 'Ngày hết hạn không được bỏ trống.',
                  }}
                  errors={errors}
                />
                <InputForm
                  label="Số loại:"
                  type="text"
                  register={register}
                  containerClassName="md:w-1/2"
                  id="modelNumber"
                  placeholder="Nhập số loại"
                  validate={
                    {
                      // required: 'Địa chỉ không được bỏ trống.',
                    }
                  }
                  errors={errors}
                />
              </div>

              <div className=""></div>
              <InputFile
                label="Giấy đăng kiểm:"
                id="registrationPaper"
                containerClassName="w-full"
                getImages={(images) => setValue('images', images)}
                path={path}
              />
              <ButtonDefault
                disable={loading}
                className="bg-main w-full"
                onClick={handleSubmit(handleUpdateVehicle)}
              >
                Chỉnh sửa
              </ButtonDefault>
            </div>
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default UpdateVehicle;
