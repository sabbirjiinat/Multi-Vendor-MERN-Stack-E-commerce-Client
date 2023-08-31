import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";

const UseSeller = () => {
  const { user } = UseAuth();
  const [axiosSecure] = UseAxiosSecure();
  const { data: isSeller, isLoading: isSellerLoading } = useQuery({
    queryKey: ["isSeller", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/seller/${user?.email}`);

      return res.data.seller;
    },
  });
  return [isSeller, isSellerLoading];
};

export default UseSeller;
