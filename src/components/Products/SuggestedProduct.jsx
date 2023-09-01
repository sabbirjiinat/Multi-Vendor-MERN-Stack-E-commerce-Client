import styles from "../../style/style";
import ProductCard from "../Route/ProductCard/ProductCard";
import UseAllProducts from "../../hooks/UseAllProducts";

const SuggestedProduct = ({ data }) => {
  const [products] = UseAllProducts();
  const suggestProduct =
    products && products.filter((i) => i.category === data.category);

  return (
    <div>
      {data ? (
        <div className={`p-4 ${styles.section}`}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
          >
            Related Products
          </h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
            {suggestProduct &&
              suggestProduct.map((i, index) => (
                <ProductCard key={index} data={i} />
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;
