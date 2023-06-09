
import paypal from '../media/icons/paypal.svg'
import applepay from '../media/icons/apple-pay.svg'
import googlepay from '../media/icons/google-pay.svg'

function Checkout() {
    return ( 
        <div className="checkout">
            <div class="modal">
                <form class="form">
                <div class="payment--options">
                    <div name="paypal" type="button">
                        <img src={paypal} alt="paypal logo" className="payment-logo"/>
                    </div>
                    <div name="apple-pay" type="button">
                        <img src={applepay} alt="apple-pay logo" className="payment-logo"/>
                    </div>
                    <div name="google-pay" type="button">
                        <img src={googlepay} alt="google-pay logo" className="payment-logo"/>
                    </div>
                </div>
                <div class="separator">
                    <hr class="line"></hr>
                    <p>or pay using credit card</p>
                    <hr class="line"></hr>
                </div>
                <div class="credit-card-info--form">
                    <div class="input_container">
                    <label for="password_field" class="input_label">Card holder full name</label>
                    <input id="password_field" class="input_field" type="text" name="input-name" title="Inpit title" placeholder="Enter your full name" />
                    </div>
                    <div class="input_container">
                    <label for="password_field" class="input_label">Card Number</label>
                    <input id="password_field" class="input_field" type="number" name="input-name" title="Inpit title" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div class="input_container">
                    <label for="password_field" class="input_label">Expiry Date / CVV</label>
                    <div class="split">
                    <input id="password_field" class="input_field" type="text" name="input-name" title="Expiry Date" placeholder="01/23" />
                    <input id="password_field" class="input_field" type="number" name="cvv" title="CVV" placeholder="CVV" />
                    </div>
                    </div>
                </div>
                    <button class="purchase--btn">Checkout</button>
                </form>
            </div>
        </div>
     );
}

export default Checkout;