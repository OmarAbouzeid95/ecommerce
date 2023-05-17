import { useLoaderData } from "react-router-dom";
import {useState, useEffect, useRef} from 'react'

// add to bag function
import { addToBag } from "../functions";

function ProductDetails() {

    const data = useLoaderData()
    const [currentImg, setCurrentImg] = useState(data.img)
    const [size, setSize] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [error, setError] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const key = useRef(0)

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        })
    })

    const imgsArray = data.imgArray.map(img => {
        return (<img key={key.current++} className={`otherProductImg ${(currentImg === img) ? 'selectedImg' : ''}`} src={img} alt="other product img"
                 onClick={() => setCurrentImg(img)}
                 onMouseOver={() => setCurrentImg(img)}/>)
    })

    // inserting main img at the beginning of the array
    imgsArray.unshift(<img key={key.current++} className={`otherProductImg ${(currentImg === data.img) ? 'selectedImg' : ''}`} src={data.img} alt="other product img"
                        onClick={() => setCurrentImg(data.img)}
                        onMouseOver={() => setCurrentImg(data.img)}/>)

    return ( 
        <div className="productDetailsContainer">
            {(windowWidth < 630) && <div className="productNamePrice">
                <h3>{data.name}</h3>
                <p>${data.price}</p>
            </div>}
            <div className="productDetailsImgs">
                <img className="mainProductImg" src={currentImg} alt='main product view' />
                <div className="productDetailsImgArr">
                    {imgsArray}
                </div>
            </div>
            <div className="productDetailsInfo">
                {(windowWidth > 630) &&<h3>{data.name}</h3>}
                {(windowWidth > 630) && <p>${data.price}</p>}
                <h4>Select size {error && <span className="errorMsg">* You need to select a size first</span>}</h4>
                <div className="productSizes">
                    <button className={`sizeBox ${(size === 's') ? 'selectedBtn' : ''}`} onClick={() => setSize('s')}>S</button>
                    <button className={`sizeBox ${(size === 'm') ? 'selectedBtn' : ''}`} onClick={() => setSize('m')}>M</button>
                    <button className={`sizeBox ${(size === 'l') ? 'selectedBtn' : ''}`} onClick={() => setSize('l')}>L</button>
                    <button className={`sizeBox ${(size === 'xl') ? 'selectedBtn' : ''}`} onClick={() => setSize('xl')}>XL</button>
                </div>
                <div className="productQuantity">
                    <h4>Quantity</h4>
                    <p className="quantityContainer"><button onClick={() => (quantity > 1) ? setQuantity(quantity-1) : ''}>-</button>
                                                    {quantity}
                                                    <button onClick={() => setQuantity(quantity+1)}>+</button></p>
                </div>
                <button className="addToBagBtn" onClick={() => {
                    // toggle error flag if no size is selected
                    if(size === ''){
                        setError(true)
                    }else {
                        addToBag(data.id, size, quantity)
                    }
                }}>Add to bag</button>
                <p>{data.description}</p>
            </div>
        </div>
    );
}

export default ProductDetails;