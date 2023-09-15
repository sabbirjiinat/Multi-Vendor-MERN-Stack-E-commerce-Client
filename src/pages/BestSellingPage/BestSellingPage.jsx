import styles from "../../style/style";
import ProductCard from "../../components/Route/ProductCard/ProductCard";
import UseAllProducts from "../../hooks/UseAllProducts";

const BestSellingPage = () => {
  const [products] = UseAllProducts();
  const data = products && products.sort((a, b) => b.total_sell - a.total_sell);
  window.scrollTo(0, 0);

  return (
    <div className={`${styles.section} pt-4`}>
      <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2 sm:gap-[20px]
            md:grid-cols-4 md:gap-[25px] lg:grid-cols-5 lg:gap-[25px] xl:grid-cols-6 xl:gap-[30px] mb-12">
        {data && data.map((i, index) => <ProductCard key={index} data={i} />)}
      </div>
    </div>
  );
};

export default BestSellingPage;
