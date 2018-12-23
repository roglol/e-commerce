import React, { Component } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import RegistrationForm from './components/RegistrationForm'
import Header from'./components/Header';
import Navigation from'./components/Navigation';
import Slider from './components/Slider';
import Information from './components/Information';
import Footer from './components/Footer';
import Products from './components/Products'
import ProductDetails from './components/common/ProductDetails';
import Profile from './components/Profile';
import Login from './components/Login';
import CartProducts from './components/CartProducts';
import BoughtProducts from './components/BoughtProducts';
import Admin from './components/Admin';
import Users from './components/Users';
import UserCart from './components/UserCart';
import UserPurchases from'./components/UserPurchases';
import UserMessages from './components/UserMessages';
import EditUserName from './components/EditUserName';
import ProductForm from './components/ProductForm';
import Contact from './components/Contact';
import 'antd/dist/antd.css';


const Main = () => {
  return (
<>
  <Slider/>
  <Products/>
  </>

  )
  
}


class App extends Component {
  state= {
    showLogin: true,
    admin:false
  } 

  
  registerUser = (newUser) => {
      axios.post('http://localhost:5000/register', newUser)
    }
  userLogIn(change){
    this.setState({userLoggedIn:change})
  }
  showAdmin(change){
    this.setState({admin:change})
  }

  
  render() {
    return (
      <Router>
        <div className="App">
       <Header/>
       <Route 
       component= { (props) =>
        <Navigation 
        admin={this.state.admin}
        showLog={this.state.showLogin}
        showLogin={ (change) => { this.setState({showLogin:change}) }
       } 
       showAdmin={ (change) => { this.setState({admin:change}) }
     } 
     {...props}
       />
      }
       />
      
       <Route 
          path="/" 
          exact
          component={Main}
          />
           <Route 
          path="/products/:id" 
          component={ProductDetails}
          />
         <Route 
         path="/register" 
         component={ (props) => <RegistrationForm register={this.registerUser} {...props}/>}
         /> 
         <Route
         path="/login"
         component={ (props) =><Login 
         showLogin={ (change) => { this.setState({showLogin:change}) }
        } 
        showAdmin={ (change) => { this.setState({admin:change}) }
      } 
      {...props}
         />}
         />
         <ProtectedRoute 
         exact
         path="/profile" 
         component={Profile}
         />
          <ProtectedRoute 
         exact
         path="/admin" 
         component={Admin}
         />
          <ProtectedRoute 
         exact
         path="/admin/users" 
         component={Users}
         />
           <ProtectedRoute 
         exact
         path="/admin/products" 
         component={Products}
         />
            <ProtectedRoute 
         exact
         path="/admin/products/add" 
         component={ProductForm}
         />
              <ProtectedRoute 
         exact
         path="/admin/products/edit/:id" 
         component={ProductForm}
         />
           <ProtectedRoute 
         exact
         path="/admin/users/cart/:id" 
         component={UserCart}
         />
           <ProtectedRoute 
         exact
         path="/admin/users/username/:username" 
         component={EditUserName}
         />
           <ProtectedRoute 
         exact
         path="/admin/users/purchases/:id" 
         component={UserPurchases}
         />
          <ProtectedRoute 
         exact
         path="/admin/users/messages/:id" 
         component={UserMessages}
         />
          <ProtectedRoute 
          exact
         path="/profile/cart" 
         component={CartProducts}
         />
         <ProtectedRoute 
         path="/profile/contact" 
         component={Contact}
         />
          <ProtectedRoute 
         path="/profile/purchases" 
         component={BoughtProducts}
         />
        <Information/>
       <Footer/>
      </div>
       </Router>
    );
  }
}

export default App;