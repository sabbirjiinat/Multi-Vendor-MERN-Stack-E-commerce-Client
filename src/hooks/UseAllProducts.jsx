import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
const UseAllProducts = () => {
  const [loader, setLoader] = useState(false);
  const { data: products = [], refetch: approveProductsRefetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      setLoader(true);
      const res = await axios.get(
        `https://multivendor-e-commerce-web-server.vercel.app/products/status/approve`
      );
      setLoader(false);
      const data = res.data;
      return data;
    },
  });
  return [products, approveProductsRefetch, loader];
};

export default UseAllProducts;
