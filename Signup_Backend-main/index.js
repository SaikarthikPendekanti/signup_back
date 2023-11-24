const mongoose = require("mongoose");
const express = require("express");
const studentRoute = require("./studentRoutes/studentRoutes");
// npm i cors
const cors = require("cors");

const app = express();
mongoose.set("strictQuery", true);

mongoose.connect(
  "mongodb+srv://sriram:sriram@cluster0.zlzti3b.mongodb.net/School"
);

const db = mongoose.connection;
db.on("open", () => {
  console.log("database connected");
});

db.on("error", (err) => {
  console.log("error in connecting to database", err);
});

app.use(express.json());
app.use(cors());
app.use("/students", studentRoute);

const port = 5500;
app.listen(port, () => {
  console.log("Server started on " + port);
});
// npx create-react-app frontend ctrl+`
// CRUD>npx create-react-app frontend