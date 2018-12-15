import React from 'react'
import axios from 'axios'

class UserMessages extends React.Component {
    state = {
      messages:[

      ],
    }

    getMessages(){
        axios.get('http://localhost:5000/admin/users/messages/'+this.props.match.params.id)
        .then(response => {
            console.log(response.data)
            this.setState({messages:response.data})
        })
    }
    componentDidMount(){
        this.getMessages()
    }

    render(){
        return(
           <div>
              {this.state.messages.length == 0 && <h1>No Messages To Be Displayed</h1>}
              {this.state.messages.length !==0 &&
                      this.state.messages.map((el,index) => (
               <div
               key={index}
                >
               {el}
               </div>
))}
           </div>
        )
    }
}


export default UserMessages
