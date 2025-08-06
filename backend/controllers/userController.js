// const userModel = require("../models/userModel");
// //create a token jwt
// const jwt = require('jsonwebtoken');
// const generateToken = (user) => {
//   return jwt.sign({ id: user }, SECRET_KEY, {
//     expiresIn: '30d', // Token expires in 30 days
//   });
// };

// const registerUser = async (req, res) => {
//   const { firstName, lastName, emailId, password } = req.body;

//   // Validation
//   if (!firstName || !emailId || !password) {
//     return res.status(400).json({ message: "Please add all mandatory fields" });
//   }

//   // Check if user already exists
//   const userExists = await userModel.findOne({ emailId });
//   if (userExists) {
//     return res.status(400).json({ message: "User already exists", user: userExists });
//   }

//   // Create new user
//   const newUser = new userModel({
//     firstName,
//     lastName,
//     emailId,
//     password,
//   });

//   // Save user to database
//   await newUser.save();
//   const token = generateToken(newUser);
//     // Set token in response header
//     res.status(201).json("x-auth-token", token);

//     const loginuser=async (req, res) => {
//   const { emailId, password } = req.body;
//     // Validation
//     if (!emailId || !password) {
//     return res.status(400).json({ message: "Please add all mandatory fields" });
//   }
//     // Check if user exists
//     const userExists = await userModel.findOne({ emailId });
//   if (!userExists) {
//     return res.status(400).json({ message: "User not found" });
//   }
//     // Check password
//     if (req.body.password !== userExists.password) {
//     return res.status(400).json({ message: "Invalid password" });
//     }
//     const token = generateToken(userExists);
//     res.status(200).json("Loggedin", token);



//   // Respond with success
//   res.status(201).json({ message: "User created successfully", user: newUser });
// };

// module.exports = { registerUser }, loginuser };







const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const generateToken = (user) =>{
    return jwt.sign({user},process.env.JWT_SECRET);
}

const registerUser = async (req,res) =>{
    const { firstName, lastName, emailId, password} = req.body;

    //VALIDATION

    if (!firstName || !emailId || !password){
        res.status(400).send({message:"Please Add all mandatory fields"});
    }

    //Check the user existing already in db or not
    const userExists = await User.findOne({emailId});
    if (userExists){
        res.status(400).json({message: "Already Exist"});
    }

    //CREATE USER IN YOUR DATABASE

    const newUser = await User.create({
        firstName,
        lastName,
        emailId,
        password
    });

    await newUser.save();
    const token = generateToken(newUser);


    
    res.status(201).json({
        message: "USER ADDED SUCCESSFULLY",
        token
    });
    
}


const loginUser = async (req,res) => {
    const { emailId, password} = req.body;

    //VALIDATION

    if (!emailId || ! password){
       return res.status(400).json({message: "ADD ALL DETAILS"});
    }

    const userExists = await User.findOne({emailId});
    console.log(userExists);

    if (!userExists){
        return res.status(400).json({message: "No user Found"});
    }

    if (req.body.password != userExists.password){
        console.log(req.body.password);
        return res.status(400).json({message: "Incorrect Password"});
    }
    const token = generateToken(userExists);

    return res.status(200).json({message: "LoggedIn", token});
    
}

module.exports = { registerUser, loginUser }