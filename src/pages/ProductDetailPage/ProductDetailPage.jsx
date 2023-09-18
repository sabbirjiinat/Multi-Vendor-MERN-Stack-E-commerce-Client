import { useLoaderData } from "react-router-dom";
import ProductDetails from "../../components/Products/ProductDetails";
import SuggestedProduct from "../../components/Products/SuggestedProduct";

const ProductDetailPage = () => {
  const singleProducts = useLoaderData();
  window.scrollTo(0, 0);


  return (
    <div>
 
      <ProductDetails data={singleProducts} />
      {singleProducts && <SuggestedProduct data={singleProducts} />}
  
    </div>
  );
};

export default ProductDetailPage;
