import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { InputForm } from '~/components';
import ButtonDefault from '~/components/commons/ButtonDefault';
import { useUserStore } from '~/store/useUserStore';
import { apiUpdateUser } from '~/apis/user';

// eslint-disable-next-line react/prop-types
const ProfileUser = () => {
  const [loading, setLoading] = useState(false);
  const { current } = useUserStore();
  console.log(current);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    setValue('name', current.fullname);
    setValue('address', current.address);
    setValue('phone', current.phone);
    setValue('email', current.email);
  };

  const handleUpdateUser = async (data) => {
    const payload = {
      fullname: data.name,
      email: data.email,
      address: data.address,
      roleId: 1,
    };

    setLoading(true);
    const response = await apiUpdateUser(current.userId, payload);
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
          //
        }
      });
    } else toast.error(response.message);
  };

  return (
    <div className=" mx-auto md:h-auto">
      <h1 className="text-2xl mb-5  font-bold">Thông tin tài khoản</h1>
      <div className="w-full h-full bg-white rounded-lg md:shadow  md:mt-0 ">
        <form className="p-6  sm:p-8">
          <div className="space-y-8 ">
            <InputForm
              label="Số điện thoại"
              register={register}
              readOnly
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
              validate={{}}
            />

            <ButtonDefault
              disable={loading}
              className="bg-main"
              onClick={handleSubmit(handleUpdateUser)}
            >
              Cập nhật tài khoản
            </ButtonDefault>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUser;
