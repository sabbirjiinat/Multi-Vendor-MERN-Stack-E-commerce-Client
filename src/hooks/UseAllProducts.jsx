import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
const UseAllProducts = () => {
  const [loader, setLoader] = useState(false);
  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      setLoader(true);
      const res = await axios.get(
        `https://multivendor-e-commerce-web-server.vercel.app/allProducts`
      );
      setLoader(false);
      const data = res.data;
      return data;
    },
  });
  return [products, refetch, loader];
};

export default UseAllProducts;
