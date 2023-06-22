import {useState} from 'react'
import {Link} from 'react-router-dom'

function Product({props}) {

    const [key] = useState(props.id)
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEnter = () => {
        setIsHovered(true)

        // preloading hovered image
        const hoveredImg = new Image()
        hoveredImg.src = props.imgArray[0]
    }

    const handleMouseLeave = () => setIsHovered(false)

    return ( 
        <div className="productContainer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
            <Link to={`/product/details/${props.id}`}>
                <div className="productImgContainer">
                    <img className="productImg fastAnimate" key={key} src={isHovered ? props.imgArray[0] : props.img} alt={props.alt}/>
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