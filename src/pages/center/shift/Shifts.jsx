/* eslint-disable no-unused-vars */
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { IoPencilSharp } from 'react-icons/io5';
import { AiFillDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { apiDeleteProvince, apiGetAllProvince } from '~/apis/provinces';
import { apiDeleteShift, apiGetAllShift } from '~/apis/shift';
import { useUserStore } from '~/store/useUserStore';
import { formatDate } from '~/utils/contants';
import { InputForm } from '~/components';
import { useForm } from 'react-hook-form';
import ButtonDefault from '~/components/commons/ButtonDefault';
import { IoMdSearch } from 'react-icons/io';

const TABLE_HEAD = [
  'Số thứ tự',
  'Ngày làm việc',
  'Số ca',
  'Số lượng lịch đặt',
  'Thao tác',
];

export default function Shifts() {
  const [loading, setLoading] = useState(false);
  const [shifts, setShifts] = useState([]);
  const { current } = useUserStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  let navigate = useNavigate();
  useEffect(() => {
    loadShifts();
  }, []);

  const loadShifts = async (date) => {
    setLoading(true);
    const response = await apiGetAllShift(current?.centerId, date);
    setLoading(false);
    if (response.success) {
      const { shifts } = response;

      setShifts(shifts);
    } else toast.error(response.message);
  };

  const handleEditShift = (shiftId) => {
    navigate(`/manage-center/update-shift/${shiftId}`);
  };

  const handleDeleteShift = async (shiftId) => {
    Swal.fire({
      title: '',
      text: 'Xóa thì cũng sẽ xóa luôn các ca trong ngày!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có, xóa nó!',
      cancelButtonText: 'Thoát!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteShift(shiftId);
        if (response.success) {
          toast.success(response.message);
          loadShifts();
        } else toast.error(response.message);
      }
    });
  };

  const handleSearch = (data) => {
    console.log('hihi: ', data);
    loadShifts(data.registrationDate);
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none ">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Danh sách lịch làm việc
            </Typography>
          </div>
        </div>
        <form>
          <div className="md:flex items-center justify-between   space-y-[10px] md:space-y-0 ">
            {/* tìm kiếm */}

            <InputForm
              type="date"
              register={register}
              id="registrationDate"
              placeholder="Chọn ngày làm việc"
              containerClassName="md:w-1/3"
              inputClassName="pl-[50px]"
              validate={{}}
              errors={errors}
            />
            <div className="absolute left-0">
              <ButtonDefault
                disable={false}
                className="px-3 flex items-center"
                onClick={handleSubmit(handleSearch)}
                variant="text"
              >
                <IoMdSearch className="text-xl" />
              </ButtonDefault>
            </div>

            <ButtonDefault
              disable={false}
              className="px-4 py-3 flex items-center"
              onClick={() => {
                loadShifts();
                setValue('registrationDate', '');
              }}
              variant="outlined"
            >
              Làm mới
            </ButtonDefault>
          </div>
        </form>
      </CardHeader>
      <CardBody className="p-0 mt-6 overflow-x-scroll">
        <table className="mt-4 w-full min-w-max table-auto text-left">
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
            {shifts.map(
              ({ shiftId, registrationDate, ShiftDetails }, index) => {
                const totalQuantity = ShiftDetails.reduce(
                  (total, detail) => total + detail.quantity,
                  0
                );
                const totalMaxQuantity = ShiftDetails.reduce(
                  (total, detail) => total + detail.maxQuantity,
                  0
                );
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
                      <div className="w-max">
                        <Typography
                          variant="small"
                          color=""
                          className="font-normal text-black opacity-70"
                        >
                          {formatDate(registrationDate)}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {ShiftDetails.length}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {totalQuantity}/{totalMaxQuantity}
                        </Typography>
                      </div>
                    </td>

                    <td className={classes}>
                      <Tooltip content="Sửa lịch làm việc">
                        <IconButton
                          variant="text"
                          onClick={() => handleEditShift(shiftId)}
                        >
                          <IoPencilSharp className="text-xl" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Xóa lịch làm việc">
                        <IconButton
                          variant="text"
                          onClick={() => handleDeleteShift(shiftId)}
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
      </CardBody>
    </Card>
  );
}
