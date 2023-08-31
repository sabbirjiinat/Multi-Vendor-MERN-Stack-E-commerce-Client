import { NavLink } from "react-router-dom";
import { navItems } from "../../static/data";
import styles from "../../style/style";
const Navbar = () => {
  return (
    <div className={`block  800px:${styles.noramlFlex}`}>
      {navItems.map((item, index) => (
        <div className="pb-4 800px:pb-0" key={index}>
          <NavLink className={({isActive})=>`${isActive ? 'text-[#17dd1f]': 'text-[black] 800px:text-[#ffff]'} font-[500] cursor-pointer px-6`} to={item.url}>{item.title}</NavLink>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
