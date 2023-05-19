import Product from './Product'
import {useEffect} from 'react'


function ProductGrid({list, title}) {

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

    const allProducts = list.map(product => {
        return (
            <Product props={product} key={product.id}/>
        )
    })

    return ( 
        <div className="productsGridWrapper">
            <div className="filtersContainer flex-sb">
                <h2 className="productGridTitle">{title}</h2>
                <button>Filters</button>
            </div>
            <div className="productsGrid">
                {allProducts}
            </div>
        </div>
    );
}

export default ProductGrid;