import DashboardHeader from "../../components/shop/Layout/DashboardHeader.jsx";
import DashboardSidebar from "../../components/shop/Layout/DashboardSidebar";
import { Outlet } from "react-router-dom";
const ShopDashboardPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[220px]">
          <DashboardSidebar />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default ShopDashboardPage;
