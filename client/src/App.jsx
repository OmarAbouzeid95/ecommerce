import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

// layouts
import ErrorPage from './Layouts/ErrorPage'
import Root from './Layouts/Root'
import Contact from './Layouts/Contact'
import Bag from './Layouts/Bag'
import Profile from './Layouts/Profile'
import ProductDetails from './Layouts/ProductDetails'
import ShopCategory from './Layouts/ShopCategory'

// loader functions
import { loadProductDetails, loadShopCategory, loadBagItems } from './loaderFunctions'

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
          loader: ({params}) => {
            return loadBagItems()
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
          element: <ShopCategory />
        }
      ]
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
