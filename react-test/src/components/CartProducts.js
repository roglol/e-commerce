import React, {Component} from 'react';
import CartProduct from './common/CartProduct';
import axios from 'axios';
import '../css/cartProducts.css';

class CartProducts extends Component {

    state = {
        data: localStorage.getItem('authorized'),
        cart: [

        ],
        balance: '',
        error: false,
        purchased: false
    }


    getCart(username) {
        axios.post('http://localhost:5000/cart', username)
            .then(response => {
                this.setState({ cart: response.data });
            })
    }
    getBalance(username) {
        axios.post('http://localhost:5000/balance', username)
            .then(response => {
                this.setState({ balance: response.data });
            })
    }
    removeCartProduct = id => {
        axios.delete('http://localhost:5000/cart/remove/' + id + '/' + this.state.data)
            .then(response => response.data)
            .then((newCart) => {
                const cart = newCart;
                this.setState({ cart: cart, error: false, purchased: false });
            })
    }

    purchaseProducts = (data) => {
        axios.post('http://localhost:5000/purchase', data)
            .then(response => {
                this.setState({ cart: response.data });
            })
    }
    enable = () => {
        const data = this.state.data;
        const sum = this.state.cart.reduce((acc, el) => {
            return acc + parseInt(el.price)
        }, 0)
        if (this.state.balance >= sum && this.state.cart.length !== 0) {
            this.setState({ error: false, purchased: true });
            this.purchaseProducts({ data });

        } else if (this.state.cart.length !== 0) {
            this.setState({ error: true, purchased: false });
        }
    }
    total = () =>{
        const sum = this.state.cart.reduce((acc,el) =>{
            return acc + parseInt(el.price)
        },0)
        return sum
    }

    componentDidMount() {
        const data = localStorage.getItem('authorized');
        this.getCart({ data });
        this.getBalance({ data });
    }
    render() {
        const cart = this.state.cart;

        return (
            <div className="cart">
                <h1 className="title">Checkout</h1>
                <h3 className="sub-title">My Shopping Cart ({cart.length})</h3>

                <ul className="cart-headings">
                    <li>Item</li>
                    <li>Product Name</li>
                    <li>Unit Price</li>
                    <li>Delivery Details</li>
                </ul>

                {this.state.purchased &&
                    <h1
                        style={
                            {
                                color: "green",
                                textAlign: "center"
                            }
                        }
                    >
                        <i className="fas fa-check"></i> Purchase has been made</h1>}
                {cart.map((el, index) => (
                    <CartProduct
                        remove={this.removeCartProduct}
                        key={index}
                        index={index}
                        id={el.id}
                        url={el.url}
                        price={el.price}
                        name={el.name}
                    />
                ))}
                {this.state.error &&
                    <h1
                        style={{
                            color: "red",
                            textAlign: "center"
                        }}
                    >
                        <i className="fas fa-ban"></i> Not Enough Money</h1>
                }
                 <span className="total">Total - ${this.total()}</span>
                <button
                    onClick={this.enable}
                    className="purchase">
                    Purchase
                </button>
            </div>
        )
    }


}
export default CartProducts;