import { Outlet } from 'react-router-dom';
import AdminSidebarMain from '~/components/sidebars/AdminSidebarMain';
import { centerSidebar } from '~/utils/contants';

// eslint-disable-next-line react/prop-types
const CenterAdminLayout = ({ navigate }) => {
  return (
    <main className="grid grid-cols-10 bg-main-gray ">
      <div className="col-span-2 ml-[15px] h-screen overflow-y-auto  border-r border-main-gray flex items-center">
        {/* <AdminSidebar /> */}
        <AdminSidebarMain
          navigate={navigate}
          navSidebar={centerSidebar}
          rou="manage-center"
        />
      </div>
      <div className="col-span-8 bg-[#eceff180] max-h-screen overflow-y-auto p-[15px]">
        <Outlet />
      </div>
    </main>
  );
};

export default CenterAdminLayout;
