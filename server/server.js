
const express = require('express')
const cors = require('cors')
const { MongoClient } = require('mongodb')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 3300

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

app.get('/user/:name', (req,res) => {
    console.log(req.params)
    res.send(req.params.name)
})

app.listen(PORT, () => console.log(`listening to port ${PORT}`))




