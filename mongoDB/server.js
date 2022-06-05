const express = require("express");
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/foot";
const app = express();
const UserDTO = require("../mongoDB/user");
var bodyParser = require("body-parser");

// create application/json parser
var jsonParser = bodyParser.json();

app.get("/", async (req, res) => {
  try {
    const user = await UserDTO.find();

    res.json(user);
  } catch {
    res.send("Error");
  }
});

app.post("/save", jsonParser, async (req, res) => {
  console.log(req.body);
  const newUser = new UserDTO({
    name: req.body.name,
    origin: req.body.origin,
    price: req.body.price,
  });
  try {
    const userSave = await newUser.save();
    res.json(userSave);
  } catch {
    res.send("Error");
  }
});

app.get("/delete/:name", jsonParser, async (req, res) => {
  try {
    await UserDTO.remove({ name: req.params.name });
    res.json("tamam");
  } catch {
    res.send("Error");
  }
});

app.use(express.json());
app.listen(84, () => {
  console.log("Server running on port 80.");
});

app.use(express.json());
app.listen(85, () => {
  console.log("Server running on port 85.");
});

const con = mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
