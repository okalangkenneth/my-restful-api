import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";


// Sign Up a User
// Route - POST/api/users

const signUpUser = asyncHandler(async(req,res)=>{
    const { firstName, lastName, email, password} = req.body  // coming from the frontend as enterd by user

// Check if the user exists already
const userExists = await User.findOne({email:email});

if (userExists){
    res.status(400); 
    throw new Error("User already exists")

    
}
// create if user doesnt exist
const user = await User.create({
    firstName,
    lastName,
    email,
    password
});

if (user){
    res.status(201).json({
        _id:user._id,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        token: generateToken(user.id)
    })
}else {
    res.status(400);
    throw new Error("Could not create user") // If info providate is not valid
}

})

// Login/Auth a user
// Route - POST /api/users/login

const loginUser = asyncHandler (async(req, res) => {
    const {email,password}= req.body;

 // Find user in db
 
 const user = await User.findOne({email:email});

 if (user && (await user.matchPassword(password))){
    return res.json({
        _id:user._id,
    firstName:user.firstName,
    lastName:user.lastName,
    email:user.email,
    token: generateToken(user.id)

    })
    
 }else {
     res.status(400);
     throw new Error("Invalid email or password")
 }

})

// Get list of all users
// Route - GET /api/users
const getUsers = asyncHandler(async( req, res)=>{
    const users = await User.find({ });
    res.json(users);
})

// Get user by ID
// Route-GET /api/users/:id

const getUserById = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id).select("-password");

    if(user){
        res.json(user);
    }else{
        res.status(404);
        throw new Error("User not found")
    }

})

//Update a user
// Route-PUT-/api/users/:Id

const updateUser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id);

    if(user){
        user.firstName= req.body.firstName || user.firstName;
        user.lastName= req.body.lastName|| user.lastName;
        user.email=req.body.email||user.email

        const updatedUser = await user.save();

        res.json({
            _id:updatedUser._id,
            firstName:updatedUser.firstName,
            lastName:updatedUser.lastName,
            email:updatedUser.email,
        })
    }else{
        res.status(400);
        throw new Error("User not found");

    }
})

// delete a user
// Route-DELETE /api/users/:Id

const deleteUser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id);

    if (user){
        await User.remove();
        res.json({message:"User deleted"})
    }else{
        res.status(404);
        throw new Error("User not deleted");

    }
})

export{signUpUser,loginUser,getUsers,getUserById,updateUser,deleteUser};