import Header from './Header'
import Footer from './Footer'
import Canvas from '../Components/Canvas'
import {Outlet, useLocation} from 'react-router-dom'

function Root() {

    // location of the current page
    const loc = useLocation()
    
    return ( 
        <div className="home">
            <Header />
            {/* Conditional rendering of the canvas ads if you're on the homepage */}
            {(loc.pathname === '/') && <Canvas />}
            <Outlet />
            <Footer />
        </div>
    );
}

export default Root;