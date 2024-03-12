require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Product = require("./product");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const productData = [];
const PORT = process.env.PORT || 2000;
const MONGO_URL = process.env.MONGO_URL;

// mongodb+srv://<jaykumarm416>:<T8E7pRMGZEt6d3ZO>@cluster0.mrtwxtk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

//connect mongoose
mongoose.set("strictQuery", true);
mongoose.connect(MONGO_URL);

const db = mongoose.connection;

db.once("open", async () => {
  try {
    console.log("connected to mongodb");
    //post api
    app.post("/api/add_product", async (req, res) => {
      console.log("req = ", req.body);

      let data = Product(req.body);
      // print("the data here =  ", data);

      try {
        let dataToStore = await data.save();

        res.status(200).json(dataToStore);
      } catch (e) {
        res.status(400).json({
          status: error.message,
        });
        print("error at catch post :", e);
      }

      // const pdata = {
      //   id: productData.length + 1,
      //   pname: req.body.pname,
      //   pprice: req.body.pprice,
      //   pdesc: req.body.pdesc,
      // };

      // productData.push(pdata);
      // console.log("final", pdata);

      // res.status(200).send({
      //   statusCode: "200",
      //   message: "product added successfully",
      //   product: pdata,
      // });
    });

    //get api
    app.get("/api/get_product/", async (req, res) => {
      try {
        let data = await Product.find();
        res.status(200).json(data);
      } catch (e) {
        res.status(500).json(error.message);
      }
      // if (productData.length > 0) {
      //   res.status(200).send({
      //     statusCode: "200",
      //     products: productData,
      //   });
      // } else {
      //   res.status(200).send({
      //     statusCode: "200",
      //     products: [],
      //   });
      // }
    });
  } catch (e) {
    console.log("ERROR connected to mongodb", error);
  }
});

app.listen(PORT, () => {
  console.log("connect to the server at ", PORT);
});
