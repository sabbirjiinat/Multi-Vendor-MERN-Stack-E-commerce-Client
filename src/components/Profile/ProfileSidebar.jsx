import {
  
  AiOutlineLogin,
  AiOutlineMessage,
} from "react-icons/ai";
import {  HiOutlineShoppingBag } from "react-icons/hi";
import { RxPerson } from "react-icons/rx";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);

  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "red" : ""} />
        <span
          className={`hidden 800px:block pl-3 ${
            active === 1 ? "text-[red]" : ""
          }`}
        >
          Profile
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
        <span
          className={`pl-3 hidden 800px:block ${
            active === 2 ? "text-[red]" : ""
          }`}
        >
          Order
        </span>
      </div>
    
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4) || navigate("/inbox")}
      >
        <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
        <span
          className={`pl-3 hidden 800px:block ${
            active === 4 ? "text-[red]" : ""
          }`}
        >
          Inbox
        </span>
      </div>

     
    
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => {
          setActive(8);
          logOut();
          navigate("/");
        }}
      >
        <AiOutlineLogin size={20} color={active === 8 ? "red" : ""} />
        <span
          className={`pl-3 hidden 800px:block ${
            active === 8 ? "text-[red]" : ""
          }`}
        >
          Logout
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
