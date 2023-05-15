import Product from './Product'
import Carousel from "react-multi-carousel"
import "../../node_modules/react-multi-carousel/lib/styles.css"
import {useEffect} from 'react'


function ProductList({list, title}) {

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

    const responsive = {
        Screen1: {
          breakpoint: { max: 4000, min: 1360 },
          items: 5
        }
        ,
        Screen2: {
          breakpoint: { max: 1458, min: 1210 },
          items: 4
        }
        ,
        Screen3: {
          breakpoint: { max: 1209 , min: 850 },
          items: 3
        },
        Screen4: {
          breakpoint: { max: 849 , min: 0 },
          items: 2
        }
      }

    const allProducts = list.map(product => {
        return (
            <Product props={product} key={product.id}/>
        )
    })

    return ( 
        <div>
            <h2 className="productListTitle">{title}</h2>
            <Carousel containerClass="productListContainer" responsive={responsive}>
                {allProducts}
            </Carousel>
        </div>
    );
}

export default ProductList;