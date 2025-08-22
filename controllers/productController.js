import product from '../models/product.js';
import {isAdmin} from "./userController.js";


export function createProduct(req, res){
    if (!isAdmin(req)) {


  

}