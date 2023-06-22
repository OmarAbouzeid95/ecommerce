import { useLoaderData } from "react-router-dom";
// import { useState, useEffect } from "react";
import ProductGrid from "../Components/ProductGrid";

function Search() {
    
    const data = useLoaderData()
    // const [products, setProducts] = useState(data.result)

    // useEffect(() => {
    //     setProducts(data.result)
    // }, [data])

    return ( 
        <div className="shopSearch" > 
            <div>
                <h2 style={{textAlign:'center', marginBottom: '0.5em'}}>{(data.keyword === '') ? 'All products' : ((data.result.length > 0) ? data.result.length : 'No') + ` result${(data.result.length === 1 ? '' : 's')} found for "${data.keyword}"`}</h2>
                <ProductGrid list={data.result}/>
            </div>
        </div>
    );
}

export default Search