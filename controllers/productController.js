import product from '../models/product.js';
import { isAdmin } from './userController.js';



export function createProduct(req, res) {

if(!isAdmin(req)){

    res.json({
        message:"Please login as admin to add products"
    })
    return
}



    const newProductData = req.body

    const Product = new product(newProductData)

    product.save().then(()=>{
        res.json({
            message:"Product created"
        })
    }).catch((error)=>{
        res.json({
            message:error
        })
    })
}
    
export function getProducts(req,res){
    product.find({}).then((Products)=>{
        res.json(Products)
    })

    }
    





    



