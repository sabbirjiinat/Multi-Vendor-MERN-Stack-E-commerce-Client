import styles from "../../style/style.js";
import UseAuth from "../../hooks/UseAuth.jsx";
import { useForm } from "react-hook-form";
import UseAllOrders from "../../hooks/UseAllOrders";
import { Link } from "react-router-dom";
import { CgTrash } from "react-icons/cg";
import UseAxiosSecure from "../../hooks/UseAxiosSecure.jsx";
import { toast, ToastContainer } from "react-toastify";
const ProfileContent = ({ active }) => {
  const { user } = UseAuth();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full">
      {/* Profile*/}
      {active === 1 && (
        <>
          <div className="w-full px-5">
            <form onSubmit={handleSubmit(onSubmit)} aria-required={true}>
              <div className="flex justify-center w-full mb-4">
                <div className="relative">
                  <img
                    src={user?.photoURL}
                    className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ada32]"
                    alt=""
                  />
                </div>
                <br />
                <br />
              </div>
              <div className="w-full 800px:flex pb-3">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    {...register("name")}
                    name="name"
                    type="text"
                    defaultValue={user?.displayName}
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    {...register("email")}
                    name="email"
                    type="email"
                    defaultValue={user?.email}
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    {...register("number")}
                    name="number"
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                  />
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Enter your password</label>
                  <input
                    {...register("password")}
                    name="password"
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                  />
                </div>
              </div>
              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>
      )}
      {/* Order*/}
      {active === 2 && (
        <div className="">
          <AllOrders />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const [paymentsCollection, paymentCollectionRefetch] = UseAllOrders();
  console.log(paymentsCollection);
  const [axiosSecure] = UseAxiosSecure();
  const handleDeletePaymentProduct = (item) => {
    axiosSecure.delete(`/payment/${item._id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        paymentCollectionRefetch();
        toast.success("Product history deleted");
      }
    });
  };
  return (
    <>
      <div className="px-3 w-full">
        {paymentsCollection &&
          paymentsCollection.length > 0 &&
          Array.isArray(paymentsCollection) && (
            <div
              className="grid grid-cols-1 gap-[20px]
       mb-12"
            >
              {paymentsCollection.map((singlePayment) => {
                return (
                  <div key={singlePayment?._id}>
                    <div className="w-full bg-[#fff]  border-[2px] border-gray-300 rounded-lg  p-2 flex items-center justify-between gap-2 shadow-md text-xs">
                      <div className="w-[150px]">
                        <Link
                          className="grid grid-cols-1 md:grid-cols-2"
                          to={`/product/${singlePayment?.addToCartId}`}
                        >
                          {singlePayment.itemImage.map((image, i) => {
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
                        <Link to={`/product/${singlePayment?.addToCartId}`}>
                          <h4 className="pb-3">{singlePayment?.name}</h4>
                        </Link>
                        <div>
                          <p className="text-[#fd4664]">
                            Price: {singlePayment?.amount}
                          </p>
                          <p>Quantity: {singlePayment?.quantity}</p>
                        </div>
                      </div>
                      <div className="text-gray-700 font-bold font-Roboto">
                        <p>Id: {singlePayment.transactionId}</p>
                        <p>{singlePayment.date}</p>
                      </div>

                      <div>
                        <CgTrash
                          size={25}
                          className={`cursor-pointer ${
                            singlePayment.status === "pending"
                              ? "cursor-not-allowed text-[#444]"
                              : "text-[#fd4664]"
                          }`}
                          onClick={() =>
                            handleDeletePaymentProduct(singlePayment)
                          }
                          title={
                            singlePayment.status === "pending"
                              ? "Pending product can't delete"
                              : "Delete"
                          }
                        />
                      </div>
                      {singlePayment.status === "pending" ? (
                        <p className="text-gray-700 font-bold">
                          Order Processing
                        </p>
                      ) : (
                        <p className="text-gray-700 font-bold">Approved</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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

export default ProfileContent;
