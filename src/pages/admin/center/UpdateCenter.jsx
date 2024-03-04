import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { InputForm } from '~/components';
import ButtonDefault from '~/components/commons/ButtonDefault';
import { useParams } from 'react-router-dom';
import { apiGetAllProvince } from '~/apis/provinces';
import { apiGetCenterById, apiUpdateCenter } from '~/apis/center';
import SelectForm from '~/components/inputs/SelectForm';

// eslint-disable-next-line react/prop-types
const UpdateCenter = () => {
  const [provinces, setProvinces] = useState([]);
  const { centerId } = useParams();
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  useEffect(() => {
    loadProvinces();
    getCenter(centerId);
  }, []);

  const loadProvinces = async () => {
    const response = await apiGetAllProvince();
    if (response.success) {
      const { provinces } = response;

      setProvinces(provinces);
    }
  };

  const getCenter = async (centerId) => {
    const response = await apiGetCenterById(centerId);
    if (response.success) {
      const { center } = response;
      console.log(center);
      setValue('name', center.name);
      setValue('address', center.address);
      setValue('phone', center.phone);
      setValue('operatingHours', center.operatingHours);
      const sta = center.status === 'đang nhận lịch' ? '1' : '2';
      setValue('status', sta);
      setValue('province', center.provinceId);
    }
  };
  console.log('load');

  const handleUpdateCenter = async (data) => {
    const payload = {
      name: data.name,
      address: data.address,
      phone: data.phone,
      operatingHours: data.operatingHours,
      status: data.status,
      provinceId: data.province,
    };

    setLoading(true);
    const response = await apiUpdateCenter(centerId, payload);
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
      <h1 className="text-2xl mb-5  font-bold">Tạo trung tâm đăng kiểm</h1>
      <div className="w-full h-full bg-white rounded-lg md:shadow  md:mt-0 ">
        <form className="p-6  sm:p-8">
          <div className="space-y-8 ">
            <div className="md:flex block space-y-[10px] md:space-y-0 md:space-x-6  justify-between">
              <InputForm
                label="Tên trung tâm"
                register={register}
                id="name"
                placeholder="Nhập tên trung tâm"
                containerClassName="md:w-1/2"
                validate={{
                  required: 'Tên trung tâm không được bỏ trống.',
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
                validate={{
                  required: 'Địa chỉ không được bỏ trống.',
                }}
                errors={errors}
              />
            </div>
            <div className="md:flex block space-y-[10px] md:space-y-0 md:space-x-6  justify-between">
              <InputForm
                label="Số điện thoại"
                register={register}
                id="phone"
                placeholder="Nhập số điện thoại"
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
                label="Thời gian hoạt động"
                type="text"
                register={register}
                containerClassName="md:w-1/2"
                id="operatingHours"
                placeholder="Thứ 2 đến thứ 7"
                validate={{
                  required: 'Thời gian hoạt động không được bỏ trống.',
                }}
                errors={errors}
              />
            </div>

            <div className="md:flex block space-y-[10px] md:space-y-0 md:space-x-6  justify-between">
              <SelectForm
                label="Trạng thái"
                id="status"
                register={register}
                validate={{
                  required: 'Trạng thái không được bỏ trống.',
                }}
                errors={errors}
              >
                <option value="" className="!py-2" disabled>
                  Chọn trạng thái
                </option>
                <option value="1">Đang nhận lịch</option>
                <option value="2">Ngưng nhận lịch</option>
              </SelectForm>
              <SelectForm
                label="Tỉnh thành"
                id="province"
                register={register}
                validate={{
                  required: 'Tỉnh thành không được bỏ trống.',
                }}
                errors={errors}
              >
                <option value="" className="!py-2" disabled>
                  Chọn tỉnh thành
                </option>
                {provinces.map((province) => (
                  <option
                    className="px-4 py-2"
                    key={province.provinceId}
                    value={province.provinceId}
                  >
                    {province.name}
                  </option>
                ))}
              </SelectForm>
            </div>

            <ButtonDefault
              disable={loading}
              className="bg-main"
              onClick={handleSubmit(handleUpdateCenter)}
            >
              Cập nhật trung tâm đăng kiểm
            </ButtonDefault>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCenter;
