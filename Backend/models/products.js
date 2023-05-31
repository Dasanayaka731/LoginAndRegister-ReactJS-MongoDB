const mongoose = require("mongoose");

const schema = mongoose.Schema;

const productsSchema = new schema({
  picture: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  release_date: {
    type: String,
    required: true,
  },
});

//creating a model named "Student" using the Mongoose library and the "studentSchema" variable
const Products = mongoose.model("Products", productsSchema);

module.exports = Products;
