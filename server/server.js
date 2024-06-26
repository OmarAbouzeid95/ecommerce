const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3300;

// parsing incoming requests and puts json data in req.body
app.use(express.json());
// configuring cors to allow requests from the front-end URL
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

// db connection
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
let db, users, products;

async function run() {
  try {
    await client.connect();
    db = client.db();
    users = db.collection("users");
    products = db.collection("products");
  } catch (error) {
    console.log(error);
  }
}

// stripe setup
const stripe = require("stripe")(process.env.STRIPE_KEY);

const keepAlive = () => {
  users
    .findOne({ email: "omar@example.com" })
    .then((user) => {
      const today = new Date();
      const currentTime =
        today.getDate() + "/" + today.getHours() + "/" + today.getMinutes();
      console.log("fetched user for keepAlive at ", currentTime);
    })
    .catch((error) => {
      console.log("Error in keepAlive: ", error);
    });
};

// sign in
app.post("/signIn", (req, res) => {
  const { email, password } = req.body;
  users
    .findOne({ email: email, password: password })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

// sign up
app.post("/signUp", (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  users
    .insertOne({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

// find user by email
app.get("/user/:email", (req, res) => {
  const email = req.params.email;
  users
    .findOne({ email: email })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

// updating bagItems
app.patch("/updateBag", (req, res) => {
  const { email, bagItems, orders } = req.body;
  const user = req.body;
  users
    .updateOne(
      { email: email },
      { $set: { bagItems: bagItems, orders: orders ?? [] } }
    )
    .then((result) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

// updating user information
app.patch("/updateUser", (req, res) => {
  const { email, password, firstName, lastName, id } = req.body;
  // creating new objectId with the user id
  const objId = new ObjectId(id);
  users
    .updateOne(
      { _id: objId },
      {
        $set: {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
        },
      }
    )
    .then(() => {
      res.status(200).json({ result: "success" });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

// find product details
app.get("/productDetails/:id", (req, res) => {
  const id = parseInt(req.params.id);
  // check if product has reviews or ratings
  products
    .findOne({ id: id })
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

app.patch("/updateProduct", (req, res) => {
  const { info, id } = req.body;
  // check if product exists in the db
  products
    .findOne({ id: id })
    .then((product) => {
      // found product
      if (product) {
        products
          .updateOne(
            { id: id },
            {
              $set: {
                rating: info.rating,
                reviews: info.reviews,
                ratingCount: info.ratingCount,
                totalRating: info.totalRating,
              },
            }
          )
          .then(() => {
            res.status(200).json({ result: "success" });
          })
          .catch((error) => {
            res.status(500).json({ error: error });
          });
      } else {
        // no product found
        products
          .insertOne({
            id: id,
            rating: info.rating,
            reviews: info.reviews,
            ratingCount: info.ratingCount,
            totalRating: info.totalRating,
          })
          .then(() => {
            res.status(200).json({ result: "success" });
          })
          .catch((error) => {
            res.status(500).json({ error: error });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

app.post("/getOrders", async (req, res) => {
  const { email } = req.body;
  users
    .findOne({ email })
    .then((user) => {
      res.status(200).json({ orders: user.orders });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

app.get("/create-intent", async (_, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2000,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json(error);
  }
});

run().then(
  app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
    setInterval(keepAlive, 1800000);
  })
);
