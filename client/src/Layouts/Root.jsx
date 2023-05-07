import Header from './Header'
import Footer from './Footer'
import {Outlet} from 'react-router-dom'

function Root() {
    return ( 
        <div className="home">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Root;