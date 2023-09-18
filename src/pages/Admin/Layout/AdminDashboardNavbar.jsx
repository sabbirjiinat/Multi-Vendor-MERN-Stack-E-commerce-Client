import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import {NavLink} from 'react-router-dom'
import {FiPackage, FiShoppingBag} from 'react-icons/fi'
import {BiMessageSquareDetail} from 'react-icons/bi'


const AdminDashboardNavbar = () => {
    const {user} = useContext(AuthContext)
    return (
        <div className="w-full h-[70px] bg-gray-200 sticky top-0 left-0 z-30 flex items-center justify-between px-4">
            <div>
            <NavLink to='/'>
                <img src="https://shopo.quomodothemes.website/assets/images/logo.svg" alt="" />
            </NavLink>
            </div>
            <div className="flex items-center">
                <div className="flex items-center mr4">
                  <NavLink to='/dashboard/products'  className={({isActive})=> `${isActive ? 'text-rose-700':'text-[#555]'} hidden 800px:block `}>
                <FiShoppingBag color='#555' size={30} className='mx-5 cursor-pointer'/>
                  </NavLink>
                  <NavLink to='/dashboard-admin/orders'  className={({isActive})=> `${isActive ? 'text-rose-700':'text-[#555]'} hidden 800px:block `}>
                <FiPackage  size={30} className='mx-5 cursor-pointer'/>
                  </NavLink>
                  <NavLink to='/dashboard/messages'  className={({isActive})=> `${isActive ? 'text-rose-700':'text-[#555]'} hidden 800px:block `}>
                <BiMessageSquareDetail color='#555' size={30} className='mx-5 cursor-pointer'/>
                  </NavLink>
                  {/* Todo seller id and image*/}
                  <NavLink to={`/shop/${'user'}`}>
               <img 
               className="w-[50px] h-[50px] rounded-full object-cover"
               src={user?.photoURL} alt="" />
                  </NavLink >
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardNavbar;