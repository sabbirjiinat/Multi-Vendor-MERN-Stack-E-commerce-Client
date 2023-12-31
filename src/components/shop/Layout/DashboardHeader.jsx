import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { Link } from "react-router-dom";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";

const DashboardHeader = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="w-full h-[70px] bg-gray-200 sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt=""
          />
        </Link>
      </div>
      <div className="flex items-center">
      <div className="flex items-center mr-4">
          <Link to="/dashboard/coupons" className="hidden 800px:block">
            <AiOutlineGift
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard/events" className="hidden 800px:block">
            <MdOutlineLocalOffer
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard/products" className="hidden 800px:block">
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard/orders" className="hidden 800px:block">
            <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
          </Link>
          <Link to="/dashboard/messages" className="hidden 800px:block">
            <BiMessageSquareDetail
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          {/* Todo seller id and image*/}
          <Link to={`/dashboard-seller/profile`}>
            <img
              className="w-[50px] h-[50px] rounded-full object-cover"
              src={user?.photoURL}
              alt=""
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
