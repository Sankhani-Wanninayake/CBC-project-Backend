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
        const latestOrder = await order.findOne().sort({ date: -1 }).limit (1)

        let orderId
        if (latestOrder.length == 0) {
            orderId = 'CBC0001'
        } else {
            const currntOrderId = latestOrder[0].orderId


            const numberString = currntOrderId.replace('CBC', '')

            const number = parseInt(numberString)

            const newNumber = (number + 1).toString().padStart(4, '0')
            orderId = 'CBC' + newNumber;
        }
        const newOrderData = req.body 
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

