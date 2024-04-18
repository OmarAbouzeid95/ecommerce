import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  countContext,
  currentLoc,
  loggedUser,
  previousLoc,
  stripeContext,
} from "./context";
import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// layouts
import ErrorPage from "./Layouts/ErrorPage";
import Root from "./Layouts/Root";
import Contact from "./Layouts/Contact";
import Bag from "./Layouts/Bag";
import Profile from "./Layouts/Profile";
import ProductDetails from "./Layouts/ProductDetails";
import ShopCategory from "./Layouts/ShopCategory";
import Search from "./Layouts/Search";
import SignIn from "./Layouts/SignIn";
import SignUp from "./Layouts/SignUp";
import Checkout from "./Layouts/Checkout";

// loader functions
import {
  loadProductDetails,
  loadShopCategory,
  loadSearchedKey,
  getCategory,
} from "./scripts/loaderFunctions";
import { bagCount } from "../src/scripts/bagFunctions";

export const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function App() {
  const [loc, setLoc] = useState("/");
  const [user, setUser] = useState(null);
  const [count, setCount] = useState(bagCount(user));
  const [prevLoc, setPrevLoc] = useState("");
  const [clientSecret, setClientSecret] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/create-intent`)
      .then((response) => response.json())
      .then((data) => {
        {
          console.log("response: ", data);
          setClientSecret(data.clientSecret);
        }
      })
      .catch((error) =>
        console.log("Error getting stripe client secret: ", error.message)
      );
  }, []);

  // React router
  const router = createBrowserRouter([
    {
      // homepage
      path: "/",
      element: <Root />,
      children: [
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "bag",
          element: <Bag />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "product/details/:id",
          loader: ({ params }) => {
            return loadProductDetails(params.id);
          },
          element: <ProductDetails />,
        },
        {
          path: "shop/:category",
          loader: ({ params }) => {
            return loadShopCategory(params.category);
          },
          element: <ShopCategory />,
        },
        {
          path: "search/:keyword",
          loader: ({ params }) => {
            return loadSearchedKey(params.keyword);
          },
          element: <Search />,
        },
        {
          path: "shop/collection/:category",
          loader: ({ params }) => {
            return getCategory(params.category);
          },
          element: <ShopCategory />,
        },
        {
          path: "signIn",
          element: <SignIn />,
        },
        {
          path: "signUp",
          element: <SignUp />,
        },
        {
          path: "checkout",
          element: <Checkout />,
        },
      ],
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <div className="App">
      <loggedUser.Provider value={{ user, setUser }}>
        <currentLoc.Provider value={{ loc, setLoc }}>
          <previousLoc.Provider value={{ prevLoc, setPrevLoc }}>
            <countContext.Provider value={{ count, setCount }}>
              <stripeContext.Provider value={{ clientSecret, setClientSecret }}>
                <RouterProvider router={router} basename="/ecommerce" />
              </stripeContext.Provider>
            </countContext.Provider>
          </previousLoc.Provider>
        </currentLoc.Provider>
      </loggedUser.Provider>
    </div>
  );
}

export default App;
