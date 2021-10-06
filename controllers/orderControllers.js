import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// Make an oder
// Route - POST /api/orders

const addOrder = asyncHandler(async(req,res)=>{
    const {items}= req.body;

    if(items && items.length == 0){
        res.status(400);
        throw new Error("No items in order");
    }else{
        const order = new Order({
            items,
            user:req.user._id
        })

        const newOder = await order.save();
        res.status(201).json(newOder);
    }
})

// Get all orders
// Routr-GET /api/orders
const getOrders = asyncHandler (async(req,res)=>{
    const orders = await Order.find({}).populate("user","id firstName");
    if(orders){
        res.json(orders);
    }else{
        res.status(404);
        throw new Error("No orders found")
    }
})

//Get order by Id
// Route -GET /api/orders/:id

const getOrderById = asyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id).populate("user","firstName");
    if(order){
        res.json(order);
    }else{
        res.status(404);
        throw new Error("Order not found");
    }
})

// Delete an order by ID
// Route -DELETE /api/orders/:id
const deleteOrder = asyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        await order.remove();
        res.json({message:"Order deleted"});
    }else{
        res.status(404);
        throw new Error("Could not delete order")
    }
})

export{addOrder,getOrders,getOrderById,deleteOrder}