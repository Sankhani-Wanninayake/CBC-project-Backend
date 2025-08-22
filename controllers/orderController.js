import order from '../models/order.js';

export async function createOrder(req, res) {

    // take the latest product id

    try {
        const latestOrder = await order.findOne().sort({ createdAt: -1 });

}catch(error) {
       
        res.status(500).json({ message: error.message });
    }
}