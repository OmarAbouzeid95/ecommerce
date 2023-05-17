import { useLoaderData } from 'react-router-dom';
import BagItem from '../Components/BagItem'
import {useState, useEffect} from 'react'

function Bag() {

    const data = useLoaderData()
    const deliveryFee = 4.99
    // state for products and total price
    const [products, setProducts] = useState(data)
    const [total, setTotal] = useState(0)

    // function to update the products
    function updateProducts(id, size, quantity) {

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

    // calculating total price whenever the products state changes
    useEffect(() => {

        // creating array of product prices
        const prices = products.map(product => (product.price * product.quantity))
        // calculating total using reduce
        setTotal(prices.reduce((accumulator, currentValue) => accumulator + currentValue))

    }, [products])
    
    const bagItems = data.map(product => {
        return (<BagItem props={product} key={product.id} updateBag={updateProducts}/>)
    })

    return ( 
        <div className="bagItemsContainer">
            <h2 className="bagItemsCost-br">Shopping Bag</h2>
            <div>
                {bagItems}
            </div>
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
                    <button>Checkout</button>
                </div>
            </div>
        </div>
    );
}

export default Bag;