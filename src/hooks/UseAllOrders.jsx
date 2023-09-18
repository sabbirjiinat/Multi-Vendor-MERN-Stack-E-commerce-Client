import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import useAxiosSecure from "./UseAxiosSecure";
const UseAllOrders = () => {
  const { user } = UseAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: paymentsCollection, refetch:paymentCollectionRefetch } = useQuery({
    queryKey: ["payment", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment/${user?.email}`);
      return res.data;
    },
  });
  return [paymentsCollection,paymentCollectionRefetch];
};

export default UseAllOrders;
