/* eslint-disable no-unused-vars */
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  IconButton,
  Tooltip,
  CardFooter,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { IoPencilSharp } from 'react-icons/io5';
import { AiFillDelete, AiOutlineFileText } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const TABLE_HEAD = [
  'Số thứ tự',
  'Tên trung tâm',
  'Số điện thoại',
  'Trạng thái',
  'Thời gian hoạt động',
  'Tỉnh hoạt động',
  'Địa chỉ',
  'Thao tác',
];

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { apiDeleteCenter, apiGetAllCenter } from '~/apis/center';
import ButtonDefault from '~/components/commons/ButtonDefault';
import { InputForm } from '~/components';
import { useForm } from 'react-hook-form';
import { IoMdSearch } from 'react-icons/io';

export default function Centers() {
  const [loading, setLoading] = useState(false);
  const [centers, setCenters] = useState([]);
  let navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');

  const limit = 2;

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm();

  useEffect(() => {
    loadCenters('', limit, 0);
  }, []);

  const loadCenters = async (name = '', limit, page) => {
    setLoading(true);
    const response = await apiGetAllCenter({ name, limit, page });
    console.log(response);
    setLoading(false);
    if (response.success) {
      const { centers, totalPage } = response;
      setCenters(centers.rows);
      setTotalPage(totalPage);
    } else toast.error(response.message);
  };

  const handleEditCenter = (centerId) => {
    navigate(`/admin/update-center/${centerId}`);
  };

  const handleDeleteCenter = async (centerId) => {
    Swal.fire({
      title: '',
      text: 'Bạn có chắc xóa trung tâm này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có, xóa nó!',
      cancelButtonText: 'Thoát!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteCenter(centerId);
        if (response.success) {
          toast.success(response.message);
          loadCenters('', limit, 0);
        } else toast.error(response.message);
      }
    });
  };

  const handleSearch = async (data) => {
    setSearch(data.name);
    loadCenters(data.name, limit, 0);
    setPage(1);
  };

  return (
    <Card className="h-full w-full">
      <div className="rounded-none p-4 ">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Danh sách trung tâm đăng kiểm
            </Typography>
            {/* <Typography color="gray" className="mt-1 font-normal">
              Xem thông tin tất cả các tài khoản
            </Typography> */}
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <ButtonDefault
              disable={false}
              className="px-4 py-3 flex items-center"
              onClick={() => {
                loadCenters('', limit, 0);
                setValue('name', '');
                setPage(1);
              }}
              variant="outlined"
            >
              Làm mới
            </ButtonDefault>
          </div>
        </div>
        <div>
          <div className="md:flex items-center justify-between   space-y-[10px] md:space-y-0 ">
            {/* tìm kiếm */}

            <InputForm
              type="text"
              register={register}
              id="name"
              placeholder="Nhập tên trung tâm"
              containerClassName="md:w-1/3"
              inputClassName="pl-[50px]"
              validate={{}}
              errors={errors}
            />
            <div className="absolute">
              <ButtonDefault
                disable={false}
                className="px-3 flex items-center"
                onClick={handleSubmit(handleSearch)}
                variant="text"
              >
                <IoMdSearch className="text-xl" />
              </ButtonDefault>
            </div>
          </div>
        </div>
      </div>
      <div className="p-0 overflow-scroll relative">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="sticky top-0 bg-black transition-all delay-500 z-10">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-y border-blue-gray-100  p-4">
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal leading-none  opacity-90"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          {centers.length > 0 && (
            <tbody>
              {centers.map(
                (
                  {
                    centerId,
                    name,
                    address,
                    phone,
                    operatingHours,
                    Province,
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
                        <div className="w-max">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
                        </div>
                      </td>

                      <td className={classes}>
                        <div className="w-max">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {phone}
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
                              status === 'đang nhận lịch'
                                ? 'green'
                                : status === 'ngưng nhận lịch'
                                ? 'amber'
                                : 'red'
                            }
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {operatingHours}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {Province?.name}
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
                            {address}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Sửa">
                          <IconButton
                            variant="text"
                            onClick={() => handleEditCenter(centerId)}
                          >
                            <IoPencilSharp className="text-xl" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Xóa">
                          <IconButton
                            variant="text"
                            onClick={() => handleDeleteCenter(centerId)}
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
          )}
        </table>
        {centers.length == 0 && (
          <div className="flex items-center justify-center my-5">
            <div className="  flex items-center space-x-4  text-white px-10 py-7 bg-gray-400 rounded-md">
              <AiOutlineFileText className="text-[70px]" />
              <span className="text-lg">Không có dữ liệu!</span>
            </div>
          </div>
        )}
      </div>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {page} / {totalPage}
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="sm"
            disabled={page <= 1}
            onClick={() => {
              const x = page - 1;
              loadCenters('', limit, x - 1);
              setPage(page - 1);
            }}
          >
            Trước
          </Button>
          <Button
            variant="outlined"
            size="sm"
            disabled={page >= totalPage ? true : false}
            onClick={() => {
              loadCenters('', limit, page);
              setPage(page + 1);
            }}
          >
            Tiếp
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
