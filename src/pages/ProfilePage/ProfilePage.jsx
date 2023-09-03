import styles from "../../style/style";
import ProfileSidebar from "../../components/Profile/ProfileSidebar";
import ProfileContent from "../../components/Profile/ProfileContent";
import { useState } from "react";

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  return (
    <div className={`${styles.section} flex bg-[#f5f4f5] py-10`}>
      <div className="w-[50px] 800px:w-[335px]">
        <ProfileSidebar active={active} setActive={setActive} />
      </div>
      <ProfileContent active={active} />
    </div>
  );
};

export default ProfilePage;
