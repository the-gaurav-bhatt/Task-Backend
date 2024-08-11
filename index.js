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
            "https://images.unsplash.com/photo-1721332149371-fa99da451baa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
          price: 150,
        },
        {
          name: "Portable Bluetooth Speaker",
          image:
            "https://unsplash.com/photos/a-person-using-a-laptop-computer-on-a-table-AoDMssi2UOU",
          price: 50,
        },
        {
          name: "Ergonomic Office Chair",
          image:
            "https://images.unsplash.com/photo-1604426633801-11b2001c5a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2ZmaWNlJTIwY2hhaXJ8fGVufDB8fDB8fA%3D%3D&w=640&q=80",
          price: 200,
        },
        {
          name: "Smartwatch with Fitness Tracking",
          image:
            "https://images.unsplash.com/photo-1546868873-700ef0109fad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnR3YXRjaHxlbnwwfHwwfHw%3D&w=640&q=80",
          price: 100,
        },
        {
          name: "Espresso Machine with Milk Frother",
          image:
            "https://images.unsplash.com/photo-1505270933571-2d966c1ef81b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXNwcmVzc28lMjBtYWNoaW5lfGVufDB8fDB8fA%3D%3D&w=640&q=80",
          price: 300,
        },
        {
          name: "Wireless Gaming Mouse",
          image:
            "https://images.unsplash.com/photo-1555449966-26fe89077798?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FtaW5nJTIwbW91c2V8ZW58MHx8MHx8&w=640&q=80",
          price: 80,
        },
        {
          name: "Backpack for Hiking and Travel",
          image:
            "https://images.unsplash.com/photo-1530745342582-0795f23ec976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHN8ZW58MHx8MHx8fDA%3D",
          price: 70,
        },
        {
          name: "Digital Instant Camera",
          image:
            "https://unsplash.com/photos/white-and-brown-plastic-bottles-nwOip8AOZz0",
          price: 120,
        },

        {
          name: "Yoga Mat with Carrying Strap",
          image: "https://unsplash.com/photos/brown-basket-lot-ztgKTnI_eIU",
          price: 30,
        },
        {
          name: "Cast Iron Skillet",
          image:
            "https://images.unsplash.com/photo-158384726897-e10576424c86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FzdCUyMHlyb24lMjBza2lsbGV0fGVufDB8fDB8fA%3D%3D&w=640&q=80",
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
