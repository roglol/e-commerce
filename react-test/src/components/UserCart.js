import React, {Component} from 'react';
import axios from 'axios';
import CartProduct from './common/CartProduct';

class UserCart extends Component {

    state = {
        cart: [

        ],
        purchased: true
    }

    getCart() {
        axios.get('http://localhost:5000/admin/users/cart/' + this.props.match.params.id)
            .then(response => {
                this.setState({ cart: response.data });
            })
    }
    componentDidMount() {
        this.getCart();
    }

    render() {
        return (
            <div>
                {this.state.cart.length === 0 && <h1>No Items To Be Displayed</h1>}
                {this.state.cart.length !== 0 &&
                    this.state.cart.map((el, index) => (
                        <CartProduct
                            key={index}
                            price={el.price}
                            name={el.name}
                            url={el.url}
                            purchased={this.state.purchased}
                        />
                    ))}
            </div>
        )
    }
}


export default UserCart;