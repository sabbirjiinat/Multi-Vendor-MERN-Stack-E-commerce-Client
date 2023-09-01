import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";
const UseAllWishlist = () => {
  const [axiosSecure] = UseAxiosSecure();
  const { user } = UseAuth();
  const { data: wishlistProducts = [], refetch } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist/${user?.email}`);
      return res.data;
    },
  });
  return [wishlistProducts, refetch];
};

export default UseAllWishlist;
