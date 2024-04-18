import { PaymentElement, Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../App";
import { useContext } from "react";
import { stripeContext } from "../context";

const CheckoutForm = () => {
  const { clientSecret } = useContext(stripeContext);

  return (
    <form>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentElement />
        <button>Submit</button>
      </Elements>
    </form>
  );
};

export default CheckoutForm;
