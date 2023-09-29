const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5001;

const dotenv = require("dotenv");
dotenv.config();
app.use(cors({
  origin : ["https://strm-vdo.vercel.app"],
}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("server is up and runninggg");
})

// // Connect to MongoDB (replace 'your_mongodb_uri' with your MongoDB URI)
// mongoose.connect("mongodb://127.0.0.1:27017/db2", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const connectDB = async() => {
  try{
      await mongoose.connect(process.env.MONGODB_URI)
      console.log('MongoDB is connected');
  }
  catch (err){
      console.log(err)
  }
}
connectDB();

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  watchlist: Array, // Add a field for storing the watchlist
});

const User = mongoose.model("User", UserSchema);

// Signup route
app.post("/api/signup", async (req, res) => {
  
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User signed up successfully." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});

// Login route
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password." });
    }

    res.json({ message: "Login successful." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});

// Watchlist save route
app.post("/api/watchlist", async (req, res) => {
  const { username, watchlist } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    user.watchlist = watchlist;
    await user.save();
    res.json({ message: "Watchlist saved to MongoDB for user:", username });
  } catch (error) {
    console.error("Error saving watchlist to MongoDB:", error);
    res.status(500).json({ error: "An error occurred." });
  }
});

app.post("/api/getwatchlist", async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    const watchlist1 = user.watchlist;
    res.json({ watchlist: watchlist1 });
  } catch (error) {
    console.error("Error retrieving watchlist:", error);
    res.status(500).json({ error: "An error occurred." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
