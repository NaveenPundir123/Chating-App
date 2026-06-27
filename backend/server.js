const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const app = require("./src/app");
const connectDB = require("./src/db/db");
const { default: job } = require("./src/lib/cron");

if (!process.env.MONGO_URI) {
  console.error(
    "Missing MONGO_URI in backend/.env. Check that .env is present and loaded.",
  );
}

connectDB();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  if (process.env.NODE_ENV === "production") job.start();
});
