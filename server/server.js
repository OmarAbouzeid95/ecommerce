
const express = require('express')
const cors = require('cors')
const { MongoClient, ObjectId } = require('mongodb')
require('dotenv').config()
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3300

// parsing incoming requests and puts json data in req.body
app.use(express.json())
// configuring cors to allow requests from the front-end URL
app.use(cors({
    origin: process.env.FRONTEND_URL
}))

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'build')))

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

// updating bagItems
app.patch('/updateBag', (req,res) => {
  const {email, bagItems} = req.body
  const user = req.body
  users.updateOne({email:email}, {$set: {bagItems: bagItems}})
  .then(result => {
    res.status(200).json(user)
  })
  .catch(error => {
    res.status(500).json({error: error})
  })
})

// updating user information
app.patch('/updateUser', (req, res) => {
  const {email, password, firstName, lastName, id} = req.body
  // creating new objectId with the user id
  const objId = new ObjectId(id)
  users.updateOne({_id: objId}, {$set: {email: email, password: password, firstName: firstName, lastName: lastName}})
  .then(() => {
    res.status(200).json({result: 'success'})
  })
  .catch(error => {
    res.status(500).json({error: error})
  })
})

// find product details
app.get('/productDetails/:id', (req, res) => {
  const id = parseInt(req.params.id)
  // check if product has reviews or ratings
  products.findOne({id: id})
  .then(product => {
    res.status(200).json(product)
  })
  .catch(error => {
    res.status(500).json({error: error})
  })
})

app.patch('/updateProduct', (req ,res) => {
  const {info, id} = req.body
  // check if product exists in the db
  products.findOne({id: id})
  .then(product => {
    // found product
    if(product) {
      products.updateOne({id: id}, {$set: {rating: info.rating, reviews: info.reviews, ratingCount: info.ratingCount, totalRating: info.totalRating}})
      .then(() => {
        res.status(200).json({result: 'success'})
      })
      .catch(error => {
        res.status(500).json({error: error})
      })
    } else {
      // no product found
      products.insertOne({id: id, rating: info.rating, reviews: info.reviews, ratingCount: info.ratingCount, totalRating: info.totalRating})
      .then(() => {
        res.status(200).json({result: 'success'})
      })
      .catch(error => {
        res.status(500).json({error: error})
      })
    }
  })
  .catch(error => {
    res.status(500).json({error: error})
  })
})

// Catch-all route handler
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

run().then(app.listen(PORT, () => console.log(`listening to port ${PORT}`)))




