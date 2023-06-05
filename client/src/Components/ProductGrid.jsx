import Product from './Product'
import {useEffect, useState, useRef} from 'react'


// importing filter functions
import { sortAscending, sortDescending, filterCategory, filterGender } from '../scripts/filterFunctions'
import { useLocation } from 'react-router-dom'


function ProductGrid({list, title}) {

    // state to keep track of the products in case of applying filters on the main list
    const [products, setProducts] = useState(list)
    const [allProducts, setAllProducts] = useState(list.map(product => {
        return (
            <Product props={product} key={product.id}/>
        )
    }))
    const [sortFilter, setSortFilter] = useState(false)
    const initialRender = useRef(true)
    const loc = useLocation()


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
                    <select name="sort" id="sortPrice" style={{width: '90px'}} onChange={(e) => {
                        if(e.target.value === 'ascending'){
                            const sortedProducts = sortAscending(products)
                            setSortFilter('ascending')
                            setProducts([...sortedProducts])
                        }else if(e.target.value === 'descending'){
                            const sortedProducts = sortDescending(products)
                            setSortFilter('descending')
                            setProducts([...sortedProducts])
                        }else{
                            setSortFilter(false)
                        }
                    }}>
                        <option value="sort">Sort By</option>
                        <option value="ascending">Price: Low-High</option>
                        <option value="descending">Price: High-Low</option>
                    </select>
                    {/* category selection is not available in the search page (except for all products page)*/}
                    {(loc.pathname.includes('/shop/men') || loc.pathname.includes('/shop/men')) && <select name="category" id="filterCategory" style={{width: '92px'}}
                        onChange={(e) => {
                            // filtering category and checking if sorting filter is applied
                            let result = [...filterCategory(list, e.target.value)]
                            if(sortFilter){
                                result = (sortFilter === 'ascending') ? sortAscending(result) : sortDescending(result)
                            }
                            setProducts(result)
                        }}> 
                        <option value="select">Category</option>
                        <option value="winterJackets">Winter clothing</option>
                        <option value="summerWear">Summer wear</option>
                        <option value="trending">Trending</option>
                    </select>}
                    {/* Gender selection only available in search webpage */}
                    {loc.pathname.includes('/search') && <select name="gender" id="genderFilter" style={{width: '75px'}} 
                        onChange={(e) => {
                            // filtering gender and checking if sorting filter is applied
                            let result = [...filterGender(list, e.target.value)]
                            if(sortFilter){
                                result = (sortFilter === 'ascending') ? sortAscending(result) : sortDescending(result)
                            }
                            setProducts(result)
                        }}>               
                        <option value="gender">Gender</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                    </select>}
                </div>}
                
            </div>
            <div className="productsGrid">
                {allProducts}
            </div>
        </div>
    );
}

export default ProductGrid;