import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../style/style";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import UseAuth from "../../hooks/UseAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import UseAllWishlist from "../../hooks/UseAllWishlist";
import UseCartData from "../../hooks/UseCartData";

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  // const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const { user } = UseAuth();
  const [axiosSecure] = UseAxiosSecure();
  const [, refetch] = UseAllWishlist();
  const [, cartDataRefetch] = UseCartData();

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const totalPrice = data.discount_price
    ? data.discount_price * count
    : data.price * count;

  /* Handle add to wishlist */
  const addToWishlist = (item) => {
    console.log(item);
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
        price: parseFloat(totalPrice),
        image: item.image_Url[0].url,
        email: user?.email,
        wishListId: item._id,
      };

      axiosSecure.post(`/wishlist`, wishlistProduct).then((data) => {
        if (data.data.insertedId) {
          refetch();

          toast.success(`This product is now in your wishlist`, {
            position: "top-center",
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

  /* Handle add to cart */
  const handleAddToCart = (item) => {
    console.log(item);
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
        price: parseFloat(totalPrice),
        image: item.image_Url[0].url,
        email: user?.email,
        addToCartId: item._id,
      };

      axiosSecure.post(`/addToCart`, addToCartProduct).then((data) => {
        if (data.data.insertedId) {
          cartDataRefetch();
          toast.success(`This product is now in your cart`, {
            position: "top-center",
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

  const handleMessageSubmit = () => {
    navigate("");
  };
  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  className="w-[80%] "
                  src={data.image_Url[0].url}
                  alt=""
                />
               {/* <div className="w-full flex">
                  <div
                    className={`${
                   select === 0 ? "border" : "null"
                   } cursor-pointer`}
                  >
                 <img
                      className="h-[200px]"
                      onClick={() => setSelect(0)}
                      src={data && data.image_Url[0].url}
                      alt=""
                    /> 
                  </div>
                   <div
                     className={`${
                       select === 1 ? "border" : "null"
                 } cursor-pointer`}
                  >
                     <img
                      className="h-[200px]"
                      // onClick={() => setSelect(1)}
                      src={
                        data && data.image_Url[1]?.url
                          ? data.image_Url[1].url
                          : data.image_Url[0].url
                      }
                      alt=""
                    /> 
                   </div> 
                </div> */}
              </div>
              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {totalPrice}$
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
                    {click ? (
                      <AiFillHeart
                        size={22}
                        className="cursor-pointer"
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={22}
                        className="cursor-pointer"
                        onClick={() => {
                          addToWishlist(data);
                          setClick(!click);
                        }}
                        color={click ? "red" : "#333"}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  onClick={() => handleAddToCart(data)}
                  className={`${styles.button} !mt-6 !rounded !h-11 flex justify-center`}
                >
                  <span className="text-white flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
                <div className="flex items-center pt-8">
                  <img
                    src={data.shop.shop_avatar.url}
                    className="w-[50px] h-[50px] rounded-full mr-2"
                    alt=""
                  />
                  <div className="pr-8">
                    <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                      {data.shop.name}
                    </h3>
                    <h5 className="pb-3 text-[15px]">
                      ({data.shop.ratings}) Ratings
                    </h5>
                  </div>
                  <div
                    className={`${styles.button} bg-[#6443d1] mt-4 !rounded h-11`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo data={data} />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);
  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(2)}
          >
            Product Review
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
            eveniet alias voluptatum obcaecati blanditiis est culpa, accusamus
            sequi porro quidem magni accusantium sint sed veritatis consequatur
            excepturi, maxime aspernatur expedita!
          </p>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
            eveniet alias voluptatum obcaecati blanditiis est culpa, accusamus
            sequi porro quidem magni accusantium sint sed veritatis consequatur
            excepturi, maxime aspernatur expedita!
          </p>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
            eveniet alias voluptatum obcaecati blanditiis est culpa, accusamus
            sequi porro quidem magni accusantium sint sed veritatis consequatur
            excepturi, maxime aspernatur expedita!
          </p>
        </>
      ) : null}
      {active === 2 ? (
        <div className="w-full justify-center min-h-[40vh] flex items-center">
          <p>No Review Yet!</p>
        </div>
      ) : null}
      {active === 3 ? (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <div className="flex items-center">
              <img
                className="w-[50px] h-[50px] rounded-full"
                src={data.shop.shop_avatar.url}
                alt=""
              />
              <div className="pl-3">
                <h3 className={styles.shop_name}>{data.shop.name}</h3>
                <h5 className=" pb-3 text-[15px]">
                  ({data.shop.ratings}) Ratings
                </h5>
              </div>
            </div>
            <p className="pt-2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas
              similique facilis velit mollitia porro accusantium dolore possimus
              provident voluptates, doloremque ipsam magnam, eligendi sint,
              natus dicta! Alias suscipit aperiam molestias.
            </p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on: <span className="font-[500]">22 August, 2023</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products: <span className="font-[500]">1,223</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews: <span className="font-[500]">223</span>
              </h5>
              <Link to="/">
                <div className={`${styles.button} !rounded !h-[39.5px] mt-3`}>
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
          <ToastContainer
            position="top-center"
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

export default ProductDetails;
