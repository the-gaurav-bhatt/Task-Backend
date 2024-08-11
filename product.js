import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  price: Number,
});
const Product =
  mongoose.models.productSchema || mongoose.model("Product", productSchema);
export default Product;
