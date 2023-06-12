import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {countContext, currentLoc, loggedUser, previousLoc} from './context'
import {useState, useEffect} from 'react'

// layouts
import ErrorPage from './Layouts/ErrorPage'
import Root from './Layouts/Root'
import Contact from './Layouts/Contact'
import Bag from './Layouts/Bag'
import Profile from './Layouts/Profile'
import ProductDetails from './Layouts/ProductDetails'
import ShopCategory from './Layouts/ShopCategory'
import Search from './Layouts/Search'
import SignIn from './Layouts/SignIn'
import SignUp from './Layouts/SignUp'
import Checkout from './Layouts/Checkout'


// loader functions
import { loadProductDetails, loadShopCategory, loadSearchedKey, getCategory } from './scripts/loaderFunctions'
import { bagCount } from '../src/scripts/bagFunctions'

function App() {

  const [loc, setLoc] = useState('/')
  const [user, setUser] = useState(null)
  const [count, setCount] = useState(bagCount(user))
  const [prevLoc, setPrevLoc] = useState('')
  const [windowSize, setWindowSize] = useState({width: window.innerWidth, height: window.innerHeight})


  useEffect(() => {

    // resize event listener
    window.addEventListener('resize', () => {
      setWindowSize({width: window.innerWidth, height: window.innerHeight})
  })

  }, [])

  const outletHeight = (windowSize.width > 560) ? (windowSize.height - (109 + 180))  : (windowSize.height - (72 + 321))

    // React router
    const router = createBrowserRouter([
      {
        // homepage
        path: '/',
        element: <Root outletHeight={outletHeight} />,
        children: [
          {
            path: 'contact',
            element: <Contact />
          },
          {
            path: 'bag',
            element: <Bag />
          },
          {
            path: 'profile',
            element: <Profile />
          },
          {
            path: 'product/details/:id',
            loader: ({params}) => {
              return loadProductDetails(params.id)
            },
            element: <ProductDetails />
          },
          {
            path: 'shop/:category',
            loader: ({params}) => {
              return loadShopCategory(params.category)
            },
            element: <ShopCategory />
          },
          {
            path: 'search/:keyword',
            loader: ({params}) => {
              return loadSearchedKey(params.keyword)
            },
            element: <Search outletHeight={outletHeight}/>
          },
          {
            path: 'shop/collection/:category',
            loader: ({params}) => {
              return getCategory(params.category)
            },
            element: <ShopCategory />
          },
          {
            path: 'signIn',
            element: <SignIn outletHeight={outletHeight}/>
          },
          {
            path: 'signUp',
            element: <SignUp outletHeight={outletHeight}/>
          },
          {
            path: 'checkout',
            element: <Checkout />
          },
        ],
        errorElement: <ErrorPage />
      }
    ])


  return (
    <div className="App">
      <loggedUser.Provider value={{user, setUser}}>
        <currentLoc.Provider value={{loc, setLoc}}>
          <previousLoc.Provider value={{prevLoc, setPrevLoc}}>
            <countContext.Provider value={{count, setCount}}>
              <RouterProvider router={router} />
            </countContext.Provider>
          </previousLoc.Provider>
          </currentLoc.Provider>
      </loggedUser.Provider>
    </div>
  );
}

export default App;
