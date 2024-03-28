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
import { apiDeleteUser, apiGetAllUser } from '~/apis/user';
import { IoPencilSharp } from 'react-icons/io5';
import { AiFillDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const TABLE_HEAD = ['Người dùng', 'Email', 'Địa chỉ', 'Quyền', 'Thao tác'];

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import ButtonDefault from '~/components/commons/ButtonDefault';
import { IoMdSearch } from 'react-icons/io';
import { InputForm } from '~/components';
import { useForm } from 'react-hook-form';
export default function Users() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  let navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm();

  const phone = watch('phone');
  // console.log(phone);
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async (phone, limit = 6, page) => {
    setLoading(true);
    const response = await apiGetAllUser(phone, limit, page);
    setLoading(false);
    console.log(response);
    if (response.success) {
      const { users, totalPage } = response;
      setUsers(users.rows);
      setTotalPage(totalPage);
    } else toast.error(response.message);
  };

  const handleEditUser = (userId) => {
    navigate(`/admin/update-user/${userId}`);
  };

  const handleDeleteUser = async (userId) => {
    Swal.fire({
      title: '',
      text: 'Bạn có chắc xóa tài khoản này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có, xóa nó!',
      cancelButtonText: 'Thoát!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteUser(userId);
        if (response.success) {
          toast.success(response.message);
          loadUsers();
        } else toast.error(response.message);
      }
    });
  };

  const handleSearch = (data) => {
    loadUsers(data.phone);
  };

  return (
    <Card className="h-full w-full">
      <div className="rounded-none p-4">
        <div className="mb-8 flex items-center justify-between gap-8  ">
          <div>
            <Typography variant="h5" color="blue-gray">
              Danh sách tài khoản
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Xem thông tin tài khoản
            </Typography>
          </div>
          <ButtonDefault
            disable={false}
            className="px-4 py-3 flex items-center"
            onClick={() => {
              loadUsers();
              setValue('phone', '');
              setPage(1);
            }}
            variant="outlined"
          >
            Làm mới
          </ButtonDefault>
        </div>
        <div>
          <div className="md:flex items-center justify-between   space-y-[10px] md:space-y-0 ">
            {/* tìm kiếm */}

            <InputForm
              type="text"
              register={register}
              id="phone"
              placeholder="Nhập số điện thoại"
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
      <div className="p-0 mt-4 overflow-scroll relative ">
        <table className=" w-full min-w-max table-auto text-left  ">
          <thead className="sticky top-0 bg-black transition-all delay-500 z-50">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-y border-blue-gray-100  p-4">
                  <Typography
                    variant="small"
                    color=""
                    className="font-normal text-white leading-none opacity-90"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {users.map(
              ({ userId, phone, fullname, email, address, roleId }, index) => {
                const classes = 'p-3 border-b border-blue-gray-50';

                return (
                  <tr key={phone}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {fullname}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {phone}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {email}
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
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {roleId == 1 && `Quản trị hệ thống`}
                        {roleId == 3 && `Quản trị trung tâm đăng kiểm`}
                        {roleId == 2 && `Người dùng`}
                        {roleId == 4 && `Nhân viên trung tâm`}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Sửa tài khoản">
                        <IconButton
                          variant="text"
                          onClick={() => handleEditUser(userId)}
                        >
                          <IoPencilSharp className="text-xl" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Xóa tài khoản">
                        <IconButton
                          variant="text"
                          onClick={() => handleDeleteUser(userId)}
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
              loadUsers(phone, 6, x - 1);
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
              loadUsers(phone, 6, page);
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
