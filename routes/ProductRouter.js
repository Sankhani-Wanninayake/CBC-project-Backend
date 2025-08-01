import express from 'express'
import {createProduct, deleteProduct, getProduct, getProductByname} from "../controllers/Productcontroller.js"

const productRouter = express.Router();

productRouter.get("/",getProduct)
productRouter.get("/:name",getProductByname)
productRouter.post("/",createProduct) 
productRouter.delete("/:name",deleteProduct)


export default productRouter;
