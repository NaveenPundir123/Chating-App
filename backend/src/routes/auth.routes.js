const express = require("express");
const { checkAuth } = require("../controller/auth.controller");
const { protectRoute } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/check", protectRoute, checkAuth);

module.exports = router;
