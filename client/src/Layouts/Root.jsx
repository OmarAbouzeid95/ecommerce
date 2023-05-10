import Header from './Header'
import Footer from './Footer'
import Canvas from '../Components/Canvas'
import {Outlet} from 'react-router-dom'

function Root() {
    return ( 
        <div className="home">
            <Header />
            <Canvas />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Root;