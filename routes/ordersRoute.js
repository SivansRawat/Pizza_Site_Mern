const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY || "");
const Order = require("../models/orderModel");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/placeorder", protect, async (req, res) => {
  const { token, subtotal, cartItems } = req.body;

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ message: "Stripe secret key is not configured" });
  }

  if (!token || !subtotal || !cartItems || cartItems.length === 0) {
    return res.status(400).json({ message: "Missing order details" });
  }

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.paymentIntents.create(
      {
        amount: Math.round(Number(subtotal) * 100),
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    const neworder = new Order({
      name: req.user.name,
      email: req.user.email,
      userid: req.user._id,
      orderItems: cartItems,
      orderAmount: subtotal,
      shippingAddress: {
        street: token.card && token.card.address_line1,
        city: token.card && token.card.address_city,
        country: token.card && token.card.address_country,
        pincode: token.card && token.card.address_zip,
      },
      transactionId: payment.id,
    });

    await neworder.save();
    res.send("Order placed successfully");
  } catch (error) {
    return res.status(400).json({ message: `Something went wrong: ${error.message}` });
  }
});

router.post("/getuserorders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ userid: req.user._id }).sort({ _id: -1 });
    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
});

router.get("/getallorders", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({});
    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/deliverorder", protect, admin, async (req, res) => {
  const orderid = req.body.orderid;

  try {
    const order = await Order.findOne({ _id: orderid });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.isDelivered = true;
    await order.save();
    res.send("Order Delivered Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
