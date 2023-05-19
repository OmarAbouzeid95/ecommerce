import { useLoaderData } from 'react-router-dom'

// import ProductList from '../Components/ProductList'
import ProductGrid from '../Components/ProductGrid'

function ShopCategory() {

    const data = useLoaderData()
    const allProducts = []

    // adding all category products
    for (const property in data) {
        data[property].forEach(product => {
            allProducts.push(product)
        })
    }

    return ( 
            <div className="shopCategory"> 
                <h2>{data.title}</h2>
                <ProductGrid list={allProducts} title="Men's"/>
            </div>
           );
}

export default ShopCategory;