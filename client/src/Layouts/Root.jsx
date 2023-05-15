import Header from './Header'
import Footer from './Footer'
// import Canvas from '../Components/Canvas'
import ProductList from '../Components/ProductList'

import {Outlet, useLocation} from 'react-router-dom'
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

function Root() {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const wallPapers = [homeWallpaperFull, homeWallpaperLarge, homeWallpaperSmall, mensFull, mensLarge,
                        mensSmall, womensFull, womensLarge, womensSmall, kidsFull, kidsLarge, kidsSmall]

    useEffect(() => {
        
        // resize event listener
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        })

        // preloading wallpapers
        wallPapers.forEach(img => {
            const wallpaper = new Image()
            wallpaper.src = img
        })
    })

    const winterJackets = db.winterJakcets

    // location of the current page
    const loc = useLocation()
    
    return ( 
        <div className="home">
            <Header />
            {/* Conditional rendering of the canvas ads if you're on the homepage */}
            {/* {(loc.pathname === '/') && <Canvas />} */}
            {/* Conditional rendering for home wallpaper */}
            {(loc.pathname === '/') && <div className="wallpaper">
                {(windowWidth > 768) && <img src={homeWallpaperFull} alt="home wallpaper"/>}
                {(windowWidth > 595 && windowWidth <= 768) && <img src={homeWallpaperLarge} alt="home wallpaper"/>}
                {(windowWidth <= 595) && <img src={homeWallpaperSmall} alt="home wallpaper"/>}
            </div>}
            {/* Conditional rendering for men's wallpaper */}
            {(loc.pathname === '/shop/men') && <div className="wallpaper">
                {(windowWidth > 1220) && <img src={mensFull} alt="home wallpaper"/>}
                {(windowWidth > 720 && windowWidth <= 1220) && <img src={mensLarge} alt="home wallpaper"/>}
                {(windowWidth <= 720) && <img src={mensSmall} alt="home wallpaper"/>}
            </div>}
            {/* Conditional rendering for women's wallpaper */}
            {(loc.pathname === '/shop/women') && <div className="wallpaper">
                {(windowWidth > 1220) && <img src={womensFull} alt="home wallpaper"/>}
                {(windowWidth > 720 && windowWidth <= 1220) && <img src={womensLarge} alt="home wallpaper"/>}
                {(windowWidth <= 720) && <img src={womensSmall} alt="home wallpaper"/>}
            </div>}
            {/* Conditional rendering for kids wallpaper */}
            {(loc.pathname === '/shop/kids') && <div className="wallpaper">
                {(windowWidth > 1220) && <img src={kidsFull} alt="home wallpaper"/>}
                {(windowWidth > 720 && windowWidth <= 1220) && <img src={kidsLarge} alt="home wallpaper"/>}
                {(windowWidth <= 720) && <img src={kidsSmall} alt="home wallpaper"/>}
            </div>}

            <div className="outletWrapper">
                {(loc.pathname === '/') && <ProductList list={winterJackets} title='Winter Jackets'/>}
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default Root;