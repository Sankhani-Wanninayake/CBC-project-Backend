import mongoose from "mongoose";


const ProductSchema = mongoose.Schema({

      name : String,
      brand: String,
      description: String
    })

const Product = mongoose.model("Product",ProductSchema)
export default Product