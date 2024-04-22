import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function ErrorBoundary() {
  return (
    <div className="errorPage-wrapper">
      <Header />
      <div className="errorPage">
        <div>
          <h1>Oops!</h1>
          <p>We apologise, Something went wrong from our end.</p>
          <Link to="/">Go to Homepage &gt;</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ErrorBoundary;
