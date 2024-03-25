import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { InputForm } from '~/components';
import ButtonDefault from '~/components/commons/ButtonDefault';
import { apiAddShiftDetail } from '~/apis/shift';
import SelectForm from '~/components/inputs/SelectForm';
import { IoArrowBackSharp } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const AddShiftDetail = ({ navigate }) => {
  const { shiftId } = useParams();
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const handleAddShiftDetail = async (data) => {
    console.log(data);
    const payload = {
      startTime: data.startTime,
      endTime: data.endTime,
      maxQuantity: data.maxQuantity,
      status: data.status,
    };

    setLoading(true);
    const response = await apiAddShiftDetail(shiftId, payload);
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
            <div className="md:flex block space-y-[10px] md:space-y-0 md:space-x-6 ">
              <InputForm
                label="Số tối đa"
                register={register}
                type="number"
                placeholder="Nhập số"
                min="1"
                id="maxQuantity"
                containerClassName="md:w-1/2"
                validate={{
                  required: 'Số lượng tối đa không được bỏ trống.',
                }}
                errors={errors}
              />
            </div>
            <div className="md:flex block md:w-1/2 space-y-[10px] md:space-y-0 md:space-x-6 ">
              <SelectForm
                label="Trạng thái"
                value="1"
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
            </div>

            <ButtonDefault
              disable={loading}
              className="bg-main"
              onClick={handleSubmit(handleAddShiftDetail)}
            >
              Tạo
            </ButtonDefault>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShiftDetail;
