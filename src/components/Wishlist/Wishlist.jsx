import { RxCross1 } from "react-icons/rx";
import styles from "../../style/style";
import { BsCartPlus } from "react-icons/bs";
import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import UseAllWishlist from "../../hooks/UseAllWishlist";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import UseCartData from "../../hooks/UseCartData";

const Wishlist = ({ setOpenWishlist }) => {
  const [wishlistProducts] = UseAllWishlist();

  return (
    <div className="fixed   top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed  top-0 right-0 h-full w-[50%] bg-white flex flex-col justify-between shadow-sm overflow-y-scroll">
        <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              size={25}
              onClick={() => setOpenWishlist(false)}
              className="cursor-pointer text-rose-600"
            />
          </div>
          {/* Item length */}
          <div className={`${styles.noramlFlex} p-4`}>
            <AiOutlineHeart size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">
              {wishlistProducts.length} items
            </h5>
          </div>
          {/* Cart single items */}
          <br />
          <div className="w-full border-t">
            {wishlistProducts &&
              wishlistProducts.map((i, index) => (
                <CartSingle key={index} data={i} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const [, cartDataRefetch] = UseCartData();
  const [value] = useState(1);
  const totalPrice = data.price * value;
  const [axiosSecure] = UseAxiosSecure();
  const [, refetch] = UseAllWishlist();
  const handleDeleteWishlistProduct = (data) => {
    axiosSecure.delete(`/wishlist/${data._id}`).then((data) => {
      if (data.data.deletedCount > 0) {
        refetch();
      }
    });
  };

  const handleAddToCart = (addToCartData) => {
    const { description, name, price, image, email, discount_price } =
      addToCartData;
    const addToCartProduct = {
      addToCartId: addToCartData.wishListId,
      description,
      name,
      price: parseFloat(price),
      image,
      email,
      discount_price: parseFloat(discount_price),
    };
    axiosSecure.post(`/addToCart`, addToCartProduct).then((data) => {
      if (data.data.insertedId) {
        axiosSecure.delete(`/wishlist/${addToCartData._id}`).then((data) => {
          if (data.data.deletedCount > 0) {
            refetch();
            cartDataRefetch();
          }
        });
      }
    });
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center !justify-center gap-4">
        <RxCross1
          className=" cursor-pointer text-rose-700"
          size={30}
          onClick={() => handleDeleteWishlistProduct(data)}
        />

        <div className="w-[150px] h-[150px] flex items-center justify-center">
          <img className="w-full" src={data.image} alt="" />
        </div>

        <div className="pl-[5px]">
          <h1>{data.name.slice(0, 40)}...</h1>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US${data.discount_price ? data.discount_price : totalPrice}
          </h4>
        </div>

        <BsCartPlus
          onClick={() => handleAddToCart(data)}
          size={30}
          className="cursor-pointer"
          title="Add to cart"
        />
      </div>
    </div>
  );
};
export default Wishlist;
