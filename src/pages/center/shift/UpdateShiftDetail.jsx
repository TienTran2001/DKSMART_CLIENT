import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { InputForm } from '~/components';
import ButtonDefault from '~/components/commons/ButtonDefault';
import { apiGetShiftDetailById, apiUpdateShiftDetail } from '~/apis/shift';
import SelectForm from '~/components/inputs/SelectForm';
import { IoArrowBackSharp } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const UpdateShiftDetail = ({ navigate }) => {
  const { shiftDetailId } = useParams();
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  useEffect(() => {
    getShiftDetail();
  }, []);

  const getShiftDetail = async () => {
    const response = await apiGetShiftDetailById(shiftDetailId);

    if (response.success) {
      const { shiftDetail } = response;
      setValue('startTime', shiftDetail.startTime);
      setValue('endTime', shiftDetail.endTime);
      setValue('maxQuantity', shiftDetail.maxQuantity);
      const sta =
        shiftDetail.status === 'Đang nhận lịch'
          ? '1'
          : shiftDetail.status === 'Ngưng nhận lịch'
          ? '2'
          : '3';
      setValue('status', sta);
    }
  };
  const handleUpdateShiftDetail = async (data) => {
    const payload = {
      startTime: data.startTime,
      endTime: data.endTime,
      maxQuantity: data.maxQuantity,
      status: data.status,
    };

    setLoading(true);
    const response = await apiUpdateShiftDetail(shiftDetailId, payload);
    setLoading(false);

    if (response.success) {
      Swal.fire({
        icon: 'success',
        text: response.message,
        showConfirmButton: true,
        confirmButtonText: 'Thoát',
      }).then(() => {});
    } else toast.error(response.message);
  };

  return (
    <div className=" mx-auto md:h-auto">
      <h1 className="text-2xl mb-5  font-bold">Cập nhật ca đăng kiểm</h1>
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
                <option disabled value="3">
                  Đã đầy
                </option>
              </SelectForm>
            </div>

            <ButtonDefault
              disable={loading}
              className="bg-main"
              onClick={handleSubmit(handleUpdateShiftDetail)}
            >
              Cập nhật
            </ButtonDefault>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateShiftDetail;
