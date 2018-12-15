import React from 'react';
import { BrowserRouter,browserHistory, Router, Link, Route, Redirect } from 'react-router-dom';

class User extends React.Component {
  
    render() {
        return (
            <div className="users">

            <div className="username"> <i className="fas fa-user"></i> {this.props.username}</div>
            <div className="username"><Link to={'/admin/users/cart/' + this.props.id}> <i className="fas fa-cart-plus"> </i> Cart </Link></div>
            <div className="username"> <Link to={'/admin/users/purchases/' + this.props.id}> <i className="fas fa-cart-arrow-down">  </i> purchase </Link></div>
            <div className="username"><Link to={'/admin/users/messages/' + this.props.id}><i className="fas fa-envelope"></i> Message </Link></div>
            <div className="username"><Link to={'/admin/users/username/'+this.props.username}> Update</Link></div>
        </div>
        )
    }
}

export default User