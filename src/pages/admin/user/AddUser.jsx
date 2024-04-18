import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { InputForm } from '~/components';
import ButtonDefault from '~/components/commons/ButtonDefault';
import { Select as SelectM, Option } from '@material-tailwind/react';
import { apiAddUser } from '~/apis/user';
import Select from 'react-tailwindcss-select';
import { apiGetCenters } from '~/apis/center';
import { apiGetSendMail } from '~/apis/booking';

// eslint-disable-next-line react/prop-types
const AddUser = () => {
  const [loading, setLoading] = useState(false);
  const [center, setCenter] = useState(null);
  const [centers, setCenters] = useState([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
    watch,
  } = useForm();
  const passwordValue = watch('password');
  const roleId = watch('roleId');

  useEffect(() => {
    loadCenter();
  }, []);
  const loadCenter = async () => {
    const response = await apiGetCenters();

    if (response.success) {
      const transformedData = response.centers.map((item) => ({
        value: item.centerId,
        label: item.name,
      }));
      setCenters(transformedData);
    } else toast.error(response.message);
  };

  const handleAddUser = async (data) => {
    const payload = {
      fullname: data.name,
      phone: data.phone,
      email: data.email,
      password: data.password,
      address: data.address,
      roleId: data.roleId || '3',
      centerId: data.roleId == 3 || data.roleId == 4 ? center.value : null,
    };
    console.log(payload);

    setLoading(true);
    const response = await apiAddUser(payload);
    setLoading(false);

    if (response.success) {
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: response.message,
        showConfirmButton: true,
        confirmButtonText: 'Thoát',
      }).then(async (isConfirm) => {
        if (isConfirm) {
          reset();
          if (data.roleId == 3) {
            const dataSend = {
              email: `${data.email}`,
              subject: 'DKSMART cấp tài khoản quản trị trung tâm đăng kiểm',
              message: `
            <h3>Xin chào cảm ơn bạn đã hợp tác với hệ thống của chúng tôi.</h3>
            <b>Tài khoản trên hệ thống DKSMART:</b>
            <p>Số điện thoại: <b>${data.phone}</b></p>
            <p>Mật khẩu: <b>${data.password}</b> </p>
            <p><i>Xin chân thành cảm ơn!</i></p>
        `,
            };
            await apiGetSendMail(dataSend);
          }
        }
      });
    } else toast.error(response.message);
  };
  const handleSetValueRole = (val) => {
    console.log(val);
    val ? setValue('roleId', val) : setValue('roleId', 3);
  };

  const handleChange = (value) => {
    setCenter(value);
    setValue('centerId', center.value);
  };

  return (
    <div className=" mx-auto md:h-auto">
      <h1 className="text-2xl mb-5  font-bold">Tạo tài khoản</h1>
      <div className="w-full h-full bg-white rounded-lg md:shadow  md:mt-0 ">
        <form className="p-6  sm:p-8">
          <div className="space-y-8 ">
            <div className="md:flex block space-y-[10px] md:space-y-0 md:space-x-6  justify-between">
              <InputForm
                label="Số điện thoại"
                register={register}
                id="phone"
                placeholder="0383911193"
                containerClassName="md:w-1/2"
                validate={{
                  required: 'Số điện thoại không được bỏ trống.',
                  pattern: {
                    value: /(0[3|5|7|8|9])+([0-9]{8}\b)/,
                    message: 'Số điện thoại không hợp lệ',
                  },
                }}
                errors={errors}
              />
              <InputForm
                label="Họ Tên"
                register={register}
                id="name"
                placeholder="Trần Văn A"
                containerClassName="md:w-1/2"
                validate={{
                  required: 'Họ tên không được bỏ trống.',
                }}
                errors={errors}
              />
            </div>
            <div className="md:flex block space-y-[10px] md:space-y-0 md:space-x-6  justify-between">
              <InputForm
                label="Email"
                type="email"
                register={register}
                containerClassName="md:w-1/2"
                id="email"
                placeholder="example@gmail.com"
                validate={{
                  required: 'Email không được bỏ trống.',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Email không hợp lệ',
                  },
                }}
                errors={errors}
              />
              <InputForm
                label="Địa chỉ"
                type="text"
                register={register}
                containerClassName="md:w-1/2"
                id="address"
                placeholder="Địa chỉ"
              />
            </div>
            <div className="md:flex block space-y-[10px] md:space-y-0 md:space-x-6  justify-between">
              <InputForm
                label="Mật khẩu"
                type="password"
                register={register}
                containerClassName="md:w-1/2"
                id="password"
                placeholder="••••••••"
                validate={{
                  required: 'Mật khẩu không được bỏ trống.',
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                    message: 'Mật khẩu tối thiểu 6 ký tự gồm sô và chữ',
                  },
                }}
                errors={errors}
              />
              <InputForm
                label="Nhập lại mật khẩu"
                type="password"
                register={register}
                containerClassName="md:w-1/2"
                id="re-password"
                placeholder="••••••••"
                validate={{
                  required: 'Mật khẩu không được bỏ trống.',
                  validate: (value) =>
                    value === passwordValue || 'Mật khẩu nhập lại không khớp.',
                }}
                errors={errors}
              />
            </div>

            <div className="w-full">
              {/* <label
                htmlFor=""
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Chọn quyền
              </label> */}
              <SelectM
                label="Chọn quyền"
                value="2"
                onChange={(val) => handleSetValueRole(val)}
                color="blue"
                close
              >
                <Option value="1">Quản trị hệ thống</Option>
                <Option value="2">Người dùng</Option>
                <Option value="3">Quản trị trung tâm đăng kiểm</Option>
                <Option value="4">Nhân viên trung tâm</Option>
              </SelectM>
            </div>
            {(roleId == 3 || roleId == 4) && (
              <Select
                placeholder="Chọn trung tâm đăng kiểm"
                searchInputPlaceholder="Tìm kiếm..."
                noOptionsMessage="Không có kết quả phù hợp"
                classNames={{
                  menuButton: ({ isDisabled }) =>
                    `flex text-sm text-gray-600 border border-gray-300  rounded-lg shadow-sm transition-all duration-300  focus:border-main  ${
                      isDisabled
                        ? 'bg-gray-200'
                        : 'bg-white hover:border-gray-400 focus:border-main '
                    }`,
                }}
                isSearchable
                value={center}
                onChange={handleChange}
                options={centers}
              />
            )}

            <ButtonDefault
              disable={loading}
              className="bg-main"
              onClick={handleSubmit(handleAddUser)}
            >
              Tạo tài khoản
            </ButtonDefault>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
