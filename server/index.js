const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const bodyParser = require("body-parser");

const config = require("./config/key");

const mongoose = require("mongoose");
const connect = mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

app.use(cors());

//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());

app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));

//use this to show the image you have in node js server to client (react js)
if (process.env.NODE_ENV === "production") {
  app.use("/uploads", express.static("uploads"));
} else {
  app.use("/uploads-client", express.static("uploads-client"));
}

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
