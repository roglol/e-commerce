import React from 'react'
import axios from 'axios'
import CartProduct from './common/CartProduct'

class BoughtProducts extends React.Component {
    state ={
        purchases:[],
        purchased:true,
    }

    getPurchases(username){
        axios.post('http://localhost:5000/purchases',username)
        .then(response => {
            this.setState({purchases:response.data})
        })
    }
    
    componentDidMount(){
        const data = localStorage.getItem('authorized')
        this.getPurchases({data})
    }

    render(){
        return (
            <div>

          {this.state.purchases.map( (el,index)=> (
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

export default BoughtProducts