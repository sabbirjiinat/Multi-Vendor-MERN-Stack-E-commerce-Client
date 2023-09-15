import { RxCross1 } from "react-icons/rx";
import styles from "../../style/style";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { useState } from "react";
import { Link } from "react-router-dom";
import UseCartData from "../../hooks/UseCartData";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
const Cart = ({ setOpenCart }) => {
  const [addToCartProducts] = UseCartData();

  let totalSumOfProducts = 0;
  for (const product of addToCartProducts) {
    totalSumOfProducts = product.discount_price
      ? product.discount_price + totalSumOfProducts
      : product.price + totalSumOfProducts;
  }

  return (
    <div
    data-aos="fade-left"
    data-aos-duration="500"
    className="fixed   top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed  top-0 right-0 h-full w-[50%] bg-white flex flex-col justify-between shadow-sm overflow-y-scroll">
        <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              size={25}
              onClick={() => setOpenCart(false)}
              className="cursor-pointer text-rose-600"
            />
          </div>
          {/* Item length */}
          <div className={`${styles.noramlFlex} p-4`}>
            <IoBagHandleOutline size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">
              {addToCartProducts.length} items
            </h5>
          </div>
          {/* Cart single items */}
          <br />
          <div className="w-full border-t">
            {addToCartProducts &&
              addToCartProducts.map((i, index) => (
                <CartSingle
                  key={index}
                  totalSumOfProducts={totalSumOfProducts}
                  data={i}
                />
              ))}
          </div>
        </div>
        <div className="px-5 mb-3">
          {/* Checkout button */}
          <Link onClick={() => setOpenCart(false)} to="/checkout">
            <div className="h-[45px] flex items-center justify-center w-[100%] bg-[#4437bc] hover:bg-[#3321cb] rounded-[6px] transition-colors">
              <h1 className="text-[#fff] text-[18px] font-[600]">
                Checkout ${totalSumOfProducts}
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const [axiosSecure] = UseAxiosSecure();
  const [, cartDataRefetch] = UseCartData();
  const [value, setValue] = useState(1);

  const totalPrice = data.discount_price
    ? data.discount_price * value
    : data.price * value;

  const handleDeleteCartProduct = (item) => {
    axiosSecure.delete(`/addToCart/${item._id}`).then((data) => {
      if (data.data.deletedCount > 0) {
        cartDataRefetch();
      }
    });
  };



  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center justify-between">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => setValue(value + 1)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{value}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => setValue(value === 1 ? 1 : value - 1)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img src={data.image} alt="" className="w-[80px] ml-2" />
        <div className="pl-[5px]">
          <h1>{data.name.slice(0, 30)}...</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ${data.discount_price ? data.discount_price : data.price} * {value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US$ {totalPrice}
          </h4>
        </div>
        <RxCross1
          onClick={() => handleDeleteCartProduct(data)}
          className="cursor-pointer text-rose-700 font-bold"
        />
      </div>
    </div>
  );
};
export default Cart;
