
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import path from "path";

dotenv.config();


const secrete_key = process.env.STRIPE_SECRET;
const stripe = new Stripe(`${secrete_key}`);
const app = express();


app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "working",
  });
});

app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);
  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(400).json({ error: "The amount must be greater than zero." });
  }
});

app.listen(5000, (err)=>{
    if(err) console.log(err);
    else{
        console.log(`Amazon server running on http://localhost:5000`)
    }
})