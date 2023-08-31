import { useLoaderData } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Layout/Footer";
import ProductDetails from "../../components/Products/ProductDetails";

import SuggestedProduct from "../../components/Products/SuggestedProduct";

const ProductDetailPage = () => {
  const singleProducts = useLoaderData();


  return (
    <div>
      <Header />
      <ProductDetails data={singleProducts} />
      {singleProducts && <SuggestedProduct data={singleProducts} />}
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
