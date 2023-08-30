import { useState } from "react";
import AdminDashboardNavbar from "../Layout/AdminDashboardNavbar";
import AdminDashboardSidebar from "../Layout/AdminDashboardSidebar";
const Layout = () => {
    const [active] = useState(1)
  return (
    <div>
      <AdminDashboardNavbar />
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[220px]">
          <AdminDashboardSidebar active={active} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
