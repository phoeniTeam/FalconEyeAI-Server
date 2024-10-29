import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/database.js";
import creatorRoutes from "./routes/creatorRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import Stripe from "stripe";
import bodyParser from "body-parser";
import { createTransaction } from "./controllers/transactionController.js";

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Check for required environment variables
if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET || !process.env.CLIENT_URL) {
  console.error('Missing required environment variables');
  process.exit(1);
}

connectDB();

app.use("/api/auth", authRoutes);
app.use("/creators", creatorRoutes);
app.use("/images", imageRoutes);
app.use("/transactions", transactionRoutes);

const checkoutSession = async (req, res) => {
  try {
    const plan = req.body.plan;
    const plansDetails = {
      1: { id: 1, price: 0, name: "Free", credits: "10" },
      2: { id: 2, price: 29, name: "Pro", credits: "220" },
      3: { id: 3, price: 79, name: "Premium", credits: "510" },
    };
    };
    const amount = Number(plansDetails[plan].price) * 100;
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: plansDetails[plan].name,
              description: `Credits ${plansDetails[plan].credits}`,
              description: `Credits ${plansDetails[plan].credits}`,
            },
            unit_amount: amount,
            unit_amount: amount,
          },
          quantity: 1,
        },
          quantity: 1,
        },
      ],
      metadata: {
        creatorId: req.body.creatorId,
        credits: plansDetails[plan].credits,
        plan: plansDetails[plan].id,
        plan: plansDetails[plan].id,
      },
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/profile`,
      cancel_url: `${process.env.CLIENT_URL}/`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

app.post("/create-checkout-session", checkoutSession);

app.post('/stripe-webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  let event;
  console.log('Stripe webhook');
  try {
    event = stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(event)
    console.error(`⚠️  Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

      const creatorId = session.metadata.creatorId;
      const credits = session.metadata.credits;
      const plan = session.metadata.plan;
      const stripeId = session.id;
      const amount = session.amount_total;

    try {
      await createTransaction(stripeId, amount, plan, credits, creatorId);
      res.status(200).send('Success');
    } catch (error) {
      console.error('Error creating transaction:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.status(200).send('Received unhandled event');
  }
};

app.post('/stripe', bodyParser.raw({ type: 'application/json' }), linkStripeWebhook);



app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});