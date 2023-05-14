import { useLoaderData } from "react-router-dom";
import {useState, useEffect} from 'react'

function ProductDetails() {

    const data = useLoaderData()
    console.log(data)
    const [currentImg, setCurrentImg] = useState(data.img)
    const [size, setSize] = useState('')
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        })
    })

    const imgsArray = data.imgArray.map(img => {
        return (<img className={`otherProductImg ${(currentImg === img) ? 'selectedImg' : ''}`} src={img} alt="other product img"
                 onClick={() => setCurrentImg(img)}
                 onMouseOver={() => setCurrentImg(img)}/>)
    })

    // inserting main img at the beginning of the array
    imgsArray.unshift(<img className={`otherProductImg ${(currentImg === data.img) ? 'selectedImg' : ''}`} src={data.img} alt="other product img"
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
                <h4>Select size</h4>
                <div className="productSizes">
                    <button className={`sizeBox ${(size === 's') ? 'selectedBtn' : ''}`} onClick={() => setSize('s')}>S</button>
                    <button className={`sizeBox ${(size === 'm') ? 'selectedBtn' : ''}`} onClick={() => setSize('m')}>M</button>
                    <button className={`sizeBox ${(size === 'l') ? 'selectedBtn' : ''}`} onClick={() => setSize('l')}>L</button>
                    <button className={`sizeBox ${(size === 'xl') ? 'selectedBtn' : ''}`} onClick={() => setSize('xl')}>XL</button>
                </div>
                <button className="addToBagBtn">Add to bag</button>
                <p>{data.description}</p>
            </div>
        </div>
    );
}

export default ProductDetails;