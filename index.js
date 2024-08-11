import mongoose from "mongoose";
import http from "http";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

const url =
  "mongodb+srv://bhattgaurav654:Idontknowman12*@cluster0.sjqhe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  price: Number,
});

const Product = mongoose.model("Product", productSchema);

// Function to insert sample products if none exist
const insertSampleProducts = async () => {
  try {
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      await Product.insertMany([
        {
          name: "Wireless Noise-Canceling Headphones",
          image:
            "https://random-image-pepebigotes.vercel.app/api/random-image",
          price: 150,
        },
        {
          name: "Portable Bluetooth Speaker",
          image:
            "https://random-image-pepebigotes.vercel.app/api/random-image",
          price: 50,
        },
        {
          name: "Ergonomic Office Chair",
          image:
            "https://random-image-pepebigotes.vercel.app/api/random-image",
          price: 200,
        },
        {
          name: "Smartwatch with Fitness Tracking",
          image:
            "https://random-image-pepebigotes.vercel.app/api/random-image",
          price: 100,
        },
        {
          name: "Espresso Machine with Milk Frother",
          image:
            "https://random-image-pepebigotes.vercel.app/api/random-image",
          price: 300,
        },
        {
          name: "Wireless Gaming Mouse",
          image:
            "https://random-image-pepebigotes.vercel.app/api/random-image",
          price: 80,
        },
        {
          name: "Backpack for Hiking and Travel",
          image:
            "https://random-image-pepebigotes.vercel.app/api/random-image",
          price: 70,
        },
        {
          name: "Digital Instant Camera",
          image:
            "https://random-image-pepebigotes.vercel.app/api/random-image",
          price: 120,
        },

        {
          name: "Yoga Mat with Carrying Strap",
          image: "https://random-image-pepebigotes.vercel.app/api/random-image",
          price: 30,
        },
        {
          name: "Cast Iron Skillet",
          image:
            "https://random-image-pepebigotes.vercel.app/api/random-image",
          price: 40,
        },
      ]);
      console.log("10 sample products inserted!");
    }
  } catch (err) {
    console.error("Error inserting sample products:", err);
  }
};

app.get("/api/product", async (req, res) => {
  console.log("GET route hit");

  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

const server = http.createServer(app);

const startServer = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to database");

    // Insert sample products after successful database connection
    await insertSampleProducts();

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error starting the server:", err);
  }
};

startServer();
