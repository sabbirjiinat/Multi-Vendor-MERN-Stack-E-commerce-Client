import EmptyStates from "../../../../components/EmptyStates/EmptyStates";
import UseAllUsers from "../../../../hooks/UseAllUsers";
import SingleUserTable from "./SingleUserTable";

const AllUsers = () => {
  const [users] = UseAllUsers();

  return (
    <div className="w-full">
      {users && users.length > 0 && Array.isArray(users) ? (
        <div className="overflow-x-scroll w-full p-2">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr className="text-gray-800 font-medium font-Roboto text-base">
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((allUser) => (
                <SingleUserTable key={allUser._id} allUser={allUser} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyStates title="No user available" />
      )}
    </div>
  );
};

export default AllUsers;
