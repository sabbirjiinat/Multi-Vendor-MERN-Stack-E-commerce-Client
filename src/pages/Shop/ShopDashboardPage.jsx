import { useState } from 'react';
import DashboardHeader from '../../components/shop/Layout/DashboardHeader.jsx'
import DashboardSidebar from '../../components/shop/Layout/DashboardSidebar'
const ShopDashboardPage = () => {
    const [active] = useState(1)
    return (
        <div>
           <DashboardHeader/>
           <div className="flex items-center justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
                <DashboardSidebar active={active}/>
            </div>
           </div>
        </div>
    );
};

export default ShopDashboardPage;