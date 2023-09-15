import { useForm } from "react-hook-form";
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
// import { useState } from "react";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import UseAuth from "../../hooks/UseAuth";
import UseAllUsers from "../../hooks/UseAllUsers";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbFidgetSpinner } from "react-icons/tb";

const CreateProduct = () => {
  // const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit,reset } = useForm();
  const [axiosSecure] = UseAxiosSecure();
  const { user } = UseAuth();
  const [users] = UseAllUsers();
  const loggedInUser = users.find((usr) => usr.email === user?.email);

  const onSubmit = (data) => {
    if (data.name.length === 0) {
      return toast.error(`Name is required`);
    } else if (data.description.length === 0) {
      return toast.error(`Description is required`);
    } else if (data.category === "Choose a category") {
      return toast.error(`Category is required`);
    } else if (data.price.length === 0) {
      return toast.error(`Price is required`);
    } else if (data.discountPrice.length === 0) {
      return toast.error(`Discount price is required`);
    } else if (data.stock.length === 0) {
      return toast.error(`Stock is required`);
    } else if (data.rating.length === 0) {
      return toast.error(`Rating is required`);
    } else if (data.rating > 5) {
      return toast.error(`Rating can be maximum up to five`);
    } else if (data.imageUrl.length === 0) {
      return toast.error(`Image is required`);
    }

    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_KEY
    }`;
    const formData = new FormData();
    formData.append("image", data.imageUrl[0]);
    setLoading(true);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageURL) => {
        const image_url = imageURL.data.display_url;
        const newProduct = {
          category: data.category,
          name: data.name,
          description: data.description,
          image_Url: [
            {
              url: image_url,
            },
          ],
          shop: {
            name: loggedInUser.shopName,
            shop_avatar: {
              url: user?.photoURL,
            },
            ratings: 4.2,
          },
          price: parseFloat(data.price),
          discount_price: parseFloat(data.discountPrice),
          rating: parseFloat(data.rating),
          stock: parseFloat(data.stock),
          sellerEmail: user?.email,
          sellerName: user?.displayName,
          sellerPhoto: user?.photoURL,
          status: "pending",
        };
        axiosSecure
          .post("/allProducts", newProduct)
          .then((data) => {
            if (data.data.insertedId) {
              reset()
              setLoading(false);
              toast.success(`Your product is pending now`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
          })
          .catch((err) => {
            toast.error(err.message);
            setLoading(false);
          });
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  // const handleImageChange = (e) => {
  //   e.preventDefault();
  //   const files = Array.from(e.target.files);
  //   setImages((prevImg) => [...prevImg, ...files]);
  // };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
      {/* create product form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <br />
        <div>
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            {...register("name")}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your product name..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            {...register("description")}
            rows="8"
            type="text"
            name="description"
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your product description..."
          ></textarea>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            {...register("category")}
          >
            <option selected disabled value="Choose a category">
              Choose a category
            </option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2">Original Price</label>
          <input
            type="number"
            name="price"
            {...register("price")}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your product price..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Price (With Discount) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="discountPrice"
            {...register("discountPrice")}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your product price with discount..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Product Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="stock"
            {...register("stock")}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your product stock..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Product Rating <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="rating"
            {...register("rating")}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter Rating..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            {...register("imageUrl")}
            name="imageUrl"
            id="upload"
            className="hidden"
            multiple
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {/* {images &&
              images.map((i) => (
                <img
                  src={URL.createObjectURL(i)}
                  key={i}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              ))} */}
          </div>
          <br />
          <div>
            <button
              className="mt-2 cursor-pointer  text-center  w-full px-3 h-[35px] border border-gray-300 rounded-[3px] text-sm 800px:text-base font-semibold font-Roboto text-gray-800 bg-gray-200 "
              type="submit"
            >
              {loading ? (
                <TbFidgetSpinner
                  color="#3321cb"
                  className="animate-spin h-6 mx-auto"
                />
              ) : (
                "Upload"
              )}
            </button>
          </div>
        </div>
      </form>
      <ToastContainer
        position="top-right"
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
    </div>
  );
};

export default CreateProduct;
