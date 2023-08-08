const mongoose = require("mongoose");
const productSchema = require("./Schema/produstSchema");

const connect = (uri) => {
  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Datebase Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

const productModel = mongoose.model("Product", productSchema);

module.exports = {
  connect: connect,
  productModel: productModel,
};
