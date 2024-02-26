import clsx from 'clsx';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { adminSidebar } from '~/utils/contants';

const AdminSidebar = () => {
  return (
    <div className="h-screen p-4 w-full">
      <div className="flex flex-col">
        <div className="font-bold text-2xl text-center text-main ">DKSMART</div>
        <div className="font-bold text-base text-center mt-5">Quản trị</div>
        <div className="mt-6">
          {adminSidebar.map((item) => (
            <Fragment key={item.id}>
              <NavLink
                className={({ isActive }) =>
                  clsx(
                    'flex items-center  gap-x-3 text-gray-500 py-3 px-4  rounded-lg transition-all ',
                    isActive
                      ? 'bg-main-1 hover:bg-main-1 text-white'
                      : 'hover:bg-main-gray-1'
                  )
                }
                to={item.path}
              >
                <span>{item.icon}</span>
                <span className="text-base font-bold ">{item.name}</span>
              </NavLink>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
