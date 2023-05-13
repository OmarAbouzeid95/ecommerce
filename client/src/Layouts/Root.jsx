import Header from './Header'
import Footer from './Footer'
import Canvas from '../Components/Canvas'
import ProductList from '../Components/ProductList'

import {Outlet, useLocation} from 'react-router-dom'

// import db from '../db'

import img1 from '../media/winterJacket/CGwinterJ_11.webp'
import img2 from '../media/winterJacket/CGwinterJ_21.webp'
import img3 from '../media/winterJacket/CGwinterJ_31.webp'
import img4 from '../media/winterJacket/CGwinterJ_41.webp'
import img5 from '../media/winterJacket/CGwinterJ_51.webp'
import img6 from '../media/winterJacket/CGwinterJ_61.webp'
import img7 from '../media/winterJacket/CGwinterJ_71.webp'
import img8 from '../media/winterJacket/CGwinterJ_81.webp'

function Root() {

    const localDb = {
        winterJakcets: [
            {
                name: "Canada Goose Jacket",
                gender: "men",
                img: img1,
                price: 1299,
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quas veniam quaerat voluptate, illo iste rerum, aspernatur molestiae cum libero deserunt eaque ab obcaecati similique saepe quam, sint nam voluptates!",
                imgArray: ["../media/winterJacket/CGwinterJ_12.webp", "../media/winterJacket/CGwinterJ_12.webp", "../media/winterJacket/CGwinterJ_12.webp"]
            },
            {
                "name": "Canada Goose Jacket",
                gender: "men",
                img: img2,
                price: 1299,
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quas veniam quaerat voluptate, illo iste rerum, aspernatur molestiae cum libero deserunt eaque ab obcaecati similique saepe quam, sint nam voluptates!",
                imgArray: ["../media/winterJacket/CGwinterJ_22.webp", "../media/winterJacket/CGwinterJ_22.webp", "../media/winterJacket/CGwinterJ_22.webp"]
            },
            {
                "name": "Canada Goose Jacket",
                gender:"men",
                img: img3,
                price: 1299,
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quas veniam quaerat voluptate, illo iste rerum, aspernatur molestiae cum libero deserunt eaque ab obcaecati similique saepe quam, sint nam voluptates!",
                imgArray: ["../media/winterJacket/CGwinterJ_32.webp", "../media/winterJacket/CGwinterJ_32.webp", "../media/winterJacket/CGwinterJ_32.webp"]
            }
            ,
            {
                "name": "Canada Goose Jacket",
                gender:"men",
                img: img4,
                price: 1299,
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quas veniam quaerat voluptate, illo iste rerum, aspernatur molestiae cum libero deserunt eaque ab obcaecati similique saepe quam, sint nam voluptates!",
                imgArray: ["../media/winterJacket/CGwinterJ_42.webp", "../media/winterJacket/CGwinterJ_42.webp", "../media/winterJacket/CGwinterJ_42.webp"]
            }   ,
            {
                "name": "Canada Goose Jacket",
                gender:"women",
                img: img5,
                price: 1299,
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quas veniam quaerat voluptate, illo iste rerum, aspernatur molestiae cum libero deserunt eaque ab obcaecati similique saepe quam, sint nam voluptates!",
                imgArray: ["../media/winterJacket/CGwinterJ_52.webp", "../media/winterJacket/CGwinterJ_52.webp", "../media/winterJacket/CGwinterJ_52.webp"]
            }
            ,
            {
                "name": "Canada Goose Jacket",
                gender:"women",
                img: img6,
                price: 1299,
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quas veniam quaerat voluptate, illo iste rerum, aspernatur molestiae cum libero deserunt eaque ab obcaecati similique saepe quam, sint nam voluptates!",
                imgArray: ["../media/winterJacket/CGwinterJ_62.webp", "../media/winterJacket/CGwinterJ_62.webp", "../media/winterJacket/CGwinterJ_62.webp"]
            }
            ,
            {
                "name": "Canada Goose Jacket",
                gender:"women",
                img: img7,
                price: 1299,
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quas veniam quaerat voluptate, illo iste rerum, aspernatur molestiae cum libero deserunt eaque ab obcaecati similique saepe quam, sint nam voluptates!",
                imgArray: ["../media/winterJacket/CGwinterJ_72.webp", "../media/winterJacket/CGwinterJ_72.webp", "../media/winterJacket/CGwinterJ_72.webp"]
            }
            ,
            {
                "name": "Canada Goose Jacket",
                gender:"women",
                img: img8,
                price: 1299,
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quas veniam quaerat voluptate, illo iste rerum, aspernatur molestiae cum libero deserunt eaque ab obcaecati similique saepe quam, sint nam voluptates!",
                imgArray: ["../media/winterJacket/CGwinterJ_82.webp", "../media/winterJacket/CGwinterJ_82.webp", "../media/winterJacket/CGwinterJ_82.webp"]
            }      
        ]
    }

    // const winterJackets = db.winterJakcets



    // location of the current page
    const loc = useLocation()
    
    return ( 
        <div className="home">
            <Header />
            {/* Conditional rendering of the canvas ads if you're on the homepage */}
            {(loc.pathname === '/') && <Canvas />}
            <div className="outletWrapper">
                <ProductList list={localDb.winterJakcets} title='Winter Jackets'/>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default Root;