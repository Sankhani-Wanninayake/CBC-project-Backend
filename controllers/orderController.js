import order from '../models/order.js';

import { iscustomer } from './userController.js';

export async function createOrder(req, res) {

    if (!iscustomer){
        res.json({ 
            message: "please login as customer to crate order"
        })
    }

    // take the latest product id

    try {
        const latestOrder = await order.find().sort({ date: -1 }).limit (1)

        let orderId
        if (latestOrder.length == 0) {
            orderId = 'CBC2001'
        } else {
            const currntOrderId = latestOrder[0].orderId


            const numberString = currntOrderId.replace('CBC', '')// remove prefix to get number part

            const number = parseInt(numberString) //convert  string to int

            const newNumber = (number + 1).toString().padStart(4, '0')
            orderId = 'CBC' + newNumber;
        }
        const newOrderData = req.body 



        const newProductArray =[]
        for (let i =0; i <newOrderData.orderedItems.length; i++) {

            const product = await Product.findOne({ productId: newOrderData.orderedItems[i].productId })

           if (product == null){
            res.json ({
                message : "Product with id " + newOrderData.orderedItems[i].productId + " not found"
            })
            return
           }


           newProductArray[i]={
            
            name: product.productName,
            price: product.price,
            quantity: newOrderData.orderedItems[i].quantity,
            image: product.images[0]
        }

 
        } 
        console .log(newProductArray)
        newOrderData.orderedItems = newProductArray
         
        newOrderData.orderId = orderId;
        newOrderData.email = req.user.email;

        const newOrder = new order(newOrderData);
        await newOrder.save();

        res.status(201).json({
            message: "Order created successfully",})



}catch(error) {
       
        res.status(500).json({ message: error.message });
    } 
}

export async function getOrders(req, res) {
    try {
        const orders = await order.find(
            { email: req.user.email }
        )
        res.json(
             order
        )
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

     