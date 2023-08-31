import ClockLoader from "react-spinners/ClockLoader";
const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <ClockLoader color="#3321cb" size={100} speedMultiplier={3} />
    </div>
  );
};

export default Loader;
