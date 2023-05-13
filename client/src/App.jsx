import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

// layouts
import ErrorPage from './Layouts/ErrorPage'
import Root from './Layouts/Root'
import Contact from './Layouts/Contact'
import Cart from './Layouts/Cart'
import Profile from './Layouts/Profile'
import ProductDetails from './Layouts/ProductDetails'

// loader functions
import loadProductDetails from './loaderFunctions'

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
          path: 'cart',
          element: <Cart />
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
