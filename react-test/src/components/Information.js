import React from 'react';

const Information = (props) => {
    return (
        <div className="information">
            <div className="info-box">
                <div className="info">
                    <h3> Follow Us </h3>
                    <ul>
                        <li> <a href="facebook.com" > Facebook </a></li>
                        <li> <a href="twitter.com" > Twitter </a></li>
                        <li> <a href="google.com" > Google+ </a></li>
                    </ul>
                </div>
                <div className="info">
                    <h3> Information </h3>
                    <p> New Products </p>
                    <p> Our Stores </p>
                    <p> Contact Us </p>
                    <p> Top Sellers </p>

                </div>
                <div className="info">
                    <h3> My Account </h3>
                    <p> My Credit slips </p>
                    <p> My Merchandise returns </p>
                    <p> My Personal info </p>
                    <p> My Addresses </p>
                </div>
                <div className="info">
                <h3> Store Information </h3>
                <p> Techhub Team </p>
                <p> Tbilisi,Georgia </p>
                <p> +995123456 </p>
                <p> BestTeam@gmail.com </p>  
                </div>

            </div>
        </div>
    )
}

export default Information;