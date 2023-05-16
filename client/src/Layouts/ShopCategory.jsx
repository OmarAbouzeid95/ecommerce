import { useLoaderData } from 'react-router-dom'

// import ProductList from '../Components/ProductList'
import ProductGrid from '../Components/ProductGrid'

function ShopCategory() {


    const data = useLoaderData()

    return ( 
            <div className="shopCategory"> 
                <h2>{data.title}</h2>
                <ProductGrid list={data.winterJackets} title="Winter Jackets"/>
            </div>
           );
}

export default ShopCategory;