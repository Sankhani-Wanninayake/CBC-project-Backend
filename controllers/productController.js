import product from '../models/product.js';
import {isAdmin} from "./userController.js";


export function createProduct(req, res){
    if (!isAdmin(req)) {
        res.json({
            message: "plese login as admin to add product"
        })
        return
    }
        const newProductData = req.body;
        const newProduct = new product(newProductData);
        newProduct.save().then(()=>{
            res.json({
                message: "product added"
            })
        }).catch((error)=>{
            res.status(500).json({
                message: error
            })
        })

}
export function getProduct(req, res){
    product.find({}).then((products)=>{
            res.json(products)
        }
    )
}