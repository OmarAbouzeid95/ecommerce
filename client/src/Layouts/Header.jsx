import {NavLink, Link, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import shoppingBag from '../media/icons/shoppingBag.png'
import searchIcon from '../media/icons/searchIcon.png'
import {countContext, loggedUser} from '../context'
import { useContext } from 'react'



function Header() {

    // states
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [navStatus, setNavStatus] = useState('hideNav')
    const [navContent, setNavContent] = useState('')
    const [searchBar, setSearchBar] = useState('')
    const [showSearchBar, setShowSearchBar] = useState(false)
    const {count} = useContext(countContext)
    const {user} = useContext(loggedUser)
    const navigate = useNavigate()

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
                                <img key={searchBar} src={searchIcon} alt="search icon" className="navIcon" onClick={() => setShowSearchBar(prevState => !prevState)}/>
                                <div className="bagIconContainer">
                                    {(count > 0) && <span className="bagItemCount">{count}</span>}
                                    <NavLink to='/bag' onClick={() => {
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
                                    <img key={searchBar} src={searchIcon} alt="search icon" className="searchIcon navIcon" onClick={() => navigate(`/search/${searchBar}`)}/>
                                    <input type="text" placeholder="Search store..." className="searchInput" onChange={(e) => setSearchBar(e.target.value)}
                                                                                                              onKeyDown={(e) => {
                                                                                                                if(e.key === 'Enter')
                                                                                                                    navigate(`/search/${searchBar}`)
                                                                                                             }}/>
                                </div>
                                <div className="bagIconContainer">
                                    {(count > 0) && <span className="bagItemCount">{count}</span>}
                                    <NavLink to='/bag' onClick={() => {
                                        if(navStatus === 'showNav'){
                                        toggleNavIcon()
                                        toggleNav()
                                    }}}><img src={shoppingBag} alt="shopping bag icon" className="shoppingIcon navIcon"/></NavLink>
                                </div>
                                <NavLink to={user ? 'profile' : 'signIn'} className="navLink" >{user ? `Hi, ${user.firstName}` : 'Sign in'}</NavLink>
                            </nav>)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [windowWidth, navStatus, searchBar, user, count])

    return (
        <div className="headerWrapper">
            <div className="headerNav">
                <div>
                    <NavLink to="/" className="headerTitle"><h3>Style Hub</h3></NavLink>
                    {(windowWidth < 561) && <nav className={navStatus}>
                        <NavLink to={user ? 'profile' : 'signIn'} className="navLink" onClick={() => {
                                toggleNavIcon()
                                toggleNav()
                            }}>{user ? `Hi, ${user.firstName}` : 'Sign in'}</NavLink>
                        <NavLink to="contact" className="navLink" onClick={() => {
                            toggleNavIcon()
                            toggleNav()
                        }}>Contact us</NavLink>
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
            {showSearchBar && <div className="searchContainer animate" style= {{width: '100%', margin: '-1em auto 1em auto'}}>
                                <img key={searchBar} src={searchIcon} alt="search icon" className="searchIcon navIcon " onClick={() => navigate(`/search/${searchBar}`)}/>
                                    <input type="text" placeholder="Search store..." className="searchInput" style= {{width: '100%'}} onChange={(e) => setSearchBar(e.target.value)}
                                                                                                             onKeyDown={(e) => {
                                                                                                                if(e.key === 'Enter')
                                                                                                                    navigate(`/search/${searchBar}`)
                                                                                                             }}/>
                                </div>}
            {(windowWidth > 560) && <div className="productsList">
                <Link to='shop/men' className="navLink navCategory">men</Link>
                <Link to='shop/women' className="navLink navCategory">women</Link>
                <Link to='shop/kids' className="navLink navCategory">kids</Link>
            </div>}
        </div>
    );
}

export default Header;