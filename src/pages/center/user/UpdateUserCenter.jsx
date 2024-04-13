import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { InputForm } from '~/components';
import ButtonDefault from '~/components/commons/ButtonDefault';
import { apiGetUserCenterById, apiUpdateUserOfCenter } from '~/apis/user';
import { useParams } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const UpdateUserCenter = () => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({});

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  useEffect(() => {
    getUser(userId);
  }, []);

  const getUser = async (userId) => {
    const response = await apiGetUserCenterById(userId);
    if (response.success) {
      const { currentUser } = response;
      setUser(currentUser);
      setValue('name', currentUser.fullname);
      setValue('email', currentUser.email);
      setValue('address', currentUser.address);
    }
  };

  const handleUpdateUser = async (data) => {
    const payload = {
      fullname: data.name,
      email: data.email,
      address: data.address,
    };

    setLoading(true);
    const response = await apiUpdateUserOfCenter(userId, payload);
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
      <h1 className="text-2xl mb-5  font-bold">Cập nhật tài khoản</h1>
      <div className="w-full h-full bg-white rounded-lg md:shadow  md:mt-0 ">
        <form className="p-6  sm:p-8">
          <div className="space-y-8 ">
            <div className="md:flex  block space-y-[10px] md:space-y-0 md:space-x-6  justify-between">
              <InputForm
                label="Số điện thoại"
                register={register}
                value={user.phone}
                inputClassName="cursor-not-allowed opacity-70"
                readOnly
                id="phone"
                placeholder="0383911193"
                containerClassName="md:w-1/2"
              />
              <InputForm
                label="Họ Tên"
                register={register}
                id="name"
                placeholder="Trần Văn A"
                containerClassName="md:w-1/2"
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
            </div>

            <ButtonDefault
              disable={loading}
              className="bg-main"
              onClick={handleSubmit(handleUpdateUser)}
            >
              Cập nhật
            </ButtonDefault>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserCenter;
