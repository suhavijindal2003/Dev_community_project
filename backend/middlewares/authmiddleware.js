const jwt = require("jsonwebtoken");


const authMiddleware = async (req , res, next) =>{
    const { authorization } = req.headers;

    // console.log(authorization);

    const token = authorization.split(" ")[1];

    const userData = await jwt.verify(token, process.env.SECRET_KEY);
    console.log(userData)
    

    next();
}


module.exports = authMiddleware;