import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Route Imports
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express(); // Initialize the app
const PORT = 8080; // Listening at port

//Bring in middleware
dotenv.config();
connectDB();
app.use(express.json());

//Routes 
app.use("/api/users",userRoutes);
app.use("/api/orders",orderRoutes);


app.listen(PORT,console.log(`Server started on PORT ${PORT}`));