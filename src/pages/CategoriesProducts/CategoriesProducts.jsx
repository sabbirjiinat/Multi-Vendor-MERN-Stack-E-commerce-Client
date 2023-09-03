import EmptyStates from "../../components/EmptyStates/EmptyStates";
import ProductCard from "../../components/Route/ProductCard/ProductCard";
import UseAllCategoryProducts from "../../hooks/UseAllCategoryProducts";
import styles from "../../style/style";

const CategoriesProducts = () => {
    const [categoriesProducts] = UseAllCategoryProducts()
    window.scroll(0,0)
    return (
      
       <div className={`${styles.section} pt-4`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {categoriesProducts && categoriesProducts.map((i,index) => 
            <ProductCard
            key={index}
            data={i}
            />)}
        </div>
            {categoriesProducts && categoriesProducts.length === 0 ?    <EmptyStates title="No products found!" />:null}
       </div>
  
    );
};

export default CategoriesProducts;