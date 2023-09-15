import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import UseAxiosSecure from "./UseAxiosSecure";
const UseAllPendingProducts = () => {
    const [loader, setLoader] = useState(false);
    const [axiosSecure] = UseAxiosSecure()
    const { data: pendingProducts = [], refetch } = useQuery({
      queryKey: ["products"],
      queryFn: async () => {
        setLoader(true);
        const res = await axiosSecure.get(
          `/products/status/pending`
        );
        setLoader(false);
        const data = res.data;
        return data;
      },
    });
    return [pendingProducts, refetch, loader];
};

export default UseAllPendingProducts;