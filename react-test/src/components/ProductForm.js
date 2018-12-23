import React from 'react'
import Joi from "joi-browser";
import Form from "./common/form";
import axios from 'axios';
import '../css/form.css';

class ProductForm extends Form {

    state = {
        data: {
            name: "",
            url: "",
            desc: "",
            price: "",
        },
        products: [],
        errors: {}
    }

    schema = {
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

    getProducts() {

        axios.get('http://localhost:5000/products')
            .then(response => {
                this.setState({ products: response.data })
            })
    }
    getProduct() {

        axios.get('http://localhost:5000/products/' + this.props.match.params.id)
            .then(response => {
                this.setState({ data: response.data })
            })

    }

    addProduct(newProduct) {
        axios.post('http://localhost:5000/admin/addproduct', newProduct)
    }

    editProduct = (newProduct) => {
        axios.post('http://localhost:5000/admin/products/edit', newProduct)
    }

    componentDidMount() {
        this.getProducts()
        if (this.props.match.params.id) {
            this.getProduct()
        }
    }




    doSubmit = () => {
        if (this.props.match.params.id) {
            const id = this.props.match.params.id
            const data = this.state.data
            data.id = id
            this.editProduct(data)

        } else {
            const data = this.state.data
            this.addProduct(data)
        }

        this.props.history.replace("/admin")

    }

    render() {
        return (
            <div className="container-div">
                <h1 className="main-title">Product Form</h1>
                <form className="main-form" onSubmit={this.handleSubmit}>
                    {this.renderInput("name", "Name")}
                    {this.renderInput("url", "Url")}
                    {this.renderInput("desc", "Description")}
                    {this.renderInput("price", "Price")}
                    {this.props.match.path.endsWith('add') ? this.renderButton("Add") : this.renderButton("Edit")}
                </form>
            </div>
        )
    }
}

export default ProductForm;