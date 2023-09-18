import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UseCartData from "../../hooks/UseCartData";
import { useEffect, useState } from "react";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import UseAuth from "../../hooks/UseAuth";
import Swal from "sweetalert2";
const Checkout = () => {
  const [addToCartProducts, cartDataRefetch] = UseCartData();
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [axiosSecure] = UseAxiosSecure();
  const { user } = UseAuth();
  const [processing, setProcessing] = useState(false);
  let price = 0;
  for (const product of addToCartProducts) {
    const multiply = product.price * product.quantity;
    price = parseFloat(price + multiply);
  }

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        const clientSecrets = res.data.clientSecret;
        setClientSecret(clientSecrets);
      });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message);
    }
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "unknown",
          },
        },
      });
    if (confirmError) {
      toast.error(confirmError.message);
    }

    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      const paymentProduct = {
        transactionId: paymentIntent.id,
        userEmail: user?.email,
        userName: user?.displayName,
        cartId: addToCartProducts.map((item) => item.addToCartId),
        payItemId: addToCartProducts.map((item) => item._id),
        itemName: addToCartProducts.map((item) => item.name),
        itemImage: addToCartProducts.map((item) => item.image),
        status: "pending",
        date: new Date(),
        amount:parseFloat(price),
        quantity:addToCartProducts.length
      };
      axiosSecure.post("/payment", paymentProduct).then((res) => {
        if (res.data.result.insertedId) {
          cartDataRefetch();
          Swal.fire("Payment done Successfully");
        }
      });
    }
  };

  return (
    <>
      {addToCartProducts &&
        addToCartProducts.length > 0 &&
        Array.isArray(addToCartProducts) && (
          <div className={`w-11/12 mx-auto`}>
            <div className="bg-[#fff] w-[50vw] my-12 flex flex-col p-5 rounded-md shadow-2xl">
              <h4 className="font-Roboto font-semibold">
                Total Price :<span className="text-[#fd4664]"> ${price}</span>
              </h4>
              <form className="my-6" onSubmit={handleSubmit}>
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />
                <button
                  className="w-full flex items-center justify-center bg-[#0a2540] text-white font-Roboto font-semibold h-12 mt-8 rounded-md disabled:cursor-not-allowed"
                  type="submit"
                  disabled={!stripe || !clientSecret || processing}
                >
                  Pay ${price.toFixed(2)}
                </button>
              </form>
            </div>
          </div>
        )}

      <ToastContainer
        position="top-center"
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
    </>
  );
};

export default Checkout;
