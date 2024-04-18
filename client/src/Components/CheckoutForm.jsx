import {
  PaymentElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import Loader from "./Loader";
import { useState, useContext } from "react";

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async () => {
    setLoading(true);
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000",
      },
      redirect: "if_required",
    });

    if (result.error) {
      console.log("Something went wrong", result.error);
    } else {
      console.log("successful payment response:  ", result);
      // clear localStorage
      localStorage.setItem("bagItems", JSON.stringify([]));
    }

    setLoading(false);
  };

  return (
    <div>
      <h3 className="checkoutForm-header">
        You're one step away from completing your order
      </h3>
      <PaymentElement />
      <button
        className="purchase--btn"
        disabled={!stripe || loading}
        onClick={handleSubmit}>
        {!loading ? (
          "Place order"
        ) : (
          <div className="submit-content">
            <Loader size={15} color={"white"} />
            <span className="submit-text">Place Order</span>
          </div>
        )}
      </button>
    </div>
  );
};

export default CheckoutForm;
