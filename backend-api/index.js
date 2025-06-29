// backend-api/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const auditTrail = require("./middleware/auditTrail");
const tokenRoutes = require("./routes/tokenRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/token", tokenRoutes);
app.use(auditTrail);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
