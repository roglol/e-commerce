import React from 'react';
import '../css/footer.css';

const Footer = () => {

    return (
        <div className="footer">
            <div className="footer-wrap">
                <div className="footer-left">
                    <input type="text" placeholder="Enter Your Email" />
                    <input type="submit" value="Subscribe" className="subscribe" />
                </div>
                <div className="footer-right">
                    <p> © 2018 Luxury Watches. All Rights Reserved | Design by Techub Team  </p>
                </div>

            </div>
        </div>
    )


}

export default Footer;