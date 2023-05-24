import { useLoaderData } from "react-router-dom";
import ProductGrid from "../Components/ProductGrid";

function Search() {
    
    const data = useLoaderData()
    console.log(data)
    return ( 
        <div className="shopCategory"> 
                <h2 style={{textAlign:'center'}}>{(data.keyword === '') ? 'All products' : ((data.result.length > 0) ? data.result.length : 'No') + ` results found for "${data.keyword}"`}</h2>
                <ProductGrid list={data.result}/>
            </div>
    );
}

export default Search;