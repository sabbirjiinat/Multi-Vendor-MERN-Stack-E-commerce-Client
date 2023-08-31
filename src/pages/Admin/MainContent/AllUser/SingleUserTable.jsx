import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import UseAxiosSecure from "../../../../hooks/UseAxiosSecure";
import UseAllUsers from "../../../../hooks/UseAllUsers";

const SingleUserTable = ({ allUser }) => {
  const { email, name, photo, role } = allUser;
  const { register, handleSubmit } = useForm();
  const [axiosSecure] = UseAxiosSecure();
  const [,refetch] = UseAllUsers();
  const onSubmit = (data) => {
    if (data.role === role) {
      return toast.error(`${name} is already ${role}`, {
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
      text: `You want to set ${name} as a ${data.role} `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${email}`, { role: data.role })
          .then((data) => {
            if (data.data.modifiedCount > 0) {
              refetch()
              Swal.fire("Updated!", `${name} is now ${data.role}`, "success");
            }
          });
      }
    });
  };

  return (
    <>
      <tr>
        <td className="h-16 w-16">
          <img className="rounded-full object-cover" src={photo} alt="" />
        </td>
        <td className="text-center">
          {" "}
          <h2>{name}</h2>
        </td>
        <td className="text-center">
          {" "}
          <h2>{email}</h2>
        </td>
        <td className="text-center">
          {" "}
          <form
            className="flex items-center justify-center gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <select
              {...register("role")}
              className="appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center "
              name="role"
              id=""
              defaultValue={role}
            >
              <option className="text-xl sm:text-sm " value="user">
                User
              </option>
              <option className="text-xl sm:text-sm " value="seller">
                Seller
              </option>
              <option className="text-xl sm:text-sm " value="admin">
                Admin
              </option>
            </select>
            <button
              className="bg-blue-500 px-3 py-2 rounded-md shadow-sm text-white"
              type="submit"
            >
              Change
            </button>
          </form>
        </td>
      </tr>
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

export default SingleUserTable;
