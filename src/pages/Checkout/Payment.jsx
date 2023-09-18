import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./Checkout";
import PayProduct from "./PayProduct/PayProduct";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PASS);
const Payment = () => {
  return (
   <div className="bg-[#ffffff]">
   <PayProduct/>
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
   </div>
  );
};

export default Payment