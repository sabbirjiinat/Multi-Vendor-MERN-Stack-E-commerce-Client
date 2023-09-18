import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import UseManageOrders from "../../../hooks/UseManageOrders";
const SingleOrder = ({ order }) => {
  const { status } = order;
  const [, refetch] = UseManageOrders();
  const [axiosSecure] = UseAxiosSecure();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    if (data.status === status) {
      return toast.error(`Product is already ${status}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${status} this product`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/orders/${order._id}`, { status: data.status })
          .then((data) => {
            if (data.data.modifiedCount > 0) {
              refetch();
              Swal.fire(`This product is ${status}`, "success");
            }
          });
      }
    });
  };
  return (
    <>
      <div className="w-full bg-[#fff]  border-[2px] border-gray-300 rounded-lg  p-1 flex items-center justify-between gap-2 shadow-md text-xs">
        <div className="w-[150px]">
          <Link
            className="grid grid-cols-1 md:grid-cols-2"
            to={`/product/${order?.addToCartId}`}
          >
            {order.itemImage.map((image, i) => {
              return (
                <img
                  key={i}
                  src={image}
                  className="w-full object-contain h-[50px]"
                  alt=""
                />
              );
            })}
          </Link>
        </div>

        <div className="w-[100px] text-gray-700 font-bold font-Roboto">
          <Link to={`/product/${order?.addToCartId}`}>
            <h4 className="pb-3">{order?.name}</h4>
          </Link>
          <div>
            <p className="text-[#fd4664]">Price: {order?.amount}</p>
            <p>Quantity: {order?.quantity}</p>
          </div>
        </div>
        <div className="text-gray-700 font-bold font-Roboto">
          <p>Id: {order.transactionId}</p>
          <p>{order.date}</p>
        </div>

        <form
          className="flex items-center justify-center gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <select
            {...register("status")}
            className="appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center "
            name="status"
            id=""
            defaultValue={order.status}
          >
            <option className="text-xl sm:text-sm " value="pending">
              Pending
            </option>
            <option className="text-xl sm:text-sm " value="approve">
              Approve
            </option>
          </select>
          <button
            className="bg-blue-500 px-3 py-2 rounded-md shadow-sm text-white"
            type="submit"
          >
            Change
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default SingleOrder;
