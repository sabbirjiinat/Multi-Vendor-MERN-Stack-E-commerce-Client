import { useSearchParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Layout/Footer";
import { useEffect, useState } from "react";
import { productData } from "../../static/data";
import styles from "../../style/style";
import ProductCard from "../../components/Route/ProductCard/ProductCard";

const Products = () => {
    const [searchParams] = useSearchParams();
    const categoryData = searchParams.get('category');
    const [data,setData] = useState([])
    useEffect(()=>{
        if(categoryData === null){
            const d = productData && productData.sort((a,b)=> a.total_sell - b.total_sell);
            setData(d)
        }else{
            const d = productData && productData.filter((i)=> i.category === categoryData)
            setData(d)
        }
        // window.scrollTo(0,0)
    },[categoryData])
    return (
        <div>
            <Header/>
           <br />
           <br />
           <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                {data && data.map((i,index) => <ProductCard
                key={index}
                data={i}
                />)}
            </div>
                {data && data.length === 0 ? <h1 className="text-center w-full pb-[100px] text-[20px]">No products found!</h1>:null}
           </div>
            <Footer/>
        </div>
    );
};

export default Products;