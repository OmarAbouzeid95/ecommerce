import deleteIcon from '../media/icons/delete.svg'
import {useState, useEffect} from 'react'

function BagItem({props}) {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        })
    })

    return (  
        <div className="bagProductContainer">
            <img className="bagProductImg" src={props.img} alt="bag product" />
            <div className="bagProductInfo">
                <div>
                    <h3>{props.name}</h3>
                    <p className="bagProductPrice">${props.price}</p>
                    {(windowWidth > 410) && <p>Size<span>{props.size}</span></p>}
                </div>
                    {(windowWidth <= 410) && <p>Size<span>{props.size}</span></p>}
                <img className="removeFromBag" src={deleteIcon} alt="delete icon" />
            </div>
        </div>
    );
}

export default BagItem;