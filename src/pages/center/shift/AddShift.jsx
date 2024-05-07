import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { InputForm } from '~/components';
import ButtonDefault from '~/components/commons/ButtonDefault';
import { apiAddShift } from '~/apis/shift';
import { IoArrowBackSharp } from 'react-icons/io5';

// eslint-disable-next-line react/prop-types
const AddShift = ({ navigate }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const handleAddShift = async (data) => {
    console.log(data);
    const payload = {
      startTime: data.startTime,
      endTime: data.endTime,
    };

    setLoading(true);
    const response = await apiAddShift(payload);
    console.log(response);
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
      <h1 className="text-2xl mb-5  font-bold">Tạo ca đăng kiểm</h1>
      <div className="w-full  bg-white rounded-lg md:shadow  md:mt-0 ">
        <div className="p-6">
          <span
            className="absolute cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <IoArrowBackSharp size={22} className="text-main  " />
          </span>
        </div>

        <form className="p-6  sm:p-8">
          <div className="space-y-8 ">
            <div className="md:flex block space-y-[10px] md:space-y-0 md:space-x-6  md:w-1/2 ">
              <InputForm
                label="Thời gian bắt đầu"
                register={register}
                type="time"
                id="startTime"
                containerClassName="md:w-1/2"
                validate={{
                  required: 'Thời gian bắt đầu không được bỏ trống.',
                }}
                errors={errors}
              />
              <InputForm
                label="Thời gian kết thúc"
                register={register}
                type="Time"
                id="endTime"
                containerClassName="md:w-1/2"
                validate={{
                  required: 'Thời gian kết thúc không được bỏ trống.',
                }}
                errors={errors}
              />
            </div>

            <ButtonDefault
              disable={loading}
              className="bg-main"
              onClick={handleSubmit(handleAddShift)}
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
