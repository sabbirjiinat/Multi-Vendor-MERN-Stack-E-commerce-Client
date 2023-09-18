import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./UseAxiosSecure";

const UseManageOrders = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: ordersCollection,refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders`);
      return res.data;
    },
  });
  return [ordersCollection,refetch];
};

export default UseManageOrders;
