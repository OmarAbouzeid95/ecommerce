import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

function Product({props}) {

    const [key] = useState(props.id)
    const [currentImg, setCurrentImg] = useState(props.img)

    // preloading hovered image
    useEffect(() => {
        const hoveredImg = new Image()
        hoveredImg.src = props.imgArray[0]
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return ( 
        <div className="productContainer" onMouseEnter={() => setCurrentImg(props.imgArray[0])} onMouseLeave={() => setCurrentImg(props.img)} >
            <Link to={`/product/details/${props.id}`}>
                <div className="productImgContainer">
                    <img className="productImg fastAnimate" key={key} src={currentImg} alt={props.alt}/>
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