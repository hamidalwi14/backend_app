const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect("mongodb+srv://arkan:123@cluster0.z7vxmox.mongodb.net/ebakat");

// Define schema and model
const translationSchema = new mongoose.Schema({
  bahasaSemende: String,
  bahasaIndonesia: String,
});

app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // For parsing form data
app.use("/users", require("./routes/userRoutes"));
// Setup session and flash middleware
app.get("/", (req, res) => {
  res.send("Server, ON!");
});

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

app.listen(port, () => {
  console.log(
    `Server berjalan di mongodb+srv://edo:123@cluster0.z7vxmox.mongodb.net:${port}`
  );
});
