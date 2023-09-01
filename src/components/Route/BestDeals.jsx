import styles from "../../style/style";
import ProductCard from "../Route/ProductCard/ProductCard";
import { useEffect, useState } from "react";

const BestDeals = () => {
  const [products,setProducts] = useState([])
  useEffect(()=>{
    fetch('https://multivendor-e-commerce-web-server.vercel.app/allProducts/best-deals')
    .then(res => res.json())
    .then(data =>{
      setProducts(data)
    })
  },[])
 

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {products && products.length !== 0 && (
            <>
              {products &&
                products.map((i, index) => <ProductCard data={i} key={index} />)}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
