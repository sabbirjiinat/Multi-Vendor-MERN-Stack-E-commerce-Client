import UseAllProducts from "../../../hooks/UseAllProducts";
import styles from "../../../style/style";
import Loader from "../../Loader/Loader";
import ProductCard from "../ProductCard/ProductCard";

const FeatureProducts = () => {
  const [products,,loader] = UseAllProducts()
  if(loader){
    return <Loader/>
  }
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Feature Products</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {products &&
            products.map((i) => <ProductCard 
            key={i._id}
            data={i} 
            />)}
        </div>
      </div>
    </div>
  );
};

export default FeatureProducts;
