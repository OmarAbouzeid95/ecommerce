import { useLoaderData } from "react-router-dom";

function ProductDetails() {

    const data = useLoaderData()
    console.log(data)

    return ( 
        <div>
            <h1>Product Details</h1>
        </div>
    );
}

export default ProductDetails;