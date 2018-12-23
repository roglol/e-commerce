import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import '../css/admin.css';


class Admin extends Component {

    render() {
        return (
            <div>

                <div className="adminParent">

                    <div className="admin"> <h1> <i className="fas fa-user-tie"></i> Welcome {localStorage.getItem('authorized')}</h1> </div>
                    <div className="all">
                        <div className="allUsers"> <i className="fas fa-users"></i> <Link to='/admin/users'>ALL Users</Link> </div>
                        <div className="allProducts">  <i className="fab fa-product-hunt"></i> <Link to='/admin/products'>ALL Products</Link> </div>
                    </div>
                </div>

            </div>
        )
    }
}


export default Admin;