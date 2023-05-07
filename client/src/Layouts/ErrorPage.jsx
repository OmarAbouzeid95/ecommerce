import {Link} from 'react-router-dom'

function ErrorPage() {
    return ( 
        <div className="errorPage">
            <div>
                <h1>Oops!</h1>
                <p>Looks like you took a wrong turn. Let's get you back on track.</p>
                <Link to="/">Go to Homepage &gt;</Link>
            </div>
        </div>
    );
}

export default ErrorPage;