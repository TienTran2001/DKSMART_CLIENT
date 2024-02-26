import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { InputForm } from '~/components';
import ButtonDefault from '~/components/commons/ButtonDefault';
import { Select, Option } from '@material-tailwind/react';
import { apiGetUserById, apiUpdateUser } from '~/apis/user';
import { useParams } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const UpdateUser = () => {
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
    const response = await apiGetUserById(userId);
    if (response.success) {
      const { currentUser } = response;
      setUser(currentUser);
    }
  };

  const handleUpdateUser = async () => {
    const payload = {
      fullname: user.fullname,
      email: user.email,
      address: user.address,
      roleId: user.roleId,
    };

    setLoading(true);
    const response = await apiUpdateUser(userId, payload);
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
  const handleSetValueRole = (val) => {
    val ? setValue('roleId', val) : setValue('roleId', 3);
    setUser((prev) => {
      return { ...prev, roleId: val };
    });
  };
  const handleChangeUser = (res) => {
    setUser((prev) => {
      return { ...prev, ...res };
    });
  };

  return (
    <div className=" mx-auto md:h-auto">
      <h1 className="text-2xl mb-5  font-bold">Cập nhật tài khoản</h1>
      <div className="w-full h-full bg-white rounded-lg md:shadow  md:mt-0 ">
        <form className="p-6  sm:p-8">
          <div className="space-y-8 ">
            <div className="md:flex block space-y-[10px] md:space-y-0 md:space-x-6  justify-between">
              <InputForm
                label="Số điện thoại"
                register={register}
                value={user.phone}
                readOnly
                id="phone"
                placeholder="0383911193"
                containerClassName="md:w-1/2"
              />
              <InputForm
                label="Họ Tên"
                value={user.fullname}
                register={register}
                id="name"
                placeholder="Trần Văn A"
                containerClassName="md:w-1/2"
                validate={{
                  onChange: (e) =>
                    handleChangeUser({ fullname: e.target.value }),
                }}
                errors={errors}
              />
            </div>
            <div className="md:flex block space-y-[10px] md:space-y-0 md:space-x-6  justify-between">
              <InputForm
                label="Email"
                type="email"
                value={user.email}
                register={register}
                containerClassName="md:w-1/2"
                id="email"
                placeholder="example@gmail.com"
                validate={{
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Email không hợp lệ',
                  },
                  onChange: (e) => handleChangeUser({ email: e.target.value }),
                }}
                errors={errors}
              />
              <InputForm
                label="Địa chỉ"
                type="text"
                value={user.address}
                register={register}
                containerClassName="md:w-1/2"
                id="address"
                placeholder="Địa chỉ"
                validate={{
                  onChange: (e) =>
                    handleChangeUser({ address: e.target.value }),
                }}
              />
            </div>

            <div className="w-72">
              {/* <label
                htmlFor=""
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Chọn quyền
              </label> */}
              <Select
                label="Chọn quyền"
                value={`${user.roleId}`}
                onChange={(val) => handleSetValueRole(val)}
                color="blue"
                close
              >
                <Option value="1">Quản trị hệ thống</Option>
                <Option value="2">Quản trị trung tâm đăng kiểm</Option>
                <Option value="3">Người dùng</Option>
              </Select>
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

export default UpdateUser;
