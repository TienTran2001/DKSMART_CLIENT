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
export default function Users() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    const response = await apiGetAllUser();
    setLoading(false);
    if (response.success) {
      const { users } = response;
      setUsers(users);
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

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none ">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Danh sách tài khoản
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Xem thông tin tất cả các tài khoản
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              Tất cả
            </Button>
            <Button className="flex items-center gap-3" size="sm">
              + Thêm tài khoản
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <Input label="Tìm kiếm" />
            {/* icon={} */}
          </div>
        </div>
      </CardHeader>
      <CardBody className="p-0 overflow-scroll">
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
            {users.map(
              ({ userId, phone, fullname, email, address, roleId }, index) => {
                const classes = 'p-4 border-b border-blue-gray-50';

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
                        {roleId == 2 && `Quản trị trung tâm đăng kiểm`}
                        {roleId == 3 && `Người dùng`}
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
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          1 / 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Trước
          </Button>
          <Button variant="outlined" size="sm">
            Tiếp
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
