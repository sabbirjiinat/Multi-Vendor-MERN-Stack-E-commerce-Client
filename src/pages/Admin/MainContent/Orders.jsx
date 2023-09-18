import UseManageOrders from "../../../hooks/UseManageOrders";

import SingleOrder from "./SingleOrder";
const Orders = () => {
  const [ordersCollection] = UseManageOrders();
  console.log(ordersCollection);

  return (
    <div className="p-2 w-full">
      {ordersCollection &&
        ordersCollection.length > 0 &&
        Array.isArray(ordersCollection) && (
          <div
            className="grid grid-cols-1 gap-[20px]
         mb-12"
          >
            {ordersCollection.map((singleOrder) => (
              <SingleOrder key={singleOrder._id} order={singleOrder} />
            ))}
          </div>
        )}
    </div>
  );
};

export default Orders;
