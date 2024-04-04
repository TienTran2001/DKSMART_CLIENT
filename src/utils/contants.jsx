import path from './path';
import { RxDashboard } from 'react-icons/rx';
import { FaUserCircle } from 'react-icons/fa';
import { LuMapPin } from 'react-icons/lu';
import { GiHomeGarage } from 'react-icons/gi';
import { PiNewspaperClippingLight } from 'react-icons/pi';
import { FaCalendarAlt } from 'react-icons/fa';

// eslint-disable-next-line no-undef
export const adminSidebar = [
  {
    id: 1,
    name: 'Thống kê',
    path: `/${path.ADMIN_LAYOUT}/${path.DASHBOARD}`,
    icon: <RxDashboard />,
    type: 'SINGLE',
  },
  {
    id: 2,
    name: 'Tài khoản',
    path: ``,
    icon: <FaUserCircle />,
    type: 'PARENT',
    sub: [
      {
        id: 21,
        name: 'Tạo tài khoản',
        path: `/${path.ADMIN_LAYOUT}/create-user`,
      },
      {
        id: 22,
        name: 'Quản lý',
        path: `/${path.ADMIN_LAYOUT}/${path.USER}`,
      },
    ],
  },
  {
    id: 3,
    name: 'Tỉnh thành',
    path: ``,
    icon: <LuMapPin />,
    type: 'PARENT',
    sub: [
      {
        id: 31,
        name: 'Tạo tỉnh thành',
        path: `/${path.ADMIN_LAYOUT}/create-province`,
      },
      {
        id: 32,
        name: 'Quản lý',
        path: `/${path.ADMIN_LAYOUT}/provinces`,
      },
    ],
  },
  {
    id: 4,
    name: 'Trung tâm đăng kiểm',
    path: ``,
    icon: <GiHomeGarage />,
    type: 'PARENT',
    sub: [
      {
        id: 41,
        name: 'Tạo trung tâm',
        path: `/${path.ADMIN_LAYOUT}/create-center`,
      },
      {
        id: 42,
        name: 'Quản lý',
        path: `/${path.ADMIN_LAYOUT}/centers`,
      },
    ],
  },
  {
    id: 5,
    name: 'Tin tức',
    path: ``,
    icon: <PiNewspaperClippingLight />,
    type: 'PARENT',
    sub: [
      {
        id: 51,
        name: 'Tạo tin tức',
        path: `/${path.ADMIN_LAYOUT}/create-news`,
      },
      {
        id: 52,
        name: 'Quản lý',
        path: `/${path.ADMIN_LAYOUT}/news`,
      },
    ],
  },
];
// eslint-disable-next-line no-undef
export const centerSidebar = [
  {
    id: 1,
    name: 'Thống kê',
    path: `/manage-center/${path.DASHBOARD}`,
    icon: <RxDashboard />,
    type: 'SINGLE',
  },
  {
    id: 2,
    name: 'Tài khoản',
    path: ``,
    icon: <FaUserCircle />,
    type: 'PARENT',
    sub: [
      {
        id: 21,
        name: 'Tạo tài khoản',
        path: `/manage-center/create-user`,
      },
      {
        id: 22,
        name: 'Quản lý',
        path: `/manage-center/${path.USER}`,
      },
    ],
  },
  {
    id: 3,
    name: 'Lịch làm việc',
    path: ``,
    icon: <FaCalendarAlt />,
    type: 'PARENT',
    sub: [
      {
        id: 31,
        name: 'Tạo lịch làm việc',
        path: `/manage-center/create-shift`,
      },
      {
        id: 32,
        name: 'Quản lý',
        path: `/manage-center/shifts`,
      },
    ],
  },
  {
    id: 4,
    name: 'Lịch hẹn',
    path: `/manage-center/booking?status=all`,
    icon: <FaCalendarAlt />,
    type: 'SINGLE',
  },
];

export const formatDate = (data) => {
  const date = new Date(data); // Tạo đối tượng Date từ ngày ISO

  // Lấy các thành phần ngày, tháng, năm
  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
  const year = date.getFullYear();

  // Định dạng lại ngày theo dd/MM/YYYY
  const formattedDate = `${day < 10 ? '0' + day : day}/${
    month < 10 ? '0' + month : month
  }/${year}`;

  return formattedDate;
};

export function formatTime(timeString) {
  // Tách giờ và phút từ chuỗi thời gian
  const [hour, minute] = timeString.split(':');

  // Format giờ và phút
  const formattedTime = `${hour}h${minute}`;

  return formattedTime;
}

// eslint-disable-next-line react/prop-types
export function GoogleMapsLink({ address, children }) {
  const encodedAddress = encodeURIComponent(address);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
