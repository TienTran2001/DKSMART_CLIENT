import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { apiRegister } from '~/apis/auth';
import { Button, InputForm } from '~/components';
import { useUserStore } from '~/store/useUserStore';

// eslint-disable-next-line react/prop-types
const Register = ({ navigate }) => {
  const { setPhoneNumber } = useUserStore();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const passwordValue = watch('password');
  const handleRegister = async (data) => {
    const payload = {
      fullname: data.name,
      phone: data.phone,
      email: data.email,
      password: data.password,
    };
    const response = await apiRegister(payload);
    console.log(response);
    if (response.success) {
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: response.message,
        showConfirmButton: true,
        confirmButtonText: 'Đăng nhập ngay',
      }).then((isConfirm) => {
        if (isConfirm) {
          setPhoneNumber(payload.phone);
          navigate('/login');
        }
      });
    } else toast.error(response.message);
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto h-screen md:h-auto ">
      <div className="w-full bg-white h-full rounded-lg md:shadow  md:mt-0 sm:max-w-lg xl:p-0 ">
        <form className="p-6 space-y-4 md:space-y-4 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Đăng ký tài khoản
          </h1>
          <div className="space-y-[10px] ">
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
            <InputForm
              label="Email"
              type="email"
              register={register}
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
              label="Mật khẩu"
              type="password"
              register={register}
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
              id="re-password"
              placeholder="••••••••"
              validate={{
                required: 'Mật khẩu không được bỏ trống.',
                validate: (value) =>
                  value === passwordValue || 'Mật khẩu nhập lại không khớp.',
              }}
              errors={errors}
            />

            <Button
              type="button"
              className="w-full"
              onClick={handleSubmit(handleRegister)}
            >
              Đăng ký
            </Button>
            <p className="text-sm font-light text-gray-500">
              Đã có tài khoản?{' '}
              <Link
                to="/login"
                className="font-medium text-main hover:underline "
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
