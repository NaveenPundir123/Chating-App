const express = require("express");
const cors = require("cors");
const { clerkMiddleware } = require("@clerk/express");
const fs = require("fs");
const path = require("path");
const clerkWebhookRouter = require("./webhooks/clerk.webhooks");

const FRONTEND_URL = process.env.FRONTEND_URL;
const publicDir = path.join(process.cwd(), "backend", "public");

const app = express();
app.use(express.json());
app.use(clerkMiddleware());

app.use(
  "/api/webhooks/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhookRouter,
);

app.get("/health", (req, res) => {
  res.status(200).json({
    ok: true,
  });
});

if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
  app.get("/{*any}", (req, res, next) => {
    res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
  });
}

app.use(cors({ origin: FRONTEND_URL, credentials: true }));

module.exports = app;
