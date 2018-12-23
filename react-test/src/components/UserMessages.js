import React, {Component} from 'react';
import axios from 'axios';
import '../css/userMessages.css';


class UserMessages extends Component {

    state = {
        messages: [

        ],
        username:''
    }

    getMessages() {
        axios.get('http://localhost:5000/admin/users/messages/' + this.props.match.params.id)
            .then(response => {
                this.setState({ messages: response.data });
            })
    }
    getUserName(){
        axios.get('http://localhost:5000/admin/users/' + this.props.match.params.id)
        .then(response => {
            this.setState({ username: response.data });
        })
    }
    componentDidMount() {
        this.getMessages();
        this.getUserName();
    }

    render() {
        return (
            <div>
                {this.state.messages.length === 0 && <h1>No Messages To Be Displayed</h1>}
                {this.state.messages.length !== 0 && <>
                    <div className="messageFrom">From {this.state.username} : </div>
                    {this.state.messages.map((el, index) => (
                        <div className="messages"
                            key={index}
                        > 
                            {el}
                        </div>
                      
                    ))}
                    </>
                    }
                    
            </div>
        )
    }
}


export default UserMessages;