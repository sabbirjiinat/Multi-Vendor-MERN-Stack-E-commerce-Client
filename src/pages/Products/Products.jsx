import styles from "../../style/style";
import ProductCard from "../../components/Route/ProductCard/ProductCard";
import UseAllProducts from "../../hooks/UseAllProducts";
import EmptyStates from "../../components/EmptyStates/EmptyStates";
import Loader from "../../components/Loader/Loader";


const Products = () => {
    window.scrollTo(0,0)
   const [products,,loader] = UseAllProducts()
   if(loader){
    return <Loader/>
   }
    return (
    
           <div className={`${styles.section} pt-4`}>
            <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2 sm:gap-[20px]
            md:grid-cols-4 md:gap-[25px] lg:grid-cols-5 lg:gap-[25px] xl:grid-cols-6 xl:gap-[30px] mb-12">
                {products && products.map((i,index) => 
                <ProductCard
                key={index}
                data={i}
                />)}
            </div>
                {products && products.length === 0 ?    <EmptyStates title="No products found!" />:null}
           </div>
    
    );
};

export default Products;