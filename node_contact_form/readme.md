# MERN Contact Form

Contact form using MERN tech stack

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

### Steps to build this contact form from scratch

1.  Initialze the Node Project and install dependencies

1.1 Initialize the node project with this command

```bash
 npm init
```

1.2 Install express, nodemon, mongoose, ejs , body-parser

```bash
npm i express nodemon mongoose ejs body-parser
```

1.3. Add under scripts in package.json to run your project with command `npm run dev`

```js
"dev": "nodemon index.js"
```

2. Write your code in ExpressApp

2.1 Include modules in your express app

```js
const http = require("http");
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
```

2.2. Also set some ejs configuration

```js
app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs"); //setting the default view engine
app.use(express.static(__dirname + "/public"));
// changed the default views folder to public
app.set("views", path.join(__dirname, "public"));
```

2.3. Connect your MongoDB to your NodeJs application

```js
mongoose
  .connect("mongodb://localhost:27017/sidData", {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connection Successfull");
  })
  .catch((err) => {
    console.log(err);
  });
```

2.4 Create a mongoose schema to store the data

```js
const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String },
  message: { type: String, required: true },
});
```

2.5 Create a model for the created schema

```js
// model of above schema
const registerModal = mongoose.model("registeredUsers", registrationSchema);
```

2.6 Create webserver with your express app to listen to the requests

- To cater the get request

```js
// handling get request
app.get("/", (req, res) => {
  res.status(200).render("index", { msg: "" });
  console.log("Index Page served");
});
```

- To cater the post request from the contact page and saving the data into mongoDB database.

```js
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
        res.render("index", {
          msg: "This is cool, your details are successfully sent.",
        });
      })
      .catch((err) => {
        res.end("Some error occured");
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
});
```

2.6 Finally declare the port number to listen the server requests

```js
const PORT = 5000;
// activating the server on PORT 5000
app.listen(PORT, () => {
  console.log(`The server is listening to ${PORT}`);
});
```

3. Create a EJs file containing your html code for the contact form. and save it with `.ejs` extension in your public folder. Also keep in mind to make the form action to specific path from where you are fetching your post request in express app.

```html
<form method="post" action="/formdata"></form>
```

After this type `npm run dev` in your teminal and go to `localhost:5000/` to see your project live working.

## Authors

- [@sid-talesara](https://github.com/sid-talesara)

## Screenshots

![App Screenshot](https://i.imgur.com/Nm9DvTD.png)
