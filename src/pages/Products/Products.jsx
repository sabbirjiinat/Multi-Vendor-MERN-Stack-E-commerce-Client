import Header from "../../components/Header/Header";
import Footer from "../../components/Layout/Footer";
import styles from "../../style/style";
import ProductCard from "../../components/Route/ProductCard/ProductCard";
import UseAllProducts from "../../hooks/UseAllProducts";
import EmptyStates from "../../components/EmptyStates/EmptyStates";
import Loader from "../../components/Loader/Loader";


const Products = () => {
   const [products,,loader] = UseAllProducts()
   if(loader){
    return <Loader/>
   }
    return (
        <div>
            <Header/>
           <br />
           <br />
           <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                {products && products.map((i,index) => 
                <ProductCard
                key={index}
                data={i}
                />)}
            </div>
                {products && products.length === 0 ?    <EmptyStates title="No products found!" />:null}
           </div>
            <Footer/>
        </div>
    );
};

export default Products;