import {NavLink, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import shoppingBag from '../media/icons/shoppingBag.png'
import searchIcon from '../media/icons/searchIcon.png'
import countContext from '../context'
import { useContext } from 'react'

function Header() {

    // states
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [navStatus, setNavStatus] = useState('hideNav')
    const [navContent, setNavContent] = useState('')
    const {count} = useContext(countContext)


    // eslint-disable-next-line react-hooks/exhaustive-deps
    function toggleNav() {
        if(navStatus === 'hideNav'){
            setNavStatus('showNav')
        }else {
            setNavStatus('hideNav')
        }
    }

    // performs click action on navIcon
    function toggleNavIcon() {
        document.getElementById('checkbox').click()
    }

    
    useEffect(() => {

        // event listener for window resizing
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        })


        if(windowWidth < 561){
            // adding navIcon when screen is < 561
            setNavContent(  <div className="navIcons">
                                <div className="searchContainer">
                                    <img src={searchIcon} alt="search icon" className="searchIcon navIcon"/>
                                    <input type="text" placeholder="Search store..." className="searchInput"/>
                                </div>
                                <div className="bagIconContainer">
                                    {(count > 0) && <span className="bagItemCount">{count}</span>}
                                    <NavLink to='bag' onClick={() => {
                                        if(navStatus === 'showNav'){
                                        toggleNavIcon()
                                        toggleNav()
                                    }}}><img src={shoppingBag} alt="shopping bag icon" className="shoppingIcon navIcon"/></NavLink>
                                </div>
                                <div className="hamburgerIcon navIcon" onClick={() => toggleNav()}>
                                    <input type="checkbox" id="checkbox"></input>
                                    <label htmlFor="checkbox" className="toggle">
                                        <div className="bars" id="bar1"></div>
                                        <div className="bars" id="bar2"></div>
                                        <div className="bars" id="bar3"></div>
                                    </label>
                                </div>
                            </div>)
        }else{
            // Navlinks if screen > 561
            setNavContent(  <nav className="navbar">
                                <div className="searchContainer">
                                    <img src={searchIcon} alt="search icon" className="searchIcon navIcon"/>
                                    <input type="text" placeholder="Search store..." className="searchInput"/>
                                </div>
                                <div className="bagIconContainer">
                                    {(count > 0) && <span className="bagItemCount">{count}</span>}
                                    <NavLink to='bag' onClick={() => {
                                        if(navStatus === 'showNav'){
                                        toggleNavIcon()
                                        toggleNav()
                                    }}}><img src={shoppingBag} alt="shopping bag icon" className="shoppingIcon navIcon"/></NavLink>
                                </div>
                                <NavLink to="profile" className="navLink" >Profile</NavLink>
                            </nav>)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [windowWidth, navStatus])

    return (
        <div className="headerWrapper">
            <div className="headerNav">
                <div>
                    <NavLink to="/" className="headerTitle">ecommerce</NavLink>
                    {(windowWidth < 561) && <nav className={navStatus}>
                        <NavLink to="contact" className="navLink" onClick={() => {
                            toggleNavIcon()
                            toggleNav()
                        }}>Contact us</NavLink>
                        <NavLink to="profile" className="navLink" onClick={() => {
                            toggleNavIcon()
                            toggleNav()
                        }}>Profile</NavLink>
                        <NavLink to="shop/men" className="navLink navCategory" onClick={() => {
                            toggleNavIcon()
                            toggleNav()
                        }}>men</NavLink>
                        <NavLink to="shop/women" className="navLink navCategory" onClick={() => {
                            toggleNavIcon()
                            toggleNav()
                        }}>women</NavLink>
                        <NavLink to="shop/kids" className="navLink navCategory" onClick={() => {
                            toggleNavIcon()
                            toggleNav()
                        }}>kids</NavLink>
                    </nav>}
                </div>
                {navContent}
            </div>
            {(windowWidth > 560) && <div className="productsList">
                <Link to='shop/men' className="navLink navCategory">men</Link>
                <Link to='shop/women' className="navLink navCategory">women</Link>
                <Link to='shop/kids' className="navLink navCategory">kids</Link>
            </div>}
        </div>
    );
}

export default Header;