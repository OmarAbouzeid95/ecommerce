import { useLoaderData } from "react-router-dom";
import {useState, useEffect, useRef, useContext} from 'react'
import {countContext, loggedUser} from "../context"


// add to bag function
import { addToBag, bagCount } from "../scripts/bagFunctions"

// crud functions
import { findProduct, updateProduct } from "../scripts/crudFunctions"

// stars icons
import starFill from "../media/icons/star-solid.svg"
import starHollow from "../media/icons/star-regular.svg"
import halfStar from "../media/icons/star-half-stroke-solid.svg"
import send from "../media/icons/paper-plane-solid.svg"

function ProductDetails() {

    const data = useLoaderData()
    const [currentImg, setCurrentImg] = useState(data.img)
    const [size, setSize] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [error, setError] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [review, setReview] = useState('')
    const [details, setDetails] = useState({rating: 0, reviews: [], ratingCount: 0})
    const key = useRef(0)
    const {setCount} = useContext(countContext)
    const { user, setUser } = useContext(loggedUser)
    const url = `${process.env.REACT_APP_SERVER_URL}/updateBag`

    async function addToUserBag(){
        const updatedUser = await addToBag(data.id, size, quantity, user, url)
        setUser(updatedUser)
        setCount(bagCount(updatedUser))
    }

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        })

        // get product details
        findProduct(`${process.env.REACT_APP_SERVER_URL}/productDetails/${data.id}`)
        .then(product => {
            // found product
            if(product){
                setDetails({reviews: product.reviews, rating: product.rating, ratingCount: product.ratingCount})
            }
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                        addToUserBag()
                        
                    }
                }}>Add to bag</button>
                <p>{data.description}</p>
                <div className="productReviews">
                    <div className="productReviewInfo flex-sb">
                        <h3>Reviews({details.reviews.length})</h3>
                        <div className="starsContainer">
                            <p style={{marginRight: '0.5em'}}>{details.rating}</p>
                            <img src={details.rating >= 0.5 ? details.rating >= 1 ? starFill : halfStar : starHollow} alt="star icon" className="star-icon"/>
                            <img src={details.rating >= 1.5 ? details.rating >= 2 ? starFill : halfStar : starHollow} alt="star icon" className="star-icon"/>
                            <img src={details.rating >= 2.5 ? details.rating >= 3 ? starFill : halfStar : starHollow} alt="star icon" className="star-icon"/>
                            <img src={details.rating >= 3.5 ? details.rating >= 4 ? starFill : halfStar : starHollow} alt="star icon" className="star-icon"/>
                            <img src={details.rating >= 4.5 ? details.rating === 5 ? starFill : halfStar : starHollow} alt="star icon" className="star-icon"/>
                        </div>
                    </div>
                    <div className="inputContainer">
                        <textarea className="reviewInput" placeholder="Write a review..." onChange={(e) => setReview(e.target.value)}></textarea>
                        <img src={send} alt="send icon" className="send-icon" onClick={() => {
                            // unshift last review
                            details.reviews.unshift(review)
                            updateProduct(`${process.env.REACT_APP_SERVER_URL}/updateProduct`, details, data.id)
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;