require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const fileupload = require("express-fileupload");
const path = require('path');
// const ejs = require('ejs');
const cors = require('cors');
const Stripe = require('stripe');
const  UserRoutes  = require('./routers/UserRoutes');
const  ProductRoutes  = require('./routers/ProductRoutes');
const  OrderRoutes  = require('./routers/OrderRoutes');
const dbConnection = require('./db');
const app = express()
const port = process.env.PORT || 5001;

const stripePuplishKey = process.env.STRIPE_PK;
// console.log(stripePuplishKey)
const stripeSecretKey = process.env.STRIPE_SK;
const stripe = Stripe(stripeSecretKey);

dbConnection();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// Function to serve all static files
// inside public directory.
app.use(express.static('public')); 
// app.use('/images', express.static('images'));
app.use('/uploads',express.static(path.join(__dirname,'/public/images')));

// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(fileupload());
app.use(`/api/`,UserRoutes);
app.use(`/api/`,ProductRoutes);
app.use(`/api/`,OrderRoutes);

app.post("/create-payment-intent", async (req, res) => {
    const { price, description } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price,
      description: description,
      currency: "inr",
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });

  });

app.listen(port, () => console.log(`Backend listening on port ${port}!`));

// error middleware
app.use((err,req,res,next) => {
  console.log("error checking middleware")
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong';
  res.status(errorStatus).json({
      success:false,
      status:errorStatus,
      message:errorMessage,
      stack:err.stack
  })
})
