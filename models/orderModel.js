import mongoose from "mongoose";

const orderSchema = mongoose.Schema({

    // Reference order to user in order to link both of them
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    items: [{
        itemName:{
            type: String,
            required:true
        },
        itemQty:{
            type: Number,
            required:true
        },
        itemPrice:{
            type: Number,
            required:true
        
        } 

    }]  
})

const Order = mongoose.model("Order",orderSchema);

export default Order;