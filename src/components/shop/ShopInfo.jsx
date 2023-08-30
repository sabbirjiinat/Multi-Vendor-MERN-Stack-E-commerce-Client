import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import styles from "../../style/style";
import {Link} from 'react-router-dom'
const ShopInfo = () => {
    const {user} = useContext(AuthContext)
    return (
        <div>
      <div className="w-full py-5">
        <div className="w-full flex item-center justify-center">
          <img
            src={`${user?.photoURL}`}
            alt=""
            className="w-[150px] h-[150px] object-cover rounded-full"
          />
        </div>
        <h3 className="text-center py-2 text-[20px]">{user?.displayName}</h3>
        <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam odio vitae pariatur ex tenetur in alias! 
        </p>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Address</h5>
        <h4 className="text-[#000000a6]">Patnitala, Naogoan</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Phone Number</h5>
        <h4 className="text-[#000000a6]">+8801777051339</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Total Products</h5>
        <h4 className="text-[#000000a6]">35</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Shop Ratings</h5>
        <h4 className="text-[#000000b0]">4/5</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Joined On</h5>
        <h4 className="text-[#000000b0]">18 August</h4>
      </div>
      {user && (
        <div className="py-3 px-4">
           <Link to="/settings">
           <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}>
            <span className="text-white">Edit Shop</span>
          </div>
           </Link>
          <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
          >
            <span className="text-white">Log Out</span>
          </div>
        </div>
      )}
    </div>
    );
};

export default ShopInfo;