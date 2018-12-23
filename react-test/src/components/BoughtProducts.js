import React, {Component} from 'react';
import axios from 'axios';
import CartProduct from './common/CartProduct';
import '../css/cartProducts.css';

class BoughtProducts extends Component {

    state = {
        purchases: [],
        purchased: true,
    }

    getPurchases(username) {
        axios.post('http://localhost:5000/purchases', username)
            .then(response => {
                this.setState({ purchases: response.data });
            })
    }

    componentDidMount() {
        const data = localStorage.getItem('authorized');
        this.getPurchases({ data });
    }

    render() {
        return (
            <div>
                <h1 className="title">Purchases</h1>
                <ul className="cart-headings">
                    <li>Item</li>
                    <li>Product Name</li>
                    <li>Unit Price</li>
                    <li>Delivery Details</li>
                </ul>

                {this.state.purchases.map((el, index) => (
                    <CartProduct
                        remove={this.removeCartProduct}
                        key={index}
                        index={index}
                        purchased={this.state.purchased}
                        id={el.id}
                        url={el.url}
                        price={el.price}
                        name={el.name}
                    />
                ))}
            </div>
        )
    }

}

export default BoughtProducts;