import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { InputForm } from '~/components';
import ButtonDefault from '~/components/commons/ButtonDefault';
import { useUserStore } from '~/store/useUserStore';
import { apiUpdateCurrent } from '~/apis/user';
import { PublicLayout } from '.';

// eslint-disable-next-line react/prop-types
const Profile = ({ navigate }) => {
  const [loading, setLoading] = useState(false);
  const { getCurrent, current, token } = useUserStore();

  useEffect(() => {
    getCurrent();
  }, [token]);

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
    };

    setLoading(true);
    const response = await apiUpdateCurrent(payload);
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
          getCurrent();
        }
      });
    } else toast.error(response.message);
  };

  const handleLogout = () => {
    Swal.fire({
      title: '',
      text: 'Bạn muốn đăng xuất!',
      showCancelButton: true,
      confirmButtonColor: '#0000FF',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đăng xuất',
      cancelButtonText: 'Đóng!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('dksmart');

        navigate('');
        window.location.reload();
      }
    });
  };

  return (
    <PublicLayout>
      <div className="w-[1200px] mt-[50px] mx-auto md:h-auto">
        <div className="w-1/2 mx-auto">
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
                  containerClassName=""
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
                  containerClassName=""
                  validate={{
                    required: 'Họ tên không được bỏ trống.',
                  }}
                  errors={errors}
                />

                <InputForm
                  label="Email"
                  type="email"
                  register={register}
                  containerClassName=""
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
                  containerClassName=""
                  id="address"
                  placeholder="Địa chỉ"
                  validate={{}}
                />
                <div className="flex justify-between">
                  <ButtonDefault
                    disable={loading}
                    className="bg-main"
                    onClick={handleSubmit(handleUpdateUser)}
                  >
                    Cập nhật tài khoản
                  </ButtonDefault>
                  <ButtonDefault
                    onClick={() => handleLogout()}
                    className="bg-main"
                  >
                    Đăng xuất
                  </ButtonDefault>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Profile;
