import {NavLink} from 'react-router-dom'

function Header() {
    return ( 
        <div className="header">
            <h2>ecommerce</h2>
            <nav className="navbar">
                <NavLink to="/">Home</NavLink>
                <NavLink to="contact">Contact us</NavLink>
                <NavLink to="cart">Cart</NavLink>
                <NavLink to="profile">Profile</NavLink>
            </nav>
        </div>
    );
}

export default Header;