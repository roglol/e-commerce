import React from 'react'
import Joi from "joi-browser";
import Form from "./common/form";
import axios from 'axios'

class EditUserName extends Form {
    state = {
        data: {
            username: "",
        },
        errors: {}
    }

    schema ={
        _id: Joi.string(),
        username: Joi.string()
           .required()
           .label('Username'),
     
    }   
 
editUser = (newUser) => {
    axios.post('http://localhost:5000/admin/edit/username', newUser)
}
    

    componentDidMount() {

         const username = this.props.match.params.username
        this.setState({data: {username}})
    }


    doSubmit = () => {
        const data = this.state.data.username
        const username = this.props.match.params.username
        this.editUser({data,username})
          this.props.history.replace("/admin")
    }

    render() {
        return (
            <div>
              <h1>Movie Form</h1>
              <form onSubmit={this.handleSubmit}>
              {this.renderInput("username", "Username")}
              {this.renderButton("Edit")}
              </form>
             </div>
             
        )
        }
    }

export default EditUserName