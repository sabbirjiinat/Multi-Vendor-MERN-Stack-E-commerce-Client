import { Link } from "react-router-dom";
import { CgTrash } from "react-icons/cg";
import Swal from "sweetalert2";

import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import UseCartData from "../../../hooks/UseCartData";
const PayProductCard = ({ data }) => {
  const [axiosSecure] = UseAxiosSecure();
  const [, cartDataRefetch] = UseCartData();

  const handleDeleteCartProduct = (item) => {
    axiosSecure.delete(`/addToCart/${item._id}`).then((data) => {
      if (data.data.deletedCount > 0) {
        cartDataRefetch();
        Swal.fire(
          "Deleted!",
          "This product is deleted successfully",
          "success"
        );
      }
    });
  };
  return (
    <>
      <div className="w-full bg-[#fff]  border-[2px] border-gray-300 rounded-lg  p-3 cursor-pointer flex items-center justify-between gap-5 shadow-md">
        <div className="w-[200px]">
          <Link to={`/product/${data.addToCartId}`}>
            <img
              src={data.image}
              alt=""
              className="w-full object-contain h-[100px]"
            />
          </Link>
        </div>
        
        <div className="w-[300px] text-gray-700 font-bold font-Roboto text-base">
          <Link to={`/product/${data.addToCartId}`}>
            <h4 className="pb-3">{data.name}</h4>
          </Link>
          <div>
            <p className="text-[#fd4664]">
              Price: {data.price}
            </p>
            <p>
              Quantity: {data.quantity}
            </p>
          </div>
        </div>

        <div>
          <CgTrash
            size={25}
            className="cursor-pointer"
            onClick={() => handleDeleteCartProduct(data)}
            color="#fd4664"
            title="Delete product"
          />
        </div>
      </div>
   
    </>
  );
};

export default PayProductCard;
