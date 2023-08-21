import Header from "../../components/Header/Header";
import Footer from "../../components/Layout/Footer";
import { useEffect, useState } from "react";
import { productData } from "../../static/data";
import styles from "../../style/style";
import ProductCard from "../../components/Route/ProductCard/ProductCard";

const BestSellingPage = () => {
    const [data,setData] = useState([])
    useEffect(()=>{
    const b = productData && productData.sort((a,b)=> b.total_sell - a.total_sell)
    setData(b)
        // window.scrollTo(0,0)
    },[])
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
           </div>
            <Footer/>
        </div>
    );
};

export default BestSellingPage;