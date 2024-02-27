import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { InputForm } from '~/components';
import ButtonDefault from '~/components/commons/ButtonDefault';
import { apiGetProvinceById, apiUpdateProvince } from '~/apis/provinces';
import { useParams } from 'react-router-dom';

const UpdateProvince = () => {
  const { provinceId } = useParams();

  const [loading, setLoading] = useState(false);
  const [province, setProvince] = useState({});

  useEffect(() => {
    getProvince(provinceId);
  }, []);

  const getProvince = async (provinceId) => {
    const response = await apiGetProvinceById(provinceId);
    if (response.success) {
      const { province } = response;
      setProvince(province);
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const handleUpdateProvince = async (data) => {
    const payload = {
      name: data.name,
    };

    setLoading(true);
    const response = await apiUpdateProvince(provinceId, payload);
    setLoading(false);

    if (response.success) {
      Swal.fire({
        icon: 'success',
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
      <h1 className="text-2xl mb-5  font-bold">Tạo tỉnh thành</h1>
      <div className="w-full h-full bg-white rounded-lg md:shadow  md:mt-0 ">
        <form className="p-6  sm:p-8">
          <div className="space-y-8 ">
            <div className="md:flex block space-y-[10px] md:space-y-0 md:space-x-6  justify-between">
              <InputForm
                label="Tên tỉnh thành"
                register={register}
                id="name"
                value={province.name}
                placeholder="Hà Nội"
                containerClassName="md:w-1/2"
                validate={{
                  required: 'Tên không được bỏ trống.',
                  onChange: (e) => {
                    setProvince({ name: e.target.value });
                  },
                }}
                errors={errors}
              />
            </div>

            <ButtonDefault
              disable={loading}
              className="bg-main"
              onClick={handleSubmit(handleUpdateProvince)}
            >
              Cập nhật tỉnh thành
            </ButtonDefault>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProvince;
