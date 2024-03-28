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

const TABLE_HEAD = ['Số thứ tự', 'Tên tỉnh', 'Thao tác'];

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { apiDeleteProvince, apiGetAllProvince } from '~/apis/provinces';
export default function Provinces() {
  const [loading, setLoading] = useState(false);
  const [provinces, setProvinces] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    loadProvinces();
  }, []);

  const loadProvinces = async () => {
    setLoading(true);
    const response = await apiGetAllProvince();
    setLoading(false);
    if (response.success) {
      const { provinces } = response;
      setProvinces(provinces);
    } else toast.error(response.message);
  };

  const handleEditProvince = (provinceId) => {
    navigate(`/admin/update-province/${provinceId}`);
  };

  const handleDeleteProvince = async (provinceId) => {
    Swal.fire({
      title: '',
      text: 'Bạn có chắc xóa tỉnh thành này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có, xóa nó!',
      cancelButtonText: 'Thoát!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteProvince(provinceId);
        if (response.success) {
          toast.success(response.message);
          loadProvinces();
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
              Danh sách tỉnh thành
            </Typography>
            {/* <Typography color="gray" className="mt-1 font-normal">
              Xem thông tin tất cả các tài khoản
            </Typography> */}
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              Tất cả
            </Button>
            <Button className="flex items-center gap-3" size="sm">
              + Thêm tỉnh thành
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
            {provinces.map(({ provinceId, name }, index) => {
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
                        className="font-normal opacity-70"
                      >
                        {name}
                      </Typography>
                    </div>
                  </td>

                  <td className={classes}>
                    <Tooltip content="Sửa tỉnh thành">
                      <IconButton
                        variant="text"
                        onClick={() => handleEditProvince(provinceId)}
                      >
                        <IoPencilSharp className="text-xl" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Xóa tỉnh thành">
                      <IconButton
                        variant="text"
                        onClick={() => handleDeleteProvince(provinceId)}
                      >
                        <AiFillDelete className="text-xl" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
