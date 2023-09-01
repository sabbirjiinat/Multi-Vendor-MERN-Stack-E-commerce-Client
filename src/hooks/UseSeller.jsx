import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";

const UseSeller = () => {
  const { user,loading } = UseAuth();
  const [axiosSecure] = UseAxiosSecure();
  const { data: isSeller, isLoading: isSellerLoading } = useQuery({
    queryKey: ["isSeller", user?.email],
    enabled:!loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/seller/${user?.email}`);

      return res.data.seller;
    },
  });
  return [isSeller, isSellerLoading];
};

export default UseSeller;
