const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const app = require("./src/app");
const connectDB = require("./src/db/db");

if (!process.env.MONGO_URI) {
  console.error(
    "Missing MONGO_URI in backend/.env. Check that .env is present and loaded.",
  );
}

connectDB();
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
