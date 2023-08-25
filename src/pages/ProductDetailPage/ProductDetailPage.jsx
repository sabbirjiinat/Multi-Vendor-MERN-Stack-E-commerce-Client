import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Layout/Footer";
import ProductDetails from "../../components/Products/ProductDetails";
import { useEffect, useState } from "react";
import { productData } from "../../static/data";
import SuggestedProduct from '../../components/Products/SuggestedProduct'


const ProductDetailPage = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const productName = name.replace(/-/g, " ");
  useEffect(() => {
    const data = productData.find((i) => i.name === productName);
    setData(data);
  }, [productName]);
  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {data && <SuggestedProduct data={data}/>}
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
