import express from "express";
import {protect}from "../middleware/authMiddleware.js";
import{signUpUser,loginUser,getUsers,getUserById,updateUser,deleteUser} from "../controllers/userControllers.js"; 

const router = express.Router();

router
.route("/")
.get(protect,getUsers);

router
.route("/signup")
.post(signUpUser);

router
.route("/login")
.post(loginUser);

router
.route("/:id")
.get(protect,getUserById)
.put(protect,updateUser)
.delete(protect,deleteUser);

export default router;