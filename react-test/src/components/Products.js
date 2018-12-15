import React, {Component} from 'react'
import Product from './common/Product'
import axios from 'axios'
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import ProductDetails from './common/ProductDetails'

class Products extends Component {
    state={
        products:[]
    }
    getProducts = () => {
        axios.get('http://localhost:5000/products')
        .then(response => {
           this.setState({products:response.data})
        })
      }
      removeProduct = (id) =>{
        axios.delete('http://localhost:5000/admin/products/remove/'+id)
        .then(response => response.data)
        .then( (newProductList) => {
            const products = newProductList
            this.setState({products})
        })
    }

    componentDidMount() {
        this.getProducts()
    }
    render(){
        return (
            <div className="product-container">
            {
                this.state.products.map( (el) =>(
                <Product
                remove={this.removeProduct}
                key={el.id}
                id={el.id}
                price={el.price}
                name={el.name}
                url={el.url}
                />
            ))
            }
            {localStorage.getItem('authorized') ==='admin' && 
        <div className="product-item">
        <i className="far fa-image fa-7x"></i>
        <Link to="/admin/products/add" className="add">Add</Link>
      </div>  
        }
              </div>
        )
    }
}

export default Products