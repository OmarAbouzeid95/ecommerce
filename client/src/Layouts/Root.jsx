import Header from './Header'
import Footer from './Footer'
import Canvas from '../Components/Canvas'
import ProductList from '../Components/ProductList'

import {Outlet, useLocation} from 'react-router-dom'

import db from '../db'

function Root() {

    const winterJackets = db.winterJakcets

    // location of the current page
    const loc = useLocation()
    
    return ( 
        <div className="home">
            <Header />
            {/* Conditional rendering of the canvas ads if you're on the homepage */}
            {(loc.pathname === '/') && <Canvas />}
            <div className="outletWrapper">
                {(loc.pathname === '/') && <ProductList list={winterJackets} title='Winter Jackets'/>}
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default Root;