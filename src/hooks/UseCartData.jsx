import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";
const UseCartData = () => {
  const { user } = UseAuth();
  const [axiosSecure] = UseAxiosSecure();
  const { data: addToCartProducts = [], refetch:cartDataRefetch } = useQuery({
    queryKey: ["addToCart", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/addToCart/${user?.email}`
      );
      return res.data;
    },
  });
  return [addToCartProducts, cartDataRefetch];
};

export default UseCartData;
