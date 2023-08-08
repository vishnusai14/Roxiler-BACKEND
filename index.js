require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: "*",
  })
);
const db = require("./Database/db");
app.use(express.json({ limit: "50mb" }));
const pass = process.env.DB_PASS;
const monogDbUri = `mongodb+srv://Vishnu_Sai:${pass}@cluster0.hkghe.mongodb.net/Roxiler?retryWrites=true&w=majority`;

db.connect(monogDbUri);

const PORT = process.env.PORT || 1331;

//For Checking
// app.get("/", (req, res) => {
//   res.status(200).send("API WORKS");
//   res.end();
// });

app.use("/api/v1/product", require("./Routes/products/products"));

app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`The Server is started in Port ${PORT}`);
});
