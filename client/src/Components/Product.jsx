

function Product({props}) {

    console.log(props)
    return ( 
        <div className="productContainer">
            <div className="productImgContainer">
                <img src={props.img} alt={props.alt}/>
            </div>
            <div className="productInfo">
                <h5>{props.name}</h5>
                <h5>${props.price}</h5>
            </div>
        </div>
    );
}

export default Product;