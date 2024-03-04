import { Link, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div
      className="relative bg-repeat bg-cover bg-center h-screen"
      style={{
        backgroundImage: "url('/backgroundlog.avif')",
        backgroundRepeat: 'repeat',
      }}
    >
      <div className="absolute bg-repeat-y inset-0 bg-white md:bg-black md:bg-opacity-50 md:backdrop-blur-sm">
        <Link to="/">
          <h1 className="my-[30px] text-center uppercase text-main md:text-white tracking-wider text-[24px] font-bold ">
            DKSMARST
          </h1>
        </Link>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
