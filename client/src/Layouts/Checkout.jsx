import CheckoutForm from "../Components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useContext } from "react";
import { stripeContext } from "../context";
import { stripePromise } from "../App";

function Checkout() {
  const { clientSecret } = useContext(stripeContext);
  return (
    <div className="checkout">
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default Checkout;
