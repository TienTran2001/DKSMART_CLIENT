// import { useState } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiLogin } from '~/apis/auth';
import { InputForm } from '~/components';
import ButtonDefault from '~/components/commons/ButtonDefault';

import { useUserStore } from '~/store/useUserStore';

// eslint-disable-next-line react/prop-types
const Login = ({ navigate }) => {
  const { setToken } = useUserStore();

  const [loading, setLoading] = useState(false);

  // console.log(token);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleLogin = async (data) => {
    setLoading(true);
    const response = await apiLogin(data);
    console.log(response);
    setLoading(false);

    if (response.success) {
      toast.success(response.message);
      setToken(response.token);
      navigate('/');
    } else toast.error(response.message);
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto h-screen md:h-auto ">
      <div className="w-full bg-white h-full rounded-lg md:shadow  md:mt-0 sm:max-w-md xl:p-0 ">
        <form className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Đăng nhập tài khoản
          </h1>
          <div className="space-y-4 md:space-y-6">
            <InputForm
              label="Số điện thoại"
              register={register}
              id="phone"
              placeholder="0383911193"
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
              label="Mật khẩu"
              type="password"
              register={register}
              id="password"
              placeholder="••••••••"
              validate={{
                required: 'Mật khẩu không được bỏ trống.',
              }}
              errors={errors}
            />

            <div className="flex items-center justify-end text-main">
              <a
                href="#"
                className="text-sm font-medium text-primary-600 hover:underline "
              >
                Quên mật khẩu?
              </a>
            </div>
            <ButtonDefault
              disable={loading}
              fullWidth
              className="bg-main"
              onClick={handleSubmit(handleLogin)}
            >
              Đăng nhập
            </ButtonDefault>
            <p className="text-sm font-light text-gray-500">
              Bạn chưa có tài khoản?{' '}
              <Link
                to="/register"
                className="font-medium text-main hover:underline "
              >
                Đăng ký
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
