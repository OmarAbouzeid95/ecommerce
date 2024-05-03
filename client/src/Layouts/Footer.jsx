import { NavLink } from "react-router-dom";
import facebook from "../media/icons/facebook-f.svg";
import instagram from "../media/icons/instagram.svg";
import twitter from "../media/icons/twitter.svg";
import github from "../media/icons/github.svg";

function Footer() {
  return (
    <section className="footerSection">
      <div id="footerWrapper">
        <div className="footerWrapper">
          <div className="footerLinks">
            <h4>About</h4>
            <NavLink to="stores">Find a store</NavLink>
            <NavLink to="about">About us</NavLink>
            <NavLink to="contact">Contact us</NavLink>
            <NavLink to="blog">Blog</NavLink>
          </div>
          <div className="footerLinks">
            <h4>Help</h4>
            <NavLink to="stores">FAQs</NavLink>
            <NavLink to="about">Return policy</NavLink>
            <NavLink to="shipping">Shipping</NavLink>
            <NavLink to="blog">Payment options</NavLink>
          </div>
          <div className="socialLinks">
            <h4>Follow us</h4>
            <NavLink to="https://www.facebook.com" target="_blank">
              <img
                src={facebook}
                alt="facebook icon"
                id="fbIcon"
                className="footerIcon"
              />
            </NavLink>
            <NavLink to="https://www.instagram.com/omaradharn/" target="_blank">
              <img
                src={instagram}
                alt="instagram icon"
                className="footerIcon"
              />
            </NavLink>
            <NavLink to="https://www.twitter.com" target="_blank">
              <img src={twitter} alt="twitter icon" className="footerIcon" />
            </NavLink>
            <NavLink
              to="https://github.com/OmarAbouzeid95/ecommerce"
              target="_blank">
              <img src={github} alt="github icon" className="footerIcon" />
            </NavLink>
          </div>
        </div>
        <p style={{ textAlign: "center" }}>
          &copy; 2023 ecommerce. All rights reserved
        </p>
      </div>
    </section>
  );
}

export default Footer;
