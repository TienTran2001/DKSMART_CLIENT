import { PublicLayout } from '../public';
import { Fragment, useEffect, useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { Tooltip } from '@material-tailwind/react';

import { useUserStore } from '~/store/useUserStore';
import ButtonDefault from '~/components/commons/ButtonDefault';
import { AiOutlinePlus } from 'react-icons/ai';
import CardVehicle from '~/components/commons/CardVehicle';
import { apiDeleteVehicle, apiGetVehicles } from '~/apis/vehicle';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { IoArrowBackSharp } from 'react-icons/io5';

// eslint-disable-next-line react/prop-types
const Vehicles = ({ navigate }) => {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState('');
  const { current } = useUserStore();

  if (!current) {
    navigate('/login');
  }

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async (search) => {
    const res = await apiGetVehicles(search);
    if (res.success) {
      const { vehicles } = res;
      setVehicles(vehicles);
    }
  };

  const handleDeleteCenter = async (vehicleId) => {
    Swal.fire({
      title: '',
      text: 'Xóa phương tiện sẽ thông tin của lịch hẹn!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận!',
      cancelButtonText: 'Thoát!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteVehicle(vehicleId);
        if (response.success) {
          toast.success(response.message);
          loadVehicles();
        } else toast.error(response.message);
      }
    });
  };

  const handleSearch = async () => {
    console.log(search);
    loadVehicles(search);
  };

  return (
    <>
      <PublicLayout>
        <div className="min-h-screen max-w-[1200px] mx-auto">
          <div className="mt-[50px] md:w-2/3 mx-auto rounded-md bg-white py-[25px] px-[20px]">
            <div className="relative">
              <button onClick={() => navigate(-1)}>
                <span className="absolute top-[25px] cursor-pointer">
                  <IoArrowBackSharp size={22} className="text-main  " />
                </span>
              </button>
              <h2 className="font-semibold uppercase text-center text-main">
                Hồ sơ phương tiện
              </h2>
            </div>
            <div className="mt-[30px] flex flex-col gap-x-4 gap-y-5 md:gap-y-0 md:flex-row items-center justify-between">
              <ButtonDefault
                disable={false}
                className="bg-main w-full md:w-1/3 py-[14px] flex items-center gap-x-2"
                onClick={() => navigate('/create-vehicle')}
              >
                <AiOutlinePlus className="text-lg text-white" />
                <span className="">Đăng ký phương tiện</span>
              </ButtonDefault>

              <div className="w-full md:w-2/3  border-solid border border-gray-300 rounded-lg flex">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Nhập biển số xe"
                  className="border-none outline-none p-2.5 w-full rounded-lg bg-gray-50  text-gray-900"
                />
                <Tooltip content="Tìm kiếm">
                  <div
                    className="cursor-pointer p-3 transition-all hover:bg-main-gray"
                    onClick={handleSearch}
                  >
                    <IoMdSearch className="text-xl text-gray-700" />
                  </div>
                </Tooltip>
              </div>
            </div>
            <div className="mt-[25px]">
              Tổng số phương tiện:{' '}
              <span className="text-main">{vehicles.length}</span>
            </div>
            <div className="  mt-[25px] mx-auto flex flex-col gap-y-5">
              {vehicles.map((vehicle) => (
                <Fragment key={vehicle.vehicleId}>
                  <CardVehicle
                    vehicle={vehicle}
                    onHandleDelete={(vehicleId) =>
                      handleDeleteCenter(vehicleId)
                    }
                    navigate={navigate}
                  />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default Vehicles;
