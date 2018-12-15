import React from 'react';
import { Link} from 'react-router-dom';

const Navigation = (props) => {
    const logOut = () => {
        props.showLogin(true)
        props.showAdmin(false)
        localStorage.removeItem('authorized')
    }
    return (

        <div className="navigation">
            <div className="container">

                    <div className="header-left">
                        <ul className="memenu">
                            <li className="active">
                            <Link to='/'>Home</Link>
                            </li>
                           {props.showLog &&  
                           !props.admin &&
                           <li className="grid">
                           <Link to='/login'>Login</Link>
                               </li>
                        } 
                        {props.showLog &&
                         !props.admin &&
                        <li className="grid">
                        <Link to='/register'>Registration</Link>
                               </li>
                        }
                             {!props.showLog &&
                             !props.admin &&
                        <li className="grid">
                        <Link to='/profile'>Profile</Link>
                               </li>
                             }
                              {props.showLog &&
                             props.admin &&
                        <li className="grid">
                        <Link to='/admin'>Admin</Link>
                               </li>
                             }
                         <li className="grid">
                            <Link to='/'>About Us</Link>
                            </li>
                            {(!props.showLog || props.admin) &&
                        <li className="grid">
                        <Link to='/' onClick={logOut}>Log Out</Link>
                               </li>
                        }

                        </ul>
                    </div>

                    <div className="header-right">
                        <div className="search-bar">
                            <input type="text" placeholder="search" />
                            <input type="submit" className="searchBtn" value="Search" /> 
                        </div>

                   


                </div>
            </div>

        </div>

    )
}

export default Navigation;