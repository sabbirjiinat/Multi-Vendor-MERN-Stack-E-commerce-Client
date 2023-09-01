import { useContext, useState } from "react";
import styles from "../../style/style";
import { Link } from "react-router-dom";
import { productData } from "../../static/data.js";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import Cart from "../Cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { AuthContext } from "../../provider/AuthProvider";
import { RxCross1 } from "react-icons/rx";
import UseAdmin from "../../hooks/UseAdmin";
import UseSeller from "../../hooks/UseSeller";
import UseCategory from "../../hooks/UseCategory";
import UseAllWishlist from "../../hooks/UseAllWishlist";
const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const [categoriesData] = UseCategory();
  const { user } = useContext(AuthContext);
  const [isAdmin] = UseAdmin();
  const [isSeller] = UseSeller();
  const [wishlistProducts] = UseAllWishlist()

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredProduct =
      productData &&
      productData.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProduct);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });
  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to='/'>
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
              />
            </Link>
          </div>
          <div className="w-[50%] relative">
            <input
              onChange={handleSearchChange}
              type="text"
              value={searchTerm}
              placeholder="Search Product..."
              className="h-[40px] w-full border-[#3957db] border-[2px] rounded-md px-5"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    const d = i.name;
                    const product_name = d.replace(/\s+/g, "-");
                    return (
                      <Link key={index} to={`/product/${product_name}`}>
                        <div className="w-full flex items-start py-3">
                          <img
                            src={i?.image_Url[0]?.url}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>
          {/* Todo seller authenticate */}
          {!isSeller && !isAdmin && (
            <div className={`${styles.button}`}>
              <Link to="/shop-create">
                <h1 className="text-[#fff] flex items-center">
                  Become Seller
                  <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            </div>
          )}
          {isSeller && (
            <div className={`${styles.button}`}>
              <Link to="/dashboard">
                <h1 className="text-[#fff] flex items-center">
                  Dashboard
                  <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            </div>
          )}
          {isAdmin && (
            <div className={`${styles.button}`}>
              <Link to="/dashboard-admin/home">
                <h1 className="text-[#fff] flex items-center">
                  Dashboard
                  <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div
        className={`${
          active === true ? "z-50 shadow-sm fixed top-0 left-0" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#3321cb] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* Categories */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                All Categories
              </button>
              {dropDown ? (
                <RxCross1
                  size={20}
                  className="absolute right-2 top-4 cursor-pointer"
                />
              ) : (
                <IoIosArrowDown
                  size={20}
                  className="absolute right-2 top-4 cursor-pointer"
                />
              )}

              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
          {/* NavItem */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar />
          </div>

          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
              {wishlistProducts.length}
                </span>
              </div>
            </div>
            <div className={`${styles.noramlFlex}`}>
              <div
                onClick={() => setOpenCart(true)}
                className="relative cursor-pointer mr-[15px]"
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  1
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {user ? (
                  <Link to="/profile  ">
                    <img
                      className="h8 w-8 rounded-full "
                      src={user.photoURL}
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>
            {/* Cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
            {/* Wishlist popup */}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>
      {/* Mobile Header */}
      <div
        className={`${active === true ? "shadow-sm fixed top-0 left-0" : null}
      w-full -[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4 cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link t-="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
              />
            </Link>
          </div>
          <div className="cursor-pointer">
            <div className="relative mr-[20px]">
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center cursor-pointer">
                0
              </span>
            </div>
          </div>
        </div>
        {/* Header sidebar */}
        {open && (
          <div className="fixed w-full bg-[#0000005f] h-full top-0 left-0">
            <div className="fixed w-[60%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div className="relative mr-[15px]">
                    <AiOutlineHeart size={30} className="mt-5 ml-2" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                    {wishlistProducts.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="my-8 w-[92%] m-auto h-[40px] relative">
                <input
                  onChange={handleSearchChange}
                  type="search"
                  value={searchTerm}
                  placeholder="Search Product..."
                  className="h-[40px] w-full border-[#3957db] border-[2px] rounded-md px-5"
                />
                {searchData && searchData.length !== 0 ? (
                  <div className="absolute bg-slate-50 shadow-sm z-[10] w-full left-0 p-3">
                    {searchData &&
                      searchData.map((i, index) => {
                        const d = i.name;
                        const product_name = d.replace(/\s+/g, "-");
                        return (
                          <Link key={index} to={`/product/${product_name}`}>
                            <div className="w-full flex items-start py-3">
                              <img
                                src={i?.image_Url[0]?.url}
                                alt=""
                                className="w-[40px] h-[40px] mr-[10px]"
                              />
                              <h1>{i.name}</h1>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                ) : null}
              </div>
              <Navbar />
              <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    Become Seller
                    <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              <br />
              <br />
              <br />
              <div className="flex w-full justify-center">
                {user ? (
                  <>
                    <Link to="/profile">
                      <img
                        className="h-[60px] w-[60px] rounded-full border-[3px] border-[#35b9e9]"
                        src={user.photoURL}
                        alt=""
                      />
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-[18px] pr-[10px] text-[#000000b7]"
                    >
                      Login /
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-[18px] pr-[10px] text-[#000000b7]"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
