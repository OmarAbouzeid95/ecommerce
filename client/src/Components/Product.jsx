import {useState} from 'react'
import {Link} from 'react-router-dom'

function Product({props}) {

    const [key, setKey] = useState(props.id)

    return ( 
        <div className="productContainer" onMouseEnter={() => setKey(props.id * 999)} onMouseLeave={() => setKey(props.id)} >
            <Link to={`/product/details/${props.id}`}>
                <div className="productImgContainer">
                    <img className="productImg fastAnimate" key={key} src={(key === props.id) ? props.img : props.imgArray[0]} alt={props.alt}/>
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