import { Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCalendarAlt, FaCalendarPlus } from 'react-icons/fa';
import { GiConfirmed } from 'react-icons/gi';
import { IoMdSearch } from 'react-icons/io';
import { MdFreeCancellation } from 'react-icons/md';
import {
  apiGetStatisticsAppointments,
  apiGetStatisticsAppointmentsOfMonth,
} from '~/apis/statistics';
import { InputForm } from '~/components';
import ButtonDefault from '~/components/commons/ButtonDefault';
import CardStatistics from '~/components/commons/CardStatistics';
import { formatMonth } from '~/utils/contants';

const DashboardCenter = () => {
  const [statisticsAppointments, setStatisticsAppointments] = useState({});
  const [statisticsAppointmentsOfMonth, setStatisticsAppointmentsOfMonth] =
    useState({});
  const currentDate = new Date();
  // eslint-disable-next-line no-unused-vars
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1);
  // eslint-disable-next-line no-unused-vars
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [search, setSearch] = useState(`${currentYear}-${currentMonth}`);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  useEffect(() => {
    loadStatisticsAppointments();
    loadStatisticsAppointmentsOfMonth(currentMonth, currentYear);
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
  const loadStatisticsAppointmentsOfMonth = async (month, year) => {
    const response = await apiGetStatisticsAppointmentsOfMonth(month, year);
    if (response.success) {
      const { totalAppointments, doneAppointments, cancelAppointments } =
        response;
      setStatisticsAppointmentsOfMonth({
        totalAppointments,
        doneAppointments,
        cancelAppointments,
      });
    }
  };

  const handleSearch = (data) => {
    console.log(data);
    const [year, month] = data.registrationMonth.split('-');
    setSearch(data.registrationMonth);
    loadStatisticsAppointmentsOfMonth(month, year);
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
                  {isNaN(
                    (statisticsAppointments.doneAppointments /
                      statisticsAppointments.totalAppointments) *
                      100
                  )
                    ? 0
                    : (
                        (statisticsAppointments.doneAppointments /
                          statisticsAppointments.totalAppointments) *
                        100
                      ).toFixed(2)}
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
                  {isNaN(
                    (statisticsAppointments.cancelAppointments /
                      statisticsAppointments.totalAppointments) *
                      100
                  )
                    ? 0
                    : (
                        (statisticsAppointments.cancelAppointments /
                          statisticsAppointments.totalAppointments) *
                        100
                      ).toFixed(2)}
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
      <div className="p-4 space-y-5">
        <div className="md:flex items-center justify-between   space-y-[10px] md:space-y-0 ">
          {/* tìm kiếm */}

          <InputForm
            type="month"
            // value={search}
            register={register}
            id="registrationMonth"
            placeholder="Chọn ngày làm việc"
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

          <ButtonDefault
            disable={false}
            className="px-4 py-3 flex items-center"
            onClick={() => {
              loadStatisticsAppointmentsOfMonth(currentMonth, currentYear);
              setSearch(`${currentYear}-${currentMonth}`);
              setValue('registrationMonth', '');
            }}
            variant="outlined"
          >
            Làm mới
          </ButtonDefault>
        </div>
        <div className="flex gap-x-5 ">
          <CardStatistics
            className="w-1/4"
            classNameData="text-gray-800"
            icon={<FaCalendarAlt className="text-2xl" />}
            title="Số lịch hẹn"
            data={statisticsAppointmentsOfMonth.totalAppointments}
            percent={
              <strong className="text-green-500">
                Số lịch hẹn của tháng {formatMonth(search)}
              </strong>
            }
          />
          <CardStatistics
            className="w-1/4"
            classNameBoxIcon="bg-green-700"
            classNameData="text-green-500"
            icon={<GiConfirmed className="text-2xl" />}
            title="Đã hoàn thành"
            data={statisticsAppointmentsOfMonth.doneAppointments}
            percent={
              <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                <strong className="text-green-500">
                  {isNaN(
                    (statisticsAppointmentsOfMonth.doneAppointments /
                      statisticsAppointmentsOfMonth.totalAppointments) *
                      100
                  )
                    ? 0
                    : (
                        (statisticsAppointmentsOfMonth.doneAppointments /
                          statisticsAppointmentsOfMonth.totalAppointments) *
                        100
                      ).toFixed(2)}
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
            data={statisticsAppointmentsOfMonth.cancelAppointments}
            percent={
              <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                <strong className="text-red-500">
                  {isNaN(
                    (statisticsAppointmentsOfMonth.cancelAppointments /
                      statisticsAppointmentsOfMonth.totalAppointments) *
                      100
                  )
                    ? 0
                    : (
                        (statisticsAppointmentsOfMonth.cancelAppointments /
                          statisticsAppointmentsOfMonth.totalAppointments) *
                        100
                      ).toFixed(2)}
                  %
                </strong>
                &nbsp; tỉ lệ hủy lịch
              </p>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardCenter;
