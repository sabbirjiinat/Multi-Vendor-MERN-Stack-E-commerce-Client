import EmptyStates from "../../../../components/EmptyStates/EmptyStates";
import PendingProductCard from "./PendingProductCard";
import UseAllPendingProducts from "../../../../hooks/UseAllPendingProducts";

const PendingProducts = () => {
    const [pendingProducts] = UseAllPendingProducts()
    return (
       <>
       {pendingProducts && pendingProducts.length > 0 && Array.isArray(pendingProducts) ? (
         <div className="w-full p-4">
         <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[30px] mb-12">
            {pendingProducts.map((i)=><PendingProductCard
            key={i._id}
            data={i}
            />)}
         </div>
      </div>
       ):(
        <EmptyStates title='No pending product available'/>
       )}
       </>
    );
};

export default PendingProducts;