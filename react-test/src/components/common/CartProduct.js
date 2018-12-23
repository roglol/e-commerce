import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/cartProduct.css';

const CartProduct = ({ price, name, url, id, index, remove, purchased }) => {
    return (

        <div>
            <ul className="cart-item-list">
                <li><Link to={"/products/" + id} className="cart-item-link"><img src={url} alt="" className="cart-item-image" /></Link></li>
                <li>{name}</li>
                <li>${price}</li>
                <li className="last-li">
                    {!purchased &&
                        <i
                            onClick={() => remove(index)}
                            className="fas fa-times-circle">
                        </i>
                    }
                    <p> Free </p>
                    <p> Delivered in 2-3 business days </p>
                </li>

            </ul>
        </div>
    );
}

export default CartProduct