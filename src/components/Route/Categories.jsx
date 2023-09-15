import { useNavigate } from "react-router-dom";
import { brandingData } from "../../static/data";
import styles from "../../style/style";
import UseCategory from "../../hooks/UseCategory";
import UseAuth from "../../hooks/UseAuth";

const Categories = () => {
  const navigate = useNavigate();
  const [categoriesData] = UseCategory();
  const { setCategory } = UseAuth();
  return (
    <>
      <div
       data-aos="fade-up"
       data-aos-duration="500"
      className={`${styles.section} hidden sm:block`}>
        <div
          className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-3 rounded-md`}
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start" key={index}>
                <img
                  className="w-[70px] h-[70px] object-cover"
                  src={i.icon}
                  alt=""
                />
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                  <p className="text-xs md:text-sm">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div
      data-aos="fade-up"
      data-aos-duration="500"
        className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
        id="categories"
      >
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-3 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
          {categoriesData &&
            categoriesData.map((i) => {
              const handleSubmit = (i) => {
                setCategory(i.title);
                navigate(`/products?category=${i.title}`);
              };
              return (
                <div
                  className="w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden border border-[#b1e4fe] p-5 rounded-md gap-1"
                  key={i._id}
                  onClick={() => handleSubmit(i)}
                >
                  <h5 className={`text-[18px] leading-[1.3]`}>{i.title}</h5>
                  <img
                    src={i.image_Url}
                    className="w-[100px] object-cover"
                    alt=""
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Categories;
