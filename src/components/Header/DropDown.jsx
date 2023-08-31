import { useNavigate } from "react-router-dom";
import styles from "../../style/style";

const DropDown = ({ setDropDown, categoriesData }) => {
  const navigate = useNavigate();
  const handleSubmit = (i) => {
    navigate(`/products?category=${i.id}`);
    setDropDown(false);
    window.location.reload();
  };
  return (
    <div className="pb-4 w-[270px] bg-[#ffff] absolute z-30 rounded-b-md shadow-sm">
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div
            key={index}
            className={`${styles.noramlFlex}`}
            onClick={() => handleSubmit(i)}
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
