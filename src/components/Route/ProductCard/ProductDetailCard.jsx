import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../style/style";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import UseAuth from "../../../hooks/UseAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import UseAllWishlist from "../../../hooks/UseAllWishlist";
import UseCartData from "../../../hooks/UseCartData";

const ProductDetailCard = ({ setOpen, data, click, cart }) => {
  const [count, setCount] = useState(1);

  const { user } = UseAuth();
  const navigate = useNavigate();
  const [axiosSecure] = UseAxiosSecure();
  const [, refetch] = UseAllWishlist();
  const [, cartDataRefetch] = UseCartData();

  const handleMessageSubmit = () => {};
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const incrementCount = () => {
    setCount(count + 1);
  };

  const totalPrice = data.discount_price
    ? data.discount_price * count
    : data.price * count;

  /* Handle add to wishlist */
  const addToWishlist = (item) => {

    if (!user) {
      Swal.fire({
        title: "You need to login first for wishlist!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3321cb",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, get me there!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      const { description, name } = item;
      const wishlistProduct = {
        description,
        name,
        price: parseFloat(
          data.discount_price ? data.discount_price : data.price
        ),
        image: item.image_Url[0].url,
        email: user?.email,
        wishListId: item._id,
        quantity: parseInt(count),
      };

      axiosSecure.post(`/wishlist`, wishlistProduct).then((data) => {
        if (data.data.insertedId) {
          refetch();

          setOpen(false);
          toast.success(`This product is now in your wishlist`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
    }
  };

  const handleNotification = () => {
    toast.error("You have already bookmarked this product");
  };

  /* Handle add to cart */
  const handleAddToCart = (item) => {

    if (!user) {
      Swal.fire({
        title: "You need to login first for add to cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3321cb",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, get me there!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      const { description, name } = item;
      const addToCartProduct = {
        description,
        name,
        price: parseFloat(
          data.discount_price ? data.discount_price : data.price
        ),
        image: item.image_Url[0].url,
        email: user?.email,
        addToCartId: item._id,
        quantity: parseInt(count),
      };

      axiosSecure.post(`/addToCart`, addToCartProduct).then((data) => {
        if (data.data.insertedId) {
          cartDataRefetch();
          setOpen(false);
          toast.success(`This product is now in your cart`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
    }
  };

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />
            <div className="block w-full 800px:flex">
              <div className="full 800px:w-[50%]">
                <img src={data.image_Url[0].url} alt="" />
                <div className="flex items-center">
                  <img
                    src={data.shop.shop_avatar.url}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  <div>
                    <h3 className={styles.shop_name}>{data.shop.name}</h3>
                    <h5 className=" pb-3 text-[15px]">
                      ({data.shop.ratings}) Ratings
                    </h5>
                  </div>
                </div>
                <div
                  className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
                <h5 className="text-[16px] text-[red] mt-5">
                  ({data.total_sell}) Sold out
                </h5>
              </div>
              <div className="w-full 800px:w-[50%] pt-5 pl-[5px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data.name}
                </h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {totalPrice}
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.price ? data.price + "$" : null}
                  </h3>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      onClick={decrementCount}
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition"
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[10px]">
                      {count}
                    </span>
                    <button
                      onClick={incrementCount}
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition"
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click?.wishListId === data._id ? (
                      <AiFillHeart
                        onClick={handleNotification}
                        size={22}
                        className="cursor-pointer"
                        color={click?.wishListId === data._id ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={22}
                        className="cursor-pointer"
                        onClick={() => {
                          addToWishlist(data);
                        }}
                        color="#333"
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <button
                  disabled={cart?.addToCartId === data._id}
                  onClick={() => handleAddToCart(data)}
                  className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center disabled:cursor-not-allowed disabled:bg-rose-700`}
                >
                  <span className="text-[#fff] flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </button>
              </div>
            </div>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailCard;
