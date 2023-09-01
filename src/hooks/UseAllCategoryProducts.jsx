import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import UseAuth from "./UseAuth";
const UseAllCategoryProducts = () => {
    const {category} = UseAuth()
  const [loader, setLoader] = useState(false);
  const { data: categoriesProducts = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      setLoader(true);
      const res = await axios.get(`https://multivendor-e-commerce-web-server.vercel.app/products?category=${category}`);
      setLoader(false);
      const data = res.data;
      return data;
    },
  });
  return [categoriesProducts, refetch, loader];
};

export default UseAllCategoryProducts;
