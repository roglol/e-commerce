import React from 'react';
import { Link } from 'react-router-dom';
import '../css/account.css';

const Account = (props) => {

    return (
        <div className="user">
            <h1 className="user-title">Account</h1>
            <div className="user-nav">
                <h4 className="welcome"> <i className="fas fa-user"></i> Welcome, {props.username}!</h4>
                <h4>Balance <span> ${props.balance}</span></h4>
                <Link to={"/profile/cart"} ><h4 className="user-nav-link"> <i className="fas fa-cart-plus"> </i> In Cart  <sup className="cartSup"> {props.cartLength} </sup></h4></Link>
                <Link to={"/profile/purchases"} ><h4 className="user-nav-link"> <i className="fas fa-cart-arrow-down"> </i> Purchases <sup className="purchaseSup"> {props.purchases} </sup></h4></Link>
                <Link to={"/profile/contact"} ><h4 className="user-nav-link"> <i className="far fa-envelope"> </i> Contact Us</h4></Link>
            </div>
        </div>
    )
}
export default Account;