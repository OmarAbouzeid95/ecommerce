import {
  PaymentElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import Loader from "./Loader";
import { useState, useContext } from "react";
import { loggedUser, countContext } from "../context";
import { clearBag } from "../scripts/bagFunctions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TOAST_OPTIONS } from "../constants";
import { updateBagItems } from "../scripts/crudFunctions";

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(loggedUser);
  const { setCount } = useContext(countContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    // const result = await stripe.confirmPayment({
    //   elements,
    //   confirmParams: {
    //     return_url: "http://localhost:3000",
    //   },
    //   redirect: "if_required",
    // });

    // if (result.error) {
    //   console.log("Something went wrong", result.error);
    // } else {
    //   console.log("successful payment response:  ", result);
    //   clearBag(`${process.env.REACT_APP_SERVER_URL}/updateBag`, user);
    //   setCount(0);
    // }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setLoading(false);
      toast.error("Something went wrong", TOAST_OPTIONS);
    } else {
      setTimeout(async () => {
        // updating user orders
        if (user) {
          console.log("in updateUserData: ", {
            ...user,
            orders: user.bagItems,
          });
          const updatedUser = await updateBagItems(
            `${process.env.REACT_APP_SERVER_URL}/updateBag`,
            {
              ...user,
              orders: user.bagItems,
              bagItems: [],
            }
          );
          setUser(updatedUser);
          console.log("updatedUser: ", updatedUser);
        } else {
          localStorage.setItem("orders", localStorage.getItem("bagItems"));
          localStorage.setItem("bagItems", JSON.stringify([]));
        }

        setCount(0);

        // show toast
        toast.success("Your order has been placed", TOAST_OPTIONS);

        navigate("/orders");
        setLoading(false);
      }, 1500);
    }
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
