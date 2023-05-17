import deleteIcon from '../media/icons/delete.svg'
import {useState, useEffect, useRef} from 'react'
import { updateBagQuantity } from '../functions'

function BagItem({props, updateBag}) {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [quantity, setQuantity] = useState(props.quantity)
    const initialRender = useRef(true)

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        })

        if(!initialRender.current){
            // whenever the quantity changes -> call updateBagQuantity to update the localStorage/DB
            updateBagQuantity(props.id, props.size, quantity)
            updateBag(props.id, props.size, quantity)
        }else {
            initialRender.current = false
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantity])

    return (  
        <div className="bagProductContainer">
            <img className="bagProductImg" src={props.img} alt="bag product" />
            <div className="bagProductInfo">
                <div>
                    <h3>{props.name}</h3>
                    <p className="bagProductPrice">${props.price}</p>
                    {(windowWidth > 410) && <p>Size<span>{props.size}</span></p>}
                    <div className="productQuantity">
                        <h4>Quantity</h4>
                        <p className="quantityContainer"><button onClick={() => (quantity > 1) ? setQuantity(quantity-1) : ''}>-</button>
                                                        {quantity}
                                                        <button onClick={() => setQuantity(quantity+1)}>+</button></p>
                    </div>
                </div>
                    {(windowWidth <= 410) && <p>Size<span>{props.size}</span></p>}
                    {(windowWidth <= 410) && <p>Quantity<span>{props.quantity}</span></p>}
                <img className="removeFromBag" src={deleteIcon} alt="delete icon" />
            </div>
        </div>
    );
}

export default BagItem;