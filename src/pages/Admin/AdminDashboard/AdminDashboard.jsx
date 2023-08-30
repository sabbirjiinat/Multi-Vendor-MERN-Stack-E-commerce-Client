import { Outlet } from "react-router-dom";
import Layout from "../../../pages/Admin/Layout/Layout";
const AdminDashboard = () => {
  return (
    <div>
      <Layout />
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
