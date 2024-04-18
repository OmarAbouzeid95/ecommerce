import paypal from "../media/icons/paypal.svg";
import applepay from "../media/icons/apple-pay.svg";
import googlepay from "../media/icons/google-pay.svg";

import CheckoutForm from "../Components/CheckoutForm";

function Checkout() {
  // return (
  //     <div className="checkout">
  //         <div className="modal">
  //             <form className="form">
  //             <div className="payment--options">
  //                 <div name="paypal" type="button">
  //                     <img src={paypal} alt="paypal logo" className="payment-logo"/>
  //                 </div>
  //                 <div name="apple-pay" type="button">
  //                     <img src={applepay} alt="apple-pay logo" className="payment-logo"/>
  //                 </div>
  //                 <div name="google-pay" type="button">
  //                     <img src={googlepay} alt="google-pay logo" className="payment-logo"/>
  //                 </div>
  //             </div>
  //             <div className="separator">
  //                 <hr className="line"></hr>
  //                 <p>or pay using credit card</p>
  //                 <hr className="line"></hr>
  //             </div>
  //             <div className="credit-card-info--form">
  //                 <div className="input_container">
  //                 <label htmlFor="password_field" className="input_label">Card holder full name</label>
  //                 <input id="password_field" className="input_field" type="text" name="input-name" title="Inpit title" placeholder="Enter your full name" />
  //                 </div>
  //                 <div className="input_container">
  //                 <label htmlFor="password_field" className="input_label">Card Number</label>
  //                 <input id="password_field" className="input_field" type="number" name="input-name" title="Inpit title" placeholder="0000 0000 0000 0000" />
  //                 </div>
  //                 <div className="input_container">
  //                 <label htmlFor="password_field" className="input_label">Expiry Date / CVV</label>
  //                 <div className="split">
  //                 <input id="password_field" className="input_field" type="text" name="input-name" title="Expiry Date" placeholder="01/23" />
  //                 <input id="password_field" className="input_field" type="number" name="cvv" title="CVV" placeholder="CVV" />
  //                 </div>
  //                 </div>
  //             </div>
  //                 <button className="purchase--btn" onClick={(e) => e.preventDefault()}>Checkout</button>
  //             </form>
  //         </div>
  //     </div>
  //  );
  return <CheckoutForm />;
}

export default Checkout;
