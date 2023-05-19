const http = require("http");
const express = require("express");
const app = express();
const path = require("path");
const port = 5000;
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
// const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs"); //setting the default view engine
app.use(express.static(__dirname + "/public"));
// changed the default views folder to public
app.set("views", path.join(__dirname, "public"));

// DB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connection Successfull");
  })
  .catch((err) => {
    console.log(err);
  });

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String },
  message: { type: String, required: true },
});
// model of above schema
const registerModal = mongoose.model("registeredUsers", registrationSchema);

// handling get request
app.get("/", (req, res) => {
  res.status(200).render("index");
  console.log("Index Page served");
});

// saving the data into MongoDB
app.post("/formdata", async (req, res) => {
  try {
    const formData = new registerModal({
      name: req.body.fullname,
      email: req.body.email,
      phone: req.body.phone,
      gender: req.body.gender,
      message: req.body.message,
    });

    // saving the form data in DB
    formData
      .save()
      .then((data) => {
        res.render("index");
      })
      .catch((err) => {
        res.end("Some error occured");
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
});

// activating the server on PORT 5000
app.listen(port, () => {
  console.log(`The server is listening to ${port}`);
});
