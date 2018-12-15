import React from 'react'
import { Link} from 'react-router-dom';

class Admin extends React.Component{
    render(){
        return (
            <div>
             <h1>{localStorage.getItem('authorized')}</h1>
            <Link to='/admin/users'>ALL Users</Link>
            <Link to='/admin/products'>ALL Products</Link>
            </div>
        )
    }
}


export default Admin