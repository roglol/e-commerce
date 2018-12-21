import React, { Component } from 'react';
import axios from 'axios'
import Form from './common/form';
import Joi from 'joi-browser'


class Contact extends Form {
	state = {};
    
    state = {
        data: {
            name: "",
            phone:"",
            email:"",
            message:"",
        },
        errors: {}
    }

    schema ={
        name: Joi.string()
           .required()
           .label('Name'),
        phone: Joi.number()
           .required()
           .label("Phone"),
        email: Joi.string()
           .email()
           .required()
           .label("Email"),
        message: Joi.string()
           .required()
           .label("Message")
    }

    addMessage = (newMessage) => {
        axios.post('http://localhost:5000/message', newMessage)
    }
    
     doSubmit = () => {
        const data = localStorage.getItem('authorized')
        const message = this.state.data.message
        this.addMessage({message,data})
        this.props.history.replace("/profile")
    }   
    
    
    
 render() {
		return (
			<div className="contact--container">
				<div className="contact--container__head">
					<h2>CONTACT</h2>
				</div>
				<div className="contact--container__body">
				<div className="left--container">
					<div className="left--container__address">
						<p>
							Address<br/>
							The company name <br/>
							lorem inpsum dolor<br/>
							Glasgow Dr, 140
						</p>
					</div>
					<div className="left--container__address1">
						<p>
							Address1 <br/>
							Tel:1117770001, <br/>
							Fax:190-4509-494 <br/>
							Email: contact@example.com
						</p>
					</div>
				</div>
				<div className="right--container">
                <form onSubmit={this.handleSubmit}>
                <div className="right--container__item1">
                    {this.renderInput("name", "Name")}
                    {this.renderInput("phone", "Phone")}
                    {this.renderInput("email", "Email")}
					</div>
                    <div className="right--container__item2">
                    {this.renderTextArea("message", "Message")}
					</div>
                    <div className="right--container__item3">
                    {this.renderButton("Submit")}
					</div>
              
              </form>
			</div>
				</div>
			</div>
		);
	}
}

export default Contact;