import React from 'react';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from '@material-tailwind/react';
import ButtonDefault from '../commons/ButtonDefault';
import { Link } from 'react-router-dom';
import { useUserStore } from '~/store/useUserStore';
import { FaUserCircle } from 'react-icons/fa';

export default function Header() {
  const [openNav, setOpenNav] = React.useState(false);
  const { current, token } = useUserStore();

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="h6"
        color="blue-gray"
        className="p-1 hover:text-main font-medium"
      >
        <Link to="/" className="flex items-center">
          Trang chủ
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="h6"
        color="blue-gray"
        className="p-1 hover:text-main font-medium"
      >
        <a href="#" className="flex items-center">
          Đặt lịch
        </a>
      </Typography>
      <Typography
        as="li"
        variant="h6"
        color="blue-gray"
        className="p-1 hover:text-main font-medium"
      >
        <a href="#" className="flex items-center">
          Lịch hẹn
        </a>
      </Typography>
      <Typography
        as="li"
        variant="h6"
        color="blue-gray"
        className="p-1 hover:text-main font-medium"
      >
        <a href="#" className="flex items-center">
          Tin tức
        </a>
      </Typography>
    </ul>
  );

  return (
    <Navbar className=" mx-auto sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div className=" max-w-[1200px] mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          variant="h5"
          href="#"
          className="mr-4 cursor-pointer py-1.5 uppercase font-bold text-main"
        >
          <Link to="/">DKSMART</Link>
        </Typography>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          {/* xử lý tài khoản */}
          {current == token ? (
            <div className="flex items-center gap-x-1">
              <Link to="/login">
                <Button
                  variant="text"
                  size="sm"
                  className="hidden lg:inline-block"
                >
                  <span>Đăng nhập</span>
                </Button>
              </Link>
              <Link to="/register">
                <ButtonDefault
                  size="sm"
                  className="hidden lg:inline-block bg-main"
                >
                  <span>Đăng ký</span>
                </ButtonDefault>
              </Link>
            </div>
          ) : (
            <Link to="/profile">
              <div className="flex items-center gap-x-2">
                <FaUserCircle className="font-medium text-xl" />
                <span className="text-base font-medium">
                  {current.fullname}
                </span>
              </div>
            </Link>
          )}

          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <MobileNav open={openNav}>
        {navList}
        <div className="flex items-center gap-x-1">
          <Button fullWidth variant="text" size="sm" className="">
            <span>Log In</span>
          </Button>
          <Button fullWidth variant="gradient" size="sm" className="">
            <span>Sign in</span>
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  );
}
