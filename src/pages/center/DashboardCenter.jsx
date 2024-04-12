import { Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { FaCalendarAlt, FaCalendarPlus } from 'react-icons/fa';
import { GiConfirmed } from 'react-icons/gi';
import { MdFreeCancellation } from 'react-icons/md';
import { apiGetStatisticsAppointments } from '~/apis/statistics';
import ButtonDefault from '~/components/commons/ButtonDefault';
import CardStatistics from '~/components/commons/CardStatistics';

const DashboardCenter = () => {
  const [statisticsAppointments, setStatisticsAppointments] = useState({});

  useEffect(() => {
    loadStatisticsAppointments();
  }, []);
  const loadStatisticsAppointments = async () => {
    const response = await apiGetStatisticsAppointments();
    if (response.success) {
      const {
        totalAppointments,
        percentageIncrease,
        newAppointments,
        doneAppointments,
        cancelAppointments,
      } = response;
      setStatisticsAppointments({
        totalAppointments,
        percentageIncrease,
        newAppointments,
        doneAppointments,
        cancelAppointments,
      });
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-md ">
      <div className="mb-8 flex items-center justify-between gap-8 p-4">
        <Typography variant="h5" color="blue-gray">
          Thông tin trung tâm
        </Typography>
        <ButtonDefault
          disable={false}
          className="px-4 py-3 flex items-center"
          onClick={() => {
            loadStatisticsAppointments();
          }}
          variant="outlined"
        >
          Làm mới
        </ButtonDefault>
      </div>
      <div className="p-4 space-y-5">
        {/* user */}
        <div className="flex gap-x-5 ">
          <CardStatistics
            className="w-1/4"
            classNameData="text-gray-800"
            icon={<FaCalendarAlt className="text-2xl" />}
            title="Tổng số lịch hẹn"
            data={statisticsAppointments.totalAppointments}
            percent={
              <strong className="text-green-500">
                Tổng số lịch hẹn của trung tâm
              </strong>
            }
          />
          <CardStatistics
            className="w-1/4"
            classNameBoxIcon="bg-green-700"
            classNameData="text-green-500"
            icon={<GiConfirmed className="text-2xl" />}
            title="Đã hoàn thành"
            data={statisticsAppointments.doneAppointments}
            percent={
              <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                <strong className="text-green-500">
                  {(statisticsAppointments.doneAppointments /
                    statisticsAppointments.totalAppointments) *
                    100}
                  %
                </strong>
                &nbsp; tỉ lệ hoàn thành
              </p>
            }
          />
          <CardStatistics
            className="w-1/4"
            classNameBoxIcon="bg-red-500"
            classNameData="text-red-500"
            icon={<MdFreeCancellation className="text-2xl" />}
            title="Đã hủy"
            data={statisticsAppointments.cancelAppointments}
            percent={
              <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                <strong className="text-red-500">
                  {(statisticsAppointments.cancelAppointments /
                    statisticsAppointments.totalAppointments) *
                    100}
                  %
                </strong>
                &nbsp; tỉ lệ hủy lịch
              </p>
            }
          />
          <CardStatistics
            className="w-1/4"
            classNameBoxIcon="bg-main"
            classNameData="text-main"
            icon={<FaCalendarPlus className="text-2xl" />}
            title="Số lịch hẹn mới"
            data={statisticsAppointments.newAppointments}
            percent={
              <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                {statisticsAppointments.percentageIncrease >= 0 ? (
                  <strong className="text-green-500">
                    +{statisticsAppointments.percentageIncrease}%
                  </strong>
                ) : (
                  <strong className="text-red-500">
                    {statisticsAppointments.percentageIncrease}%
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

export default DashboardCenter;
