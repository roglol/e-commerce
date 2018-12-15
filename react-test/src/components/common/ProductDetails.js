import React from 'react'
import axios from 'axios'


class ProductDetails  extends React.Component {
    state={
        data:localStorage.getItem('authorized'),
        productId:this.props.match.params.id,
        product: {

        }
    }

    getProduct = () => {
        axios.get('http://localhost:5000/products/'+this.props.match.params.id)
        .then(response => {
           this.setState({product:response.data})
        })
    }
    addToCart(details){
            axios.post('http://localhost:5000/addtocart',details)
            .then(response => {
            })
            this.props.history.push("/profile")
    }

    componentDidMount(){
       this.getProduct()
    }
    render(){
        const {data,productId} = this.state
        return (
            <div className="details">
                <img src={this.state.product.url} alt="" className="details-image"/>
                <div className="details-text">
                    <h2 className="details-name">{this.state.product.name}</h2>
                    <h3 className="details-price">${this.state.product.price}</h3>
                    <hr/>
                    <p>{this.state.product.desc} {this.state.product.desc} {this.state.product.desc}</p>
                    {localStorage.getItem('authorized') &&
                    localStorage.getItem('authorized') !=='admin' &&
                 <button 
                 onClick={() => this.addToCart({data, productId})}
                 className="details-button">
                 Add to Cart
                 </button>
                
                }
                </div>   
            </div>
        )
    }
}

export default ProductDetails