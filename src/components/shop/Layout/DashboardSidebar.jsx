import { NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";
const DashboardSidebar = () => {
  return (
    <div className="w-full h-[89vh] bg-gray-200 shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* Single item */}

      <NavLink
        to="/dashboard-seller"
        className={({ isActive }) =>
          `${
            isActive ? "text-[#17dd1f]" : ""
          }w-full flex items-center p-4 text-[#555]`
        }
      >
        <RxDashboard size={30} />
        <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400]`}>
          Dashboard
        </h5>
      </NavLink>

      <NavLink
        to="/dashboard-seller/orders"
        className={({ isActive }) =>
          `${
            isActive ? "text-[#17dd1f]" : ""
          }w-full flex items-center p-4 text-[#555]`
        }
      >
        <FiPackage size={30} />
        <h5 className={` hidden 800px:block pl-2 text-[18px] font-[400] `}>
          All Orders
        </h5>
      </NavLink>

      <NavLink
        to="/dashboard-orders"
        className={({ isActive }) =>
          `${
            isActive ? "text-[#17dd1f]" : ""
          }w-full flex items-center p-4 text-[#555]`
        }
      >
        <FiShoppingBag size={30} />
        <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400]`}>
          All Products
        </h5>
      </NavLink>

      <NavLink
        to="/dashboard-seller/create-product"
        className={({ isActive }) =>
          `${
            isActive ? "text-[#17dd1f]" : ""
          }w-full flex items-center p-4 text-[#555]`
        }
      >
        <AiOutlineFolderAdd size={30} />
        <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] `}>
          Create Products
        </h5>
      </NavLink>

      <NavLink
        to="/dashboard-events"
        className={({ isActive }) =>
          `${
            isActive ? "text-[#17dd1f]" : ""
          }w-full flex items-center p-4 text-[#555]`
        }
      >
        <MdOutlineLocalOffer size={30} />
        <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] `}>
          All Events
        </h5>
      </NavLink>

      <NavLink
        to="/dashboard-create-event"
        className={({ isActive }) =>
          `${
            isActive ? "text-[#17dd1f]" : ""
          }w-full flex items-center p-4 text-[#555]`
        }
      >
        <VscNewFile size={30} />
        <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] `}>
          Create Event
        </h5>
      </NavLink>

      <NavLink
        to="/dashboard-withdraw-money"
        className={({isActive})=> `${isActive ? 'text-[#17dd1f]':''}w-full flex items-center p-4 text-[#555]`}
      >
        <CiMoneyBill size={30} />
        <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] `}>
          Withdraw Money{" "}
        </h5>
      </NavLink>

      <NavLink
        to="/dashboard-messages"
        className={({ isActive }) =>
          `${
            isActive ? "text-[#17dd1f]" : ""
          }w-full flex items-center p-4 text-[#555]`
        }
      >
        <BiMessageSquareDetail size={30} />
        <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] `}>
          Shop Inbox{" "}
        </h5>
      </NavLink>

      <NavLink
        to="/dashboard-coupons"
        className={({ isActive }) =>
          `${
            isActive ? "text-[#17dd1f]" : ""
          }w-full flex items-center p-4 text-[#555]`
        }
      >
        <AiOutlineGift size={30} />
        <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400]`}>
          Discount Codes{" "}
        </h5>
      </NavLink>

      <NavLink
        to="/dashboard-refunds"
        className={({ isActive }) =>
          `${
            isActive ? "text-[#17dd1f]" : ""
          }w-full flex items-center p-4 text-[#555]`
        }
      >
        <HiOutlineReceiptRefund size={30} />
        <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] `}>
          Refunds
        </h5>
      </NavLink>

      <NavLink
        to="/dashboard-settings"
        className={({ isActive }) =>
          `${
            isActive ? "text-[#17dd1f]" : ""
          }w-full flex items-center p-4 text-[#555]`
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

export default DashboardSidebar;
