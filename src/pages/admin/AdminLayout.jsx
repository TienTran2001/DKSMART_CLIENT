import { Outlet } from 'react-router-dom';
// import { AdminSidebar } from '~/components';
import AdminSidebarMain from '~/components/sidebars/AdminSidebarMain';

const AdminLayout = () => {
  return (
    <main className="grid grid-cols-10 bg-main-gray ">
      <div className="col-span-2 ml-[15px] h-screen overflow-y-auto  border-r border-main-gray flex items-center">
        {/* <AdminSidebar /> */}
        <AdminSidebarMain />
      </div>
      <div className="col-span-8 bg-[#eceff180] max-h-screen overflow-y-auto p-[15px]">
        <Outlet />
      </div>
    </main>
  );
};

export default AdminLayout;
