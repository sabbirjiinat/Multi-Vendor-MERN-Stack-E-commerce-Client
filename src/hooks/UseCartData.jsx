import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";
const UseCartData = () => {
  const { user } = UseAuth();
  const [axiosSecure] = UseAxiosSecure();
  const { data: addToCartProducts = [], refetch } = useQuery({
    queryKey: ["addToCart", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `http://localhost:8000/addToCart/${user?.email}`
      );
      return res.data;
    },
  });
  return [addToCartProducts, refetch];
};

export default UseCartData;
