import { BrowserRouter,browserHistory, Router, Link, Route, Redirect } from 'react-router-dom';
import axios from 'axios'
import React from 'react'
import Joi from "joi-browser";
import Form from "./common/form";

class RegistrationForm extends Form {
    state = {
        data: {
            username: "",
            email:"",
            password:"",
            age:"",
            birthday:"",
            balance:"",
        },
        users:[],
        errors: {},
    }

    schema ={
        _id: Joi.string(),
        username: Joi.string()
           .required()
           .label('Username'),
        email: Joi.string()
           .email()
           .required()
           .label("Email"),
        password: Joi.string()
           .required()
           .label("Password"),
        age: Joi.number()
           .required()
           .label("Age"),
        birthday: Joi.string()
           .required()
           .label("Birthday"),
        balance: Joi.number()
           .required()
           .label("Balance")
    }

      getUsers = () => {
    axios.get('http://localhost:5000/users')
    .then(response => {
       this.setState({users:response.data})
  })
}

    componentDidMount() {
      this.getUsers()
    }


    doSubmit = () => {
     
        const data = this.state.data
        this.props.register(data)

        this.props.history.replace("/")
    
    }

    render() {
        return (
            <div>
              <h1>Registration</h1>
              <form onSubmit={this.handleSubmit}>
              {this.renderInput("username", "Username")}
              {this.renderInput("email", "Email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderInput("age", "Age")}
              {this.renderInput("birthday", "Birthday", 'date')}
              {this.renderInput("balance", "Balance")}
              {this.renderButton("Register")}
              </form>
             </div>
             
        )
        }
    }

export default RegistrationForm