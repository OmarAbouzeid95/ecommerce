import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

// layouts
import ErrorPage from './Layouts/ErrorPage'
import Root from './Layouts/Root'

function App() {

  // React router
  const router = createBrowserRouter([
    {
      // homepage
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
