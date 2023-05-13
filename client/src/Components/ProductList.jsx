import Product from './Product'
import Carousel from "react-multi-carousel"
import "../../node_modules/react-multi-carousel/lib/styles.css"


function ProductList({list, title}) {

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
            <Product props={product}/>
        )
    })

    console.log(allProducts)

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