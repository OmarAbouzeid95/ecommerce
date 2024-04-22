import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function ErrorPage() {
  const routeError = useRouteError();
  console.log("routeError: ", routeError);

  return (
    <div className="errorPage-wrapper">
      <Header />
      <div className="errorPage">
        <div>
          <h1>Oops!</h1>
          <p>Looks like you took a wrong turn. Let's get you back on track.</p>
          <Link to="/">Go to Homepage &gt;</Link>
        </div>
      </div>
      <Footer />
    </div>
    // <div className="errorPage">
    //   <h1>Oops!</h1>
    //   <p>Looks like you took a wrong turn. Let's get you back on track.</p>
    //   <Link to="/">Go to Homepage &gt;</Link>
    // </div>
  );
}

export default ErrorPage;
