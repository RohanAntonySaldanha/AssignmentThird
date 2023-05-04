const mongoose = require("mongoose");

// defining Database structure
const itemSchema = mongoose.Schema({
  prodtype: {
    type: String,
    required: [true, "Please enter prodtype"],
  },
  prodname: {
    type: String,
    required: [true, "Please enter prodname"],
  },
  qty: {
    type: Number,
    required: [true, "Please enter qty"],
  },
  price: {
    type: Number,
    required: [true, "Please enter price"],
  },
});

const Item = mongoose.model("item", itemSchema);
module.exports = Item;
