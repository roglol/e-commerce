import React from 'react';
import { Link, Redirect} from 'react-router-dom';
import axios from 'axios'

class Navigation extends React.Component {
    state={
        products:[

        ]
    }
    logOut = () => {
        this.props.showLogin(true)
        this.props.showAdmin(false)
        localStorage.removeItem('authorized')
    }
    getSearch = (name) => {
        axios.get('http://localhost:5000/search/' + name)
        .then(response => {
           this.setState({products:response.data})
        })
      }
    getProduct = (name) => {
        axios.get('http://localhost:5000/search/product/' + name)
        .then(response => {
            if(response.data){
                this.props.history.push('/')
                this.props.history.push('/products/' + response.data)
            }
          
        })
    }
    change = (e) => {
        if(e.target.value !== ''){
            this.getSearch(e.target.value)
        }
    }
   onSubmit = (e) => {
       e.preventDefault()
       let name = e.target.children[0].value
       this.getProduct(name)
       e.target.children[0].value = ''
   }
   
   render(){
    return (

        <div className="navigation">
            <div className="container">

                    <div className="header-left">
                        <ul className="memenu">
                            <li className="active">
                            <Link to='/'>Home</Link>
                            </li>
                           {this.props.showLog &&  
                           !this.props.admin &&
                           <li className="grid">
                           <Link to='/login'>Login</Link>
                               </li>
                        } 
                        {this.props.showLog &&
                         !this.props.admin &&
                        <li className="grid">
                        <Link to='/register'>Registration</Link>
                               </li>
                        }
                             {!this.props.showLog &&
                             !this.props.admin &&
                        <li className="grid">
                        <Link to='/profile'>Profile</Link>
                               </li>
                             }
                              {this.props.showLog &&
                             this.props.admin &&
                        <li className="grid">
                        <Link to='/admin'>Admin</Link>
                               </li>
                             }
                         <li className="grid">
                            <Link to='/'>About Us</Link>
                            </li>
                            {(!this.props.showLog || this.props.admin) &&
                        <li className="grid">
                        <Link to='/' onClick={this.logOut}>Log Out</Link>
                               </li>
                        }

                        </ul>
                    </div>

                    <div className="header-right">
                        <div className="search-bar">
                        <form onSubmit={this.onSubmit}>
                        <input 
                        onChange={this.change}
                        name="search"
                        list = "products" 
                        type="text" 
                        placeholder="search" />
                        <datalist id="products">
                        {this.state.products.map(el =>{
                            return <option key={el.id} value={el.name}/>
                        })}
                               </datalist>
                        <button>Search</button>
                        </form>
                        </div>

                   


                </div>
            </div>

        </div>

    )
   } 
}

export default Navigation;