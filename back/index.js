const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const secret = 'demo__system';

const app = express();
app.use( cors('*') )
app.use( express.urlencoded( { extended: true}) )
app.use( express.json() )
app.use( (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    next();
})

const encrypt = data => {
    const hash = crypto.createHmac('sha256', secret)
                   .update(data)
                   .digest('hex');
    return hash;
}

const Products = require('../react-test/db/products.json') 
const Users = require('../react-test/db/users.json')
let Admin = require('../react-test/db/admin.json')

Admin = {
    username: Admin.username,
    password: encrypt(Admin.password)
}

app.get('/products', (req,res) =>{
    res.send(Products)
})

app.get('/products/:id', (req,res) => {
    const id = req.params.id
    const product = Products.find( el => el.id == id)
    res.send(product)
})
app.post('/addtocart', (req,res) =>{
     const username = req.body.data
     const productId = req.body.productId
     const product = Products.find(product=> product.id == productId)
     const user = Users.find(el => el.username === username)
     const index = Users.indexOf(user)
     user.cartProducts.push(product)
     Users.splice(index,1,user)
     res.send(user)
})
app.get('/users', (req,res) =>{
    res.send(Users)
})
app.post('/user', (req,res) =>{
    const data = req.body.data
    const user = Users.find(el => el.username === data)
    res.send(user)
})
app.post('/cart', (req,res) =>{
    const data = req.body.data
    const user = Users.find(el => el.username === data)
    res.send(user.cartProducts)
})
app.post('/balance', (req,res) =>{
    const data = req.body.data
    const user = Users.find(el => el.username === data)
    res.send((user.balance).toString());
})
app.post('/message', (req,res) =>{
    const data = req.body.data
    const user = Users.find(el => el.username === data)
    const index = Users.indexOf(user)
    user.messages.push(req.body.message)
    Users.splice(index,1 ,user)
    console.log(Users)

})
app.post('/purchases', (req,res) =>{
    const data = req.body.data
    const user = Users.find(el => el.username === data)
    res.send(user.boughtProducts)
})
app.post('/purchase', (req,res) =>{
    const data = req.body.data
    const user = Users.find(el => el.username === data)
    const index = Users.indexOf(user)
    user.boughtProducts = user.boughtProducts.concat(user.cartProducts)
    const sum = user.cartProducts.reduce((acc,el) =>{
        return acc + parseInt(el.price)
    },0)
    user.cartProducts = []
    user.balance=user.balance-sum
    Users.splice(index,1,user)
    res.send([])
})
app.post('/register', (req,res) =>{
    const user = req.body
    user.password = encrypt(user.password)
    user.id = Users.length + 1
    user.messages = []
    user.cartProducts = []
    user.boughtProducts = []
    Users.push(req.body)
    res.send(req.body)
})
app.post('/login', (req,res) => {
    let {username, password} = req.body;
     password = encrypt(password);
    
    let user = Users.find(el=>{
       return  el.username === username && el.password === password
    })
    
    let admin = (Admin.username===username && Admin.password === password) 
    ? true : false
    if(!user && !admin){
        return
    }

    if(admin || user.username){
        res.json({
            username,
            password,
            auth: true
        })
    }else{
        res.json({
            auth: false,
            message: 'user not found'
        })
    }
})
    app.delete('/cart/remove/:id/:username', (req,res) =>{
        const id = req.params.id
        const username= req.params.username
        const user = Users.find(el => el.username === username)
        const index = Users.indexOf(user)
        user.cartProducts.splice(id,1)
        Users.splice(index,1,user)
        res.send(user.cartProducts)
    })

app.get('/admin/users/cart/:id', (req,res) =>{
    const id = req.params.id
    const user = Users.find(el => el.id == id)
    res.send(user.cartProducts)
})
app.get('/admin/users/purchases/:id', (req,res) =>{
    const id = req.params.id
    const user = Users.find(el => el.id == id)
    res.send(user.boughtProducts)
})
app.get('/admin/users/messages/:id', (req,res) =>{
    const id = req.params.id
    const user = Users.find(el => el.id == id)
    res.send(user.messages)
})
app.post('/admin/edit/username', (req,res) =>{
    const data = req.body.data
    const username = req.body.username
    const user = Users.find(el => el.username === username)
    const index = Users.indexOf(user)
    user.username = data
    Users.splice(index,1,user)
    res.send(user.username)
})

app.post('/admin/addproduct', (req,res) =>{
    const product = req.body
    product.id = Products.length + 1
    Products.push(product)
    res.send(product)
})
app.delete('/admin/products/remove/:id', (req,res) =>{
    const id = req.params.id
    const product = Products.find( product =>product.id == id)
    const productIndex = Products.indexOf(product)
    Products.splice(productIndex, 1)
    Users.map(el =>{
        const newCart = el.cartProducts.filter(el => el.id != id)
        el.cartProducts = newCart
        return el
    })
    res.send(Products)
})
app.post('/admin/products/edit', (req,res) =>{
          const newProduct = req.body
          const product = Products.find(el => el.id == newProduct.id)
          const productIndex = Products.indexOf(product)
          Products.splice(productIndex,1,newProduct)
          Users.map(el =>{
              if(!el.cartProducts.includes(product)){
                  return el
              }else{
            const cartOne = el.cartProducts.filter(el => el.id != newProduct.id)
            let cartTwo = el.cartProducts.filter(el => el.id == newProduct.id)
            cartTwo = cartTwo.map( el=>{
                el =newProduct
                return el
            })
            el.cartProducts = cartOne.concat(cartTwo)
            return el
        }
          })
          res.send(newProduct)
})

app.listen( 5000, () => {
    console.log(`Port - 5000`);
})