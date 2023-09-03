import { AiOutlineDelete } from "react-icons/ai";
import styles from "../../style/style.js";
import UseAuth from "../../hooks/UseAuth.jsx";
import { useForm } from "react-hook-form";
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
          <div className="flex justify-center w-full">
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
          <div className="w-full px-5">
            <form onSubmit={handleSubmit(onSubmit)} aria-required={true}>
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
      {/* Refund */}
      {active === 3 && (
        <div className="">
          <AllRefundOrders />
        </div>
      )}
   
      {/* Track order*/}
      {active === 6 && (
        <div className="">
          <PaymentMethod />
        </div>
      )}
      {/* Address*/}
      {active === 7 && (
        <div className="">
          <Address />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold font-Roboto p-20">
        {" "}
        Order page coming soon...
      </h1>
    </div>
  );
};

const AllRefundOrders = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold font-Roboto p-20">
        {" "}
        Refund page coming soon...
      </h1>
    </div>
  );
};

const PaymentMethod = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          Payment Method
        </h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-[#fff]">Add new</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <img
            src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg"
            alt=""
          />
          <h5 className="pl-5 flex items-center">Sabbir Hossain</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>1234 **** *** ****</h6>
          <h5 className="pl-6">08/2024</h5>
        </div>
        <div className="min-h-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

const Address = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Address
        </h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-[#fff]">Add new</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <h5 className="pl-5 flex items-center">Default</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>Patnitala, Naogoan, Bangladesh</h6>
        </div>
        <div className="pl-8 flex items-center">
          <h6>+8801777051339</h6>
        </div>
        <div className="min-h-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
export default ProfileContent;
