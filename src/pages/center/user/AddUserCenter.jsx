import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { InputForm } from '~/components';
import ButtonDefault from '~/components/commons/ButtonDefault';
import { apiAddStaff } from '~/apis/user';
import { useUserStore } from '~/store/useUserStore';

// eslint-disable-next-line react/prop-types
const AddUserCenter = () => {
  const [loading, setLoading] = useState(false);
  const { current } = useUserStore();

  const {
    register,
    formState: { errors },
    handleSubmit,

    reset,
    watch,
  } = useForm();
  const passwordValue = watch('password');

  useEffect(() => {}, []);

  const handleAddUser = async (data) => {
    const payload = {
      fullname: data.name,
      phone: data.phone,
      email: data.email,
      password: data.password,
      address: data.address,
      roleId: 4,
      centerId: current?.centerId,
    };
    console.log(payload);

    setLoading(true);
    const response = await apiAddStaff(payload);
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
          reset();
        }
      });
    } else toast.error(response.message);
  };

  return (
    <div className=" mx-auto md:h-auto">
      <h1 className="text-2xl mb-5  font-bold">Tạo tài khoản nhân viên</h1>
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

export default AddUserCenter;
