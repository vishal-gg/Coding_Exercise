const express = require('express')
require('./Database/config')
const Users = require('./Database/Users')
const Products = require('./Database/Products')
const app = express()
const cors = require('cors')
// const jwt = require('jsonwebtoken')
// const key = 'secret-key'

app.use(cors())
app.use(express.json())

app.get('/get', async (req,res)=>{
  const getData = await Users.find()
  res.send(getData)
})

app.post('/register', async (req, res)=>{
  try{
    const postD = new Users(req.body)
    let finalD = await postD.save()
    finalD = finalD.toObject()
    delete finalD.password
    res.send(finalD)
  }catch(err){
    res.status(409).send(err)
  }
})

app.post('/login', async (req, res)=>{
  try {
    console.log(req.body)
    if(req.body.email && req.body.password){
      let user = await Users.findOne(req.body).select('-password')
    if(user){
      res.send(user)
    }else{
      res.send({result: 'user not found'})
    }
    }else{
      res.send({result: 'provide email and password'})
    }
  }catch(err){
    res.status(401).send({result: err})
  }
})
app.get('/products', async (req, res) => {
  let data = await Products.find()
  res.send(data)
})
app.delete('/product/:id', async (req, res)=>{
  let deleteData = await Products.deleteOne({_id:req.params.id})
  res.send(deleteData)
})

app.post('/add-product', async (req, res) => {
  let data = new Products(req.body)
  data = await data.save()
  res.send(data)
})
app.get('/product/:id', async (req, res)=>{
  try{
    let data = await Products.findOne({_id:req.params.id})
    if(data){
      res.send(data)
    }
  }catch(err) {
    console.log(err)
    res.send({error: 'No Record Found'})
  }
})
app.put('/product/:id', async (req,res)=>{
  let data = await Products.updateOne(
    {_id:req.params.id},
    {$set:req.body}
  )
  res.send(data)
})
app.get('/search/:key', async (req, res)=>{
  let result = await Products.find({
    $or: [
      {name: {$regex: req.params.key}},
      {company: {$regex: req.params.key}}
    ]
  })
  res.send(result)
})

// function verifyToken(req, res, next){
//   let token = req.headers['authorization']
//   if(token){
//     token = token.split(' ')[1]
//     jwt.verify(token, key, (err, valid)=>{
//       if(err){
//         res.status(401).send({result: 'please provide valid token'})
//       }else {
//         next()
//       }
//     })
//   }else {
//     res.status(403).send({result: 'please provide token in header'})
//   }
// }


app.listen(5000);