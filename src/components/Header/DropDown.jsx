import { useNavigate } from "react-router-dom";
import styles from "../../style/style";
import UseAuth from "../../hooks/UseAuth";

const DropDown = ({ setDropDown, categoriesData }) => {
  const { setCategory } = UseAuth();
  const navigate = useNavigate();

  const handleSubmit = (i) => {
    setCategory(i.title);
    navigate(`/products?category=${i.title}`);

    setDropDown(false);
  };

  return (
    <div className="pb-4 w-[270px] bg-[#ffff]  z-10 rounded-b-md shadow-sm overflow-y-scroll h-[60vh] fixed">
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div
            key={index}
            onClick={() => handleSubmit(i)}
            className={`${styles.noramlFlex}`}
          >
            <img
              style={{
                width: "25px",
                height: "25px",
                objectFit: "contain",
                marginLeft: "10px",
                userSelect: "none",
              }}
              src={i.image_Url}
              alt=""
            />
            <h3 className="m-3 cursor-pointer select-none">{i.title}</h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;
