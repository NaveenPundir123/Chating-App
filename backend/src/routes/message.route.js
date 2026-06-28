const express = require("express");
const {
  getConversationsForSidebar,
  getMessages,
  getUsersForSidebar,
  sendMessage,
} = require("../controller/message.controller");
const { protectRoute } = require("../middleware/auth.middleware");
const { upload } = require("../middleware/upload.middleware");

const router = express.Router();

router.use(protectRoute);

router.get("/users", getUsersForSidebar);
router.get("/conversations", getConversationsForSidebar);
router.get("/:id", getMessages);
router.post("/send/:id", upload.single("media"), sendMessage);

module.exports = router;
