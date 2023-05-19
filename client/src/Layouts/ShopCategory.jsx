import { useLoaderData } from 'react-router-dom'

// import ProductList from '../Components/ProductList'
import ProductGrid from '../Components/ProductGrid'

function ShopCategory() {

    const data = useLoaderData()
    const allProducts = []

    // adding all category products
    for (const property in data) {
        // check if property is an array
        if (Array.isArray(data[property])){
            data[property].forEach(product => {
                allProducts.push(product)
            })
        }
    }

    return ( 
            <div className="shopCategory"> 
                <ProductGrid list={allProducts} title={data.category}/>
            </div>
           );
}

export default ShopCategory;