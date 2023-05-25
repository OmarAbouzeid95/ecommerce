import Product from './Product'
import {useEffect, useState, useRef} from 'react'

// importing filter functions
import { sortAscending, sortDescending, filterCategory } from '../filterFunctions'


function ProductGrid({list, title}) {

    // state to keep track of the products in case of applying filters on the main list
    const [products, setProducts] = useState(list)
    const [allProducts, setAllProducts] = useState(list.map(product => {
        return (
            <Product props={product} key={product.id}/>
        )
    }))
    const initialRender = useRef(true)

    /**
     * preloading all main images and first img of the array (the one shown when component is hovered)
     */
    useEffect(() => {
        list.forEach(product => {
          const mainImg = new Image()
          mainImg.src = product.img
          const hoveredImg = new Image()
          hoveredImg.src = product.imgArray[0]
        })
      })
    
    // updating products
    useEffect(() => {
        // skip filtering on initial render
        if(!initialRender.current){
            setAllProducts(products.map(product => {
                return (
                    <Product props={product} key={product.id}/>
                )
            }))
        }else{
            initialRender.current = false
        }
        
    }, [products])
    

    return ( 
        <div className="productsGridWrapper">
            <div className="filtersContainer flex-sb">
                <h2 className="productGridTitle">{title}</h2>
                {/* Filters container */}
                {(list.length > 0) && <div className="productGridFilters">
                    <select name="sort" id="sortPrice" onChange={(e) => {
                        if(e.target.value === 'ascending'){
                            const sortedProducts = sortAscending(products)
                            setProducts([...sortedProducts])
                        }else if(e.target.value === 'descending'){
                            const sortedProducts = sortDescending(products)
                            setProducts([...sortedProducts])
                        }
                    }}>
                        <option value="sort">Sort</option>
                        <option value="ascending">Price: Low to High</option>
                        <option value="descending">Price: High to Low</option>
                    </select>
                    <select name="category" id="filterCategory" onChange={(e) => setProducts([...filterCategory(list, e.target.value)])}>
                        <option value="select">Category</option>
                        <option value="winterJackets">Winter clothing</option>
                        <option value="summerWear">Summer wear</option>
                        <option value="trending">Trending</option>
                    </select>
                </div>}
                
            </div>
            <div className="productsGrid">
                {(allProducts.length === 0) && <h2>No results found</h2>}
                {allProducts}
            </div>
        </div>
    );
}

export default ProductGrid;