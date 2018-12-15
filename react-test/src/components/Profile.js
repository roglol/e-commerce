import React from 'react'
import axios from 'axios'
import Products from './Products'
import Account from './Account'

class Profile extends React.Component {
    state={
        user:{

        }
    }
    getUser(username){
        axios.post('http://localhost:5000/user',username)
        .then(response => {
            this.setState({user:response.data})
        })
    }

    
    componentDidMount(){
        const data = localStorage.getItem('authorized')
      this.getUser({data})
    }
    render(){
        return(
            <div>
            <Account
            balance={this.state.user.balance}
            username={this.state.user.username}
            />
            <Products/>
            </div>  
        )
    }
}
export default Profile
