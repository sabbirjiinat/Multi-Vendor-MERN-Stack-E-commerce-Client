import AdminDashboardNavbar from "../Layout/AdminDashboardNavbar";
import AdminDashboardSidebar from "../Layout/AdminDashboardSidebar";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div>
      <AdminDashboardNavbar />
      <div className="flex">
        <div className="w-[80px] 800px:w-[290px]">
          <AdminDashboardSidebar />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
