import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import styles from "../../style/style.js";
import {Link} from "react-router-dom";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
const ProfileContent = ({ active }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full">
      {/* Profile*/}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src="https://wallpaperaccess.com/full/2213424.jpg"
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ada32]"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <AiOutlineCamera />
              </div>
            </div>
            <br />
            <br />
          </div>
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex pb-3">
                <div className="w-[100%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    // value={phoneNumber}
                    // onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Enter your password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>
      )}
      {/* Order*/}
      {active === 2 && (
        <div className="">
          <AllOrders />
        </div>
      )}
      {/* Refund */}
      {active === 3 && (
        <div className="">
          <AllRefundOrders />
        </div>
      )}
      {/* Track order*/}
      {active === 5 && (
        <div className="">
          <TrackOrders />
        </div>
      )}
      {/* Track order*/}
      {active === 6 && (
        <div className="">
          <PaymentMethod />
        </div>
      )}
      {/* Address*/}
      {active === 7 && (
        <div className="">
          <Address />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const orders = [
    {
      _id: "3643475463456363456456545485",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
    //   cellClassName: (params) => {
    //     return params.getValue(params.id, "status") === "Delivered"
    //       ? "greenColor"
    //       : "redColor";
    //   },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });
  return (
    <div
      className="pl-8 pt-1"
    >
        <DataGrid 
        rows={row}
        columns={columns}
        pageSizeOptions={10}
        disableRowSelectionOnClick
        autoHeight
        ></DataGrid>
    </div>
  );
};

const AllRefundOrders = () =>{
    const orders = [
        {
          _id: "3643475463456363456456545485",
          orderItems: [
            {
              name: "Iphone 14 pro max",
            },
          ],
          totalPrice: 120,
          orderStatus: "Processing",
        },
      ];
    
      const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    
        {
          field: "status",
          headerName: "Status",
          minWidth: 130,
          flex: 0.7,
        //   cellClassName: (params) => {
        //     return params.getValue(params.id, "status") === "Delivered"
        //       ? "greenColor"
        //       : "redColor";
        //   },
        },
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 130,
          flex: 0.7,
        },
    
        {
          field: "total",
          headerName: "Total",
          type: "number",
          minWidth: 130,
          flex: 0.8,
        },
    
        {
          field: " ",
          flex: 1,
          minWidth: 150,
          headerName: "",
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <>
                <Link to={`/user/order/${params.id}`}>
                  <Button>
                    <AiOutlineArrowRight size={20} />
                  </Button>
                </Link>
              </>
            );
          },
        },
      ];
    
      const row = [];
    
      orders &&
        orders.forEach((item) => {
          row.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            total: "US$ " + item.totalPrice,
            status: item.orderStatus,
          });
        });
      return (
        <div
          className="pl-8 pt-1"
        >
            <DataGrid 
            rows={row}
            columns={columns}
            pageSizeOptions={10}
            disableRowSelectionOnClick
            autoHeight
            ></DataGrid>
        </div>
      );
}

const TrackOrders = () =>{
  return(
    <div className="">
      Track order
    </div>
  )
}

const PaymentMethod = () =>{
  return(
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">Payment Method</h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-[#fff]">Add new</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <img src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg" alt="" />
          <h5 className="pl-5 flex items-center">Sabbir Hossain</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>1234 **** *** ****</h6>
          <h5 className="pl-6">08/2024</h5>
        </div>
        <div className="min-h-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer"/>
        </div>
      </div>
    </div>
  )
}

const Address = () =>{
  return(
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">My Address</h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-[#fff]">Add new</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <h5 className="pl-5 flex items-center">Default</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>Patnitala, Naogoan, Bangladesh</h6>
        </div>
        <div className="pl-8 flex items-center">
          <h6>+8801777051339</h6>
        </div>
        <div className="min-h-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer"/>
        </div>
      </div>
    </div>
  )
}
export default ProfileContent;
