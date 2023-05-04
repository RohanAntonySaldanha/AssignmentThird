const express = require("express");
const Item = require("./model"); // importing model.js where there exist DB structure
const mongoose = require("mongoose");
const app = express();

// Express middleware for json date transfer
app.use(express.json());

// default route on port
app.get("/", (req, res) => {
  res.send("Hello node api working and mongoDB connected!!!");
});

// api to fetch data from mondoDB
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find({});
    res.status(201).json(items); //status code on success
  } catch {
    res.status(500).json({ message: error.message }); //status code on fail
  }
});

// api insert data into mongoDB
app.post("/items", async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item); //status code on success
  } catch (error) {
    res.status(500).json({ message: error.message }); //status code on fail
  }
});

// api to update data of mongoDB by using id
app.put("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByIdAndUpdate(id, req.body);
    if (!item) {
      return res
        .status(404)
        .json({ message: `cannor find any product with Id ${id}` });
    }
    const UpdatedItem = await Item.findById(id, req.body);
    res.status(201).json(UpdatedItem); //status code on success
  } catch {
    res.status(500).json({ message: error.message }); //status code on fail
  }
});

// api to delete item from mongoDB using id
app.delete("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByIdAndDelete(id);
    if (!item) {
      return res
        .status(404)
        .json({ message: `cannor find any product with Id ${id}` });
    }
    res.status(201).json(item); //status code on success
  } catch (error) {
    res.status(500).json({ message: error.message }); //status code on fail
  }
});

// mongoDB connection
mongoose
  .connect(
    "mongodb+srv://rohansaldanha31:SRjhgrZJQRJWCcT5@cluster0.k5yaps7.mongodb.net/product?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB!");
    app.listen(3000, () => {
      console.log(`Server listening on port 3000!`);
    });
  })
  .catch(() => {
    console.log(console.error);
  });

module.exports = app;
