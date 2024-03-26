import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { InputForm } from '~/components';
import ButtonDefault from '~/components/commons/ButtonDefault';
import { apiAddShift } from '~/apis/shift';

// eslint-disable-next-line react/prop-types
const AddShift = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const handleAddProvince = async (data) => {
    const payload = {
      registrationDate: data.registrationDate,
    };

    setLoading(true);
    const response = await apiAddShift(payload);
    setLoading(false);

    if (response.success) {
      Swal.fire({
        icon: 'success',
        text: response.message,
        showConfirmButton: true,
        confirmButtonText: 'Thoát',
      }).then((isConfirm) => {
        if (isConfirm) {
          // reset();
        }
      });
    } else toast.error(response.message);
  };

  return (
    <div className=" mx-auto md:h-auto">
      <h1 className="text-2xl mb-5  font-bold">Tạo ngày làm việc</h1>
      <div className="w-full h-full bg-white rounded-lg md:shadow  md:mt-0 ">
        <form className="p-6  sm:p-8">
          <div className="space-y-8 ">
            <div className="md:flex block space-y-[10px] md:space-y-0 md:space-x-6  justify-between">
              <InputForm
                label="Ngày làm việc"
                register={register}
                type="Date"
                id="registrationDate"
                placeholder="Hà Nội"
                containerClassName="md:w-1/2"
                validate={{
                  required: 'Không được bỏ trống.',
                }}
                errors={errors}
              />
            </div>

            <ButtonDefault
              disable={loading}
              className="bg-main"
              onClick={handleSubmit(handleAddProvince)}
            >
              Tạo
            </ButtonDefault>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShift;
