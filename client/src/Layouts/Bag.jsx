import { Link } from 'react-router-dom';
import BagItem from '../Components/BagItem'
import {countContext, currentLoc, loggedUser} from '../context';
import {useState, useEffect, useContext} from 'react'

function Bag() {

    // state for products and total price
    const { user } = useContext(loggedUser)
    const { loc } = useContext(currentLoc)
    const [products, setProducts] = useState(user ? user.bagItems : JSON.parse(localStorage.getItem('bagItems')) ? JSON.parse(localStorage.getItem('bagItems')) : [])
    const [deliveryFee, setDeliveryFee] = useState(4.99)
    const [total, setTotal] = useState(0)
    const {setCount} = useContext(countContext)

    console.log(products)


    // function to update the products
    function updateQuantity(id, size, quantity) {

        const result = []
        products.forEach(product => {
            // found product -> update the quantity & push to the array
            if((product.id === id) && (product.size === size)){
                result.push({...product, quantity: quantity})
            }else {
                result.push(product)
            }
        })
        setProducts(result)
    }

    // function to remove products from the bag
    function removeProduct(id, size) {

        const result = []
        products.forEach(product => {
            if(!((product.id === id) && (product.size === size))){
                result.push(product)
            }
        })
        setProducts(result)
    }


    // calculating total price whenever the products state changes
    useEffect(() => {

        // scroll to top on first render
        if(!loc.includes('/bag')){
            window.scrollTo(0,0)
        }

        if(products && (products.length > 0)){
            // creating array of product prices
            const prices = products.map(product => (product.price * product.quantity))
            // calculating total using reduce
            setTotal(prices.reduce((accumulator, currentValue) => accumulator + currentValue))
            
            let count = 0
            products.forEach(product => {
                count += product.quantity
            })
            setCount(count)
        }else{
            setTotal(0)
            setDeliveryFee(0)
            setCount(0)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products])
    
    const bagItems = (products && (products.length > 0)) ? products.map(product => {
                                        return (<BagItem props={product} key={product.id + product.size} updateQuantity={updateQuantity} removeProduct={removeProduct}/>)
                                    }) : ''

    return ( 
        <div className="bagItemsContainer">
            <h2 className="bagItemsCost-br">Shopping Bag</h2>
            <div>
                {bagItems}
            </div>
            {!(products && (products.length > 0)) && <div className="bagItemsMsg">Your bag looks empty. <Link to='/'>Go shopping</Link></div>}
            <div className="bagItemsSummary">
                <h2 className="bagItemsCost-br">Summary</h2>
                <div className="bagItemsCost">
                    <div>
                        <p>Subtotal</p>
                        <p>${total}</p>
                    </div>
                    <div>
                        <p>Delivery fees</p>
                        <p>${deliveryFee}</p>
                    </div>
                    <div className="bagItemsCost-br">
                        <p>Taxes</p>
                        <p>${(total * 0.13).toFixed(2)}</p>
                    </div>
                    <div>
                        <p>Total</p>
                        <p>${((total * 1.13) + deliveryFee).toFixed(2)}</p>
                    </div>
                    <button className="checkoutBtn" disabled={(products.length > 0) ? false : true }>Checkout</button>
                </div>
            </div>
        </div>
    );
}

export default Bag;