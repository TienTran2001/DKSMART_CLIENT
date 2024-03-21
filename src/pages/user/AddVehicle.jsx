import { PublicLayout } from '../public';
import { useEffect, useState } from 'react';

import { useUserStore } from '~/store/useUserStore';
import ButtonDefault from '~/components/commons/ButtonDefault';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { InputForm } from '~/components';
import { useForm } from 'react-hook-form';
import {
  Radio,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from '@material-tailwind/react';
import clsx from 'clsx';
import InputFile from '~/components/inputs/InputFile';
import { apiAddVehicle } from '~/apis/vehicle';
import { Link } from 'react-router-dom';
import { IoArrowBackSharp } from 'react-icons/io5';

const plateColors = [
  {
    name: 'Trắng',
    id: 'plate-white',
    classColor: 'bg-white',
    value: 1,
    defaultChecked: true,
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
// eslint-disable-next-line react/prop-types
const AddVehicle = ({ navigate }) => {
  // const [vehicles, setVehicles] = useState([]);
  const [colorValue, setColorValue] = useState(1);
  const [loading, setLoading] = useState(false);

  // const [provinces, setProvinces] = useState([]);

  console.log(colorValue);
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

  useEffect(() => {}, []);

  const handleRadioChange = (e) => {
    setColorValue(e.target.value);
  };

  const handleAddVehicle = async (data) => {
    console.log(data);
    const payload = {
      licensePlate: data.licensePlate,
      plateColor: colorValue,
      vehicleType: data.vehicleType,
      brand: data.brand,
      modelNumber: data.modelNumber,
      expiryDate: data.expiryDate,
      registrationPaper: data.images ? data.images[0] : '',
    };
    console.log(payload);
    setLoading(true);
    const response = await apiAddVehicle(payload);
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
          navigate('/vehicles');
        }
      });
    } else {
      console.log('lỗi');
      toast.error(response.message);
    }
  };

  return (
    <>
      <PublicLayout>
        <div className="min-h-screen max-w-[1200px] mx-auto">
          <div className="mt-[50px] w-2/3 mx-auto rounded-md bg-white py-[25px] px-[20px]">
            <Link to="/vehicles">
              <span className="absolute cursor-pointer">
                <IoArrowBackSharp size={22} className="text-main  " />
              </span>
            </Link>
            <h2 className="font-semibold uppercase text-center text-main">
              Đăng ký phương tiện
            </h2>
            <div className="mt-[50px] space-y-8">
              <InputForm
                label="*Biển số xe:"
                register={register}
                id="licensePlate"
                placeholder="Nhập biển số xe"
                containerClassName=""
                validate={{
                  required: 'Biển số xe không được bỏ trống.',
                }}
                errors={errors}
              />
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  *Màu biển xe:
                </label>
                <List className="flex-row">
                  {plateColors.map((item) => (
                    <ListItem key={item.value} className="p-0">
                      <label
                        htmlFor={item.id}
                        className="flex w-full cursor-pointer items-center px-3 py-2"
                      >
                        <ListItemPrefix className="mr-3">
                          <Radio
                            name="plateColor"
                            id={item.id}
                            color="blue"
                            value={item.value}
                            ripple={false}
                            className="hover:before:opacity-0"
                            defaultChecked={item?.defaultChecked}
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
              />
              <ButtonDefault
                disable={loading}
                className="bg-main w-full"
                onClick={handleSubmit(handleAddVehicle)}
              >
                Đăng ký
              </ButtonDefault>
            </div>
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default AddVehicle;
