import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import {
  Typography,
  IconButton,
  Tooltip,
  Chip,
} from '@material-tailwind/react';
import { IoPencilSharp } from 'react-icons/io5';
import { AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { InputForm } from '~/components';
import ButtonDefault from '~/components/commons/ButtonDefault';
import { useParams } from 'react-router-dom';
import {
  apiDeleteShiftDetail,
  apiGetShiftById,
  apiUpdateShift,
} from '~/apis/shift';

const TABLE_HEAD = [
  'Số thứ tự',
  'Bắt đầu',
  'Kết thúc',
  'Lịch đã đặt',
  'trạng thái',
  'Thao tác',
];

// eslint-disable-next-line react/prop-types
const UpdateShift = ({ navigate }) => {
  const { shiftId } = useParams();

  const [loading, setLoading] = useState(false);
  const [shiftDetails, setShiftDetails] = useState([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  useEffect(() => {
    getShift(shiftId);
  }, []);

  const getShift = async (shiftId) => {
    const response = await apiGetShiftById(shiftId);
    if (response.success) {
      const { shift } = response;
      setShiftDetails(shift.ShiftDetails);
      setValue('registrationDate', shift.registrationDate);
    }
  };

  const handleUpdateShift = async (data) => {
    const payload = {
      registrationDate: data.registrationDate,
    };

    setLoading(true);
    const response = await apiUpdateShift(shiftId, payload);
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

  const loadShiftDetails = async () => {
    const response = await apiGetShiftById(shiftId);
    if (response.success) {
      const { shift } = response;
      setShiftDetails(shift.ShiftDetails);
    }
  };

  const handleDeleteShiftDetail = async (shiftDetailId) => {
    console.log('vào: ', shiftDetailId);
    Swal.fire({
      title: '',
      text: 'Ban có chắc xóa ca này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có, xóa nó!',
      cancelButtonText: 'Thoát!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteShiftDetail(shiftDetailId);
        if (response.success) {
          toast.success(response.message);
          loadShiftDetails();
        } else toast.error(response.message);
      }
    });
  };

  return (
    <div className=" mx-auto md:h-auto">
      <h2 className="text-2xl mb-5  font-bold">Ngày làm việc</h2>
      <div className="w-full h-full bg-white rounded-lg md:shadow  md:mt-0 ">
        <form className="p-6  sm:p-8">
          <div className="space-y-8 ">
            <div className="md:flex block space-y-[10px] md:space-y-0 md:space-x-6  justify-between">
              <InputForm
                label="Ngày làm việc"
                type="Date"
                register={register}
                id="registrationDate"
                placeholder="Chọn ngày làm việc"
                containerClassName="md:w-1/2"
                validate={{
                  required: 'Ngày làm việc không được bỏ trống.',
                }}
                errors={errors}
              />
            </div>

            <ButtonDefault
              disable={loading}
              className="bg-main"
              onClick={handleSubmit(handleUpdateShift)}
            >
              Cập nhật
            </ButtonDefault>
          </div>
        </form>
      </div>
      <h2 className=" mt-10 mb-5 text-2xl  font-bold">
        Danh sách ca đăng kiểm trong ngày
      </h2>
      <div className="w-full  h-full bg-white mb-[100px] rounded-lg md:shadow ">
        <div className="flex pt-5 pr-7 justify-end">
          <ButtonDefault
            disable={loading}
            className="bg-main"
            onClick={() =>
              navigate(`/manage-center/create-shift-detail/${shiftId}`)
            }
          >
            Thêm ca
          </ButtonDefault>
        </div>
        <form className="p-0  ">
          <div className="space-y-8 ">
            <div className="md:flex block space-y-[10px] md:space-y-0 md:space-x-6 p-0  overflow-x-scroll justify-between">
              <table className="mt-2 w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {shiftDetails.map(
                    (
                      {
                        shiftDetailId,
                        startTime,
                        endTime,
                        quantity,
                        maxQuantity,
                        status,
                      },
                      index
                    ) => {
                      const classes = 'p-4 border-b border-blue-gray-50';

                      return (
                        <tr key={index}>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                {index + 1}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                {startTime}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                {endTime}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="w-max">
                              <Typography
                                variant="small"
                                color="black"
                                className="font-normal opacity-70"
                              >
                                <span className="text-main">{quantity}</span>/
                                {maxQuantity}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="w-max">
                              <Chip
                                size="sm"
                                variant="ghost"
                                value={status}
                                color={
                                  status == 'Đang nhận lịch'
                                    ? 'green'
                                    : status == 'Ngưng nhận lịch'
                                    ? 'amber'
                                    : 'red'
                                }
                              />
                            </div>
                          </td>
                          <td className={classes}>
                            <Tooltip content="Sửa ca">
                              <IconButton
                                variant="text"
                                onClick={() =>
                                  navigate(
                                    `/manage-center/update-shift-detail/${shiftDetailId}`
                                  )
                                }
                              >
                                <IoPencilSharp className="text-xl" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip content="Xóa ca">
                              <IconButton
                                variant="text"
                                onClick={() =>
                                  handleDeleteShiftDetail(shiftDetailId)
                                }
                              >
                                <AiFillDelete className="text-xl" />
                              </IconButton>
                            </Tooltip>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateShift;
