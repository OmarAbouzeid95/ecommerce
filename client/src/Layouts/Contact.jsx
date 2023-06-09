import {Link} from 'react-router-dom'
import contactImg from '../media/undraw_contact.svg'
import mail from '../media/icons/mail.svg'
import phone from '../media/icons/phone.svg'

function Contact() {
    return ( 
        <div>
            <h2 style={{textAlign: 'center', marginBottom: '1.5em'}}>Contact Us</h2>
            <div className="contact">
                <div className="contactInfo">
                    <div className="contact-link">
                        <img src={phone} alt="phone icon" />
                        <Link  to='tel:4379990023'>+1 (437) 999-0023</Link>
                    </div>
                    <div className="contact-link">
                        <img src={mail} alt="mail icon" />
                        <Link  to='mailto:omaradham1995@gmail.com'>omaradham1995@gmail.com</Link>
                    </div>
                </div>
                <div className="contactImage">
                    <img src={contactImg} alt="phone" className="contact-img"/>
                </div>
            </div>
        </div>
    );
}

export default Contact;