import { Link } from "react-router-dom";

const EmptyStates = ({ title, linkTitle, to }) => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="font-Roboto text-4xl text-gray-800 font-semibold">
        {title}
      </h1>
      {linkTitle && <Link className="text-xl font-semibold font-Roboto  text-rose-600" to={to}>{linkTitle}</Link>}
    </div>
  );
};

export default EmptyStates;
