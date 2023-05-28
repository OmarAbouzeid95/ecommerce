
const express = require('express')
const cors = require('cors')
const { MongoClient } = require('mongodb')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 3300

// parsing incoming requests and puts json data in req.body
app.use(express.json())
// configuring cors to allow requests from the front-end URL
app.use(cors({
    origin: process.env.FRONTEND_URL
}))

// db connection
const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)
let db, users, products

async function run() {
  try {
    await client.connect()
    db = client.db()
    users = db.collection('users')
    products = db.collection('products')
  }
  catch(error) {
    console.log(error)
  }
}

run()

// sign in
app.post('/signIn', (req,res) => {
    const {email, password} = req.body
    users.findOne({email: email, password: password})
    .then(user => {
        res.status(200).json(user)
    })
    .catch(error => {
        res.status(500).json({error: error})
    })
})

// sign up
app.post('/signUp', (req,res) => {
  const {email, password, firstName, lastName} = req.body
  users.insertOne({email: email, password: password, firstName: firstName, lastName: lastName})
  .then(result => {
    res.status(200).json(result)
  })
  .catch(error => {
    res.status(500).json({error: error})
  })
})

// find user by email
app.get('/user/:email', (req,res) => {
  const email = req.params.email
  users.findOne({email: email})
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    res.status(500).json({error: error})
  })
})

app.get('/user/:name', (req,res) => {
    console.log(req.params)
    res.send(req.params.name)
})

app.listen(PORT, () => console.log(`listening to port ${PORT}`))




