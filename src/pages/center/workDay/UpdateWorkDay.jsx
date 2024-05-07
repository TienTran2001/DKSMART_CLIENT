import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import {
  Typography,
  IconButton,
  Tooltip,
  Chip,
} from '@material-tailwind/react';
import { IoPencilSharp } from 'react-icons/io5';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { InputForm } from '~/components';
import ButtonDefault from '~/components/commons/ButtonDefault';
import { useParams } from 'react-router-dom';
import { formatTime } from '~/utils/contants';
import { apiGetWorkDayById, apiUpdateWorkDay } from '~/apis/workDay';

const TABLE_HEAD = [
  'Số thứ tự',
  'Bắt đầu',
  'Kết thúc',
  'Lịch đã đặt',
  'trạng thái',
  'Thao tác',
];

// eslint-disable-next-line react/prop-types
const UpdateWorkDay = ({ navigate }) => {
  const { workDayId } = useParams();

  const [loading, setLoading] = useState(false);

  const [workDayShifts, setWorkDayShifts] = useState([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  useEffect(() => {
    getWorkDay(workDayId);
  }, []);

  const getWorkDay = async (workDayId) => {
    const response = await apiGetWorkDayById(workDayId);
    if (response.success) {
      console.log(response);
      const { workDay } = response;
      setWorkDayShifts(workDay.WorkDayShifts);
      setValue('registrationDate', workDay.inspectionDate);
    }
  };

  const handleUpdateWorkDay = async (data) => {
    const payload = {
      inspectionDate: data.registrationDate,
    };

    setLoading(true);
    const response = await apiUpdateWorkDay(workDayId, payload);
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
              onClick={handleSubmit(handleUpdateWorkDay)}
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
        <div className="flex pt-5 pr-7 justify-end gap-x-6">
          <ButtonDefault
            disable={false}
            variant="outlined"
            className=""
            onClick={() => getWorkDay(workDayId)}
          >
            Làm mới
          </ButtonDefault>
          {/* <ButtonDefault
            disable={loading}
            className="bg-main"
            onClick={() =>
              navigate(`/manage-center/create-work-day-shift/${workDayId}`)
            }
          >
            Thêm ca
          </ButtonDefault> */}
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
                  {workDayShifts.map(
                    (
                      {
                        workDayShiftId,
                        maxQuantity,
                        Shift,
                        Appointments,
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
                                {formatTime(Shift?.startTime)}
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
                                {formatTime(Shift?.endTime)}
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
                                <span className="text-main">
                                  {Appointments?.length}
                                </span>
                                /{maxQuantity}
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
                                    `/manage-center/update-work-day-shift/${workDayShiftId}`
                                  )
                                }
                              >
                                <IoPencilSharp className="text-xl" />
                              </IconButton>
                            </Tooltip>
                            {/* <Tooltip content="Xóa ca">
                              <IconButton
                                variant="text"
                                // onClick={() =>
                                //   handleDeleteShiftDetail(shiftDetailId)
                                // }
                              >
                                <AiFillDelete className="text-xl" />
                              </IconButton>
                            </Tooltip> */}
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

export default UpdateWorkDay;
