import { PublicLayout } from '.';
import { Fragment, useEffect, useState } from 'react';
import { apiGetAllCenter } from '~/apis/center';
import { IoMdSearch } from 'react-icons/io';
import { apiGetAllProvince } from '~/apis/provinces';
import { Button, Tooltip } from '@material-tailwind/react';

import CardCenter from '~/components/commons/CardCenter';
import { IoArrowBackSharp } from 'react-icons/io5';
import ButtonDefault from '~/components/commons/ButtonDefault';

// eslint-disable-next-line react/prop-types
const CentersPublic = ({ navigate }) => {
  const [centers, setCenters] = useState([]);
  const [provinces, setProvinces] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [province, setProvince] = useState('');

  const limit = 3;

  useEffect(() => {
    loadProvinces();
    loadCenters('', '', limit, 0);
  }, []);

  const loadCenters = async (province = '', name, limit, page) => {
    const response = await apiGetAllCenter({ province, name, limit, page });
    if (response.success) {
      const { centers, totalPage } = response;
      setCenters(centers.rows);
      setTotalPage(totalPage);
    }
  };

  const loadProvinces = async () => {
    const response = await apiGetAllProvince();
    if (response.success) {
      const { provinces } = response;

      setProvinces(provinces);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleOnClickSearch = () => {
    loadCenters(province, search, limit, 0);
    setPage(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleOnClickSearch();
    }
  };

  return (
    <>
      <PublicLayout>
        <div className="min-h-screen max-w-[1200px] md:mx-auto">
          <div className="mt-[50px] md:w-2/3 mx-auto rounded-md bg-white py-[25px] px-[20px]">
            <div className="relative">
              <button onClick={() => navigate('/')}>
                <span className="absolute top-[25px] cursor-pointer">
                  <IoArrowBackSharp size={22} className="text-main  " />
                </span>
              </button>
              <h2 className="font-semibold uppercase text-center text-main">
                Trung tâm đăng kiểm
              </h2>
            </div>

            <div className="mt-[30px] md:space-x-[10px] md:space-y-0 space-y-2 md:flex md:items-center md:justify-between">
              <select
                id=""
                onChange={(e) => {
                  if (e.target.value == 'Chọn tỉnh thành') {
                    console.log('vào');
                    setPage(1);
                    setProvince('');
                    loadCenters('', search, limit, 0);
                    return;
                  }
                  setPage(1);
                  setProvince(e.target.value);
                  loadCenters(e.target.value, search, limit, 0);
                }}
                className="w-full md:w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3"
              >
                <option selected>Chọn tỉnh thành</option>
                {provinces.map((province) => (
                  <option
                    className="px-4 py-2"
                    key={province.provinceId}
                    value={province.provinceId}
                  >
                    {province.name}
                  </option>
                ))}
              </select>

              <div className="w-full md:w-2/3  border-solid border border-gray-300 rounded-lg flex">
                <input
                  type="text"
                  value={search}
                  placeholder="Nhập tên trung tâm"
                  onChange={(e) => handleSearchChange(e)}
                  onKeyDown={handleKeyDown}
                  className=" border-none outline-none p-2.5 w-full rounded-lg bg-gray-50  text-gray-900"
                />
                <Tooltip content="Tìm kiếm">
                  <ButtonDefault
                    disable={false}
                    className="px-3 flex bg-main items-center rounded-none rounded-r-md"
                    onClick={() => handleOnClickSearch()}
                    variant="filled"
                  >
                    <IoMdSearch className="text-xl" />
                  </ButtonDefault>
                </Tooltip>
              </div>
            </div>
            <div className="  mt-[50px] mx-auto flex flex-col gap-y-5">
              {centers.map((center) => (
                <Fragment key={center.centerId}>
                  <CardCenter center={center} />
                </Fragment>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              <div className="font-normal">
                {page} / {totalPage}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => {
                    const x = page - 1;
                    loadCenters(province, search, limit, x - 1);
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
                    setPage(page + 1);
                    loadCenters(province, search, limit, page);
                  }}
                >
                  Tiếp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default CentersPublic;
