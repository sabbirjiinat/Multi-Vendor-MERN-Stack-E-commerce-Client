import { RxCross1 } from "react-icons/rx";
import styles from "../../../../style/style";
import { AiOutlineMessage } from "react-icons/ai";
import UseAxiosSecure from "../../../../hooks/UseAxiosSecure";
const ProductDetailCardModal = ({ setOpen, data }) => {
  const [axiosSecure] = UseAxiosSecure();
  const handleApproveProduct = (item) => {
    axiosSecure
      .patch(`/allProducts/${item._id}`, { status: "approve" })
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[80%] h-[90vh] overflow-y-scroll 800px:h-[85vh] bg-white rounded-md shadow-sm relative p-4">
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
                  <div
                    className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11 ml-6`}
                  >
                    <span className="text-[#fff] flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full 800px:w-[50%] pt-5 pl-[5px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data.name}
                </h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discount_price ? data.discount_price : data.price}
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.price ? data.price + "$" : null}
                  </h3>
                </div>

                <div
                  onClick={() => handleApproveProduct(data)}
                  className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                >
                  <span className="text-[#fff] flex items-center">Approve</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailCardModal;
