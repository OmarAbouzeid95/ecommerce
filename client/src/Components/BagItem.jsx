import deleteIcon from '../media/icons/delete.svg'
import {useState, useEffect, useRef} from 'react'
import { updateBagQuantity, removeFromBag } from '../bagFunctions'

function BagItem({props, updateQuantity, removeProduct}) {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [quantity, setQuantity] = useState(props.quantity)
    const [removed, setRemoved] = useState(false)
    const initialRenderE1 = useRef(true)
    const initialRenderE2 = useRef(true)

    // window resize listener and quantity effect
    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        })

        if(!initialRenderE1.current){
            // whenever the quantity changes -> call updateBagQuantity to update the localStorage/DB
            updateBagQuantity(props.id, props.size, quantity)
            updateQuantity(props.id, props.size, quantity)
        }else {
            initialRenderE1.current = false
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantity])

    // product is removed from the bag effect
    useEffect(() => {

        if(!initialRenderE2.current){
            // when removed flag is trigged call the update products function
            removeFromBag(props.id, props.size)
            removeProduct(props.id, props.size)
        }else {
            initialRenderE2.current = false
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [removed])

    return (  
        <div className="bagProductContainer">
            <img className="bagProductImg" src={props.img} alt="bag product" />
            <div className="bagProductInfo">
                <div>
                    <h3>{props.name}</h3>
                    <div className="flex-sb">
                        <p>Price</p>
                        <p className="bagProductPrice">${props.price}</p>
                    </div>
                    {(windowWidth > 410) && <div className="flex-sb">
                                                <p>Size</p>
                                                <p style={{textTransform: 'uppercase'}}>{props.size}</p>
                                            </div>}
                    {(windowWidth > 410) && <div className="productQuantity">
                        <p>Quantity</p>
                        <p className="quantityContainer"><button onClick={() => (quantity > 1) ? setQuantity(quantity-1) : ''}>-</button>
                                                        {quantity}
                                                        <button onClick={() => setQuantity(quantity+1)}>+</button></p>
                    </div>}
                </div>
                    {(windowWidth <= 410) && <p>Size<span>{props.size}</span></p>}
                    {(windowWidth <= 410) && <div className="productQuantity">
                        <p>Quantity</p>
                        <p className="quantityContainer"><button onClick={() => (quantity > 1) ? setQuantity(quantity-1) : ''}>-</button>
                                                        {quantity}
                                                        <button onClick={() => setQuantity(quantity+1)}>+</button></p>
                    </div>}
                <img className="removeFromBag" src={deleteIcon} alt="delete icon" onClick={() => setRemoved(true)}/>
            </div>
        </div>
    );
}

export default BagItem;