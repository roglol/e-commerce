import React, {Component} from 'react';
import Joi from 'joi-browser';
import Input from './input';
import { BrowserRouter,browserHistory, Router, Link, Route, Redirect } from 'react-router-dom';

class Form extends Component {
    state = {
        data: {},
        errors: {}
     }
   
     validate = () => {
        const {error}  = Joi.validate(this.state.data,this.schema, {
            abortEarly: false
         });
         if (this.state.errors.username || this.state.errors.name){
            return 'error'
        }
      if (!error) return null;
      
         const errors = {}
         for (let item of error.details){
             errors[item.path[0]] = item.message;
        }
            return errors
    }
    validateProperty = ({name, value}) => {
       const obj = {[name]: value};
       const schema = {[name]:this.schema[name]}
       const {error} =   Joi.validate(obj,schema);
       return error ? error.details[0].message : null;
      }
    handleSubmit = (e) =>{
        e.preventDefault()
        const errors = this.validate()
        this.setState({errors: errors || {}})
        if(errors) return
        this.doSubmit();
    }
    handleChange = e =>{
        const errors = {...this.state.errors}
        const errorMessage = this.validateProperty(e.currentTarget)
        if (errorMessage) errors[e.currentTarget.name] = errorMessage
        else delete errors[e.currentTarget.name];
        if(this.state.users){
            this.state.users.forEach(el =>{
                if(el.username === e.currentTarget.value){
                    errors['username'] = "User with the same username already exists"
                    this.setState({errors})
                }
            })
    
        }
       if(this.state.products){
           this.state.products.forEach(el=> {
               if(el.name === e.currentTarget.value){
                   errors['name'] = "A product with the same name already exists"
                   this.setState({errors})
                }
           })
       }
        const data = {...this.state.data}
        data[e.currentTarget.name] = e.currentTarget.value;
        this.setState({data, errors})
    }
    renderButton(label) {
        return (
            <button
            disabled={this.validate()} 
             className="btn btn-primary">{label}</button>
        )
    }

    renderInput(name, label, type) {
        const {data, errors} = this.state
        return  (
           <Input 
           type={type}
            name={name} 
            value={data[name]}
            label={label}
            onChange={this.handleChange}
            error={errors[name]}
            />
        )
       
    }

    renderTextArea(name, label, type){
        return (
            <div>
               <label htmlFor={name}>{label}</label>
            <textarea 
            onChange={this.handleChange}
            name={name} 
            rows="4" 
            cols="50"> 
             </textarea>
            </div>
        )
    }
   
}


export default Form;