import express from "express";
import{protect}from "../middleware/authMiddleware.js";
import { addOrder,getOrders,getOrderById,deleteOrder } from "../controllers/orderControllers.js";

//Initialize router

const router = express.Router();

router
     .route("/")
     .get(protect,getOrders)
     .post(protect,addOrder);

router
     .route("/:id")
     .get(protect,getOrderById)
     .delete(protect,deleteOrder); 
     
export default router;     