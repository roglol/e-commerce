import React, {Component} from 'react';
import axios from 'axios';
import Products from './Products';
import Account from './Account';

class Profile extends Component {

    state = {
        user: {

        },
        cartLength: 0,
        purchases: 0
    }
    getUser(username) {
        axios.post('http://localhost:5000/user', username)
            .then(response => {
                this.setState({ user: response.data });
            })
    }

    getCartLength(username) {
        axios.post('http://localhost:5000/cartlength', username)
            .then(response => {
                this.setState({ cartLength: response.data });
            })
    }

    getPurchases(username) {
        axios.post('http://localhost:5000/purchaseslength', username)
            .then(response => {
                this.setState({ purchases: response.data });
            })
    }

    addToCart = (details) => {
        axios.post('http://localhost:5000/addtocart', details)
            .then(response => {
                this.setState({ cartLength: this.state.cartLength + 1 });
            })
    }



    componentDidMount() {
        const data = localStorage.getItem('authorized');
        this.getUser({ data });
        this.getCartLength({ data });
        this.getPurchases({ data });
    }
    render() {
        return (
            <div>
                <Account
                    purchases={this.state.purchases}
                    cartLength={this.state.cartLength}
                    balance={this.state.user.balance}
                    username={this.state.user.username}
                />
                <Products
                    addToCart={this.addToCart}
                />
            </div>
        )
    }
}
export default Profile;