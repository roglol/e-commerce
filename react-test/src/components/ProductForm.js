import React from 'react'
import Joi from "joi-browser";
import Form from "./common/form";
import axios from 'axios'
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';

class ProductForm extends Form {
    state = {
        data: {
            name:"",
            url:"",
            desc:"",
            price:"",
        },
        errors: {}
    }

    schema ={
        id: Joi.number(),
        name: Joi.string()
           .required()
           .label('Name'),
        url: Joi.string()
           .required()
           .label("Url"),
        desc: Joi.string()
           .required()
           .label("Description"),
        price: Joi.number()
           .required()
           .label("Price")
    }
    getProduct(){

  axios.get('http://localhost:5000/products/' + this.props.match.params.id)
   .then(response => {
      this.setState({data:response.data})
  })
  
    }

    addProduct(newProduct){
        axios.post('http://localhost:5000/admin/addproduct', newProduct)
    }
    
    editProduct = (newProduct) => {
        axios.post('http://localhost:5000/admin/products/edit', newProduct)
    }

    componentDidMount() {
        if(this.props.match.params.id){
            this.getProduct()
        }
    }
    
        


    doSubmit = () => {
        if(this.props.match.params.id){
            const id = this.props.match.params.id
            const data = this.state.data
            data.id = id
            this.editProduct(data)

        }else{
            const data = this.state.data
            this.addProduct(data)
        }

        this.props.history.replace("/admin")

    }

    render() {
        return (
            <div className="product-form">
              <h1>Product Form</h1>
              <form onSubmit={this.handleSubmit}>
              {this.renderInput("name", "Name")}
              {this.renderInput("url", "Url")}
              {this.renderInput("desc", "Description")}
              {this.renderInput("price", "Price")}
              {this.props.match.path.endsWith('add')? this.renderButton("Add") : this.renderButton("Edit")}
              </form>
            </div> 
        )
        }
    }

export default ProductForm