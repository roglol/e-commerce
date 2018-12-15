import { BrowserRouter,browserHistory, Router, Link, Route, Redirect } from 'react-router-dom';

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
        errors: {}
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

    componentDidMount() {
        // const genres= getGenres();
        // this.setState({genres});

        // const movieId = this.props.match.params.id
        // if (movieId === "new") return;

        // const movie = getMovie(movieId)
        // if (!movie) return this.props.history.replace("/not-found")

        // this.setState({data: this.mapToViewModel(movie)})
    }


    doSubmit = () => {
        // saveMovie(this.state.data)
        const data = this.state.data
        this.props.register(data)

        this.props.history.replace("/")
        // <Redirect to={`/`} />
        // return (<Redirect to={`/`} />) 
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
              {this.renderInput("birthday", "Birthday")}
              {this.renderInput("balance", "Balance")}
              {this.renderButton("Register")}
              </form>
             </div>
             
        )
        }
    }

export default RegistrationForm