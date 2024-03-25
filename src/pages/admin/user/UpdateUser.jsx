import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { InputForm } from '~/components';
import ButtonDefault from '~/components/commons/ButtonDefault';
import { Select as SelectM, Option } from '@material-tailwind/react';
import { apiGetUserById, apiUpdateUser } from '~/apis/user';
import { useParams } from 'react-router-dom';
import Select from 'react-tailwindcss-select';
import { apiGetCenters } from '~/apis/center';

// eslint-disable-next-line react/prop-types
const UpdateUser = () => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [centers, setCenters] = useState([]);
  const [center, setCenter] = useState();

  const [user, setUser] = useState({});

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const foundCenter = centers.find((item) => item.value === user.centerId);
  useEffect(() => {
    loadCenter();
    getUser(userId);
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

  const getUser = async (userId) => {
    const response = await apiGetUserById(userId);
    if (response.success) {
      const { currentUser } = response;
      setUser(currentUser);
      setValue('name', currentUser.fullname);
      setValue('email', currentUser.email);
      setValue('address', currentUser.address);
      setValue('roleId', currentUser.roleId);
      setValue('centerId', currentUser?.centerId);
    }
  };

  const handleUpdateUser = async (data) => {
    let valueRoleId = center?.value || foundCenter?.value;
    const payload = {
      fullname: data.name,
      email: data.email,
      address: data.address,
      roleId: data.roleId,
      centerId: data.roleId == 3 || data.roleId == 4 ? valueRoleId : null,
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

  const handleChange = (value) => {
    setCenter(value);
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

            <div className="w-full">
              <SelectM
                label="Chọn quyền"
                value={`${user.roleId}`}
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
            {(user?.roleId == 2 || user?.roleId == 4) && (
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
                value={center || foundCenter}
                onChange={handleChange}
                options={centers}
              />
            )}

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
