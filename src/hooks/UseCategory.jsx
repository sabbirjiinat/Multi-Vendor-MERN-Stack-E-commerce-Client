import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const UseCategory = () => {
  const { data: categoriesData = [] } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axios.get("https://multivendor-e-commerce-web-server.vercel.app/category");
      return res.data;
    },
  });
  return [categoriesData];
};

export default UseCategory;
