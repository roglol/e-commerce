import React from 'react'
import { Link} from 'react-router-dom';
const Account = (props) => {
     return(
        <div className="user">
            <h1 className="user-title">Account</h1>
            <div className="user-nav">
                <h3 className="user-sub-title"> <i className="fas fa-user"></i> Welcome, {props.username}!</h3>
                <h3>Balance <span> ${props.balance}</span></h3>
                <Link to={"/profile/cart"} className="user-nav-link"><h3> <i className="fas fa-cart-plus"> </i> In Cart ({props.cartLength})</h3></Link>
                <Link to={"/profile/purchases"} className="user-nav-link"><h3> <i className="fas fa-cart-arrow-down"> </i> Purchases ({props.purchases})</h3></Link>
                <Link to={"/profile/contact"} className="user-nav-link"><h3>Contact Us</h3></Link>
            </div>
        </div>
     )
}
export default Account