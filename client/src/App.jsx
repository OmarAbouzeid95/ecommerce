import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {countContext, currentLoc, loggedUser} from './context'
import {useState} from 'react'

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


// loader functions
import { loadProductDetails, loadShopCategory, loadBagItems, loadSearchedKey, getCategory } from './scripts/loaderFunctions'
import { bagCount } from '../src/scripts/bagFunctions'

function App() {

  // React router
  const router = createBrowserRouter([
    {
      // homepage
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: 'contact',
          element: <Contact />
        },
        {
          path: 'bag',
          loader: () => {
            console.log(user)
            return loadBagItems(user)
          },
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
          element: <ShopCategory/>
        },
        {
          path: 'search/:keyword',
          loader: ({params}) => {
            return loadSearchedKey(params.keyword)
          },
          element: <Search />
        },
        {
          path: 'shop/collection/:category',
          loader: ({params}) => {
            return getCategory(params.category)
          },
          element: <ShopCategory/>
        },
        {
          path: 'signIn',
          element: <SignIn />
        },
        {
          path: 'signUp',
          element: <SignUp />
        },
      ]
    }
  ])

  const [loc, setLoc] = useState('/')
  const [user, setUser] = useState(null)
  const [count, setCount] = useState(bagCount(user))

  return (
    <div className="App">
      <loggedUser.Provider value={{user, setUser}}>
        <currentLoc.Provider value={{loc, setLoc}}>
          <countContext.Provider value={{count, setCount}}>
            <RouterProvider router={router} />
          </countContext.Provider>
        </currentLoc.Provider>
      </loggedUser.Provider>
    </div>
  );
}

export default App;
