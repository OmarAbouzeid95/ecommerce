import { useLoaderData } from 'react-router-dom';
import BagItem from '../Components/BagItem'

function Bag() {

    const data = useLoaderData()
    
    const bagItems = data.map(product => {
        return (<BagItem props={product} key={product.id}/>)
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
                        <p>${}</p>
                    </div>
                    <div>
                        <p>Delivery fees</p>
                        <p>${}</p>
                    </div>
                    <div className="bagItemsCost-br">
                        <p>Taxes</p>
                        <p>${}</p>
                    </div>
                    <div>
                        <p>Total</p>
                        <p>${}</p>
                    </div>
                    <button>Checkout</button>
                </div>
            </div>
        </div>
    );
}

export default Bag;