import { Route, Routes } from 'react-router-dom';
import path from './utils/path';
import { AuthLayout, Home, Login, Register } from './pages/public';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUserStore } from './store/useUserStore';
import { AdminLayout } from './pages/admin';
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/user/Users';
import AddUser from './pages/admin/user/AddUser';
import UpdateUser from './pages/admin/user/UpdateUser';
import Provinces from './pages/admin/province/Provinces';
import AddProvince from './pages/admin/province/AddProvince';
import UpdateProvince from './pages/admin/province/UpdateProvince';
import Centers from './pages/admin/center/Centers';
import AddCenter from './pages/admin/center/AddCenter';
import UpdateCenter from './pages/admin/center/UpdateCenter';
import ProfileUser from './pages/admin/ProfileUser';

function App() {
  const navigate = useNavigate();
  const { getCurrent, current, token } = useUserStore();

  useEffect(() => {
    getCurrent();
  }, [token]);
  // console.log(current);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* auth layout */}
        <Route path={path.AUTH_LAYOUT} element={<AuthLayout />}>
          <Route path={path.LOGIN} element={<Login navigate={navigate} />} />
          <Route
            path={path.REGISTER}
            element={<Register navigate={navigate} />}
          />
        </Route>
        {/* admin */}
        {current?.roleId == 1 && (
          <Route path="admin" element={<AdminLayout navigate={navigate} />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="create-user" element={<AddUser />} />
            <Route path="update-user/:userId" element={<UpdateUser />} />
            <Route path="provinces" element={<Provinces />} />
            <Route path="create-province" element={<AddProvince />} />
            <Route
              path="update-province/:provinceId"
              element={<UpdateProvince />}
            />
            <Route path="centers" element={<Centers />} />
            <Route path="create-center" element={<AddCenter />} />
            <Route path="update-center/:centerId" element={<UpdateCenter />} />
            <Route path="profile" element={<ProfileUser />} />
          </Route>
        )}
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
    </div>
  );
}

export default App;
