import { PublicLayout } from '.';
import { Fragment, useEffect, useState } from 'react';
import { apiGetAllCenter } from '~/apis/center';
import { IoMdSearch } from 'react-icons/io';
import { apiGetAllProvince } from '~/apis/provinces';
import { Tooltip } from '@material-tailwind/react';

import CardCenter from '~/components/commons/CardCenter';

const CentersPublic = () => {
  const [centers, setCenters] = useState([]);
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    loadProvinces();
    loadCenter();
  }, []);

  const loadCenter = async () => {
    const res = await apiGetAllCenter(6, 0);
    if (res.success) {
      setCenters(res.centers.rows);
    }
  };

  const loadProvinces = async () => {
    const response = await apiGetAllProvince();
    if (response.success) {
      const { provinces } = response;

      setProvinces(provinces);
    }
  };
  return (
    <>
      <PublicLayout>
        <div className="min-h-screen max-w-[1200px] mx-auto">
          <div className="mt-[50px] w-2/3 mx-auto rounded-md bg-white py-[25px] px-[20px]">
            <h2 className="font-semibold uppercase text-center text-main">
              Trung tâm đăng kiểm
            </h2>
            <div className="mt-[30px] flex items-center justify-between">
              <select
                id=""
                className=" w-[25%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3"
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

              <div className="w-2/3  border-solid border border-gray-300 rounded-lg flex">
                <input
                  type="text"
                  placeholder="Nhập tên trung tâm"
                  className="border-none outline-none p-2.5 w-full rounded-lg bg-gray-50  text-gray-900"
                />
                <Tooltip content="Tìm kiếm">
                  <div className="cursor-pointer p-3 transition-all hover:bg-main-gray">
                    <IoMdSearch className="text-xl text-gray-700" />
                  </div>
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
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default CentersPublic;
