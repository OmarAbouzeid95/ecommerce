import {Link} from 'react-router-dom'
import contactImg from '../media/contactUs.png'

function Contact() {
    return ( 
        <div className="contact">
            <div className="contactImage">
                <img src={contactImg} alt="phone"/>
            </div>
            <div className="contactInfo">
                <Link to='mailto:omaradham1995@gmail.com'>omaradham1995@gmail.com</Link>
            </div>
        </div>
    );
}

export default Contact;