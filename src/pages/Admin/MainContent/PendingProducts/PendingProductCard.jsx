import { Link } from "react-router-dom";
import styles from "../../../../style/style";
import { Rating } from "@smastrom/react-rating";
import { AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import ProductDetailCardModal from './ProductDetailCardModal'

const PendingProductCard = ({ data }) => {
    const [open,setOpen] = useState(false)
  return (
    <>
      <div className="w-full h-[390px] bg-white rounded-lg shadow-sm p-3  cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`/product/${data._id}`}>
          <img
            src={data.image_Url[0].url}
            alt=""
            className="w-full h-[170px] object-cover rounded-[4px]"
          />
        </Link>
       <div className="flex items-center justify-between">
       <Link to="/">
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <AiOutlineEye
            size={22}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
       </div>
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
        
        </div>
        <span className="font-[400] text-[17px] text-[#68d284]">
            {data.sellerEmail}
          </span>
        {/* Side options */}
          {open ? <ProductDetailCardModal setOpen={setOpen} data={data} /> : null}
       
      </div>
    </>
  );
};

export default PendingProductCard;
