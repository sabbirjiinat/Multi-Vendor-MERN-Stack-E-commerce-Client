import styles from "../../style/style";
import ProductCard from "../Route/ProductCard/ProductCard";
import { useEffect, useState } from "react";

const BestDeals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(
      "https://multivendor-e-commerce-web-server.vercel.app/products/status/approve"
    )
      .then((res) => res.json())
      .then((data) => {
        const sortedProduct = data.sort((a, b) => b.total_sell - a.total_sell);
        const sliceProduct = sortedProduct.slice(0, 5);
        setProducts(sliceProduct);
      });
  }, []);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2 sm:gap-[20px]
            md:grid-cols-4 md:gap-[25px] lg:grid-cols-5 lg:gap-[25px] xl:grid-cols-6 xl:gap-[30px] mb-12">
          {products && products.length !== 0 && (
            <>
              {products &&
                products?.map((i, index) => (
                  <ProductCard data={i} key={index} />
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
