import { NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FiShoppingBag } from "react-icons/fi";
import { LiaUsersCogSolid } from "react-icons/lia";
import { BiMessageSquareDetail } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";

const AdminDashboardSidebar = () => {
  return (
    <div className="w-full h-[89vh] bg-[#3321cb] shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* Single item */}

      <NavLink
        to="/dashboard-admin/home"
        className={({ isActive }) =>
          `${
            isActive ? "text-[#17dd1f]" : "text-white"
          } w-full flex items-center p-4 `
        }
      >
        <RxDashboard size={30} />
        <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400]`}>
          Dashboard
        </h5>
      </NavLink>

      <NavLink
        to="/dashboard-admin/users"
        className={({ isActive }) =>
          `${
            isActive ? "text-[#17dd1f]" : "text-white"
          } w-full flex items-center p-4 `
        }
      >
        <LiaUsersCogSolid size={30} />
        <h5 className={` hidden 800px:block pl-2 text-[18px] font-[400]`}>
          Manage Users
        </h5>
      </NavLink>

      <NavLink
        to="/dashboard-admin-orders"
        className={({ isActive }) =>
        `${
          isActive ? "text-[#17dd1f]" : "text-white"
        } w-full flex items-center p-4 `
      }
      >
        <FiShoppingBag size={30} />
        <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400]`}>
          All Products
        </h5>
      </NavLink>

      <NavLink
        to="/dashboard-admin-messages"
        className={({ isActive }) =>
        `${
          isActive ? "text-[#17dd1f]" : "text-white"
        } w-full flex items-center p-4 `
      }
      >
        <BiMessageSquareDetail size={30} />
        <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] `}>
          Inbox{" "}
        </h5>
      </NavLink>

      <NavLink
        to="/dashboard-admin-settings"
        className={({ isActive }) =>
          `${
            isActive ? "text-[#17dd1f]" : "text-white"
          } w-full flex items-center p-4 `
        }
      >
        <CiSettings size={30} />
        <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] `}>
          Settings
        </h5>
      </NavLink>
    </div>
  );
};

export default AdminDashboardSidebar;
