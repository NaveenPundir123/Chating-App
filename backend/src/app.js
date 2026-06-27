const { clerkMiddleware } = require("@clerk/express");
const express = require("express");
const cors = require("cors");
const FRONTEND_URL = process.env.FRONTEND_URL;

const app = express();
app.use(express.json());
app.use(clerkMiddleware());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));

module.exports = app;
