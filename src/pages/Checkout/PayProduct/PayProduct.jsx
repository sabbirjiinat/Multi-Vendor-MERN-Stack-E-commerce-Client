import EmptyStates from "../../../components/EmptyStates/EmptyStates";
import UseCartData from "../../../hooks/UseCartData";
import styles from "../../../style/style";
import PayProductCard from "./PayProductCard";

const PayProduct = () => {
  const [addToCartProducts] = UseCartData();
  return (
    <div className={`${styles.section} pt-8`}>
      {addToCartProducts &&
        addToCartProducts.length > 0 &&
        Array.isArray(addToCartProducts) && (
          <>
            <div className={`${styles.heading}`}>
              <h1>Payment Intent Details</h1>
            </div>
            <div
              className="grid grid-cols-1 gap-[20px]
   lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-3 xl:gap-[30px] mb-12"
            >
              {addToCartProducts &&
                addToCartProducts.map((i, index) => (
                  <PayProductCard key={index} data={i} />
                ))}
            </div>
          </>
        )}
      {addToCartProducts && addToCartProducts.length === 0 ? (
        <EmptyStates title="No products found!" />
      ) : null}
    </div>
  );
};

export default PayProduct;
