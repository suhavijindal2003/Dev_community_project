const jwt = require("jsonwebtoken");


const authMiddleware = async (req , res, next) =>{
    const { authorization } = req.headers;

    // console.log(authorization);

    const token = authorization.split(" ")[1];

    const userData = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(userData)
    

    next();
}


module.exports = authMiddleware;