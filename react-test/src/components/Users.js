import React from 'react';
import User from './common/User'
import axios from 'axios'

class Users  extends React.Component {
state={
    users:[

    ]
}
getUsers = () => {
       axios.get('http://localhost:5000/users')
       .then(response => {
           this.setState({users:response.data})
       })
     }

    componentDidMount(){
        this.getUsers()
    }

render(){
    return(<div>
         {this.state.users.map(el =>(
            <User
            key={el.id}
            id={el.id}
            username={el.username}
            />
        ))}
    </div>
        
    )
}
   
}

export default Users;