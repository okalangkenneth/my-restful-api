 import jwt from "jsonwebtoken";

// Generate token that user will be using for authorization in the application
const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"30d"
    })
}

export default generateToken;

