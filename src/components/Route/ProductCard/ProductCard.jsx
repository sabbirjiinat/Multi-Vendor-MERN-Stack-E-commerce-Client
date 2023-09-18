import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../../style/style";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import {FaShoppingCart} from 'react-icons/fa'
import ProductDetailCard from "./ProductDetailCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import UseAuth from "../../../hooks/UseAuth";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import UseAllWishlist from "../../../hooks/UseAllWishlist";
import UseCartData from "../../../hooks/UseCartData";
import UseAdmin from "../../../hooks/UseAdmin";
import { RxCross1 } from "react-icons/rx";
import UseAllProducts from "../../../hooks/UseAllProducts";

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(null);
  const [open, setOpen] = useState(false);
  const { user } = UseAuth();
  const navigate = useNavigate();
  const [axiosSecure] = UseAxiosSecure();
  const [wishlistProducts, refetch] = UseAllWishlist();
  const [addToCartProducts, cartDataRefetch] = UseCartData();
  const [isAdmin] = UseAdmin();
  const [, approveProductsRefetch] = UseAllProducts();
  const [cart,setCart] = useState(null)


  useEffect(() => {
    const findWishListProduct =
      wishlistProducts &&
      wishlistProducts.find((items) => items.wishListId === data._id);
    setClick(findWishListProduct);
  }, [data._id, wishlistProducts]);

  useEffect(() => {
    const findCartProduct =
    addToCartProducts &&
    addToCartProducts.find((items) => items.addToCartId === data._id);
    setCart(findCartProduct);
  }, [data._id, addToCartProducts]);



  const handleWishlist = (item) => {
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
      const { description, name, price, discount_price } = item;
      const wishlistProduct = {
        description,
        name,
        price: parseFloat(discount_price ? discount_price : price),
        image: item.image_Url[0].url,
        email: user?.email,
        wishListId: item._id,
        quantity:parseInt(1)
      };

      axiosSecure.post(`/wishlist`, wishlistProduct).then((data) => {
        if (data.data.insertedId) {
          refetch();
          toast.success(`This product is now in your wishlist`);
        }
      });
    }
  };

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
      const { description, name, price, discount_price } = item;
      const addToCartProduct = {
        description,
        name,
        price: parseFloat(discount_price ? discount_price : price),
        image: item.image_Url[0].url,
        email: user?.email,
        addToCartId: item._id,
        quantity:parseInt(1)
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

  const handleDeleteProduct = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/products/${item._id}`).then((data) => {
          if (data.data.deletedCount > 0) {
            approveProductsRefetch();
            Swal.fire(
              "Deleted!",
              "This product is deleted successfully",
              "success"
            );
          }
        });
      }
    });
  };

  const handleNotification = () => {
    toast.error("You have already bookmarked this product");
  };
  const handleCartNotify = () => {
    toast.error("This product is already in cart");
  };



  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`/product/${data._id}`}>
          <img
            src={data.image_Url[0].url}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link to="/">
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <Link to={`/product/${data._id}`}>
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>
        </Link>
        <div className="flex">
          <Rating style={{ maxWidth: 100 }} value={data.rating} readOnly />
        </div>
        <div className="py-2 flex items-center justify-between">
          <div className="flex">
            <h5 className={`${styles.productDiscountPrice}`}>
              {data.price === 0 ? data.price : data.discount_price}$
            </h5>
            <h4 className={`${styles.price}`}>
              {data.price ? data.price + " $" : null}
            </h4>
          </div>
          <span className="font-[400] text-[17px] text-[#68d284]">
            {data.total_sell ? data.total_sell : ""} sold
          </span>
        </div>
        {/* Side options */}
        <div>
          {/* TODO: after wishlist the heart will be red */}
          {click?.wishListId === data._id ? (
            <AiFillHeart
              onClick={handleNotification}
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              color={click?.wishListId === data._id ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => {
                handleWishlist(data);
              }}
              color="#333"
              title="Add to wishlist"
            />
          )}
         
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
           {cart?.addToCartId === data._id ?(
              <FaShoppingCart
              size={23}
              className="cursor-pointer absolute right-2 top-24"
              onClick={ handleCartNotify}
              color={cart?.addToCartId === data._id ? "red" : "#444"}
              title="Add to cart"
            />
           ):(
            <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => handleAddToCart(data)}
            color="#444"
            title="Add to cart"
          />
           )}
          
          {isAdmin && (
            <RxCross1
              size={25}
              className="cursor-pointer absolute right-2 top-36"
              onClick={() => handleDeleteProduct(data)}
              color="#444"
              title="Delete product"
            />
          )}
          {open ? <ProductDetailCard setOpen={setOpen} data={data} click={click}  cart={cart} /> : null}
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
    </>
  );
};

export default ProductCard;
