import {useState} from 'react'
import {Link} from 'react-router-dom'

function Product({props}) {

    const [key] = useState(props.id)
    const [isHovered, setIsHovered] = useState(false)
    const hoveredImg = props.imgArray[0]
    const mainImg = props.img


    return ( 
        <div className="productContainer" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
            <Link to={`/product/details/${props.id}`}>
                <div className="productImgContainer">
                    <img className="productImg fastAnimate" key={key} src={isHovered ? hoveredImg : mainImg} alt={props.alt}/>
                </div>
                <div className="productInfo">
                    <h5>{props.name}</h5>
                    <h5>${props.price}</h5>
                </div>
            </Link>
        </div>
    );
}

export default Product;