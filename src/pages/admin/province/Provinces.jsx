/* eslint-disable no-unused-vars */
import {
  Card,
  Typography,
  Button,
  CardFooter,
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
import { apiDeleteProvince, apiGetAllProvincePaging } from '~/apis/provinces';
import ButtonDefault from '~/components/commons/ButtonDefault';
import { InputForm } from '~/components';
import { IoMdSearch } from 'react-icons/io';
import { useForm } from 'react-hook-form';

export default function Provinces() {
  const [loading, setLoading] = useState(false);
  const [provinces, setProvinces] = useState([]);

  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [totalPage, setTotalPage] = useState(1);
  const limit = 6;

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm();

  let navigate = useNavigate();
  useEffect(() => {
    loadProvinces(limit, 0, name);
  }, []);

  const loadProvinces = async (limit, page, name) => {
    setLoading(true);
    const response = await apiGetAllProvincePaging(limit, page, name);
    setLoading(false);
    if (response.success) {
      const { provinces, totalPage } = response;
      setProvinces(provinces.rows);
      setTotalPage(totalPage);
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

  const handleSearch = (data) => {
    setName(data.name);
    loadProvinces(limit, 0, data.name);
  };

  return (
    <Card className="h-full w-full">
      <div className="rounded-none p-4">
        <div className="mb-8 flex items-center justify-between gap-8 ">
          <div>
            <Typography variant="h5" color="blue-gray">
              Danh sách tỉnh thành
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <ButtonDefault
              disable={false}
              className="px-4 py-3 flex items-center"
              onClick={() => {
                loadProvinces(limit, 0, '');
                setValue('name', '');
                setPage(1);
              }}
              variant="outlined"
            >
              Làm mới
            </ButtonDefault>
          </div>
        </div>
        <div className="md:flex items-center justify-between   space-y-[10px] md:space-y-0 ">
          {/* tìm kiếm */}

          <InputForm
            type="text"
            register={register}
            id="name"
            placeholder="Nhập tên tỉnh thành"
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
      <div className="p-0 mt-4 overflow-scroll relative ">
        <table className=" w-full min-w-max table-auto text-left  ">
          <thead className="sticky top-0 bg-black transition-all delay-500 z-50">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-y border-blue-gray-100  p-4">
                  <Typography
                    variant="small"
                    className="font-normal text-white leading-none opacity-90"
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
                        {index + 1 + limit * (page - 1)}
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
              loadProvinces(limit, x - 1, name);
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
              loadProvinces(limit, page, name);
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
