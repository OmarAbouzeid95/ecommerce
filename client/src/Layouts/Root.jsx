import Header from './Header'
import Footer from './Footer'

// import Canvas from '../Components/Canvas'
import ProductList from '../Components/ProductList'

import {Outlet, useLocation, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'

import db from '../db'

// importing wallpapers
import homeWallpaperFull from '../media/wallpapers/home_full.webp'
import homeWallpaperLarge from '../media/wallpapers/home_large.webp'
import homeWallpaperSmall from '../media/wallpapers/home_595.webp'
import mensFull from '../media/wallpapers/mens_full.webp'
import mensLarge from '../media/wallpapers/mens_large.webp'
import mensSmall from '../media/wallpapers/mens_small.webp'
import womensFull from '../media/wallpapers/womens_full.webp'
import womensLarge from '../media/wallpapers/womens_large.webp'
import womensSmall from '../media/wallpapers/womens_small.webp'
import kidsFull from '../media/wallpapers/kids_full.webp'
import kidsLarge from '../media/wallpapers/kids_large.webp'
import kidsSmall from '../media/wallpapers/kids_small.jpeg'
import summerAdFull from '../media/wallpapers/summer_ad_full.jpeg'
import summerAdLarge from '../media/wallpapers/summer_ad_large.webp'
import summerAdSmall from '../media/wallpapers/summer_ad_small.webp'

import ScrollToTop from '../Components/ScrollToTop'

function Root() {


    const wallPapers = [homeWallpaperFull, homeWallpaperLarge, homeWallpaperSmall, mensFull, mensLarge,
                        mensSmall, womensFull, womensLarge, womensSmall, kidsFull, kidsLarge, kidsSmall]
    const [windowSize, setWindowSize] = useState({width: window.innerWidth, height: window.innerHeight})

    useEffect(() => {

        // resize event listener
        window.addEventListener('resize', () => {
            setWindowSize({width: window.innerWidth, height: window.innerHeight})
        })
        
        // preloading wallpapers
        wallPapers.forEach(img => {
            const wallpaper = new Image()
            wallpaper.src = img
        })
    })

    // const winterJackets = db.winterJakcets
    const summerWear = db.summerWear
    const trending = db.trending

    const wpStyle = {
        color: 'white'
    }

    // location of the current page
    const loc = useLocation()
    
    return ( 
        
        <div className="home">
            <Header />
            {/* Conditional rendering of the canvas ads if you're on the homepage */}
            {/* {(loc.pathname === '/') && <Canvas />} */}
            {/* Conditional rendering for home wallpaper */}
            {(loc.pathname === '/') && <div className="wallpaper">
                <div className="wallpaperContent">
                    <h1 className="wallpaperContentTitle" style={wpStyle}>Summer is here!</h1>
                    <p className="wallpaperContentMsg" style={wpStyle}>Check out our new arrivals.</p>
                    <Link to='shop/men' className="wallpaperContentBtn">Shop Men's</Link>
                    <Link to='shop/women' className="wallpaperContentBtn">Shop Women's</Link>
                </div>
                {(windowSize.width > 768) && <img src={homeWallpaperFull} alt="home wallpaper"/>}
                {(windowSize.width > 595 && windowSize.width <= 768) && <img src={homeWallpaperLarge} alt="home wallpaper"/>}
                {(windowSize.width <= 595) && <img src={homeWallpaperSmall} alt="home wallpaper"/>}
            </div>}
            {/* Conditional rendering for men's wallpaper */}
            {(loc.pathname === '/shop/men') && <div className="wallpaper">
                <div className="wallpaperContent">
                    <h1 className="wallpaperContentTitle">SHOP<span style={{display: 'block'}}>Men</span></h1>
                </div>
                {(windowSize.width > 1220) && <img src={mensFull} alt="home wallpaper"/>}
                {(windowSize.width > 720 && windowSize.width <= 1220) && <img src={mensLarge} alt="home wallpaper"/>}
                {(windowSize.width <= 720) && <img src={mensSmall} alt="home wallpaper"/>}
            </div>}
            {/* Conditional rendering for women's wallpaper */}
            {(loc.pathname === '/shop/women') && <div className="wallpaper">
                <div className="wallpaperContent">
                    <h1 className="wallpaperContentTitle">SHOP<span style={{display: 'block'}}>Women</span></h1>
                </div>
                {(windowSize.width > 1220) && <img src={womensFull} alt="home wallpaper"/>}
                {(windowSize.width > 720 && windowSize.width <= 1220) && <img src={womensLarge} alt="home wallpaper"/>}
                {(windowSize.width <= 720) && <img src={womensSmall} alt="home wallpaper"/>}
            </div>}
            {/* Conditional rendering for kids wallpaper */}
            {(loc.pathname === '/shop/kids') && <div className="wallpaper">
                <div className="wallpaperContent">
                    <h1 className="wallpaperContentTitle">SHOP<span style={{display: 'block'}}>Kids</span></h1>
                </div>
                {(windowSize.width > 1220) && <img src={kidsFull} alt="home wallpaper"/>}
                {(windowSize.width > 720 && windowSize.width <= 1220) && <img src={kidsLarge} alt="home wallpaper"/>}
                {(windowSize.width <= 720) && <img src={kidsSmall} alt="home wallpaper"/>}
            </div>}

            <div className="outletWrapper" >
                {(loc.pathname === '/') && <ProductList list={summerWear} title='New Arrivals'/>}
                {/* Conditional rendering for kids wallpaper */}
                {(loc.pathname === '/') && <div className="wallpaper">
                <div className="wallpaperContent">
                    <h1 className="wallpaperContentTitle" style={wpStyle}>Checkout the summer collection</h1>
                    <Link to='shop/collection/summerWear' className="wallpaperContentBtn">Shop Collection</Link>
                </div>
                {(windowSize.width > 768) && <img src={summerAdFull} alt="home wallpaper"/>}
                {(windowSize.width > 720 && windowSize.width <= 768) && <img src={summerAdLarge} alt="home wallpaper"/>}
                {(windowSize.width <= 720) && <img src={summerAdSmall} alt="home wallpaper"/>}
            </div>}
            {(loc.pathname === '/') && <ProductList list={trending} title='Trending'/>}
            <div className="allProductsWrapper">
                {(loc.pathname === '/') && <Link to='search/all-products' className="allProductsBtn">All products</Link>}
            </div>
            
                <ScrollToTop />
                <Outlet />
            </div>
            <Footer />
        </div>
        
    );
}

export default Root;