import { Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { FaUser, FaUserPlus } from 'react-icons/fa';
import { GiHomeGarage } from 'react-icons/gi';
import {
  apiGetStatisticsCenters,
  apiGetStatisticsUsers,
} from '~/apis/statistics';
import ButtonDefault from '~/components/commons/ButtonDefault';
import CardStatistics from '~/components/commons/CardStatistics';

const Dashboard = () => {
  const [statisticsCenters, setStatisticsCenters] = useState({});
  const [statisticsUsers, setStatisticsUsers] = useState({});
  useEffect(() => {
    loadStatisticsCenters();
    loadStatisticsUsers();
  }, []);
  const loadStatisticsCenters = async () => {
    const response = await apiGetStatisticsCenters();
    if (response.success) {
      const { totalCenters, activeCenters, inactiveCenters } = response;
      setStatisticsCenters({ totalCenters, activeCenters, inactiveCenters });
    }
  };
  const loadStatisticsUsers = async () => {
    const response = await apiGetStatisticsUsers();
    if (response.success) {
      const { totalUsers, percentageIncrease, newUsers } = response;
      setStatisticsUsers({ totalUsers, percentageIncrease, newUsers });
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-md ">
      <div className="mb-8 flex items-center justify-between gap-8 p-4">
        <Typography variant="h5" color="blue-gray">
          Thông tin hệ thống
        </Typography>
        <ButtonDefault
          disable={false}
          className="px-4 py-3 flex items-center"
          onClick={() => {
            loadStatisticsCenters();
            loadStatisticsUsers();
          }}
          variant="outlined"
        >
          Làm mới
        </ButtonDefault>
      </div>
      <div className="p-4 space-y-5">
        <div className="flex gap-x-5 ">
          <CardStatistics
            className="w-1/4"
            classNameData="text-gray-800"
            icon={<GiHomeGarage className="text-2xl" />}
            title="Tổng số trung tâm"
            data={statisticsCenters.totalCenters}
            percent={
              <strong className="text-green-500">Hợp tác với hệ thống</strong>
            }
          />
          <CardStatistics
            className="w-1/4"
            classNameBoxIcon="bg-green-700"
            classNameData="text-green-800"
            icon={<GiHomeGarage className="text-2xl" />}
            title="Đang nhận lịch"
            data={statisticsCenters.activeCenters}
            percent={
              <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                <strong className="text-green-500">
                  {(statisticsCenters.activeCenters /
                    statisticsCenters.totalCenters) *
                    100}
                  %
                </strong>
                &nbsp; tỉ lệ trung tâm
              </p>
            }
          />
          <CardStatistics
            className="w-1/4"
            classNameBoxIcon="bg-red-700"
            classNameData="text-red-700"
            icon={<GiHomeGarage className="text-2xl" />}
            title="Ngưng nhận lịch"
            data={statisticsCenters.inactiveCenters}
            percent={
              <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                <strong className="text-red-500">
                  {(statisticsCenters.inactiveCenters /
                    statisticsCenters.totalCenters) *
                    100}
                  %
                </strong>
                &nbsp; tỉ lệ trung tâm
              </p>
            }
          />
        </div>

        {/* user */}
        <div className="flex gap-x-5 ">
          <CardStatistics
            className="w-1/4"
            classNameData="text-gray-800"
            icon={<FaUser />}
            title="Tổng số tài khoản"
            data={statisticsUsers.totalUsers}
            percent={
              <strong className="text-green-500">
                Tổng số tài khoản trong hệ thống
              </strong>
            }
          />
          <CardStatistics
            className="w-1/4"
            classNameBoxIcon="bg-main"
            classNameData="text-main"
            icon={<FaUserPlus className="text-xl" />}
            title="Số tài khoản mới"
            data={statisticsUsers.newUsers}
            percent={
              <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                {statisticsUsers.percentageIncrease >= 0 ? (
                  <strong className="text-green-500">
                    +{statisticsUsers.percentageIncrease}%
                  </strong>
                ) : (
                  <strong className="text-red-500">
                    {statisticsUsers.percentageIncrease}%
                  </strong>
                )}
                &nbsp; so với ngày hôm qua
              </p>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
