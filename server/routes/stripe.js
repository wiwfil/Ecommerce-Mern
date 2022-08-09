const router = require("express").Router();
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.total * 100,
      currency: "usd",
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (errr) {
    res.status(500).json(errr);
  }
});

module.exports = router;
