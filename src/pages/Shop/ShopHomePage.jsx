import styles from "../../style/style";
import ShopInfo from '../../components/shop/ShopInfo'
import ShopProfileData from '../../components/shop/ShopProfileData'
const ShopHomePage = () => {
    return (
        <div className={`${styles.section} bg-[#f5f5f5]`}>
            <div className="w-full flex p-10 justify-between">
                <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] sticky top-10 left-0 z-10">
                    <ShopInfo/>
                </div>
                <div className="w-[72%] rounded-[4px]">
                    <ShopProfileData isOwner={true}/>
                </div>
            </div>
        </div>
    );
};

export default ShopHomePage;